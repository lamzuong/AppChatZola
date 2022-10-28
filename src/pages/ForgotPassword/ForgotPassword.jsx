import styles from './ForgotPassword.module.scss';
import Modal from 'react-modal';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import classNames from 'classnames/bind';
import { isEmail, isPassword, isRePassword } from '../../ulities/Validations';
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
    const [password, setPassword] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errRePassword, setErrRePassword] = useState('');
    const navigate = useNavigate();
    console.log(code);

    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
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
    const sendCode = (event) => {
        getUser().forgotPassword({
            onSuccess: (data) => {
                console.log('onSuccess:', data);
            },
            onFailure: (err) => {
                console.error('onFailure:', err);
            },
            inputVerificationCode: (data) => {
                console.log('Input code:', data);
                setStage(2);
            },
        });
    };

    const handleConfirm = (event) => {
        let errPw = isPassword(
            password,
            /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        );
        let errRp = isRePassword(rePassword, password);
        setErrPassword(errPw);
        setErrRePassword(errRp);
        if (errPassword === true && errRePassword === true) {
            getUser().confirmPassword(code, password, {
                onSuccess: (data) => {
                    console.log('onSuccess:', data);
                    navigate('/login');
                },
                onFailure: (err) => {
                    console.error('onFailure:', err);
                },
            });
        } else return;
    };
    console.log(code, password, rePassword);

    return (
        <div className={cx('wrapper')}>
            {stage === 1 ? (
                <>
                    <div className={cx('header')}>
                        <h1>
                            <a style={{ cursor: 'auto' }}></a>
                        </h1>
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
                                                    Xác nhận
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
                        <h1>
                            <a style={{ cursor: 'auto' }}></a>
                        </h1>
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
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                        <br />
                                    </div>
                                </div>
                                {code.length === 0 && (
                                    <span style={{ color: 'red', fontSize: 12 }}>Mã xác thực không được để trống!</span>
                                )}

                                <Input
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    icon={<i class="bx bxs-lock"></i>}
                                    data={setPassword}
                                />
                                {errPassword.length > 0 && (
                                    <span style={{ color: 'red', fontSize: 12 }}>{errPassword}</span>
                                )}
                                <Input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    icon={<i class="bx bxs-lock"></i>}
                                    data={setRePassword}
                                />
                                {errRePassword.length > 0 && (
                                    <span style={{ color: 'red', fontSize: 12 }}>{errRePassword}</span>
                                )}
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
