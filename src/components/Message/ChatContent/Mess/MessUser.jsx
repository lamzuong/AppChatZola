import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MessUser.module.scss';
import noAvatar from '../../../../assets/noAvatar.png';
import { useState, useEffect } from 'react';
import axiosCilent from '../../../../api/axiosClient';
import Tippy from '@tippyjs/react/headless';
import Modal from 'react-modal';
import OptionMess from './OptionMess/OptionMess';

const cx = classNames.bind(styles);
const customStyles1 = {
    content: {
        width: '100%',
        backgroundColor: '#3e4041',
        height: '100vh',
        padding: '0',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100',
    },
};

const MessUser = (props) => {
    Modal.setAppElement('#root');
    const [modalImgIsOpen, setModalImgIsOpen] = useState(false);
    const [src, setSrc] = useState('a');
    const openModalImg = () => {
        setModalImgIsOpen(true);
    };

    const closeModelImg = () => {
        setModalImgIsOpen(false);
    };

    const handleShowImage = (src) => {
        setSrc(src);
    };
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

    // var remove = false;
    // if (props.mess?.removePerson.filter((i) => i === props.user.id)) {
    //     remove = true;
    // }
    return (
        <div className={cx('message', props.group ? 'group' : '', props.own ? 'own' : '')}>
            <div className={cx('messImg')}>
                <img src={props.sender?.imageSender ? props.sender.imageSender : noAvatar} alt="" />
            </div>
            <div className={cx('messright')}>
                <div className={cx('messName')}>{props.group ? props.sender.fullName : '  '}</div>
                {props.mess.mess.length === 0 || props.mess.deleted ? (
                    <></>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {props.own && <OptionMess mess={props.mess} conversation={props.conversation} />}
                        <div className={cx('messText')}>{props.mess.mess}</div>
                        {!props.own && (
                            <OptionMess mess={props.mess} conversation={props.conversation} noOwn={!props.own} />
                        )}
                    </div>
                )}
                {props.mess.deleted ? (
                    <div className={cx('messDel')}>Tin nhắn đã được thu hồi</div>
                ) : props.mess.img_url?.length ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {props.own && <OptionMess mess={props.mess} conversation={props.conversation} />}
                        <div className={cx('messRow')}>
                            {props.mess.img_url.map((img, i) => (
                                <div key={i} className={cx('messImgUrl')}>
                                    {img.split('.').splice(-1)[0] === 'mp4' ? (
                                        <video width="540" height="310" controls>
                                            <source src={img} type="video/mp4"></source>
                                        </video>
                                    ) : img.split('.').splice(-1)[0] === 'png' ||
                                      img.split('.').splice(-1)[0] === 'jpg' ||
                                      img.split('.').splice(-1)[0] === 'jpeg' ||
                                      img.split('.').splice(-1)[0] === 'gif' ||
                                      img.split('.').splice(-1)[0] === 'jfif' ? (
                                        <>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img
                                                    src={img}
                                                    alt=""
                                                    onClick={(e) => {
                                                        openModalImg();
                                                        handleShowImage(e.target.src);
                                                    }}
                                                />
                                            </div>
                                            <Modal
                                                isOpen={modalImgIsOpen}
                                                style={customStyles1}
                                                onRequestClose={closeModelImg}
                                            >
                                                <div className={cx('header-detail-img')}>
                                                    <div className={cx('btn-close')} onClick={closeModelImg}>
                                                        <i className="bx bx-x"></i>
                                                    </div>
                                                </div>
                                                <div className={cx('show-img')}>
                                                    <img src={openModalImg && src} alt="" />
                                                </div>
                                            </Modal>
                                        </>
                                    ) : (
                                        <a
                                            style={{
                                                padding: '20px',
                                                borderRadius: '20px',
                                                backgroundColor: 'rgb(245, 241, 241)',
                                                color: '#000',
                                                fontWeight: '600',
                                                wordBreak: 'break-word',
                                                maxWidth: '500px',
                                            }}
                                            href={img}
                                        >
                                            <i
                                                className="bx bx-file"
                                                style={{ marginRight: '4px', fontSize: '24px' }}
                                            ></i>
                                            {img.split('/')[4]}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                        {!props.own && (
                            <OptionMess mess={props.mess} conversation={props.conversation} noOwn={!props.own} />
                        )}
                    </div>
                ) : (
                    <></>
                )}
                <div className={cx('messBot')}>{timeSince(new Date(props.mess.date))}</div>
                <div style={{ display: 'flex', alignSelf: 'center' }}></div>
            </div>
        </div>
    );
};

MessUser.propTypes = {};

export default MessUser;
