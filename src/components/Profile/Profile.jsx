import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

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

const genders = [
    {
        id: 1,
        name: 'Nam',
    },
    {
        id: 2,
        name: 'Nữ',
    },
];
const userInfo = {
    email: 'minhvuong06082001@gamil.com',
    name: 'Minh Vuong',
    gender: false,
    birthday: '06/08/2001',
};

const Profile = (props) => {
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [email, setEmail] = useState(userInfo.email);
    const [nameDisplay, setNameDisplay] = useState(userInfo.name);
    const [gender, setGender] = useState(userInfo.gender);
    const [birthday, setBirthday] = useState(userInfo.birthday);
    const [checkGender, setCheckGender] = useState(gender);

    const handleUpdate = () => {
        userInfo.name = nameDisplay;
        userInfo.gender = checkGender ? 'Nam' : 'Nu';
        userInfo.birthday = birthday;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor')}>
                <div className={cx('avatar')}>
                    <div className={cx('ava')}>
                        <img src="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg" alt="phuc" />
                    </div>
                    <h3>{nameDisplay}</h3>
                </div>
                <div className={cx('detail')}>
                    <h2>Thông tin tài khoản</h2>
                    <div>
                        <span className={cx('label')}>Email:</span>
                        <span className={cx('text-info')}>{email}</span>
                    </div>
                    <div>
                        <span className={cx('label')}>Giới tính:</span>
                        <span className={cx('text-info')}>{checkGender === true ? 'Nam' : 'Nữ'}</span>
                    </div>
                    <div>
                        <span className={cx('label')}>Ngày sinh:</span>
                        <span className={cx('text-info')}>{birthday}</span>
                    </div>

                    <button className={cx('btn-update-info')} onClick={openModal}>
                        Cập nhật thông tin
                    </button>
                    <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
                        <div className={cx('wrapper-modal')}>
                            <div className={cx('header-modal')}>
                                <h3>Cập nhật thông tin</h3>
                                <div
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <i className="bx bx-x" style={{ fontSize: 24 }} onClick={closeModal} />
                                </div>
                            </div>
                            <div className={cx('body-modal')}>
                                <div className={cx('avatar')}>
                                    <div className={cx('ava')}>
                                        <img
                                            src="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                            alt="phuc"
                                        />
                                    </div>
                                    <h3>{nameDisplay}</h3>
                                </div>
                                <div className={cx('name-display')}>
                                    <span className={cx('label')} style={{ marginBottom: 5 }}>
                                        Tên hiển thị
                                    </span>
                                    <input
                                        type="text"
                                        className={cx('ipt-name-change')}
                                        value={nameDisplay}
                                        onChange={(e) => setNameDisplay(e.target.value)}
                                    />
                                    <span className={cx('desc-ipt-chang-name')}>
                                        Sử dụng tên thật để bạn bè dễ dàng nhận diện hơn
                                    </span>
                                </div>
                                <div style={{ height: 8, backgroundColor: '#e5e7eb' }}></div>
                                <div className={cx('change-info')}>
                                    <h3>Thông tin cá nhân</h3>
                                    <div className={cx('change-detail')}>
                                        <div className={cx('label')}>Giới tính</div>
                                        <div>
                                            {genders.map((g) => {
                                                return (
                                                    <div
                                                        style={{ display: 'inline-block', marginRight: 20 }}
                                                        key={g.id}
                                                    >
                                                        <input
                                                            type="radio"
                                                            onChange={() => setCheckGender(g.id === 1 ? true : false)}
                                                            checked={checkGender === (g.id === 1 ? true : false)} //checkGender === g.name
                                                        />
                                                        <span style={{ marginLeft: 10 }}>{g.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className={cx('change-detail')}>
                                        <div className={cx('label')}>Ngày sinh</div>
                                        <input
                                            type="text"
                                            className={cx('ipt-name-change')}
                                            value={birthday}
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </div>
                                    <div className={cx('footer-body')}>
                                        <div style={{ marginBottom: 10 }}>
                                            <button className={cx('btn-cancel')}>Hủy</button>
                                            <button className={cx('btn-confirm')} onClick={handleUpdate}>
                                                Cập nhật
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className={cx('show')}>
                <div className={cx('ava')}>
                    <img src="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg" alt="phuc" />
                    <span>Hoang Phuc</span>
                </div>
                <span>Hey, Hoang Phuc</span>
                <h4>Please select a chat to start messageing.</h4>
                <Link to="/" style={{ color: 'blue' }}>
                    Click here to chat with us!
                </Link>
            </div>
        </div>
    );
};

Profile.propTypes = {};

export default Profile;
