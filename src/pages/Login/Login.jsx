import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email, password);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>
                    <a style={{ cursor: 'auto' }}></a>
                </h1>
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
                                icon={<i class="bx bxs-envelope"></i>}
                                data={setEmail}
                            />
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
                                icon={<i class="bx bxs-lock"></i>}
                                data={setPassword}
                            />
                            <div style={{ padding: '4px' }}></div>
                            <button className={cx('btn-login')}>Đăng nhập với mật khẩu</button>
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
