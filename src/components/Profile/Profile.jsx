import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const Profile = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor')}>
                <h2 className={cx('a')}>Profile</h2>
                <div className={cx('avatar')}>
                    <div className={cx('ava')}>
                        <img src="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg" alt="phuc" />
                    </div>
                    <h3>Hoang Phuc</h3>
                </div>
                <div className={cx('detail')}>
                    <h2>Information</h2>
                    <h3>Address: 123/456/789 TP.HCM</h3>
                    <h3>Phone: 0123456789</h3>
                    <h3>Email: phuc@gmail.com</h3>
                </div>
            </div>
            <div className={cx('show')}>
                <div className={cx('ava')}>
                    <img src="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg" alt="phuc" />
                    <span>Hoang Phuc</span>
                </div>
                <span>Hey, Hoang Phuc</span>
                <h4>Please select a chat to start messageing.</h4>
                <Link to="/" style={{ color: 'blue' }}>
                    Click here to chat with us!
                </Link>
            </div>
        </div>
    );
};

Profile.propTypes = {};

export default Profile;
