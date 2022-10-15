import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';
import HeaderMess from './HeaderMess/HeaderMess';
import MessUser from './Mess/MessUser';
import Input from './Input/Input';
import { useEffect } from 'react';
import { useState } from 'react';

const cx = classNames.bind(styles);

const ChatContent = (props) => {
    const mess = props.data;
    const [message, setMessage] = useState([]);
    useEffect(() => {
        setMessage(mess);
    }, [mess]);
    console.log(message);
    return (
        <div className={cx('wrapper')}>
            {props.currentChat ? (
                <>
                    <HeaderMess currentUser={props.user} currentChat={props.currentChat} />
                    <div className={cx('chatBox')}>
                        {mess.map((m) => (
                            <MessUser own={m.senderID === props.user.id} mess={m} user={props.user} />
                        ))}
                    </div>
                    <Input user={props.user} currentChat={props.currentChat} />
                </>
            ) : (
                <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: '30%', color: '#646e74' }}>
                    Chọn người bạn muốn chat!
                </h1>
            )}
        </div>
    );
};

ChatContent.propTypes = {};

export default ChatContent;
