import React from 'react';

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
import Modal from 'react-modal';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophone,
    faMicrophoneSlash,
    faPhoneSlash,
    faVideo,
    faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';

const socket = io.connect('http://localhost:8000', { transports: ['websocket'] });

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
        width: '100%',
        backgroundColor: '#3e4041',
        height: '100vh',
        padding: '0',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100',
    },
};
const Message = (props) => {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [rerender, setRerender] = useState(null);
    const [modalVideoOpen, setModalVideoOpen] = useState(false);
    const [message, setMessage] = useState([]);
    const { user } = useContext(AuthContext);

    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [nameVideo, setNameVideo] = useState('');
    const myVideo = useRef();
    const friendVideo = useRef();
    const connectionRef = useRef();

    const navigate = useNavigate();
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
    }, [user.id, rerender]);

    const openModalVideo = () => {
        setModalVideoOpen(true);
    };

    const closeModelVideo = () => {
        setModalVideoOpen(false);
    };

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
    }, [message, rerender]);

    useEffect(() => {
        socket.off();
        socket.on('server-send-to-client', (data) => {
            let conversationIDChat;
            try {
                conversationIDChat = currentChat.id;
                if (data.conversationID === conversationIDChat) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.on('server-remove-to-client', (data) => {
            let conversationIDChat;
            try {
                conversationIDChat = currentChat.id;
                if (data.conversationID === conversationIDChat) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.on('server-send-to-out', (data) => {
            try {
                if (data.idDelete == user.id || data.conversationID === currentChat.id) {
                    setRerender(!rerender);
                    if (data.idDelete == user.id) {
                        if (data.conversationID === currentChat.id) {
                            navigate('/');
                            setRerender(!rerender);
                        }
                        alert(`Bạn bị kick khỏi nhóm ${data.nameGroup}`);
                        setRerender(!rerender);
                    }
                }
                setRerender(!rerender);
            } catch (error) {}
        });
        socket.on('server-send-to-addMem', (data) => {
            try {
                if (
                    data.idAdd.includes(user.id) ||
                    data.conversationID === currentChat.id ||
                    data.members.includes(user.id)
                ) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.on('server-send-to-addGroup', (data) => {
            try {
                if (data.idAdd.includes(user.id)) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.on('server-send-to-deleteGroup', (data) => {
            try {
                if (data.idDelete.includes(user.id) || data.conversationID === currentChat.id) {
                    setRerender(!rerender);
                    if (data.idDelete.includes(user.id)) {
                        setRerender(!rerender);
                        alert(`Nhóm ${data.groupName} đã bị giải tán.`);
                        if (data.conversationID === currentChat.id) {
                            navigate('/');
                            // setRerender(!rerender);
                        }
                    }
                }
            } catch (error) {}
        });
        socket.on('server-send-to-authorized', (data) => {
            try {
                if (data.members.includes(user.id) || data.conversationID === currentChat.id) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.on('server-send-to-edit', (data) => {
            try {
                if (data.members.includes(user.id)) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.on('callUser', (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setNameVideo(data.name);
            setCallerSignal(data.signal);
        });

        socket.on('callAccepted', (data) => {
            console.log(data);
            if (data.to === user.id) setCallAccepted(true);
        });
    });

    const callUser = () => {
        openModalVideo();
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            console.log(stream);
            setStream(stream);
            myVideo.current.srcObject = stream;
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream,
            });
            peer.on('signal', (data) => {
                socket.emit('callUser', {
                    userToCall: currentChat.id,
                    signalData: data,
                    from: user.id,
                    name: user.fullName,
                });
            });

            peer.on('stream', (stream) => {
                if (friendVideo.current) {
                    friendVideo.current.srcObject = stream;
                }
            });

            socket.on('callAccepted', (signal) => {
                console.log(signal);
                setCallAccepted(true);
                peer.signal(signal);
            });

            connectionRef.current = peer;
        });
    };

    const answerCall = () => {
        openModalVideo();
        setCallAccepted(true);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            console.log(stream);
            setStream(stream);
            myVideo.current.srcObject = stream;
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
            });
            peer.on('signal', (data) => {
                socket.emit('answerCall', { signal: data, to: caller });
            });
            peer.on('stream', (stream) => {
                friendVideo.current.srcObject = stream;
            });
            peer.signal(callerSignal);
            connectionRef.current = peer;
        });
    };

    const leaveCall = () => {
        closeModelVideo();
        setCallEnded(true);
        connectionRef.current.destroy();
    };

    // console.log(rerender);
    // console.log(currentChat);
    conversation.sort((a, b) => b.date - a.date);
    return (
        <div className={cx('wrapper')}>
            <ChatList
                data={mess}
                conversation={conversation}
                rerender={rerender}
                parentCb1={cbChild1}
                parentCb={cbChild}
            />
            <div className={cx('chatWrapper')}>
                {props.params ? (
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
                                <i className="bx bxs-video" onClick={callUser}></i>
                            </div>
                        </div>
                        {/* chatContent */}
                        <div className={cx('chatBox')}>
                            {message.map((m) => (
                                <div key={m.id} ref={scrollRef}>
                                    <MessUser
                                        own={m.sender === user.id}
                                        mess={m}
                                        user={user}
                                        sender={m.infoSender}
                                        conversation={conversation}
                                        group={currentChat?.members.length > 2}
                                    />
                                </div>
                            ))}
                        </div>
                        <Input
                            user={user}
                            params={currentChat}
                            parentCb={cbChild1}
                            group={currentChat?.members.length > 2}
                        />
                    </>
                ) : (
                    <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: '30%', color: '#646e74' }}>
                        Chọn người bạn muốn chat!
                    </h1>
                )}
            </div>
            {props.params ? <ChatDetails user={user} img={img} name={name} currentChat={currentChat} /> : null}
            <Modal isOpen={modalVideoOpen} style={customStyles} onRequestClose={closeModelVideo}>
                <div className={cx('videoCall-parent')}>
                    <div className={cx('friend-video')}>
                        {/* {callAccepted && !callEnded ? ( */}
                        <video className={cx('video-f')} autoPlay playsInline ref={friendVideo}></video>
                        {/* ) : (
                            null || <div>{nameVideo}</div>
                        )} */}
                    </div>
                    <div className={cx('my-video')}>
                        <video className={cx('video-m')} autoPlay playsInline ref={myVideo}></video>
                    </div>
                    <div className={cx('callVideo-footer')}>
                        <div className={cx('mic')}>
                            <FontAwesomeIcon icon={faMicrophone} style={{ color: '#ffffff' }} />
                            {/* <FontAwesomeIcon icon={faMicrophoneSlash} style={{ color: '#ffffff' }} /> */}
                        </div>
                        <div className={cx('cam')}>
                            <FontAwesomeIcon icon={faVideo} style={{ color: '#ffffff' }} />
                            {/* <FontAwesomeIcon icon={faVideoSlash} style={{ color: '#ffffff' }} /> */}
                        </div>
                        <div className={cx('end')} onClick={leaveCall}>
                            <FontAwesomeIcon icon={faPhoneSlash} style={{ color: '#ffffff' }} />
                        </div>
                    </div>
                </div>
            </Modal>
            <div className={cx('end')} onClick={answerCall}>
                <FontAwesomeIcon icon={faPhoneSlash} style={{ color: '#00000' }} />
            </div>
        </div>
    );
};

Message.propTypes = {};

export default Message;
