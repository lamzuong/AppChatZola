import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MessUser.module.scss';
import noAvatar from '../../../../assets/noAvatar.png';
import { useState, useEffect } from 'react';
import axiosCilent from '../../../../api/axiosClient';

const cx = classNames.bind(styles);

const MessUser = (props) => {
    function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + ' năm trước';
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + ' tháng trước';
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + ' ngày trước';
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + ' giờ trước';
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + ' phút trước';
        }
        return '';
    }
    return (
        <div className={cx('message', props.group ? 'group' : '', props.own ? 'own' : '')}>
            <div className={cx('messImg')}>
                <img src={props.sender?.imageSender ? props.sender.imageSender : noAvatar} alt="" />
            </div>
            <div className={cx('messright')}>
                <div className={cx('messName')}>{props.group ? props.sender.fullName : '  '}</div>
                {props.mess.mess.length === 0 ? <></> : <div className={cx('messText')}>{props.mess.mess}</div>}
                {props.mess.img_url?.length ? (
                    <div className={cx('messRow')}>
                        {props.mess.img_url.map((img, i) => (
                            <div key={i} className={cx('messImgUrl')}>
                                {img.split('.').splice(-1)[0] === 'mp4' ? (
                                    <video width="540" height="310" controls>
                                        <source src={img} type="video/mp4"></source>
                                    </video>
                                ) : (
                                    <img src={img} alt="" />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
                <div className={cx('messBot')}>{timeSince(new Date(props.mess.date))}</div>
            </div>
        </div>
    );
};

MessUser.propTypes = {};

export default MessUser;
