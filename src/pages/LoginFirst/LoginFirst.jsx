import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LoginFirst.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import noAvatar from '../../assets/noAvatar.png';
// import { Calendar } from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';

import 'react-datepicker/dist/react-datepicker.css';
import Wellcome from '../../components/Confetti/Confetti';

const cx = classNames.bind(styles);

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

const LoginFirst = (props) => {
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
    const [value, onChange] = useState(new Date());

    const handleUpdate = () => {
        console.log(nameDisplay, gender, birthday);
    };

    return (
        <div className={cx('wrapper')}>
            <Wellcome />
            <div className={cx('infor')}>
                <div className={cx('avatar')}>
                    <div className={cx('ava')}>
                        <label for="update-avatar">
                            <img src={user.img ? user.img : noAvatar} alt="phuc" />
                            <div className={cx('iconcam-w')}>
                                <FontAwesomeIcon
                                    icon={faCameraRetro}
                                    className={cx('icon-camera')}
                                    style={{ color: '#666', fontSize: '20' }}
                                />
                            </div>
                        </label>
                    </div>
                </div>

                <input type="file" style={{ display: 'none' }} id="update-avatar" />
                <div className={cx('detail')}>
                    <div className={cx('change-info')}>
                        <h3>Thông tin cá nhân</h3>
                        <div className={cx('change-detail')}>
                            <div className={cx('label')}>Giới tính: </div>
                            <div>
                                {genders.map((g) => {
                                    return (
                                        <div style={{ display: 'inline-block', marginRight: 20 }} key={g.id}>
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
                            <div className={cx('label')}>Ngày sinh:</div>

                            <div>
                                <DatePicker
                                    onChange={onChange}
                                    value={value}
                                    className={cx('custom-date-picker')}
                                    selected={value}
                                />
                            </div>
                        </div>
                        <div className={cx('footer-body')}>
                            <button className={cx('btn-confirm')} onClick={handleUpdate}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginFirst;
