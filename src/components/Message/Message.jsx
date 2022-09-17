import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ChatList from './ChatList/ChatList';
import ChatContent from './ChatContent/ChatContent';
import ChatDetails from './ChatDetails/ChatDetails';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

const mess = [
    {
        id: '1',
        ava: 'https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg',
        name: 'Hoang Phuc',
        message: 'gutboiz',
    },
    {
        id: '2',
        ava: 'https://i.pinimg.com/736x/6d/cd/c7/6dcdc7081a209999450d6abe0b3d84a7.jpg',
        name: 'Phuc Nguyen',
        message: 'facboi',
    },
    {
        id: '3',
        ava: 'https://i.pinimg.com/736x/92/ff/1a/92ff1ac6f54786b4baeca8412934a7ca.jpg',
        name: 'Minh Vuong M4U',
        message: 'ka xy',
    },
    {
        id: '4',
        ava: 'https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg',
        name: 'Nam Zuong',
        message: 'mo i lo ep',
    },
    {
        id: '5',
        ava: 'https://i.pinimg.com/280x280_RS/43/cd/7c/43cd7c65d590d2f41c05a23f3dfe82d4.jpg',
        name: 'Ban Nuoc',
        message: 'Ziet Cong',
    },
    {
        id: '6',
        ava: 'https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg',
        name: 'Nam',
        message: 'dcm',
    },
    {
        id: '7',
        ava: 'https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg',
        name: 'Phuc',
        message: 'dcm',
    },
    {
        id: '8',
        ava: 'https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg',
        name: 'Nguyen',
        message: 'dcm',
    },
    {
        id: '9',
        ava: 'https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg',
        name: 'Quoc',
        message: 'dcm',
    },
    {
        id: '10',
        ava: 'https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg',
        name: 'Vuong',
        message: 'dcm',
    },
    {
        id: '11',
        ava: 'https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg',
        name: 'Nam',
        message: 'dcm',
    },
    {
        id: '12',
        ava: 'https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg',
        name: 'Phuc',
        message: 'dcm',
    },
    {
        id: '13',
        ava: 'https://i.pinimg.com/736x/ff/fc/f5/fffcf54386998aaee1f366b47b4d2fdb.jpg',
        name: 'Nguyen',
        message: 'dcm',
    },
    {
        id: '14',
        ava: 'https://i.pinimg.com/736x/23/ee/9a/23ee9a788c3388c86379989d1a8cee1d.jpg',
        name: 'Quoc',
        message: 'dcm',
    },
    {
        id: '15',
        ava: 'https://i.pinimg.com/736x/c0/ee/2e/c0ee2e67d78d49755f896cb7b6450cdf.jpg',
        name: 'Vuong',
        message: 'dcm',
    },
];

const Message = (props) => {
    return (
        <div className={cx('wrapper')}>
            <ChatList data={mess} />
            <ChatContent data={mess} param={props.param} />
            <ChatDetails />
        </div>
    );
};

Message.propTypes = {};

export default Message;
