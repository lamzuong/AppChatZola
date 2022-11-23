import styles from './Letter.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';

import axiosCilent from '../../../api/axiosClient';
import { AuthContext } from '../../../context/AuthContext';
import React from 'react';
const cx = classNames.bind(styles);

const Letter = ({ id }) => {
    const [user0, setUser0] = useState({});
    const { user, dispatch } = useContext(AuthContext);

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
            const members = [user.id, id];
            await axiosCilent.post('zola/conversation', { members });
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
        //console.log(formData)
        try {
            await axiosCilent.put('/zola/users/denyFriend', req);
            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
            // console.log(res);
            // const res1 = await axiosCilent.get(`/zola/users/${user.id}`);
            // dispatch({ type: 'LOGIN_SUCCESS', payload: res1 });
            //setAwaitAccept(true);
            //.log('oke');
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
