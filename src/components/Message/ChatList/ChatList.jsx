import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import axiosCilent from '../../../api/axiosClient';
import styles from './ChatList.module.scss';
import AccountItem from '../../AccountItem/AccountItem';
import { faChevronLeft, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Conversation from './Conversation';
import Input from '../../Input/Input';
import UserItemSearch from './UserItemSearch/UserItemSerach';
import InfoDetailUser from './InfoDetailUser/InfoDetailUser';

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
    const [text, setText] = useState('');
    const inputRef = useRef();
    const [foc, setFoc] = useState(false);
    const [resultSearch, setResultSearch] = useState([]);
    const [name, setName] = useState('');
    const [clickUser, setClickUser] = useState(false);
    const [userChoosed, setUserChoosed] = useState({});
    const customStyles = {
        content: {
            padding: '0',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setUserChoosed({});
        setClickUser(false);
    };
    const handleCleanText = () => {
        setText('');
        inputRef.current.focus();
    };
    const handleTranferList = () => {
        setFoc(true);
    };
    const handleClose = () => {
        setFoc(false);
        setText('');
    };
    const handleChooseUser = (user) => {
        setUserChoosed(user);
        setClickUser(true);
    };
    useEffect(() => {
        const search = async () => {
            if (name.length === 0) {
                setResultSearch([]);
            }
            const res = await axiosCilent.get(`/zola/users/search/` + name);
            setResultSearch([...res]);
        };
        search();
    }, [name]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('wrapper-h')}>
                    <div className={cx('container-h')}>
                        <div className={cx('search-h')}>
                            <div className={cx('btnSearch-h')}>
                                <i className="bx bx-search-h"></i>
                            </div>
                            <input
                                ref={inputRef}
                                value={text}
                                spellCheck={false}
                                placeholder="Tìm kiếm"
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                                onFocus={handleTranferList}
                            />
                            {text && (
                                <div className={cx('btnCleanText-h')} onClick={handleCleanText}>
                                    <FontAwesomeIcon icon={faXmarkCircle} />
                                </div>
                            )}
                        </div>
                        {foc ? (
                            <div className={cx('btnClose-h')} onClick={handleClose}>
                                Đóng
                            </div>
                        ) : (
                            <div className={cx('add-wrapper')}>
                                <i
                                    className="bx bxs-user-plus"
                                    style={{ fontSize: 30, cursor: 'pointer' }}
                                    onClick={openModal}
                                ></i>
                                <Modal
                                    isOpen={modalIsOpen}
                                    style={customStyles}
                                    onRequestClose={closeModal}
                                    ariaHideApp={false}
                                >
                                    {clickUser ? (
                                        <div className={cx('wrapper-md')}>
                                            <div className={cx('header-md')}>
                                                <FontAwesomeIcon
                                                    icon={faChevronLeft}
                                                    className={cx('close-md')}
                                                    onClick={closeModal}
                                                />
                                                <span className={cx('title')}>Thông tin tài khoản</span>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className={cx('close-md')}
                                                    onClick={closeModal}
                                                />
                                            </div>
                                            <div className={cx('search-wrapper-md')}>
                                                <InfoDetailUser
                                                    ava={userChoosed.img}
                                                    name={userChoosed.fullName}
                                                    id={userChoosed.id}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={cx('wrapper-md')}>
                                            <div className={cx('header-md')}>
                                                <span className={cx('title')}>Thêm bạn</span>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className={cx('close-md')}
                                                    onClick={closeModal}
                                                />
                                            </div>
                                            <div className={cx('search-wrapper-md')}>
                                                <Input
                                                    type="text"
                                                    placeholder="Nhập tên cần tìm"
                                                    icon={<i className="bx bxs-user-plus"></i>}
                                                    data={setName}
                                                />
                                            </div>
                                            <div className={cx('result-search-md')}>
                                                <span>Kết quả tìm kiếm</span>
                                                {resultSearch.length > 0 ? (
                                                    <div className={cx('result-md')}>
                                                        {resultSearch.map((user) => {
                                                            return (
                                                                <div
                                                                    onClick={handleChooseUser.bind(null, user)}
                                                                    key={user.id}
                                                                >
                                                                    <UserItemSearch
                                                                        onClick={(user) => handleChooseUser(user)}
                                                                        name={user.fullName}
                                                                        ava={user.img}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Modal>
                                <i
                                    className="bx bxs-group"
                                    style={{ fontSize: 30, cursor: 'pointer', marginLeft: 8 }}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {foc ? (
                <div>Tìm kiếm</div>
            ) : (
                <>
                    <div className={cx('userOnl')}>
                        {mess.map((e, i) => (
                            <AccountItem key={i} none={true} id={e.id} ava={e.ava} />
                        ))}
                    </div>
                    <ul className={cx('chatList')}>
                        {conversation.map((e, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    sendData(e);
                                    navigate(`/t/${e.id}`);
                                }}
                            >
                                <li key={i} className={cx(i === active ? 'active' : '')}>
                                    <Conversation
                                        key={e.id}
                                        id={e.id}
                                        rerender={props.rerender}
                                        conversation={e}
                                        currentUser={user}
                                    />
                                </li>
                            </div>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

ChatList.propTypes = {};

export default ChatList;
