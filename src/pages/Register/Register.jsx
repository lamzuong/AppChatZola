import classNames from 'classnames/bind';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
import Input from '../../components/Input/Input';
import { useState, useContext } from 'react';
import { isEmail, isEmail2, isFullName, isPassword, isRePassword, isUsername } from '../../ulities/Validations';
import axiosClient from '../../api/axiosClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

import Loading from '../../components/Loading/Loading';
import { Fragment } from 'react';
import { useRef } from 'react';
import Warning from '../../components/Loading/Warning';
import { useEffect } from 'react';
import axiosCilent from '../../api/axiosClient';

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

const Register = (props) => {
    const [isConfirm, setIsConfirn] = useState(false);
    const [modalWaring, setModalWarning] = useState(false);
    const { error, dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [errFullName, setErrFullName] = useState('');
    const [password, setPassword] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errRePassword, setErrRePassword] = useState('');

    //----------------------new state chang ui register--------------------------//
    const [txtMail, setTxtMail] = useState('');
    const [txtErrMail, setTxtErrMail] = useState('');
    const [txtFullname, setTxtFullname] = useState('');
    const [txtErrFullname, setTxtErrFullname] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [txtErrPassword, setTxtErrPassword] = useState('');
    const [txtRePassword, setTxtRePassword] = useState('');
    const [txtErrRePassword, setTxtErrRePassword] = useState('');
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const listUser = await axiosCilent.get('/zola/users');
            setListUser([...listUser]);
        };
        getUsers();
    }, []);

    const handleChangeEmail = (txtMail) => {
        console.log(txtMail);

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (txtMail.length === 0) {
            setTxtErrMail('Email không được để trống!');
            return false;
        } else {
            if (reg.test(txtMail) === false) {
                setTxtErrMail('Email không đúng định dạng!');
                return false;
            } else {
                //const listUser = await axiosCilent.get('/zola/users');
                for (let i = 0; i < listUser.length; i++) {
                    if (listUser[i].email === txtMail) {
                        setTxtErrMail('Email đã tồn tại!');
                        return false;
                    }
                }
                setTxtErrMail('');
                return true;
            }
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

    const handleChangeFullName = (txtFullname) => {
        const reg = /^[a-zA-Z ]{1,30}$/;
        if (txtFullname.length === 0) {
            setTxtErrFullname('Họ tên không được để trống!');
            return false;
        } else {
            if (reg.test(removeAscent(txtFullname)) === false) {
                setTxtErrFullname('Họ và tên không bao gồm chữ số, kí tự đặc biệt và tối đa 30 kí tự');
                return false;
            } else {
                setTxtErrFullname('');
                return true;
            }
        }
    };

    const handleChangePassword = (txtPassword) => {
        const reg = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
        if (txtPassword.length === 0) {
            setTxtErrPassword('Mật khẩu không được để trống!');
            return false;
        } else {
            if (reg.test(txtPassword) === false) {
                setTxtErrPassword(
                    'Mật khẩu phải bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 kỹ tự.',
                );
                return false;
            } else {
                setTxtErrPassword('');
                return true;
            }
        }
    };

    const handleChangeRePassword = (txtRePassword) => {
        const reg = txtPassword;
        if (txtRePassword.length === 0) {
            setTxtErrRePassword('Mật khẩu không được để trống!');
        } else {
            if (!(reg === txtRePassword)) {
                setTxtErrRePassword('Mật khẩu không trùng khớp!');
            } else {
                setTxtErrRePassword('');
                return true;
            }
        }
    };

    const navigate = useNavigate();

    let timerId = useRef();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const register = async () => {
        const errEm = handleChangeEmail(txtMail);
        const errFn = handleChangeFullName(txtFullname);
        const errPw = handleChangePassword(txtPassword);
        const errRp = handleChangeRePassword(txtRePassword);
        console.log(errEm, errFn, errPw, errRp);
        try {
            if (errEm === true && errFn === true && errPw === true && errRp === true) {
                const user = { email: txtMail, password: txtPassword, fullName: txtFullname };
                setLoading(true);
                await axiosClient.post('/zola/auth/register', user);
                setLoading(false);
                return true;
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegister = async (e) => {
        let result = await register();
        if (result === true) {
            openModal();
            setLoading(true);
            timerId.current = setInterval(async () => {
                const login = async () => {
                    dispatch({ type: 'LOGIN_START' });
                    let userCredential = { email: txtMail, password: txtPassword };
                    try {
                        setLoading(true);
                        const res = await axiosClient.post('/zola/auth/login', userCredential);
                        dispatch({ type: 'LOGIN_SUCCESS', payload: res });
                        clearInterval(timerId.current);
                        navigate('/');
                    } catch (error) {
                        dispatch({ type: 'LOGIN_FAILURE' });
                    }
                };
                login();
            }, 1000);
        }
        //console.log(txtMail, txtFullname, txtPassword, txtRePassword);
    };

    const handleConfirm = () => {
        setModalIsOpen(false);
        setIsConfirn(true);
    };
    return (
        <Fragment>
            {isConfirm && (
                <Loading
                    state={setIsConfirn}
                    stateW={setModalWarning}
                    usernameReg={txtMail.split('@')[0]}
                    mailReg={txtMail}
                />
            )}
            {modalWaring && <Warning modalWarning={modalWaring} />}
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h2>
                        Đăng kí tài khoản Zola
                        <br />
                        để kết nối với ứng dụng Zola Web
                    </h2>
                </div>
                <div className={cx('body')}>
                    {
                        <div className={cx('content')}>
                            <div className={cx('title')}>
                                <h2>Đăng kí</h2>
                            </div>
                            <div className={cx('form-signin')}>
                                <div className={cx('form-control')}>
                                    <i className="bx bxs-envelope"></i>
                                    <input
                                        value={txtMail}
                                        type="text"
                                        className={cx('ipt')}
                                        placeholder="Email"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setTxtMail(e.target.value);
                                            handleChangeEmail(e.target.value);
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleRegister();
                                            }
                                        }}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtErrMail}</span>

                                <div className={cx('form-control')}>
                                    <i className="bx bxs-envelope"></i>
                                    <input
                                        value={txtFullname}
                                        type="text"
                                        className={cx('ipt')}
                                        placeholder="Họ và tên"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setTxtFullname(e.target.value);
                                            handleChangeFullName(e.target.value);
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleRegister();
                                            }
                                        }}
                                    />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtErrFullname}</span>
                                <div className={cx('form-control')}>
                                    <i className="bx bxs-lock"></i>
                                    <input
                                        value={txtPassword}
                                        type="password"
                                        className={cx('ipt')}
                                        placeholder="Mật khẩu"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setTxtPassword(e.target.value);
                                            handleChangePassword(e.target.value);
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleRegister();
                                            }
                                        }}
                                    />
                                    <br />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtErrPassword}</span>
                                <div className={cx('form-control')}>
                                    <i className="bx bxs-lock"></i>
                                    <input
                                        value={txtRePassword}
                                        type="password"
                                        className={cx('ipt')}
                                        placeholder="Nhập lại mật khẩu"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setTxtRePassword(e.target.value);
                                            handleChangeRePassword(e.target.value);
                                        }}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleRegister();
                                            }
                                        }}
                                    />
                                    <br />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtErrRePassword}</span>

                                <div style={{ padding: '4px' }}></div>
                                <button className={cx('btn-register')} onClick={handleRegister}>
                                    Đăng kí
                                </button>
                                {
                                    <Modal
                                        isOpen={modalIsOpen}
                                        style={customStyles}
                                        onRequestClose={closeModal}
                                        ariaHideApp={false}
                                    >
                                        <div className={cx('wrapper-modal')}>
                                            <div className={cx('content-modal')}>
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className={cx('icon-loading')}
                                                    style={{ color: 'green', fontSize: '25' }}
                                                />
                                                <div className={cx('text-confirm')}>
                                                    Đăng kí thành công. Vui lòng xác nhận email để có thể đăng nhập và
                                                    sử dụng. Xin cảm ơn.
                                                </div>
                                            </div>
                                            <button className={cx('btn-confirm-mail')} onClick={handleConfirm}>
                                                Xác nhận
                                            </button>
                                        </div>
                                    </Modal>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
