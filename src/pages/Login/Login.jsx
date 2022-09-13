import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Login = (props) => {
    const login_methods = [
        {
            id: '1',
            name: 'VỚI MÃ QR',
        },
        {
            id: '2',
            name: 'VỚI SỐ ĐIỆN THOẠI',
        },
    ];
    const [active, setActive] = useState('1');

    const handleActive = (id) => {
        setActive(id);
    };
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
                <div className={cx('tab')}>
                    <ul>
                        {login_methods.map((method) => (
                            <li
                                key={method.id}
                                className={cx({ active: active === method.id })}
                                onClick={() => handleActive(method.id)}
                            >
                                {method.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {
                    <div className={cx('content')}>
                        {active === '2' && (
                            <div className={cx('form-signin')}>
                                <div className={cx('form-control')}>
                                    <i class="bx bx-mobile"></i>
                                    <input type="text" className={cx('ipt')} placeholder="Số điện thoại" />
                                </div>
                                <div className={cx('form-control')}>
                                    <i class="bx bxs-lock-alt"></i>
                                    <input type="password" className={cx('ipt')} placeholder="Mật khẩu" />
                                </div>
                                <div style={{ padding: '4px' }}></div>
                                <button className={cx('btn-login')}>Đăng nhập với mật khẩu</button>
                                <div className={cx('more')}>
                                    <a href="" className={cx('forget-passwword')}>
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>

            <div className={cx('no-account')}>
                <span>Bạn chưa có tài khoản </span>
                <a href="">Đăng kí ngay!</a>
            </div>
        </div>
    );
};

export default Login;
