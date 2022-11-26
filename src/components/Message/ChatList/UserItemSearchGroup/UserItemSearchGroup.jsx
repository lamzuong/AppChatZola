import { AuthContext } from '../../../../context/AuthContext';
import axiosCilent from '../../../../api/axiosClient';
import { useContext, useEffect, useState } from 'react';
import style from './UserItemSearchGroup.module.scss';
import { io } from 'socket.io-client';
import classNames from 'classnames/bind';
import apiConfig from '../../../../api/apiConfig';
const socket = io.connect(apiConfig.baseUrl, { transports: ['websocket'] });

const cx = classNames.bind(style);

const UserItemSearchGroup = ({ onClick, name, ava }) => {
    const { user } = useContext(AuthContext);

    const [userChat, setUserChat] = useState(null);

    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <div className={cx('avatar')}>
                <img src={ava} alt="" />
            </div>
            <div className={cx('name')}>
                <span>{name}</span>
            </div>
        </div>
    );
};

export default UserItemSearchGroup;
