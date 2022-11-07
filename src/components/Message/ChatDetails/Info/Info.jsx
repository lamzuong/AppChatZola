import classNames from 'classnames/bind';
import Modal from 'react-modal';
import React, { useRef, useState } from 'react';
import styles from './Info.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faRotate, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

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

const Info = ({ img, nameInfo }) => {
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editName, setEditName] = useState(nameInfo);
    const [name, setName] = useState(nameInfo);
    const [avatar, setAvatar] = useState();

    const refInput = useRef();
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleConfirm = () => {
        setName(refInput.current.value);
        setModalIsOpen(false);
    };

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handleReviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('avatar')}>
                    <img src={img} alt="avatar" />
                </div>
                <div className={cx('info-name')}>
                    <div style={{ width: '32px' }}></div>
                    <span style={{ fontSize: 16 }}>{nameInfo}</span>
                    <div className={cx('edit')} onClick={openModal}>
                        <i className="bx bx-edit-alt"></i>
                    </div>
                    <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
                        <div className={cx('wrapper-modal')}>
                            <div className={cx('header-modal')}>
                                <span>Đổi tên và avatar group</span>
                            </div>
                            <div className={cx('body-modal')}>
                                <label for="update-avatar">
                                    <div className={cx('avatar')}>
                                        {avatar ? (
                                            <img src={avatar.preview} alt="vuong" />
                                        ) : (
                                            <img src={img} alt="phuc" />
                                        )}
                                        <div className={cx('iconcam-w')}>
                                            <FontAwesomeIcon
                                                icon={faCameraRetro}
                                                className={cx('icon-camera')}
                                                style={{ color: '#666', fontSize: '20' }}
                                            />
                                        </div>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    id="update-avatar"
                                    accept="image/*"
                                    name="avatar"
                                    onChange={handleReviewAvatar}
                                />
                                <div className={cx('input-wrapper')}>
                                    <input
                                        className={cx('input-edit-name')}
                                        type="text"
                                        ref={refInput}
                                        onChange={(e) => setEditName(e.target.value)}
                                        value={editName}
                                        placeholder={name}
                                        spellCheck={false}
                                    />
                                </div>
                            </div>
                            <div className={cx('footer-modal')}>
                                <button className={cx('btn-cancel')} onClick={closeModal}>
                                    Hủy
                                </button>
                                <button className={cx('btn-conf')} onClick={handleConfirm}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className={cx('ruleAdmin')}>
                    <div className={cx('addMem')}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Thêm thành viên</span>
                    </div>
                    <div className={cx('grantMem')}>
                        <FontAwesomeIcon icon={faRotate} />
                        <span>Ủy quyền</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Info;
