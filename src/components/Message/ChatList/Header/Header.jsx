import React from 'react';
import PropTypes from 'prop-types';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState, useRef } from 'react';

const cx = classNames.bind(styles);

const Header = (props) => {
    const [text, setText] = useState('');
    const inputRef = useRef();
    const handleCleanText = () => {
        setText('');
        inputRef.current.focus();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('search')}>
                    <div className={cx('btnSearch')}>
                        <i className="bx bx-search"></i>
                    </div>
                    <input
                        ref={inputRef}
                        value={text}
                        spellCheck={false}
                        placeholder="Tìm kiếm"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    {text && (
                        <div className={cx('btnCleanText')} onClick={handleCleanText}>
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </div>
                    )}
                </div>
                <div className={cx('btnClose')}>Đóng</div>
            </div>
        </div>
    );
};

Header.propTypes = {};

export default Header;
