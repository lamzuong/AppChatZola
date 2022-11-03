import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Conversation.module.scss';
import { useState, useEffect, useContext } from 'react';
import axiosCilent from '../../../api/axiosClient';
import noAvatar from '../../../assets/noAvatar.png';
import { AuthContext } from '../../../context/AuthContext';

const cx = classNames.bind(styles);

const Conversation = (props) => {
    const { user } = useContext(AuthContext);
    const [userChat, setUserChat] = useState(null);
    const [mess, setMess] = useState([]);
    useEffect(() => {
        const friendID = props.conversation.members.find((m) => m !== props.currentUser.id);
        const getInfoFriends = async () => {
            try {
                const res = await axiosCilent.get('/zola/users/' + friendID);
                setUserChat(res);
            } catch (error) {
                console.log(error);
            }
        };
        getInfoFriends();
    }, [props.conversation.members, props.currentUser]);
    useEffect(() => {
        const getMess = async () => {
            try {
                const res = await axiosCilent.get('/zola/message/' + props.conversation.id);
                setMess(res);
            } catch (error) {
                console.log(error);
            }
        };
        getMess();
    }, [props.conversation.id, props.rerender]);
    mess.sort((a, b) => a.date - b.date);
    let img = '';
    let nameLast = '';
    let name = '';
    const rs = mess[mess?.length - 1]?.sender === user.id;
    let nameShow = mess[mess.length - 1]?.infoSender.fullName.split(' ').slice(-1);
    var messLast = '';
    if (mess[mess.length - 1]?.deleted) {
        messLast = 'Đã thu hồi tin nhắn';
    } else if (mess[mess.length - 1]?.mess) {
        messLast = mess[mess.length - 1].mess;
    } else {
        messLast = 'Đã gửi tệp đính kèm';
    }
    if (props.conversation.members.length > 2) {
        img = props.conversation.avatarGroup;
        name = props.conversation.groupName;
        nameLast = rs ? 'Bạn: ' : `${nameShow}: `;
    } else {
        img = userChat?.img ? userChat.img : noAvatar;
        name = userChat?.fullName;
        nameLast = rs ? 'Bạn: ' : '';
    }
    const last = nameLast + messLast;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src={img} alt="" />
                <div className={cx('onl')}></div>
            </div>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{name}</span>
                </h4>
                <div className={cx('mess')}>{messLast?.length > 30 ? `${last.slice(0, 20)}...` : `${last}`}</div>
            </div>
        </div>
    );
};

Conversation.propTypes = {};

export default Conversation;
