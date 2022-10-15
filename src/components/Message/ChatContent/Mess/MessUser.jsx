import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MessUser.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import noAvatar from '../../../../assets/noAvatar.png';
import axiosCilent from '../../../../api/axiosClient';

const cx = classNames.bind(styles);

const MessUser = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getInfoFriends = async () => {
            try {
                const res = await axiosCilent.get('/zola/users/' + props.sender);
                setUser(res);
            } catch (error) {
                console.log(error);
            }
        };
        getInfoFriends();
    }, [props.sender]);
    return (
        <div className={cx('message', props.own ? 'own' : '')}>
            <div className={cx('messName')}>{props.group ? user?.fullName : ''}</div>
            <div className={cx('messTop')}>
                <div className={cx('messImg')}>
                    <img src={user?.img ? user.img : noAvatar} alt="" />
                </div>
                <div className={cx('messText')}>{props.mess.mess}</div>
            </div>
            <div className={cx('messBot')}>1 hour ago</div>
        </div>
    );
};

MessUser.propTypes = {};

export default MessUser;
