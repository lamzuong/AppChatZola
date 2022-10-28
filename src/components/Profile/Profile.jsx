import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import noAvatar from '../../assets/noAvatar.png';

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

const Profile = (props) => {
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const { user } = useContext(AuthContext);

    const [nameDisplay, setNameDisplay] = useState(user.fullName);
    const [gender, setGender] = useState(user.gender);
    const [birthday, setBirthday] = useState(user.birthday);
    const [checkGender, setCheckGender] = useState(gender);

    const handleUpdate = () => {
        console.log(nameDisplay, gender, birthday);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor')}>
                <div className={cx('avatar')}>
                    <div className={cx('ava')}>
                        <img src={user.img ? user.img : noAvatar} alt="phuc" />
                    </div>
                    <h3>{user.fullName}</h3>
                </div>
                <div className={cx('detail')}>
                    <h2>Thông tin tài khoản</h2>
                    <div>
                        <span className={cx('label')}>Email:</span>
                        <span className={cx('text-info')}>{user.email}</span>
                    </div>
                    <div>
                        <span className={cx('label')}>Giới tính:</span>
                        <span className={cx('text-info')}>{user.gender ? 'Nữ' : 'Nam'}</span>
                    </div>
                    <div>
                        <span className={cx('label')}>Ngày sinh:</span>
                        <span className={cx('text-info')}>{user.birthdate}</span>
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
                                        <img src={user.img ? user.img : noAvatar} alt="phuc" />
                                    </div>
                                    <h3>{user.fullName}</h3>
                                </div>
                                <div className={cx('name-display')}>
                                    <span className={cx('label')} style={{ marginBottom: 5 }}>
                                        Tên hiển thị
                                    </span>
                                    <input
                                        type="text"
                                        className={cx('ipt-name-change')}
                                        value={user.fullName}
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
                                            value={user.birthday}
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
                    <img src={user.img} alt="phuc" />
                </div>
                <span>{`Chào ${user.fullName}`}</span>
                <h4>Hãy vào chat để trò chuyện cùng bạn bè.</h4>
                <Link to="/" style={{ color: 'blue' }}>
                    Nhấn vào đây để chat!
                </Link>
            </div>
        </div>
    );
};

Profile.propTypes = {};

export default Profile;
