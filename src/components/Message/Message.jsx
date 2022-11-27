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
    faPhoneVolume,
    faVideo,
    faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';

import apiConfig from '../../api/apiConfig';
const socket = io.connect(apiConfig.baseUrl, { transports: ['websocket'] });

const cx = classNames.bind(styles);

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

const customStylesKick = {
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
    const [rerender, setRerender] = useState(false);
    const [modalVideoOpen, setModalVideoOpen] = useState(false);
    const [modalKickOpen, setModalKickOpen] = useState(false);
    const [message, setMessage] = useState([]);
    const { user } = useContext(AuthContext);

    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [userToCall, setUserToCall] = useState();
    const [callEnded, setCallEnded] = useState(false);
    const [nameVideo, setNameVideo] = useState('');
    const [nameKick, setNameKick] = useState('');
    const [modalGroupIsDelete, setModalGroupIsDelete] = useState(false);
    const [nameGroupIsDelete, setNameGroupIsDelete] = useState('');
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

    const openModalKick = () => {
        setModalKickOpen(true);
    };

    const closeModelKick = () => {
        setModalKickOpen(false);
    };

    // let cbChild = (childData) => {
    //     setCurrentChat(childData);
    // };

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

        const getCurrentChat = async () => {
            try {
                const res = await axiosCilent.get(`/zola/conversation/idCon/${props.params}`);
                setCurrentChat(res);
            } catch (error) {
                console.log(error);
            }
        };
        props.params !== undefined && getCurrentChat();
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
    if (currentChat?.group) {
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
        socket.off('server-send-to-client');
        socket.on('server-send-to-client', (data) => {
            let conversationIDChat;
            try {
                conversationIDChat = currentChat.id;
                if (
                    data.conversationID === conversationIDChat ||
                    data.senderId != user.id ||
                    data.senderId == user.id
                ) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.off('server-remove-to-client');
        socket.on('server-remove-to-client', (data) => {
            let conversationIDChat;
            try {
                conversationIDChat = currentChat.id;
                if (data.conversationID === conversationIDChat) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.off('server-send-to-out');
        socket.on('server-send-to-out', (data) => {
            try {
                if (data.idDelete == user.id || data.conversationID === currentChat.id) {
                    setRerender(!rerender);
                    if (data.idDelete == user.id) {
                        setNameKick(data.nameGroup);
                        openModalKick();
                        setRerender(!rerender);
                        if (data.conversationID === currentChat.id) {
                            navigate('/');
                            setRerender(!rerender);
                        }
                    }
                }
                setRerender(!rerender);
            } catch (error) {}
        });
        socket.off('server-send-to-addMem');
        socket.on('server-send-to-addMem', (data) => {
            try {
                if (data.idAdd.includes(user.id) || data.conversationID === currentChat.id) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.off('server-send-to-addGroup');
        socket.on('server-send-to-addGroup', (data) => {
            try {
                if (data.idAdd.includes(user.id)) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.off('server-send-to-deleteGroup');
        socket.on('server-send-to-deleteGroup', (data) => {
            try {
                if (data.idDelete.includes(user.id) || data.conversationID === currentChat.id) {
                    setRerender(!rerender);
                    if (data.idDelete.includes(user.id)) {
                        setRerender(!rerender);
                        setNameGroupIsDelete(data.groupName);
                        setModalGroupIsDelete(true);
                        if (data.conversationID === currentChat.id) {
                            navigate('/');
                            // setRerender(!rerender);
                        }
                    }
                }
            } catch (error) {}
        });
        socket.off('server-send-to-authorized');
        socket.on('server-send-to-authorized', (data) => {
            try {
                if (data.members.includes(user.id) || data.conversationID === currentChat.id) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.off('server-send-to-edit');
        socket.on('server-send-to-edit', (data) => {
            try {
                if (data.members.includes(user.id)) {
                    setRerender(!rerender);
                }
            } catch (error) {}
        });
        socket.off('callUser');
        socket.on('callUser', (data) => {
            if (data.userToCall.members.includes(user.id)) {
                setReceivingCall(true);
                setUserToCall(data.userToCall);
                setCaller(data.from);
                setNameVideo(data.name);
                setCallerSignal(data.signalData);
                openModalVideo();
            }
        });

        socket.off('leaveCall');
        socket.on('leaveCall', (data) => {
            if (data.userToCall.members.includes(user.id)) {
                closeModelVideo();
                setCallAccepted(false);
                setCallEnded(true);
            }
        });
    });

    const callUser = () => {
        openModalVideo();
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream,
            });
            peer.on('signal', (data) => {
                socket.emit('callUser', {
                    userToCall: currentChat,
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

            socket.off('callAccepted');
            socket.on('callAccepted', (data) => {
                setCallAccepted(true);
                setCallEnded(false);
                peer.signal(data.signal);
            });

            connectionRef.current = peer;
        });
    };

    const answerCall = () => {
        openModalVideo();
        setCallAccepted(true);
        setCallEnded(false);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
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

    const denyCall = () => {
        closeModelVideo();
        setCallAccepted(false);
        setCallEnded(true);
        socket.off('leaveCall');
        socket.emit('leaveCall', {
            userToCall: userToCall,
        });
        connectionRef.current.destroy();
    };

    const leaveCall = () => {
        closeModelVideo();
        setCallAccepted(false);
        setCallEnded(true);
        socket.off('leaveCall');
        socket.emit('leaveCall', {
            userToCall: userToCall,
        });
        connectionRef.current.destroy();
    };

    // console.log(rerender);
    // console.log(currentChat);
    conversation.sort((a, b) => b.date - a.date);
    return (
        <div className={cx('wrapper')}>
            <ChatList
                conversation={conversation}
                rerender={rerender}
                parentCb1={cbChild1}
                // parentCb={cbChild}
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
            {props.params ? (
                <ChatDetails params={props.params} user={user} img={img} name={name} currentChat={currentChat} />
            ) : null}
            <Modal isOpen={modalVideoOpen} style={customStyles} onRequestClose={closeModelVideo}>
                <div className={cx('videoCall-parent')}>
                    <div className={cx('friend-video')}>
                        {callAccepted && !callEnded ? (
                            <video className={cx('video-f')} autoPlay playsInline ref={friendVideo}></video>
                        ) : (
                            null || (
                                <div className={cx('waitAccept')}>
                                    <div className={cx('userName')}>{nameVideo}</div>
                                </div>
                            )
                        )}
                    </div>
                    <div className={cx('my-video')}>
                        <video className={cx('video-m')} autoPlay playsInline ref={myVideo}></video>
                    </div>
                    <div className={cx('callVideo-footer')}>
                        {receivingCall && !callAccepted ? (
                            <>
                                <div className={cx('mic')} onClick={answerCall}>
                                    <FontAwesomeIcon icon={faPhoneVolume} style={{ color: '#ffffff' }} />
                                </div>
                                <div className={cx('end')} onClick={denyCall}>
                                    <FontAwesomeIcon icon={faPhoneSlash} style={{ color: '#ffffff' }} />
                                </div>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </Modal>
            {/* Modal Group is delete */}
            <Modal isOpen={modalGroupIsDelete} style={customStylesKick} ariaHideApp={false}>
                <div className={cx('wrapper-modal-idel')}>
                    <div className={cx('content-modal-idel')}>
                        <div className={cx('text-confirm-idel')}>{`Nhóm ${nameGroupIsDelete} đã bị giải tán`}</div>
                    </div>

                    <div className={cx('btns')}>
                        <button
                            className={cx('btnConf', 'btn')}
                            onClick={() => {
                                setModalGroupIsDelete(false);
                            }}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Model sizeFile */}
            <Modal isOpen={modalKickOpen} style={customStylesKick} onRequestClose={closeModelKick}>
                <div className={cx('wrapper-modal')}>
                    <div className={cx('header-modal')}>
                        <span>Thông báo</span>
                    </div>
                    <div className={cx('body-modal')}>
                        <h4>Bạn đã bị mời khỏi nhóm {nameKick}!</h4>
                    </div>
                </div>
                <div className={cx('footer-modal')}>
                    <button className={cx('btn-conf')} onClick={closeModelKick}>
                        Xác Nhận
                    </button>
                </div>
            </Modal>
        </div>
    );
};

Message.propTypes = {};

export default Message;
