import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

const AccountItem = (props) => {
    const { pathname } = useLocation();
    const path = pathname.substring(pathname.length - 1);
    const active = path === props.id;
    return (
        <Link to={`/t/${props.id}`} className={cx('wrapper', props.none ? 'none' : active ? 'active' : '')}>
            <div className={cx('avatar')}>
                <img src={props.ava} alt="phuc" />
                <div className={cx('onl')}></div>
            </div>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{props.name}</span>
                </h4>
                <span className={cx('mess')}>{props.mess}</span>
            </div>
        </Link>
    );
};

AccountItem.propTypes = {};

export default AccountItem;
