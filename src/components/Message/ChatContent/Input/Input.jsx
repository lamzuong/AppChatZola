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
    const handleSendMessage = async (e) => {
        const message = {
            conversationID: props.params,
            sender: props.user.id,
            mess: chatContent,
        };
        try {
            await axiosCilent.post('/zola/message', message);
            setChatContent('');
            setRerender(!rerender);
            sendData(rerender);
        } catch (err) {
            console.log(err);
        }
    };
    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         console.log(event);
    //     }
    // };
    const sendData = (data) => {
        props.parentCb(data);
    };
    return (
        <div className={cx('wrapper')}>
            <form className={cx('container')}>
                <div className={cx('chatContent')}>
                    {!chatContent && (
                        <>
                            <i className="bx bx-paperclip"></i>
                            <i className="bx bxs-image"></i>
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
                    onKeyPress={(event) => {
                        if (event.key === 'enter') {
                            console.log(event.key);
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
