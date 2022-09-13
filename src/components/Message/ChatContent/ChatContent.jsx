import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';
import HeaderMess from './HeaderMess/HeaderMess';
import MessUser from './Mess/MessUser';
import Input from './Input/Input';

const cx = classNames.bind(styles);

const ChatContent = (props) => {
    return (
        <div className={cx('wrapper')}>
            <HeaderMess />
            <div className={cx('chatBox')}>
                <MessUser />
                <MessUser own={true} />
                <MessUser />
                <MessUser own={true} />
                <MessUser own={true} />
            </div>
            <Input />
        </div>
    );
};

ChatContent.propTypes = {};

export default ChatContent;
