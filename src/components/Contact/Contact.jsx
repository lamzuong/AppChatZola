import React, { Fragment, useEffect, useLayoutEffect } from 'react';
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

const cx = classNames.bind(style);
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

const user1 = [
    {
        id: '1',
        ava: 'https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg',
        name: 'Hoang Phuc',
        message: 'gutboiz',
    },
    {
        id: '2',
        ava: 'https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg',
        name: 'Phuc Nguyen',
        message: 'facboi',
    },
    {
        id: '3',
        ava: 'https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg',
        name: 'Minh Vuong M4U',
        message: 'ka xy',
    },
    {
        id: '4',
        ava: 'https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg',
        name: 'Nam Zuong',
        message: 'mo i lo ep',
    },
    {
        id: '5',
        ava: 'https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg',
        name: 'Ban Nuoc',
        message: 'Ziet Cong',
    },
    {
        id: '6',
        ava: 'https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg',
        name: 'Nam',
        message: 'dcm',
    },
    {
        id: '7',
        ava: 'https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg',
        name: 'Phuc',
        message: 'dcm',
    },
    {
        id: '8',
        ava: 'https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg',
        name: 'Nguyen',
        message: 'dcm',
    },
    {
        id: '9',
        ava: 'https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg',
        name: 'Quoc',
        message: 'dcm',
    },
    {
        id: '10',
        ava: 'https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg',
        name: 'Vuong',
        message: 'dcm',
    },
];

const group = [
    {
        id: 'a',
        ava: 'https://itviec.com/blog/wp-content/uploads/2015/07/javascript.png',
        name: 'JavaScript',
    },
    {
        id: 'b',
        ava: 'https://itviec.com/blog/wp-content/uploads/2015/07/python.jpg',
        name: 'Python',
    },
    {
        id: 'c',
        ava: 'https://ghouse.com.vn/wp-content/uploads/2019/07/ghouse-huongdan-c.jpg',
        name: 'C++',
    },
    {
        id: 'd',
        ava: 'https://itviec.com/blog/wp-content/uploads/2015/07/java.jpg',
        name: 'Java',
    },
    {
        id: 'e',
        ava: 'https://itviec.com/blog/wp-content/uploads/2015/07/php.png',
        name: 'PHP',
    },
];

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
    const [activeId, setActiveId] = useState(1);

    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [listMem, setListMem] = useState([]);
    const [listGroup, setListGroup] = useState([]);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const listUser = [];
    useLayoutEffect(() => {
        const getCurrentUser = async () => {
            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
        };
        getCurrentUser();
    }, []);

    useEffect(() => {
        let listFriend = [];
        const getInfoFriends = async () => {
            for (let i = 0; i < user.friends.length; i++) {
                try {
                    let res = await axiosCilent.get('/zola/users/' + user.friends[i]);
                    listFriend.push(res);
                    //console.log(listFriend);
                    if (i === user.friends.length - 1) {
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
                const res = await axiosCilent.get('/zola/conversation/' + user.id);
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
    }, []);

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
                    {category.map((e, i) =>
                        activeId === e.id ? (
                            <li key={i}>
                                <div className={cx('icon')}>{e.display}</div>
                                <h4>{e.content}</h4>
                                <div className={cx('group')} onClick={openModal}>
                                    <i className="bx bx-group"></i>
                                </div>
                                <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
                                    <div className={cx('wrapper-modal')}>
                                        <div className={cx('header-modal')}>
                                            <span className={cx('title')}>Tạo nhóm</span>
                                            <div className={cx('icon-exit')}>
                                                <i class="bx bx-x"></i>
                                            </div>
                                        </div>
                                        <div className={cx('body-modal')}>
                                            <div className={cx('create-group-name')}>
                                                <Input
                                                    type="text"
                                                    placeholder="Tên nhóm"
                                                    icon={<i class="bx bxs-envelope"></i>}
                                                />
                                            </div>
                                            <div className={cx('add-member')}>
                                                <label>Thêm bạn vào nhóm:</label>
                                                <Input
                                                    type="text"
                                                    placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại"
                                                    icon={<i class="bx bxs-envelope"></i>}
                                                />
                                            </div>
                                            <div className={cx('list-friend')}>
                                                <span style={{ marginBottom: 20, display: 'block' }}>
                                                    Danh sách bạn bè
                                                </span>

                                                {listMem.map((u, i) => {
                                                    return (
                                                        <div className={cx('item-choose-frend')}>
                                                            <input type="checkbox" name="" id="" />
                                                            <AccountItem key={i} id={u.id} ava={u.ava} name={u.name} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className={cx('footer-modal')}>
                                            <div style={{ marginRight: 10 }}>
                                                <button className={cx('btn-cancel')}>Hủy</button>
                                                <button className={cx('btn-confirm')}>Cập nhật</button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </li>
                        ) : (
                            ''
                        ),
                    )}
                </ul>
                <div className={cx('list')}>
                    {activeId === 1
                        ? listMem.map((u, i) => <AccountItem key={i} id={u.id} ava={u.img} name={u.fullName} />)
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
                        return <Letter key={id} id={id} listReceiver={currentUser.listReceiver} />;
                    })}
                </div>
            </div>
        </div>
    );
};

Contact.propTypes = {};

export default Contact;
