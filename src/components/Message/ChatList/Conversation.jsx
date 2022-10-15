import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Conversation.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosCilent from '../../../api/axiosClient';
import noAvatar from '../../../assets/noAvatar.png';

const cx = classNames.bind(styles);

const Conversation = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const friendID = props.conversation.members.find((m) => m !== props.currentUser.id);
        const getInfoFriends = async () => {
            try {
                const res = await axiosCilent.get('/zola/users/' + friendID);
                setUser(res);
            } catch (error) {
                console.log(error);
            }
        };
        getInfoFriends();
    }, [props.conversation.members, props.currentUser]);
    let img = '';
    let name = '';
    if (props.conversation.members.length > 2) {
        img = props.conversation.avatarGroup;
        name = props.conversation.groupName;
    } else {
        img = user?.img ? user.img : noAvatar;
        name = user?.fullName;
    }
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
                {/* <span className={cx('mess')}>{props.mess}</span> */}
            </div>
        </div>
    );
};

Conversation.propTypes = {};

export default Conversation;
