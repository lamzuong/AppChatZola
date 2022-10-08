import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState, useRef } from 'react';

const cx = classNames.bind(styles);

const Header = (props) => {
    const [text, setText] = useState('');
    const inputRef = useRef();
    return (
        <div className={cx('wrapper')}>
            <h2>Trò chuyện</h2>
            <div className={cx('container')}>
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={text}
                        spellCheck={false}
                        placeholder="Tim kiem"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    {text && (
                        <div className={cx('btnSearch')}>
                            <i className="bx bx-search"></i>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {};

export default Header;
