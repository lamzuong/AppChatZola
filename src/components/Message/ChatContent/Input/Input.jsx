import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Input = (props) => {
    const [chatContent, setChatContent] = useState('');

    const handleSendMessage = (e, chatContent) => {
        e.preventDefault();
        if (chatContent) {
            setChatContent('');
        }
    };

    return (
        <div className={cx('wrapper')} onSubmit={(e) => handleSendMessage(e, chatContent)}>
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
                    spellCheck="false"
                    value={chatContent}
                    onChange={(e) => setChatContent(e.target.value)}
                    type="text"
                    className={cx('input')}
                    placeholder="Message"
                />
            </form>
            <div className={cx('button')} onClick={() => alert('khkhk')}>
                <i className="bx bxl-telegram" style={{ color: '#0091ff' }}></i>
            </div>
        </div>
    );
};

Input.propTypes = {};

export default Input;
