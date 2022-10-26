import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import ChatList from './ChatList/ChatList';
import ChatDetails from './ChatDetails/ChatDetails';
import styles from './Message.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import axiosCilent from '../../api/axiosClient';
import MessUser from './ChatContent/Mess/MessUser';
import Input from './ChatContent/Input/Input';
import noAvatar from '../../assets/noAvatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHand } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const mess = [
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
    {
        id: '11',
        ava: 'https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg',
        name: 'Nam',
        message: 'dcm',
    },
    {
        id: '12',
        ava: 'https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg',
        name: 'Phuc',
        message: 'dcm',
    },
    {
        id: '13',
        ava: 'https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg',
        name: 'Nguyen',
        message: 'dcm',
    },
    {
        id: '14',
        ava: 'https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg',
        name: 'Quoc',
        message: 'dcm',
    },
    {
        id: '15',
        ava: 'https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg',
        name: 'Vuong',
        message: 'dcm',
    },
];
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
const Message = (props) => {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [rerender, setRerender] = useState(null);
    const [message, setMessage] = useState([]);
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();
    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await axiosCilent.get('/zola/conversation/' + user.id);
                setConversation(res);
            } catch (error) {
                console.log(error);
            }
        };
        getConversation();
    }, [user.id]);

    let cbChild = (childData) => {
        setCurrentChat(childData);
    };

    let cbChild1 = (childData) => {
        setRerender(childData);
    };

    useEffect(() => {
        const getMess = async () => {
            try {
                const res = await axiosCilent.get('/zola/message/' + props.params);
                setMessage(res);
            } catch (error) {
                console.log(error);
            }
        };
        getMess();
    }, [props.params, rerender]);
    message.sort((a, b) => a.date - b.date);

    const [userChat, setUserChat] = useState(null);
    useEffect(() => {
        const friendID = currentChat?.members.find((m) => m !== user.id);
        const getInfoFriends = async () => {
            try {
                const res = await axiosCilent.get('/zola/users/' + friendID);
                setUserChat(res);
            } catch (error) {
                console.log(error);
            }
        };
        if (currentChat) {
            getInfoFriends();
        }
    }, [currentChat, user.id]);
    let img = '';
    let name = '';
    if (currentChat?.members.length > 2) {
        img = currentChat.avatarGroup;
        name = currentChat.groupName;
    } else {
        img = userChat?.img ? userChat.img : noAvatar;
        name = userChat?.fullName;
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);
    return (
        <div className={cx('wrapper')}>
            <ChatList data={mess} conversation={conversation} rerender={rerender} parentCb={cbChild} />
            <div className={cx('chatWrapper')}>
                {currentChat ? (
                    <>
                        {/* chatHeader */}
                        <div className={cx('headermessWrapper')}>
                            <div className={cx('headermessInfo')}>
                                <div className={cx('headermessAvatar')}>
                                    <img src={img} alt="" />
                                </div>
                                <div className={cx('headermessName')}>{name}</div>
                            </div>
                            <div className={cx('headermessNav')}>
                                <i className="bx bxs-phone"></i>
                                <i className="bx bxs-video"></i>
                            </div>
                        </div>
                        {/* chatContent */}
                        <div className={cx('chatBox')}>
                            {message.map((m) => (
                                <div key={m.id} ref={scrollRef}>
                                    <MessUser
                                        own={m.sender === user.id}
                                        mess={m}
                                        sender={m.infoSender}
                                        group={currentChat.members.length > 2}
                                    />
                                </div>
                            ))}
                        </div>
                        <Input user={user} params={props.params} parentCb={cbChild1} />
                    </>
                ) : (
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: '30%', color: '#646e74' }}>
                        Chọn người bạn muốn chat!
                    </h1>
                )}
            </div>
            {currentChat ? <ChatDetails img={img} name={name} currentChat={currentChat} /> : null}
            <Modal isOpen={false} style={customStyles} ariaHideApp={false}>
                <div className={cx('wrapper-modal')}>
                    <div className={cx('header-modal')}>
                        Chào mừng bạn đến với <span style={{ color: '#0190f3' }}>Zola</span> hãy cập nhật đầy đủ thông
                        tin
                    </div>
                    <div className={cx('body-modal')}>
                        <div className={cx('avatar-w')} for="upload-photo">
                            <div className={cx('avatar')}>
                                <FontAwesomeIcon
                                    icon={faCamera}
                                    className={cx('icon-loading')}
                                    style={{ color: '#888', fontSize: '25' }}
                                />
                                <img
                                    src="https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg"
                                    alt=""
                                    for="upload-photo"
                                />
                            </div>
                        </div>

                        <input type="file" id="upload-photo" style={{ display: 'none' }} />
                    </div>
                    <button className={cx('btn-confirm-mail')}>Xác nhận</button>
                </div>
            </Modal>
        </div>
    );
};

Message.propTypes = {};

export default Message;
