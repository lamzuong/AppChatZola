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
import useDebounce from '../../../Hooks/useDebounce';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:8000', { transports: ['websocket'] });

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
    const [nameSearch, setNameSearch] = useState('');
    const [clickUser, setClickUser] = useState(false);
    const [userChoosed, setUserChoosed] = useState({});
    const [listFriendInfo, setListFriendInfo] = useState([]);
    const [listFriendInfo2, setListFriendInfo2] = useState([]);
    const [listAddedInfo, setListAddInfo] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenGroup, setModalIsOpenGroup] = useState(false);
    const [checked, setChecked] = useState([]);
    const [listUerAdded, setListUserAdded] = useState([]);
    const [listPeople, setListPeople] = useState([]);
    const [listGroup, setListGroup] = useState([]);

    // const sendData = (data) => {
    //     props.parentCb(data);
    // };

    // useEffect(() => {
    //     let e = props.conversation.filter((c) => c.id === currentChat?.id)[0];
    //     sendData(e);
    // }, [props.conversation]);

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
    const debounced = useDebounce(text, 800);

    useEffect(() => {
        if (!debounced.trim()) {
            setListPeople([]);
            setListGroup([]);
            return;
        }
        const handleSearch = async () => {
            try {
                const res = await axiosCilent.get(`/zola/users/search/${debounced}`);
                let listNoFriend = [];
                for (let i = 0; i < res.length; i++) {
                    res[i].id !== user.id && listNoFriend.push(res[i]);
                }
                setListPeople(listNoFriend);
                const res2 = await axiosCilent.get(`/zola/conversation/search/group/${user.id}/${debounced}`);
                setListGroup(res2);
            } catch (error) {
                console.log(error);
            }
        };
        handleSearch();
    }, [debounced]);

    const handleChat = async () => {
        try {
            const res = await axiosCilent.get(`zola/conversation/conversationId/${user.id}/${userChoosed.id}`);
            // sendData(res);
            navigate(`/t/${res.id}`);
            setFoc(false);
            setText('');
            closeModal();
        } catch (error) {
            console.log(error);
        }
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
            socket.emit('send-to-addGroup', {
                idAdd: listUerAdded,
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

    const debouncedUser = useDebounce(name, 800);
    useEffect(() => {
        if (!debouncedUser.trim()) {
            setResultSearch([]);
            return;
        }
        const search = async () => {
            const res = await axiosCilent.get(`/zola/users/search/` + debouncedUser);
            let temp = [...res];
            let list = temp.filter((u) => !user.friends.includes(u.id) && u.id !== user.id);
            setResultSearch([...res]);
        };
        search();
    }, [debouncedUser]);

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
        setListFriendInfo2([...listFriendInfo]);
    }, [modalIsOpenGroup]);
    useEffect(() => {
        getUsersInfo(listUerAdded, setListAddInfo);
    }, [listUerAdded.length]);

    useEffect(() => {
        const list = [];
        if (nameSearch === '') {
            setListFriendInfo2([...listFriendInfo]);
        } else {
            listFriendInfo.forEach((e) => {
                if (e.fullName.toLowerCase().includes(nameSearch.toLowerCase())) {
                    list.push(e);
                }
            });
            setListFriendInfo2([...list]);
        }
    }, [nameSearch]);
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
                                                    name.length > 0 && (
                                                        <div style={{ marginLeft: '12px' }}>
                                                            Không tìm thấy tên phù hợp
                                                        </div>
                                                    )
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
                                                    placeholder="Nhập tên"
                                                    icon={<i className="bx bxs-user-rectangle"></i>}
                                                    data={setNameSearch}
                                                />
                                            </div>
                                            <div className={cx('list-friend-group')}>
                                                <div className={cx('wrapper-friends')}>
                                                    <span style={{ marginBottom: 20, display: 'block' }}>
                                                        Danh sách bạn bè
                                                    </span>
                                                    <ul className={cx('friends')}>
                                                        {listFriendInfo2.length > 0
                                                            ? listFriendInfo2.map((user) => (
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
                                                              ))
                                                            : nameSearch.length > 0 && (
                                                                  <div style={{ marginLeft: '5px' }}>
                                                                      Không tìm thấy tên phù hợp
                                                                  </div>
                                                              )}
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
                <>
                    <span>Tìm kiếm</span>
                    <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal} ariaHideApp={false}>
                        {clickUser && (
                            <div className={cx('wrapper-md')}>
                                <div className={cx('header-md')}>
                                    <FontAwesomeIcon
                                        icon={faChevronLeft}
                                        className={cx('close-md')}
                                        onClick={closeModal}
                                    />
                                    <span className={cx('title')}>Thông tin tài khoản</span>
                                    <FontAwesomeIcon icon={faXmark} className={cx('close-md')} onClick={closeModal} />
                                </div>
                                <div className={cx('search-wrapper-md')}>
                                    <InfoDetailUser
                                        ava={userChoosed.img}
                                        name={userChoosed.fullName}
                                        id={userChoosed.id}
                                        onclick={handleChat}
                                    />
                                </div>
                            </div>
                        )}
                    </Modal>
                    <div className={cx('listSearch')}>
                        {listPeople.length > 0 && (
                            <>
                                <div style={{ marginLeft: '20px', fontWeight: 'bold', color: 'grey' }}>Mọi người</div>
                                <ul className={cx('listPerson')}>
                                    {listPeople.map((user) => (
                                        <li
                                            onClick={() => {
                                                handleChooseUser(user);
                                                openModal();
                                            }}
                                        >
                                            <UserItemSearch name={user.fullName} ava={user.img} />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {listGroup.length > 0 && (
                            <>
                                <div style={{ marginLeft: '20px', fontWeight: 'bold', color: 'grey' }}>Nhóm</div>
                                <ul className={cx('listPerson')}>
                                    {listGroup.map((group) => (
                                        <li
                                            onClick={() => {
                                                // sendData(group);
                                                navigate(`/t/${group.id}`);
                                                handleClose();
                                            }}
                                        >
                                            <AccountItem
                                                id={group.id}
                                                key={group.id}
                                                ava={group.avatarGroup}
                                                name={group.groupName}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {text !== '' && listPeople.length === 0 && listGroup.length === 0 && (
                            <div style={{ marginLeft: '25px' }}>Không tìm thấy kết quả phù hợp</div>
                        )}
                    </div>
                </>
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
                                    // sendData(e);
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
