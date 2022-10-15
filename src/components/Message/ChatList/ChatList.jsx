import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import Header from './Header/Header';
import AccountItem from '../../AccountItem/AccountItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Conversation from './Conversation';

const cx = classNames.bind(styles);

const ChatList = (props) => {
    const { pathname } = useLocation();
    const path = pathname.slice(3, pathname.length);
    const conversation = props.conversation;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const sendData = (data) => {
        props.parentCb(data);
    };
    const mess = props.data;
    const active = conversation.findIndex((e) => e.id === path);
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
            <ul className={cx('chatList')}>
                {conversation.map((e, i) => (
                    <div
                        onClick={() => {
                            sendData(e);
                            navigate(`/t/${e.id}`);
                        }}
                    >
                        <li key={i} className={cx(i === active ? 'active' : '')}>
                            <Conversation key={i} id={e.id} conversation={e} currentUser={user} />
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

ChatList.propTypes = {};

export default ChatList;
