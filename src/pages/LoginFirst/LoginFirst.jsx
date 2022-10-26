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

    const { user } = useContext(AuthContext);

    const [birthday, setBirthday] = useState(user.birthday);
    const [checkedGender, setCheckedGender] = useState(true);
    const [value, onChange] = useState(new Date());
    const [avatar, setAvatar] = useState();

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
    avatar && console.log(avatar.name, checkedGender);

    const handleUpdate = () => {};

    return (
        <div className={cx('wrapper')}>
            <Wellcome />
            <div className={cx('infor')}>
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

                <input type="file" style={{ display: 'none' }} id="update-avatar" onChange={handleReviewAvatar} />
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
