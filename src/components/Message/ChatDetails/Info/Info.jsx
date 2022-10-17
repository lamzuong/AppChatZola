import classNames from 'classnames/bind';
import Modal from 'react-modal';
import React, { useRef, useState } from 'react';
import styles from './Info.module.scss';

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
                                <span>Đặt tên gợi ý</span>
                            </div>
                            <div className={cx('body-modal')}>
                                <div className={cx('avatar')}>
                                    <img
                                        src="https://s120-ava-talk.zadn.vn/c/f/c/d/4/120/b391dd6ba1681c427460c4d1fb83325f.jpg"
                                        alt="avatar"
                                    />
                                </div>
                                <div className={cx('edit-description')}>
                                    <span>
                                        Hãy đặt tên cho <span className={cx('name-edit')}>{name}</span> một cái tên dễ
                                        nhớ
                                    </span>
                                    <div> Lưu ý: Tên gợi nhớ sẽ chỉ hiển thị riêng với bạn.</div>
                                </div>
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
            </div>
        </div>
    );
};
export default Info;
