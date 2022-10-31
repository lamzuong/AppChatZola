import { useEffect, useState } from 'react';
import styles from './InfoDetailUser.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '../../../../context/AuthContext';
import { useContext } from 'react';
import axiosCilent from '../../../../api/axiosClient';

const cx = classNames.bind(styles);

const InfoDetailUser = ({ ava, name, id }) => {
    const { user, dispatch } = useContext(AuthContext);
    const [awaitAceept, setAwaitAccept] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const arrTemp = user.listSender;

    console.log(arrTemp);
    console.log(awaitAceept);
    useEffect(() => {
        if (arrTemp.includes(id)) setAwaitAccept(true);
        if (user.friends.includes(id)) setIsFriend(true);
    }, [user.listSender.length]);

    const handleAddFriend = async () => {
        // const formData = new FormData();
        // formData.append('id', user.id);
        // formData.append('friendId', id);
        // formData.append('listSender', user.listSender);
        const req = {
            userId: user.id,
            friendId: id,
            listSender: user.listSender,
        };
        //console.log(formData)
        try {
            await axiosCilent.put('/zola/users/friends', req);
            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
            // console.log(res);
            // const res1 = await axiosCilent.get(`/zola/users/${user.id}`);
            // dispatch({ type: 'LOGIN_SUCCESS', payload: res1 });
            setAwaitAccept(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCaccelFriend = async () => {
        // const formData = new FormData();
        // formData.append('id', user.id);
        // formData.append('friendId', id);
        // formData.append('listSender', user.listSender);
        const req = {
            userId: user.id,
            friendId: id,
            listSender: user.listSender,
        };
        //console.log(formData)
        try {
            await axiosCilent.put('/zola/users/cancelFriend', req);
            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });
            // console.log(res);
            // const res1 = await axiosCilent.get(`/zola/users/${user.id}`);
            // dispatch({ type: 'LOGIN_SUCCESS', payload: res1 });
            setAwaitAccept(true);
        } catch (error) {
            console.log(error);
        }
        setAwaitAccept(false);
    };

    const handleChat = async () => {};
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('ava')}>
                    <img src={ava} alt="" />
                </div>
                <span>{name}</span>
            </div>
            {!isFriend && !awaitAceept && (
                <button className={cx('btn-add-frend')} onClick={handleAddFriend}>
                    Kết bạn
                </button>
            )}
            {!isFriend && awaitAceept && (
                <button className={cx('btn-cancle-frend')} onClick={handleCaccelFriend}>
                    Hủy lời mời
                </button>
            )}
            {isFriend && (
                <div className={cx('btns')}>
                    <button className={cx('btn-frend')}>Bạn bè</button>
                    <button className={cx('btn-chat')} onClick={handleChat}>
                        Nhắn tin
                    </button>
                </div>
            )}
        </div>
    );
};

export default InfoDetailUser;
