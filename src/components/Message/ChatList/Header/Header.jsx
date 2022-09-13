import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = (props) => {
    return (
        <>
            <div className={cx('wrapper')}>
                <h2>Chats</h2>
                <div className={cx('container')}>
                    <div className={cx('search')}>
                        <input spellCheck={false} placeholder="Tim kiem" />
                        <div className={cx('btnSearch')}>
                            <i className="bx bx-search"></i>
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <i className="bx bx-group"></i>
                    </div>
                </div>
            </div>
        </>
    );
};

Header.propTypes = {};

export default Header;
