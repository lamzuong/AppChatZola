import classNames from 'classnames/bind';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import { isEmail, isFullName, isPassword, isRePassword, isUsername } from '../../ulities/Validations';
import axiosClient from '../../api/axiosClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as ReactBootStrap from 'react-bootstrap';
import Loading from '../../components/Loading/Loading';
import { Fragment } from 'react';

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
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [username, setUsername] = useState('');
    const [errUsername, setErrUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [errFullName, setErrFullName] = useState('');
    const [password, setPassword] = useState('');
    const [errPassword, setErrPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errRePassword, setErrRePassword] = useState('');

    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        navigate('/login');
    };

    const user = { email, username, password, fullName };

    const register = async () => {
        let errUn = await isUsername(username, /^\w{3,}$/);
        let errEm = await isEmail(email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        let errFn = isFullName(fullName, /^[a-zA-Z ]{1,30}$/);
        let errPw = isPassword(
            password,
            /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
        );
        let errRp = isRePassword(rePassword, password);

        setErrUsername(errUn);
        setErrFullName(errFn);
        setErrEmail(errEm);
        setErrPassword(errPw);
        setErrRePassword(errRp);
        try {
            if (errUn === true && errEm === true && errFn === true && errPw === true && errRp === true) {
                setLoading(true);
                await axiosClient.post('/zola/auth/register', user);
                console.log('xong');
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
        console.log('1');
        let result = await register();
        if (result === true) openModal();
    };

    //console.log('vuong@gmail.com'.match('/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/'));
    return (
        <Fragment>
            {loading && <Loading />}
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
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    icon={<i className="bx bxs-user"></i>}
                                    //standard={/^\w{3,}$/}
                                    //validation={isUsername}
                                    data={setUsername}
                                    onEnter={handleRegister}
                                />

                                {errUsername.length > 0 && (
                                    <span style={{ color: 'red', fontSize: 12 }}>{errUsername}</span>
                                )}
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    icon={<i className="bx bxs-envelope"></i>}
                                    //standard={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
                                    //validation={isEmail}
                                    data={setEmail}
                                    onEnter={handleRegister}
                                />
                                {errEmail.length > 0 && <span style={{ color: 'red', fontSize: 12 }}>{errEmail}</span>}
                                <Input
                                    type="text"
                                    placeholder="Họ và tên"
                                    icon={<i className="bx bxs-envelope"></i>}
                                    data={setFullName}
                                    onEnter={handleRegister}
                                />
                                {errFullName.length > 0 && (
                                    <span style={{ color: 'red', fontSize: 12 }}>{errFullName}</span>
                                )}
                                <Input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    icon={<i className="bx bxs-lock"></i>}
                                    //standard={/^\w{8,}$/}
                                    // validation={isPassword}
                                    data={setPassword}
                                    onEnter={handleRegister}
                                />
                                {errPassword.length > 0 && (
                                    <span style={{ color: 'red', fontSize: 12 }}>{errPassword}</span>
                                )}
                                <Input
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    icon={<i className="bx bxs-lock"></i>}
                                    data={setRePassword}
                                    //standard={password}
                                    //validation={isRePassword}
                                    onEnter={handleRegister}
                                />
                                {errRePassword.length > 0 && (
                                    <span style={{ color: 'red', fontSize: 12 }}>{errRePassword}</span>
                                )}
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

                                            <button className={cx('btn-confirm-mail')} onClick={closeModal}>
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
