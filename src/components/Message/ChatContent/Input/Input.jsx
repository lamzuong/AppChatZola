import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useState } from 'react';
import axiosCilent from '../../../../api/axiosClient';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:8000', { transports: ['websocket'] });

const cx = classNames.bind(styles);

const Input = (props) => {
    const [chatContent, setChatContent] = useState('');
    const [rerender, setRerender] = useState(false);
    const [image, setImage] = useState([]);

    const handleMultiFile = (e) => {
        setImage(e.target.files);
    };

    const handleSendMessage = async (e) => {
        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
            formData.append('imgs', image[i]);
        }
        formData.append('conversationID', props.params);
        formData.append('sender', props.user.id);
        formData.append('mess', chatContent ? chatContent : '');
        try {
            await axiosCilent.post('/zola/message', formData);
            socket.emit('send-to-server', {
                senderId: props.user.id,
                conversationID: props.params,
            });
            setChatContent('');
            setRerender(!rerender);
            sendData(rerender);
        } catch (err) {
            console.log(err);
        }
    };
    const sendData = (data) => {
        props.parentCb(data);
    };
    return (
        <div className={cx('wrapper')}>
            <form className={cx('container')} encType="multipart/form-data">
                <div className={cx('chatContent')}>
                    {!chatContent && (
                        <>
                            <i className="bx bx-paperclip"></i>
                            <label for="image">
                                <i className="bx bxs-image"></i>
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="imgs"
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                onChange={(e) => handleMultiFile(e)}
                            />
                            <i className="bx bxs-file-gif"></i>
                            <i className="bx bxs-sticker"></i>
                        </>
                    )}
                </div>
                <input
                    type="text"
                    spellCheck="false"
                    value={chatContent}
                    onChange={(e) => setChatContent(e.target.value)}
                    className={cx('input')}
                    placeholder="Message"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
            </form>
            <div className={cx('button')} onClick={handleSendMessage}>
                <i className="bx bxl-telegram" style={{ color: '#0091ff' }}></i>
            </div>
        </div>
    );
};

Input.propTypes = {};

export default Input;
