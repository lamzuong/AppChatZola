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
import UserItemSearchGroup from './UserItemSearchGroup/UserItemSearchGroup';
import UserItemAdded from './UserItemAdded/UserItemAdded';

const cx = classNames.bind(styles);

const ChatList = (props) => {
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
    const { pathname } = useLocation();
    const path = pathname.slice(3, pathname.length);
    const conversation = props.conversation;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const mess = props.data;
    const active = conversation.findIndex((e) => e.id === path);
    const [rerender, setRerender] = useState(false);
    const [text, setText] = useState('');
    const inputRef = useRef();
    const [foc, setFoc] = useState(false);
    const [resultSearch, setResultSearch] = useState([]);
    const [name, setName] = useState('');
    const [clickUser, setClickUser] = useState(false);
    const [userChoosed, setUserChoosed] = useState({});
    const [listFriendInfo, setListFriendInfo] = useState([]);
    const [listAddedInfo, setListAddInfo] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenGroup, setModalIsOpenGroup] = useState(false);
    const [checked, setChecked] = useState([]);
    const [listUerAdded, setListUserAdded] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    const sendData = (data) => {
        props.parentCb(data);
    };

    useEffect(() => {
        let e = props.conversation.filter((c) => c.id === currentChat?.id)[0];
        sendData(e);
    }, [props.conversation]);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setUserChoosed({});
        setClickUser(false);
    };
    const openModalGroup = () => {
        setChecked([]);
        setListUserAdded([]);
        setModalIsOpenGroup(true);
    };

    const closeModalGroup = () => {
        setModalIsOpenGroup(false);
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

    const haddleCreateGroup = async () => {
        listAddedInfo.unshift(user);
        const listTemp = listAddedInfo.slice(0, 3);
        let groupname = [];
        for (let i = 0; i < listTemp.length; i++) {
            groupname.push(listTemp[i].fullName.split(' ').slice(-1)[0]);
        }
        try {
            await axiosCilent.post('zola/conversation/', {
                members: [...listUerAdded, user.id],
                nameGroup: groupname.toString(),
                id: user.id,
            });
            setModalIsOpenGroup(false);
            setRerender(!rerender);
            sendData1(rerender);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    const sendData1 = (data) => {
        props.parentCb1(data);
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
    const getUsersInfo = async (user, func) => {
        let listTemp = [];
        for (let i = 0; i < user.length; i++) {
            const res = await axiosCilent.get(`/zola/users/` + user[i]);
            listTemp.push(res);
        }
        func([...listTemp]);
    };
    useEffect(() => {
        getUsersInfo(user.friends, setListFriendInfo);
    }, [modalIsOpenGroup]);
    useEffect(() => {
        getUsersInfo(listUerAdded, setListAddInfo);
    }, [listUerAdded.length]);
    const handleCheck = (id) => {
        setChecked((prev) => {
            const isChecked = checked.includes(id);
            if (isChecked) {
                setListUserAdded([...checked.filter((item) => item !== id)]);
                return checked.filter((item) => item !== id);
            } else {
                setListUserAdded([...prev, id]);
                return [...prev, id];
            }
        });
    };

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
                                    onClick={openModalGroup}
                                ></i>
                                <Modal isOpen={modalIsOpenGroup} style={customStyles} onRequestClose={closeModalGroup}>
                                    <div className={cx('wrapper-modal-group')}>
                                        <div className={cx('header-modal-group')}>
                                            <span className={cx('title-group')}>Tạo nhóm</span>
                                            <div className={cx('icon-exit-group')} onClick={closeModalGroup}>
                                                <i class="bx bx-x"></i>
                                            </div>
                                        </div>
                                        <div className={cx('body-modal-group')}>
                                            <div className={cx('add-member-group')}>
                                                <label>Thêm bạn vào nhóm:</label>
                                                <Input
                                                    type="text"
                                                    placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại"
                                                    icon={<i class="bx bxs-envelope"></i>}
                                                />
                                            </div>
                                            <div className={cx('list-friend-group')}>
                                                <div className={cx('wrapper-friends')}>
                                                    <span style={{ marginBottom: 20, display: 'block' }}>
                                                        Danh sách bạn bè
                                                    </span>
                                                    <ul className={cx('friends')}>
                                                        {listFriendInfo.map((user) => (
                                                            <li
                                                                key={user.id}
                                                                style={{ display: 'flex' }}
                                                                className={cx('item-user-group')}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checked.includes(user.id)}
                                                                    onChange={(e) => handleCheck(user.id)}
                                                                />
                                                                <UserItemSearchGroup
                                                                    name={user.fullName}
                                                                    ava={user.img}
                                                                    onClick={() => handleCheck(user.id)}
                                                                />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {listUerAdded.length > 0 && (
                                                    <div className={cx('list-user-added-w')}>
                                                        <span
                                                            style={{
                                                                display: 'block',
                                                                color: '#000',
                                                                fontSize: '14px',
                                                                width: '100%',
                                                                textAlign: 'center',
                                                                marginTop: '5px',
                                                            }}
                                                        >
                                                            Danh sách nhóm
                                                        </span>
                                                        <ul className={cx('list-user-added')}>
                                                            {listAddedInfo.length > 0 &&
                                                                listAddedInfo.map((user) => (
                                                                    <UserItemAdded
                                                                        name={user.fullName}
                                                                        ava={user.img}
                                                                    />
                                                                ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={cx('footer-modal-group')}>
                                            <div style={{ marginRight: 10 }}>
                                                <button className={cx('btn-cancel-group')}>Hủy</button>
                                                <button className={cx('btn-confirm-group')} onClick={haddleCreateGroup}>
                                                    Tạo nhóm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
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
                                key={e.id}
                                onClick={() => {
                                    setCurrentChat(e);
                                    sendData(e);
                                    navigate(`/t/${e.id}`);
                                }}
                            >
                                <li key={e.id} className={cx(i === active ? 'active' : '')}>
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
