import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import Modal from 'react-modal';

const cx = classNames.bind(styles);

const AccountItem = (props) => {
    const { pathname } = useLocation();
    const [showOption, setShowOption] = useState(false);
    const path = pathname.substring(pathname.length - 1);
    const active = path === props.id;
    return (
        <>
            <Link to={`/t/${props.id}`} className={cx('wrapper', props.none ? 'none' : active ? 'active' : '')}>
                <div className={cx('avatar')}>
                    <img src={props.ava} alt="" />
                    {/* <div className={cx('onl')}></div> */}
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        <span>{props.name}</span>
                    </h4>
                    <span className={cx('mess')}>{props.mess}</span>
                </div>
            </Link>
            {props.tippy && (
                <div className={cx('btn')}>
                    <Tippy
                        placement="left-end"
                        visible={showOption}
                        interactive={true}
                        render={(attrs) => (
                            <ul className={cx('wrapper-more')} tabIndex="-1" {...attrs}>
                                <li onClick={() => props.handleChat(props.u)}>Nhắn tin</li>
                                {/* <li onClick={() => props.handleDelFriend(props.u)}>Xóa</li> */}
                                <li
                                    onClick={() => {
                                        props.setModalConfirmDelete(true);
                                        setShowOption(false);
                                        props.setNameDel(props.name);
                                        props.setUserIsCaceled(props.u);
                                    }}
                                >
                                    Hủy kết bạn
                                </li>
                            </ul>
                        )}
                    >
                        <div onClick={() => setShowOption(!showOption)}>
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                className={cx('icon-more')}
                                style={{
                                    color: '#ccc',
                                    fontSize: '25',
                                    margin: '0 10',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </Tippy>
                </div>
            )}
        </>
    );
};

AccountItem.propTypes = {};

export default AccountItem;
