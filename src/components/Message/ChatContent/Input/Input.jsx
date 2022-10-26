import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useState } from 'react';
import axiosCilent from '../../../../api/axiosClient';

const cx = classNames.bind(styles);

const Input = (props) => {
    const [chatContent, setChatContent] = useState('');
    const [rerender, setRerender] = useState(false);
    const [image, setImage] = useState(null);
    const handleSendMessage = async (e) => {
        const formData = new FormData();
        formData.append('img', image);
        formData.append('conversationID', props.params);
        formData.append('sender', props.user.id);
        formData.append('mess', chatContent ? chatContent : '');
        try {
            await axiosCilent.post('/zola/message', formData);
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
            <form className={cx('container')} enctype="multipart/form-data">
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
                                name="img"
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                onChange={(e) => setImage(e.target.files[0])}
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
