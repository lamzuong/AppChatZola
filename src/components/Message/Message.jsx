import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ChatList from './ChatList/ChatList';
import ChatContent from './ChatContent/ChatContent';
import ChatDetails from './ChatDetails/ChatDetails';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

const Message = (props) => {
    return (
        <div className={cx('wrapper')}>
            <ChatList />
            <ChatContent />
            <ChatDetails />
        </div>
    );
};

Message.propTypes = {};

export default Message;
