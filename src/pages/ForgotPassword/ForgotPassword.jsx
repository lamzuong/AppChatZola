import styles from './ForgotPassword.module.scss';
import Modal from 'react-modal';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { isEmail, isPassword, isRePassword } from '../../ulities/Validations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
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
const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [stage, setStage] = useState(1);
    const [code, setCode] = useState('');
    const [errCode, setErrCode] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
    const [txtErrPassword, setTxtErrPassword] = useState('');
    const [txtRePassword, setTxtRePassword] = useState('');
    const [txtErrRePassword, setTxtErrRePassword] = useState('');
    const navigate = useNavigate();
    const { error, dispatch } = useContext(AuthContext);
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalLimitIsOpen, setModalLimitIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const openModalLimit = () => {
        setModalLimitIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeModalLimit = () => {
        setModalLimitIsOpen(false);
    };

    const _isEmail = async (stringEmail, standard) => {
        if (stringEmail.length === 0) {
            return 'Email không được để trống!';
        } else {
            if (standard.test(stringEmail) === false) {
                return 'Email không đúng định dạng!';
            } else {
                return true;
            }
        }
    };

    const handleContinue = async () => {
        let errEm = await _isEmail(email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        setErrEmail(errEm);
        if (errEm === true) {
            openModal();
        } else return;
    };

    const poolData = {
        UserPoolId: 'ap-southeast-1_cvABWaWG8',
        ClientId: 'ro3jpgd83rfom7v4h1cqsg719',
    };

    const pool = new CognitoUserPool(poolData);

    const getUser = () => {
        return new CognitoUser({
            Username: email.toLowerCase(),
            Pool: pool,
        });
    };
    const sendCode = () => {
        getUser().forgotPassword({
            onSuccess: (data) => {},
            onFailure: (err) => {},
            inputVerificationCode: (data) => {
                setStage(2);
            },
        });
        // async function login() {
        //     dispatch({ type: 'LOGIN_START' });
        //     try {
        //         const res = await axiosCilent.post('/zola/auth/login', {
        //             email: email,
        //             password: txtPassword,
        //         });
        //         dispatch({ type: 'LOGIN_SUCCESS', payload: res });
        //         navigate('/');
        //     } catch (error) {
        //         dispatch({ type: 'LOGIN_FAILURE' });
        //         console.log(error);
        //     }
        // }
    };

    const handleChangeCode = (code) => {
        if (code.length === 0) {
            setErrCode('Mã xác thực không được để trống');
            return false;
        }
        return true;
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

    const handleConfirm = (event) => {
        // let errPw = isPassword(
        //     password,
        //     /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        // );
        // let errRp = isRePassword(rePassword, password);
        // setErrPassword(errPw);
        // setErrRePassword(errRp);
        // if (errPassword === true && errRePassword === true) {
        //     getUser().confirmPassword(code, password, {
        //         onSuccess: (data) => {
        //             navigate('/login');
        //         },
        //         onFailure: (err) => {
        //             console.error('onFailure:', err);
        //         },
        //     });
        // } else return;

        const overLimited = 'LimitExceededException: Attempt limit exceeded, please try after some time.';
        const mistakeCode = 'CodeMismatchException: Invalid verification code provided, please try again.';
        const mistakeCode2 = 'ExpiredCodeException: Invalid code provided, please request a code again.';
        const codeEmpty =
            "InvalidParameterException: 2 validation errors detected: Value '' at 'confirmationCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\S]+; Value '' at 'confirmationCode' failed to satisfy constraint: Member must have length greater than or equal to 1";
        const codeEmpty2 =
            "InvalidParameterException: 3 validation errors detected: Value '' at 'confirmationCode' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\S]+; Value '' at 'confirmationCode' failed to satisfy constraint: Member must have length greater than or equal to 1; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\\S]+.*[\\S]+$";

        getUser().confirmPassword(code, txtPassword, {
            onSuccess: (data) => {
                async function login() {
                    dispatch({ type: 'LOGIN_START' });
                    try {
                        const res = await axiosCilent.post('/zola/auth/login', {
                            email: email,
                            password: txtPassword,
                        });
                        dispatch({ type: 'LOGIN_SUCCESS', payload: res });
                        navigate('/');
                    } catch (error) {
                        dispatch({ type: 'LOGIN_FAILURE' });
                        console.log(error);
                    }
                }
                login();
            },
            onFailure: (err) => {
                if (err.toString() === overLimited) {
                    <Modal isOpen={true} style={customStyles} onRequestClose={closeModalLimit} ariaHideApp={false}>
                        <div className={cx('wrapper-modal')}>
                            <div className={cx('content-modal')}>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className={cx('icon-loading')}
                                    style={{ color: 'green', fontSize: '25' }}
                                />
                                <div className={cx('text-confirm')}>
                                    Đăng kí thành công. Vui lòng xác nhận email để có thể đăng nhập và sử dụng. Xin cảm
                                    ơn.
                                </div>
                            </div>
                            <button className={cx('btn-confirm-mail')} onClick={handleConfirm}>
                                Xác nhận
                            </button>
                        </div>
                    </Modal>;
                    return;
                } else if (
                    err.toString() === mistakeCode ||
                    err.toString() === mistakeCode2 ||
                    err.toString() === codeEmpty ||
                    err.toString() === codeEmpty2
                ) {
                    setErrCode('Mã xác thực không đúng');
                    return;
                }
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            {stage === 1 ? (
                <>
                    <div className={cx('header')}>
                        <h1 className={cx('title-name-app')}>Zola</h1>
                        <h2>
                            Khôi phục mật khẩu Zola
                            <br />
                            để kết nối với ứng dụng Zola Web
                        </h2>
                    </div>
                    <div className={cx('body')}>
                        {
                            <div className={cx('content')}>
                                <div className={cx('title')}>
                                    <h2>Nhập email để nhận mã xác thực</h2>
                                </div>
                                <div className={cx('form-signin')}>
                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        icon={<i className="bx bxs-envelope"></i>}
                                        data={setEmail}
                                    />
                                    {errEmail.length > 0 && (
                                        <span style={{ color: 'red', fontSize: 12 }}>{errEmail}</span>
                                    )}
                                    <div style={{ padding: '4px' }}></div>
                                    <button className={cx('btn-login')} onClick={handleContinue}>
                                        Tiếp tục
                                    </button>
                                    <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
                                        <div className={cx('wrapper-tt')}>
                                            <div className={cx('header-modal-tt')}>
                                                <span>Zola-Xác nhận</span>
                                                <i className="bx bx-x" onClick={closeModal}></i>
                                            </div>
                                            <div className={cx('body-modal')}>
                                                <span>Xác nhận email:</span>
                                                <h4 className={cx('my-email')}>{email}</h4>
                                                <p className={cx('desc')}>
                                                    Mã xác thực sẽ được gửi đến email của bạn. Vui lòng dùng mã xác thực
                                                    này để đặt lại mật khẩu.
                                                </p>
                                            </div>
                                            <div className={cx('footer-modal')}>
                                                <button className={cx('btn-confirm')} onClick={sendCode}>
                                                    Tiếp tục
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                        }
                    </div>

                    <div className={cx('no-account')}>
                        <span>Bạn chưa có tài khoản </span>
                        <Link to="/register">Đăng kí ngay</Link>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('header-send')}>
                        <h1 className={cx('title-name-app')}>Zola</h1>
                        <h2>Khôi phục mật khẩu Zola</h2>
                    </div>
                    <div className={cx('body-send')}>
                        <div className={cx('content-send')}>
                            <div className={cx('title-send')}>
                                <h2>Nhập mã xác thực tại đây</h2>
                            </div>
                            <div className={cx('form-code-send')}>
                                <div className={cx('wrapper-ipt')}>
                                    <div className={cx('form-control')}>
                                        <i className="bx bx-key"></i>
                                        <input
                                            value={code}
                                            type="text"
                                            className={cx('ipt')}
                                            placeholder="Nhập mã xác thực tại đây"
                                            onChange={(e) => {
                                                setCode(e.target.value);
                                                handleChangeCode(e.target.value);
                                            }}
                                        />
                                        <br />
                                    </div>
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{errCode}</span>
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
                                    />
                                    <br />
                                </div>
                                <span style={{ color: 'red', fontSize: 12 }}>{txtErrRePassword}</span>

                                <div style={{ padding: '4px' }}></div>

                                <button className={cx('btn-confirm-send')} onClick={handleConfirm}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ForgotPassword;
