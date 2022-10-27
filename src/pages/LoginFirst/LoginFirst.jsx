import React, { useState } from 'react';
import Modal from 'react-modal';

import classNames from 'classnames/bind';
import styles from './LoginFirst.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import noAvatar from '../../assets/noAvatar.png';
import DatePicker from 'react-date-picker';
import 'react-datepicker/dist/react-datepicker.css';
import Wellcome from '../../components/Conf/Confetti';
import { useEffect } from 'react';
import axiosCilent from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';

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

    const { user, dispatch } = useContext(AuthContext);
    const [birthday, setBirthday] = useState(user.birthday);
    const [checkedGender, setCheckedGender] = useState(false);
    const [value, onChange] = useState(new Date());
    const [dateString, setDateString] = useState(
        value.getDate() + '/' + parseInt(value.getMonth() + 1) + '/' + value.getFullYear(),
    );
    //setDateString(value.getDate() + '/' + parseInt(value.getMonth()) + 1 + '/' + value.getFullYear());
    const [avatar, setAvatar] = useState();
    const navigate = useNavigate();

    const handleChangeDate = (e) => {
        onChange(e);
        setDateString(e.getDate() + '/' + parseInt(e.getMonth() + 1) + '/' + e.getFullYear());
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

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('avatar', avatar);
        formData.append('id', user.id);
        formData.append('gender', checkedGender);
        formData.append('birthdate', dateString);
        formData.append('fullNameOld', user.fullName);
        formData.append('imgOld', user.img);
        try {
            console.log('lll');
            await axiosCilent.put('/zola/users', formData);

            const res = await axiosCilent.get(`/zola/users/${user.id}`);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res });

            navigate('/'); //cho nay chinh lai cho vo trang home nha
        } catch (err) {
            console.log(err);
        }
    };
    console.log(avatar);
    return (
        <div className={cx('wrapper')}>
            <Wellcome />
            <div className={cx('infor')}>
                <h1 style={{ color: '#0184e0' }}>{`Chào mừng ${user.fullName} đến với Zola!`}</h1>
                <h3>Hãy cập nhật thông tin cá nhân của mình một tí nào!</h3>
                <div className={cx('avatar')}>
                    <div className={cx('ava')}>
                        <label htmlFor="update-avatar">
                            {avatar ? (
                                <img src={avatar.preview} alt="vuong" />
                            ) : (
                                <img src={user.img ? user.img : noAvatar} alt="phuc" />
                            )}
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

                <input
                    type="file"
                    style={{ display: 'none' }}
                    id="update-avatar"
                    name="avatar"
                    onChange={handleReviewAvatar}
                />
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
                                                onChange={() => setCheckedGender(g.id === 1 ? false : true)}
                                                checked={checkedGender === (g.id === 1 ? false : true)} //checkGender === g.name
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
                                    onChange={(e) => handleChangeDate(e)}
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
