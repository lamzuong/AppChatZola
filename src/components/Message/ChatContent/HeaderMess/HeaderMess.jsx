import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './HeaderMess.module.scss';
import AccountItem from '../../../AccountItem/AccountItem';

const cx = classNames.bind(styles);
const HeaderMess = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <AccountItem ava={props.ava} name={props.name} none={true} />
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
