import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import axiosCilent from '../../../api/axiosClient';
import AccountItem from '../../AccountItem/AccountItem';
import { imgStore } from '../../../DataTest/DataTest';
import ListView from '../../ListView/ListView';
import ListViewItem from '../../ListView/ListViewItem/ListViewItem';
import Store from '../../Store/Store';
import StoreItem from '../../Store/StoreItem/StoreItem';

import ButtonSeeAllFile from './ButtonSeeAllFile/ButtonSeeAllFile';
import styles from './ChatDetails.module.scss';
import Header from './Header/Header';
import Info from './Info/Info';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io.connect('http://localhost:8000', { transports: ['websocket'] });

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        padding: '0',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
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

const ChatDetails = (props) => {
    const { user, dispatch } = useContext(AuthContext);
    Modal.setAppElement('#root');
    const [src, setSrc] = useState('a');
    const navigate = useNavigate();

    ////////show modal img
    const [modalImgIsOpen, setModalImgIsOpen] = useState(false);
    const [modalOutGroupOpen, setModalOutGroupOpen] = useState(false);
    const [modalDelGroupOpen, setModalDelGroupOpen] = useState(false);

    const openModalImg = () => {
        setModalImgIsOpen(true);
    };

    const closeModelImg = () => {
        setModalImgIsOpen(false);
    };

    const openModalOutGroup = () => {
        setModalOutGroupOpen(true);
    };

    const closeModelOutGroup = () => {
        setModalOutGroupOpen(false);
        setModalDelGroupOpen(false);
    };

    const openModalDelGroup = () => {
        setModalDelGroupOpen(true);
    };

    const closeModelDelGroup = () => {
        setModalDelGroupOpen(false);
    };

    const handleShowImage = (src) => {
        setSrc(src);
    };
    props.currentChat.images.reverse();
    const listImg = props.currentChat.images?.filter(
        (i) =>
            i.split('.').splice(-1)[0] === 'png' ||
            i.split('.').splice(-1)[0] === 'jpg' ||
            i.split('.').splice(-1)[0] === 'jpeg' ||
            i.split('.').splice(-1)[0] === 'gif' ||
            i.split('.').splice(-1)[0] === 'jfif' ||
            i.split('.').splice(-1)[0] === 'mp4',
    );
    const listFile = props.currentChat.images?.filter(
        (i) =>
            i.split('.').splice(-1)[0] !== 'png' &&
            i.split('.').splice(-1)[0] !== 'jpg' &&
            i.split('.').splice(-1)[0] !== 'jpeg' &&
            i.split('.').splice(-1)[0] !== 'gif' &&
            i.split('.').splice(-1)[0] !== 'jfif' &&
            i.split('.').splice(-1)[0] !== 'mp4',
    );

    const [listMemberInfo, setListMemberInfo] = useState([]);

    useEffect(() => {
        const getUsersInfo = async () => {
            let listTemp = [];
            for (let i = 0; i < props.currentChat?.members.length; i++) {
                const res = await axiosCilent.get(`/zola/users/` + props.currentChat.members[i]);
                listTemp.push(res);
            }
            setListMemberInfo([...listTemp]);
        };
        getUsersInfo();
    }, [props.currentChat?.members.length]);

    const [down, setDown] = useState(false);

    const handleOutGroup = async () => {
        if (props.currentChat.creator === props.user.id) {
            closeModelOutGroup();
        } else {
            const req = {
                conversationId: props.currentChat.id,
                user: props.user,
                members: props.currentChat.members,
            };
            try {
                await axiosCilent.put('/zola/conversation/outGroup', req);
                navigate('/');
                socket.emit('send-to-server', {
                    conversationID: props.currentChat.id,
                });
                closeModelOutGroup();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDelGroup = async () => {
        const req = {
            conversationId: props.currentChat.id,
        };
        try {
            await axiosCilent.delete('/zola/conversation/deleteGroup', { data: req });
            socket.emit('send-to-server', {
                conversationID: props.currentChat.id,
            });
            closeModelDelGroup();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteMemGroup = async (friend) => {
        try {
            await axiosCilent.put('zola/conversation/deleteMem', {
                conversationId: props.currentChat.id,
                user: user,
                friend: friend,
                members: props.currentChat.members,
            });
            socket.emit('send-to-out', {
                conversationID: props.currentChat.id,
                idDelete: friend.id,
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Header title="Thông tin hội thoại" className={cx('customHeader')} />
            <Modal
                isOpen={modalOutGroupOpen || modalDelGroupOpen}
                style={customStyles}
                onRequestClose={closeModelOutGroup}
            >
                <div className={cx('wrapper-modal')}>
                    <div className={cx('header-modal')}>
                        <span>Thông báo</span>
                    </div>
                    <div className={cx('body-modal')}>
                        {modalOutGroupOpen === true &&
                            (props.currentChat.creator === props.user.id ? (
                                <>
                                    <span>Bạn đang là trưởng nhóm nên không thể thực hiện chức năng này</span>
                                    <br />
                                    <span>Vui lòng ủy quyền cho người khác để có thể tiếp tục!</span>
                                </>
                            ) : (
                                <span>Bạn đã chắc chắn muốn rời khỏi {props.currentChat.groupName}!</span>
                            ))}
                        {modalDelGroupOpen === true && (
                            <span>Bạn đã chắc chắn muốn giản tán nhóm {props.currentChat.groupName}!</span>
                        )}
                    </div>
                </div>
                <div className={cx('footer-modal')}>
                    <button className={cx('btn-cancel')} onClick={closeModelOutGroup}>
                        Hủy
                    </button>
                    <button className={cx('btn-conf')} onClick={modalOutGroupOpen ? handleOutGroup : handleDelGroup}>
                        Xác nhận
                    </button>
                </div>
            </Modal>
            <div className={cx('wrapper-info')}>
                <Info img={props.img} nameInfo={props.name} conversation={props.currentChat} />
                <Store>
                    {props.currentChat?.members.length > 2 && (
                        <StoreItem
                            title="Thành viên nhóm"
                            icon={<i className="bx bxs-group" style={{ fontSize: '1.6rem' }}></i>}
                        >
                            <span
                                style={{ margin: '10px 16px' }}
                            >{`${props.currentChat.members.length} thành viên`}</span>
                            {down === false && <i className="bx bxs-right-arrow" onClick={() => setDown(true)}></i>}
                            {down && (
                                <>
                                    <i className="bx bxs-down-arrow" onClick={() => setDown(false)}></i>
                                    <div className={cx('listMember')}>
                                        <ul>
                                            {listMemberInfo.map((user) => (
                                                <li key={user.id} className={cx('item-mem')}>
                                                    <AccountItem
                                                        name={
                                                            user.id === props.user.id
                                                                ? `${user.fullName} (Tôi)`
                                                                : user.fullName
                                                        }
                                                        ava={user.img}
                                                        none
                                                    />
                                                    {props.currentChat.creator === props.user.id && (
                                                        <button
                                                            className={cx('btn-add-frend')}
                                                            onClick={() => handleDeleteMemGroup(user)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </StoreItem>
                    )}
                    <StoreItem
                        title="Ảnh/Video"
                        icon={<i className="bx bxs-file-image" style={{ fontSize: '1.6rem' }}></i>}
                    >
                        <div className={cx('content', 'gridv2')}>
                            {listImg.slice(0, 8).map((img, i) => (
                                <div key={i}>
                                    <div
                                        className={cx('wrapper-media')}
                                        onClick={(e) => {
                                            openModalImg();
                                            handleShowImage(e.target.src);
                                        }}
                                    >
                                        {img.split('.').splice(-1)[0] !== 'mp4' ? (
                                            <img
                                                src={img}
                                                alt="img"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src =
                                                        "data:image/svg+xml;charset=utf-8,%3Csvg width='68' height='54' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cfilter x='-7.2%25' y='-7.2%25' width='114.4%25' height='114.4%25' filterUnits='objectBoundingBox' id='a'%3E%3CfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.10118007 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3Cfilter x='-.7%25' y='1.2%25' width='101.4%25' height='109.3%25' filterUnits='objectBoundingBox' id='c'%3E%3CfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0858828671 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3Cpath d='M20.51 8.048h24.88c2.942 0 4.009.306 5.084.882a5.997 5.997 0 012.495 2.495c.575 1.075.882 2.142.882 5.084v24.878c0 2.942-.307 4.01-.882 5.085a5.997 5.997 0 01-2.495 2.495c-1.075.575-2.142.881-5.084.881H20.51c-2.942 0-4.008-.306-5.084-.881a5.997 5.997 0 01-2.495-2.495c-.575-1.076-.881-2.143-.881-5.085V16.51c0-2.942.306-4.009.881-5.084a5.997 5.997 0 012.495-2.495c1.076-.576 2.142-.882 5.084-.882z' id='b'/%3E%3Cpath d='M55.357 29.174l10.86 17.996a3.577 3.577 0 01-3.063 5.424H41.435a3.577 3.577 0 01-3.062-5.424l10.86-17.996a3.577 3.577 0 016.124 0z' id='d'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(-.05 -.05)'%3E%3Cpath d='M8.774 8.63l24.14-6.018c2.854-.712 3.963-.673 5.146-.375a5.997 5.997 0 013.024 1.817c.819.904 1.374 1.866 2.086 4.72l6.018 24.14c.712 2.854.673 3.963.375 5.146a5.997 5.997 0 01-1.817 3.024c-.904.819-1.866 1.374-4.72 2.086l-24.14 6.018c-2.854.712-3.963.673-5.146.375a5.997 5.997 0 01-3.024-1.817c-.819-.904-1.374-1.866-2.086-4.72l-6.018-24.14c-.712-2.854-.673-3.963-.375-5.146a5.997 5.997 0 011.817-3.024c.904-.819 1.866-1.374 4.72-2.086z' fill='%23ABCDFF'/%3E%3Cuse fill='%23000' filter='url(%23a)' xlink:href='%23b'/%3E%3Cuse fill='%23FFF' xlink:href='%23b'/%3E%3Cpath d='M43.316 29.205c.053.053.105.107.155.163l6.528 7.34v.83c0 2.941-.306 4.008-.881 5.084a5.997 5.997 0 01-2.495 2.495c-1.075.575-2.142.881-5.084.881H24.36c-2.942 0-4.008-.306-5.084-.881a5.997 5.997 0 01-2.495-2.495c-.575-1.076-.881-2.143-.881-5.085v-.407l5.154-4.132a3.85 3.85 0 015.154.305l1.028 1.046a3.85 3.85 0 005.468.023l5.168-5.167a3.85 3.85 0 015.444 0z' fill='%23ABCDFF'/%3E%3Ccircle fill='%23ABCDFF' cx='23.16' cy='20.698' r='3.3'/%3E%3C/g%3E%3Cg transform='translate(-1 -1)'%3E%3Cuse fill='%23000' filter='url(%23c)' xlink:href='%23d'/%3E%3Cuse fill='%23FFE9C3' xlink:href='%23d'/%3E%3C/g%3E%3Cg transform='translate(50.312 33.417)' fill='%23F9A716'%3E%3Ccircle cx='1.228' cy='12.528' r='1.228'/%3E%3Cpath d='M0 1.121v7.583c0 .62.55 1.122 1.228 1.122.679 0 1.228-.503 1.228-1.122V1.121C2.456.502 1.906 0 1.228 0 .55 0 0 .502 0 1.121z' fill-rule='nonzero'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
                                                }}
                                            />
                                        ) : (
                                            <video controls>
                                                <source src={img} type="video/mp4"></source>
                                            </video>
                                        )}
                                    </div>
                                    <Modal isOpen={modalImgIsOpen} style={customStyles1} onRequestClose={closeModelImg}>
                                        <div className={cx('header-detail-img')}>
                                            <div className={cx('btn-close')} onClick={closeModelImg}>
                                                <i className="bx bx-x"></i>
                                            </div>
                                        </div>
                                        <div className={cx('show-img')}>
                                            <img src={openModalImg && src} alt="" />
                                        </div>
                                    </Modal>
                                </div>
                            ))}
                        </div>
                        <ButtonSeeAllFile imgStore={listImg} fileStore={listFile} />
                    </StoreItem>
                    <StoreItem title="File" icon={<i className="bx bx-folder" style={{ fontSize: '1.6rem' }}></i>}>
                        {listFile.slice(0, 4).map((f, i) => (
                            <ListViewItem
                                key={i}
                                icon={<i className="bx bx-file" style={{ marginRight: '4px', fontSize: '24px' }}></i>}
                                title={f.split('-')[5]}
                            />
                        ))}

                        <ButtonSeeAllFile fileStore={listFile} imgStore={listImg} />
                    </StoreItem>
                    {props.currentChat.members.length > 2 && (
                        <>
                            <StoreItem
                                icon={
                                    <i
                                        className="bx bx-log-out bx-rotate-180"
                                        style={{ fontSize: '1.6rem', color: 'red' }}
                                    ></i>
                                }
                                title="Rời khỏi nhóm"
                                style={{ color: 'red', cursor: 'pointer' }}
                                onclick={openModalOutGroup}
                            ></StoreItem>
                            {props.currentChat.creator === props.user.id && (
                                <StoreItem
                                    icon={<i className="bx bx-trash" style={{ fontSize: '1.6rem', color: 'red' }}></i>}
                                    title="Giải tán nhóm"
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onclick={openModalDelGroup}
                                ></StoreItem>
                            )}
                        </>
                    )}
                </Store>
            </div>
        </div>
    );
};

ChatDetails.propTypes = {};

export default ChatDetails;
