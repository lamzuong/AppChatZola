import React from 'react';
import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Login.module.scss';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosClient from '../../api/axiosClient';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const { error, dispatch } = useContext(AuthContext);
    const userCredential = { email, password };

    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleLogin = (e) => {
        setErr('');
        let flag = true;
        //e.preventDefault();
        if (email.length === 0) {
            setErrorUsername('Không được để trống username!');
            flag = false;
        } else {
            setErrorUsername('');
        }
        if (password.length === 0) {
            setErrorPassword('Không được để trống mật khẩu!');
            flag = false;
        } else {
            setErrorPassword('');
        }

        if (flag === false) return;
        const login = async () => {
            dispatch({ type: 'LOGIN_START' });
            try {
                setLoading(true);
                setErrorUsername('');
                setErrorPassword('');
                const res = await axiosClient.post('/zola/auth/login', userCredential);
                console.log(res);
                dispatch({ type: 'LOGIN_SUCCESS', payload: res });
                setLoading(false);
            } catch (error) {
                dispatch({ type: 'LOGIN_FAILURE' });
                if (error.response.data === 'Incorrect username or password.') {
                    setErr('Tên tài khoản, mật khẩu không chính xác');
                    setLoading(false);
                } else if (error.response.data === 'User is not confirmed.') {
                    setErr('Vô xác thực mail cho t!!!');
                    setLoading(false);
                }
            }
        };
        login();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title-name-app')}>Zola</h1>
                <h2>
                    Đăng nhập tài khoản Zola
                    <br />
                    để kết nối với ứng dụng Zola Web
                </h2>
            </div>
            <div className={cx('body')}>
                {
                    <div className={cx('content')}>
                        <div className={cx('title')}>
                            <h2>Đăng nhập</h2>
                        </div>
                        <div className={cx('form-signin')}>
                            <Input
                                type="text"
                                placeholder="Email hoặc username"
                                icon={<i className="bx bxs-envelope"></i>}
                                data={setEmail}
                                onEnter={handleLogin}
                            />
                            {errorUsername.length > 0 && <span style={{ color: 'red' }}>{errorUsername}</span>}
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
                                icon={<i className="bx bxs-lock"></i>}
                                data={setPassword}
                                onEnter={handleLogin}
                            />
                            {errorPassword.length > 0 && <span style={{ color: 'red' }}>{errorPassword}</span>}
                            <div>{error && <span style={{ color: 'red' }}>{err}</span>}</div>
                            <div style={{ padding: '4px' }}></div>
                            {!loading ? (
                                <button className={cx('btn-login')} onClick={handleLogin}>
                                    Đăng nhập với mật khẩu
                                </button>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <FontAwesomeIcon
                                        icon={faSpinner}
                                        className={cx('icon-loading')}
                                        style={{ color: '#0190f3', fontSize: '25' }}
                                    />
                                </div>
                            )}

                            <div className={cx('more')}>
                                <Link to="/forgot-password" className={cx('forget-passwword')}>
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className={cx('no-account')}>
                <span>Bạn chưa có tài khoản </span>
                <Link to="/register">Đăng kí ngay</Link>
            </div>
        </div>
    );
};

export default Login;
