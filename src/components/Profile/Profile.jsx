import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import noAvatar from '../../assets/noAvatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-date-picker';
import axiosCilent from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { flexbox } from '@mui/system';
import axios from 'axios';

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
    const [modalSucess, setModalSucess] = useState(false);
    const [modalChangePassIsOpen, setModalChangePassIsOpen] = useState(false);
    const [txtOldPassword, setTxtOldPassword] = useState('');
    const [txtErrOldPassword, setTxtErrOldPassword] = useState('');
    const [txtNewPassword, setTxtNewPassword] = useState('');
    const [txtErNewPassword, setTxtErrNewPassword] = useState('');
    const [txtReNewPassword, setTxtReNewPassword] = useState('');
    const [txtReErNewPassword, setTxtReErrNewPassword] = useState('');
    const openModal = () => {
        setModalIsOpen(true);
    };

    const openModalChangePass = () => {
        setModalChangePassIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeModalChangePass = () => {
        setTxtErrNewPassword('');
        setTxtReErrNewPassword('');
        setTxtErrOldPassword('');
        setTxtOldPassword('');
        setTxtReNewPassword('');
        setTxtNewPassword('');
        setModalChangePassIsOpen(false);
    };
    const { user, dispatch } = useContext(AuthContext);

    const [nameDisplay, setNameDisplay] = useState(user.fullName);
    //const [gender, setGender] = useState(user.gender);
    const [birthday, setBirthday] = useState(user.birthday);
    const [checkGender, setCheckGender] = useState(user.gender);

    //---------------------new state------------------------//
    const [avatar, setAvatar] = useState();
    const [errBirthday, setErrBirthday] = useState('');
    const [value, onChange] = useState(new Date());
    const [errNameDisplay, setErrNameDisplay] = useState('');
    const [dateString, setDateString] = useState(
        value.getDate() + '/' + parseInt(value.getMonth() + 1) + '/' + value.getFullYear(),
    );
    const navigate = useNavigate();

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

    const handleChangeDate = (e) => {
        onChange(e);
        setDateString(e.getDate() + '/' + parseInt(e.getMonth() + 1) + '/' + e.getFullYear());
        const date = new Date();
        if (date.getFullYear() - e.getFullYear() < 16) {
            setErrBirthday('Tuổi phải từ 16 tuổi trở lên');
        } else {
            setBirthday(e.getDate() + '/' + parseInt(e.getMonth() + 1) + '/' + e.getFullYear());
            setErrBirthday('');
        }
    };

    function removeAscent(str) {
        if (str === null || str === undefined) return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        return str;
    }

    const validateFullname = (fullName) => {
        if (nameDisplay.length === 0) {
            setErrNameDisplay('Tên hiển thị không được để trống!!');
            return false;
        } else {
            var re = /^[a-zA-Z ]{1,30}$/;
            if (re.test(removeAscent(fullName)) === false) {
                setErrNameDisplay('Tên hiển thị thị không đúng định dạng!');
                return false;
            } else {
                setErrNameDisplay('');
                return true;
            }
        }
    };

    const handleUpdate = async () => {
        const date = new Date();
        if (date.getFullYear() - parseInt(dateString.split('/')[2]) < 16) {
            setErrBirthday('Tuổi phải từ 16 tuổi trở lên');
            return;
        }
        validateFullname(nameDisplay.trim());
        if (errBirthday.length > 0 || errNameDisplay.length > 0) return;
        else {
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('id', user.id);
            formData.append('gender', checkGender);
            formData.append('birthdate', dateString);
            formData.append('fullName', nameDisplay);
            formData.append('fullNameOld', user.fullName);
            formData.append('imgOld', user.img);
            try {
                if (errBirthday.length > 0) {
                    return;
                }
                await axiosCilent.put('/zola/users', formData);
                const res = await axiosCilent.get(`/zola/users/${user.id}`);
                dispatch({ type: 'LOGIN_SUCCESS', payload: res });
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
        console.log(avatar, nameDisplay, checkGender, dateString);
    };

    const handleChangeTxtOldPassword = (txtPassword) => {
        const reg = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
        if (txtPassword.length === 0) {
            setTxtErrOldPassword('Mật khẩu không được để trống!');
            return false;
        } else {
            if (reg.test(txtPassword) === false) {
                setTxtErrOldPassword(
                    'Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự.',
                );
                return false;
            } else {
                setTxtErrOldPassword('');
                return true;
            }
        }
    };

    const handleChangeNewTxtPassword = (txtPassword) => {
        const reg = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
        if (txtPassword.length === 0) {
            setTxtErrNewPassword('Mật khẩu không được để trống!');
            return false;
        } else {
            if (reg.test(txtPassword) === false) {
                setTxtErrNewPassword(
                    'Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự.',
                );
                return false;
            } else {
                setTxtErrNewPassword('');
                return true;
            }
        }
    };

    const handleChangNewTxtRePassword = (txtRePassword) => {
        const reg = txtNewPassword;
        if (txtRePassword.length === 0) {
            setTxtReErrNewPassword('Mật khẩu không được để trống!');
        } else {
            if (!(reg === txtRePassword)) {
                setTxtReErrNewPassword('Mật khẩu không trùng khớp!');
            } else {
                setTxtReErrNewPassword('');
                return true;
            }
        }
    };

    const repassword = async (oldPass) => {
        try {
            const password = txtNewPassword;
            const username = user.email;
            await axiosCilent.post('/zola/auth/changePassword', {
                password: password,
                username: username,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePassword = async () => {
        const errP = handleChangeTxtOldPassword(txtOldPassword);
        const errNP = handleChangeNewTxtPassword(txtNewPassword);
        const errRNP = handleChangNewTxtRePassword(txtReNewPassword);

        if (errP === false || errNP === false || errRNP === false) return;
        else {
            try {
                const email = user.email;
                const password = txtOldPassword;
                const res = await axiosCilent.post('zola/auth/login', {
                    email: email,
                    password: password,
                });
                repassword();
                setModalSucess(true);
            } catch (error) {
                setTxtErrOldPassword('Mật khẩu hiện tại không đúng');
            }
        }
    };

    const handleConfirm = () => {
        setModalSucess(false);
        setModalChangePassIsOpen(false);
        setTxtOldPassword('');
        setTxtReNewPassword('');
        setTxtNewPassword('');
    };
    //Đổi mật khẩu
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
                                        <input
                                            type="file"
                                            style={{ display: 'none' }}
                                            id="update-avatar"
                                            name="avatar"
                                            onChange={handleReviewAvatar}
                                        />
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    id="update-avatar"
                                    name="avatar"
                                    onChange={handleReviewAvatar}
                                />
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

                                    {errNameDisplay.length > 0 && (
                                        <span style={{ color: 'red', fontSize: '12px' }}>{errNameDisplay}</span>
                                    )}

                                    <br />
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
                                                            onChange={() => setCheckGender(g.id === 1 ? false : true)}
                                                            checked={checkGender === (g.id === 1 ? false : true)} //checkGender === g.name
                                                        />
                                                        <span style={{ marginLeft: 10 }}>{g.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className={cx('change-detail')}>
                                        <div className={cx('label')}>Ngày sinh</div>

                                        <div>
                                            <DatePicker
                                                onChange={(e) => handleChangeDate(e)}
                                                value={value}
                                                className={cx('custom-date-picker')}
                                                selected={value}
                                            />
                                        </div>
                                        {errBirthday.length > 0 && (
                                            <span style={{ color: 'red', fontSize: '12px' }}>{errBirthday}</span>
                                        )}
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
                    <button className={cx('btn-update-info')} onClick={openModalChangePass}>
                        Đổi mật khẩu
                    </button>
                    <Modal isOpen={modalChangePassIsOpen} style={customStyles} onRequestClose={closeModalChangePass}>
                        <div className={cx('wrapper-modal-changepass')}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 14px' }}>
                                <span style={{ textAlign: 'center', color: '#000', fontWeight: 'bold' }}>
                                    Thay đổi mật khẩu
                                </span>
                                <i className="bx bx-x" style={{ fontSize: 24 }} onClick={closeModalChangePass} />
                            </div>

                            <div className={cx('form')}>
                                <div className={cx('form-control')}>
                                    <i className="bx bxs-lock"></i>
                                    <input
                                        value={txtOldPassword}
                                        type="text"
                                        className={cx('ipt')}
                                        placeholder="Mật khẩu cũ"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setTxtOldPassword(e.target.value);
                                            handleChangeTxtOldPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtErrOldPassword}</span>
                                <div className={cx('form-control')}>
                                    <i className="bx bxs-lock"></i>
                                    <input
                                        value={txtNewPassword}
                                        type="text"
                                        className={cx('ipt')}
                                        placeholder="Mật khẩu mới"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setTxtNewPassword(e.target.value);
                                            handleChangeNewTxtPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtErNewPassword}</span>
                                <div className={cx('form-control')}>
                                    <i className="bx bxs-lock"></i>
                                    <input
                                        value={txtReNewPassword}
                                        type="text"
                                        className={cx('ipt')}
                                        placeholder="Nhập lại mật khẩu mới"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setTxtReNewPassword(e.target.value);
                                            handleChangNewTxtRePassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtReErNewPassword}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className={cx('btn-changePass')} onClick={handleChangePassword}>
                                    Thay đổi
                                </button>
                                <Modal isOpen={modalSucess} style={customStyles}>
                                    <div className={cx('wrapper-modal-sucess')}>
                                        <span style={{ color: '#000', fontWeight: 'bold' }}>
                                            Thay đổi mật khẩu thành công!
                                        </span>
                                        <button onClick={handleConfirm} className={cx('btn-confirm-sucess')}>
                                            Xác nhận
                                        </button>
                                    </div>
                                </Modal>
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
