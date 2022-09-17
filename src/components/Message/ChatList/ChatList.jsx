import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import Header from './Header/Header';
import AccountItem from '../../AccountItem/AccountItem';

const cx = classNames.bind(styles);

const ChatList = (props) => {
    const mess = props.data;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('userOnl')}>
                {mess.map((e, i) => (
                    <AccountItem key={i} none={true} id={e.id} ava={e.ava} />
                ))}
            </div>
            <div className={cx('chatList')}>
                {mess.map((e, i) => (
                    <AccountItem key={i} id={e.id} ava={e.ava} name={e.name} mess={e.message} />
                ))}
            </div>
        </div>
    );
};

ChatList.propTypes = {};

export default ChatList;
