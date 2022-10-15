import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './HeaderMess.module.scss';
import AccountItem from '../../../AccountItem/AccountItem';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosCilent from '../../../../api/axiosClient';
import noAvatar from '../../../../assets/noAvatar.png';

const cx = classNames.bind(styles);
const HeaderMess = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const friendID = props.currentChat.members.find((m) => m !== props.currentUser.id);
        const getInfoFriends = async () => {
            try {
                const res = await axiosCilent.get('/zola/users/' + friendID);
                setUser(res);
            } catch (error) {
                console.log(error);
            }
        };
        getInfoFriends();
    }, [props.currentChat, props.currentUser.id]);
    let img = '';
    let name = '';
    if (props.currentChat.members.length > 2) {
        img = props.currentChat.avatarGroup;
        name = props.currentChat.groupName;
    } else {
        img = user?.img ? user.img : noAvatar;
        name = user?.fullName;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <AccountItem ava={img} name={name} none={true} />
            </div>
            <div className={cx('nav')}>
                <i className="bx bxs-phone"></i>
                <i className="bx bxs-video"></i>
            </div>
        </div>
    );
};

HeaderMess.propTypes = {};

export default HeaderMess;
