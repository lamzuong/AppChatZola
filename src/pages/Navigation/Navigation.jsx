import React from 'react';
import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import noAvatar from '../../assets/noAvatar.png';

const cx = classNames.bind(styles);

const nav = [
    { path: '/', display: <i className="bx bxl-messenger" style={{ color: 'rgba(255,255,255)' }}></i> },
    { path: '/friends', display: <i className="bx bxs-contact" style={{ color: 'rgba(255,255,255)' }}></i> },
    { path: '/profile', display: <i className="bx bxs-user" style={{ color: 'rgba(255,255,255)' }}></i> },
    { path: '/login', display: <i className="bx bxs-log-out" style={{ color: 'rgba(255,255,255)' }}></i> },
];

const Navigation = () => {
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();
    const active = nav.findIndex((e) => e.path === pathname);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('ava')}>
                    <Link to="/">
                        <img src={user.img ? user.img : noAvatar} alt="" />
                    </Link>
                </div>
                <ul className={cx('nav')}>
                    {nav.map((element, i) => (
                        <li key={i} className={cx(i === active ? 'active' : '')}>
                            <Link to={element.path}>{element.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
