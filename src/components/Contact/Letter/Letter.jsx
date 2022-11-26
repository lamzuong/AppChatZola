import styles from './Letter.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';

import axiosCilent from '../../../api/axiosClient';
import { AuthContext } from '../../../context/AuthContext';
import React from 'react';
import { io } from 'socket.io-client';

import apiConfig from '../../../api/apiConfig';
const socket = io.connect(apiConfig.baseUrl, { transports: ['websocket'] });

const cx = classNames.bind(styles);

const Letter = ({ id, parentCb }) => {
    const [user0, setUser0] = useState({});
    const { user, dispatch } = useContext(AuthContext);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const getInfoFriends = async () => {
            try {
                const res = await axiosCilent.get('/zola/users/' + id);
                setUser0(res);
            } catch (error) {
                console.log(error);
            }
        };

        getInfoFriends();
    }, []);
    const sendData = (data) => {
        parentCb(data);
    };

    const handleAccept = async (id) => {
        const req = {
            userId: user.id,
            friendId: id,
            listReceiver: user.listReceiver,
            friends: user.friends,
        };
        try {
            await axiosCilent.put('/zola/users/acceptFriend', req);
            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
            setRerender(!rerender);
            sendData(rerender);
            const res1 = await axiosCilent.get(`zola/conversation/conversationId/${user.id}/${id}`);
            if (res1.length === 0) {
                const members = [user.id, id];
                await axiosCilent.post('zola/conversation', { members });
            }
            socket.emit('request-friend', {
                listUser: [user.id, id],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeny = async (id) => {
        const req = {
            userId: user.id,
            friendId: id,
            listReceiver: user.listReceiver,
        };
        try {
            await axiosCilent.put('/zola/users/denyFriend', req);
            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
            setRerender(!rerender);
            sendData(rerender);
            socket.emit('request-friend', {
                listUser: [user.id, id],
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('ava')}>
                    <img src={user0.img} alt="" />
                </div>
                <span>{user0.fullName}</span>
            </div>
            <div className={cx('btns')}>
                <button className={cx('btn-reject')} onClick={() => handleDeny(id)}>
                    Từ chối
                </button>
                <button className={cx('btn-allow')} onClick={() => handleAccept(id)}>
                    Chấp nhận
                </button>
            </div>
        </div>
    );
};
export default React.memo(Letter);
