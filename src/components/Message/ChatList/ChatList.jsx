import React, { Fragment } from 'react';
import { useState, useRef, useEffect } from 'react';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ChatList.module.scss';
import axiosCilent from '../../../api/axiosClient';

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
    const [text, setText] = useState('');
    const [focus, setFocus] = useState(false);
    const inputRef = useRef();
    const handleCleanText = () => {
        setText('');
        inputRef.current.focus();
    };

    const mess = props.data;
    const active = conversation.findIndex((e) => e.id === path);
    const [result, setResultSearch] = useState([]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {/* <Header /> */}
                <div className={cx('wrapper-header')}>
                    <div className={cx('container')}>
                        <div className={cx('search')}>
                            <div className={cx('btnSearch')}>
                                <i className="bx bx-search"></i>
                            </div>
                            <input
                                ref={inputRef}
                                value={text}
                                spellCheck={false}
                                placeholder="Tìm kiếm"
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                                onFocus={() => setFocus(true)}
                            />
                            {text && (
                                <div className={cx('btnCleanText')} onClick={handleCleanText}>
                                    <FontAwesomeIcon icon={faXmarkCircle} />
                                </div>
                            )}
                        </div>
                        <div className={cx('btnClose')} onClick={() => setFocus(false)}>
                            Đóng
                        </div>
                    </div>
                </div>
            </div>
            {focus ? (
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
            ) : (
                <Fragment>
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
                </Fragment>
            )}
            {/* */}
        </div>
    );
};

ChatList.propTypes = {};

export default ChatList;
