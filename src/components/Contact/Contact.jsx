import React, { Fragment, useEffect, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import style from './Contact.module.scss';
import AccountItem from '../AccountItem/AccountItem';
import { useState, useContext } from 'react';
import Input from '../Input/Input';
import Letter from './Letter/Letter';
import { AuthContext } from '../../context/AuthContext';
import axiosCilent from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
const socket = io.connect('http://localhost:8000', { transports: ['websocket'] });

const cx = classNames.bind(style);

const category = [
    {
        id: 1,
        display: <i className="bx bxs-user-plus" style={{ color: 'rgba(255,255,255)' }}></i>,
        content: 'Danh sách bạn bè',
    },
    {
        id: 2,
        display: <i className="bx bxs-group" style={{ color: 'rgba(255,255,255)' }}></i>,
        content: 'Danh sách nhóm',
    },
];

const Contact = (props) => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(1);
    const [rerender, setRerender] = useState(false);
    Modal.setAppElement('#root');
    const [currentUser, setCurrentUser] = useState(user);
    const [listMem, setListMem] = useState([]);
    const [listGroup, setListGroup] = useState([]);
    const [showOption, setShowOption] = useState(false);

    useEffect(() => {
        socket.off('server-send-request-friend');
        socket.on('server-send-request-friend', (data) => {
            if (data.userReceive == user.id) {
                setRerender(!rerender);
            }
        });
    });

    useEffect(() => {
        const renderUser = async () => {
            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
            setCurrentUser(res);
        };
        renderUser();
    }, [rerender]);

    let cbChild = (childData) => {
        setRerender(childData);
    };

    useEffect(() => {
        let listFriend = [];
        const getInfoFriends = async () => {
            for (let i = 0; i < currentUser.friends.length; i++) {
                try {
                    let res = await axiosCilent.get('/zola/users/' + currentUser.friends[i]);
                    listFriend.push(res);
                    if (i === currentUser.friends.length - 1) {
                        setListMem([...listFriend]);
                        break;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getInfoFriends();
        let listGroup = [];
        const getConversation = async () => {
            try {
                const res = await axiosCilent.get('/zola/conversation/' + currentUser.id);
                for (let i = 0; i < res.length; i++) {
                    if (res[i].group) {
                        listGroup.push(res[i]);
                    }
                }
                setListGroup([...listGroup]);
            } catch (error) {
                console.log(error);
            }
        };
        getConversation();
    }, [currentUser, rerender]);

    console.log(listMem);
    const handleDelFriend = async (u) => {
        await axiosCilent.put('/zola/users/deleteFriend', {
            userId: user.id,
            friendId: u.id,
            friends: user.friends,
        });
        setRerender(!rerender);
        socket.emit('request-friend', {
            userReceive: u.id,
        });
    };

    const handleChat = async (u) => {
        try {
            const res = await axiosCilent.get(`zola/conversation/conversationId/${user.id}/${u.id}`);
            navigate(`/t/${res.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <h2 style={{ marginLeft: '30px', marginTop: '10px' }}>Liên lạc</h2>
                <ul className={cx('category')}>
                    {category.map((e, i) => (
                        <li key={i} className={cx(activeId === e.id ? 'active' : '')} onClick={() => setActiveId(e.id)}>
                            <div className={cx('icon')}>{e.display}</div>
                            <h4>{e.content}</h4>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('content')}>
                <ul className={cx('header')}>
                    {category.map(
                        (e, i) =>
                            activeId === e.id && (
                                <li key={i}>
                                    <div className={cx('icon')}>{e.display}</div>
                                    <h4>{e.content}</h4>
                                </li>
                            ),
                    )}
                </ul>
                <div className={cx('list')}>
                    {activeId === 1
                        ? listMem.map((u, i) => (
                              <div className={cx('item-friend')}>
                                  <AccountItem
                                      key={i}
                                      id={u.id}
                                      ava={u.img}
                                      name={u.fullName}
                                      none
                                      handleDelFriend={handleDelFriend}
                                      handleChat={handleChat}
                                      u={u}
                                      tippy
                                  />
                                  {/* <div className={cx('btn')}>
                                      <Tippy
                                          placement="right-end"
                                          visible={showOption}
                                          interactive={true}
                                          render={(attrs) => (
                                              <ul className={cx('wrapper-more')} tabIndex="-1" {...attrs}>
                                                  <li>Nhắn tin</li>
                                                  <li>Xóa</li>
                                              </ul>
                                          )}
                                      >
                                          <div onClick={() => setShowOption(!showOption)}>
                                              <FontAwesomeIcon
                                                  icon={faEllipsisVertical}
                                                  className={cx('icon-more')}
                                                  style={{
                                                      color: '#ccc',
                                                      fontSize: '25',
                                                      margin: '0 10',
                                                      cursor: 'pointer',
                                                  }}
                                              />
                                          </div>
                                      </Tippy>
                                  </div> */}
                                  {/* <button className={cx('btn-del')} onClick={() => handleDelFriend(u)}>
                                          Xóa
                                      </button>
                                      <button className={cx('btn-mess')} onClick={() => handleChat(u)}>
                                          Nhắn tin
                                      </button> */}
                              </div>
                          ))
                        : listGroup.map((u, i) => (
                              <AccountItem key={i} id={u.id} ava={u.avatarGroup} name={u.groupName} />
                          ))}
                </div>
            </div>
            <div className={cx('box-3')}>
                <div className={cx('header-3')}>
                    <div className={cx('icon')}>
                        <i className="bx bxs-user-plus" style={{ color: 'rgba(255,255,255)' }}></i>
                    </div>
                    <h4>Danh sách kết bạn</h4>
                </div>
                <div className={cx('body-3')}>
                    {user.listReceiver.map((id) => {
                        return <Letter key={id} id={id} parentCb={cbChild} />;
                    })}
                </div>
            </div>
        </div>
    );
};

Contact.propTypes = {};

export default Contact;
