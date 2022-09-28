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
    const [messContent, setMessContent] = useState({});
    const mess = props.data;
    const param = props.param;
    useEffect(() => {
        const rs = mess.find((e) => e.id === param);
        setMessContent(rs);
    }, [param]);
    return (
        <div className={cx('wrapper')}>
            {messContent ? (
                <>
                    <HeaderMess ava={messContent.ava} name={messContent.name} />
                    <div className={cx('chatBox')}>
                        <MessUser ava={messContent.ava} />
                        <MessUser own={true} />
                        <MessUser ava={messContent.ava} />
                        <MessUser own={true} />
                        <MessUser own={true} />
                        <MessUser ava={messContent.ava} />
                        <MessUser ava={messContent.ava} />
                    </div>
                    <Input />
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
