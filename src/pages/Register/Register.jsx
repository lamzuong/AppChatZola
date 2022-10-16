import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
import Input from '../../components/Input/Input';
import { isEmail, isPassword, isRePassword, isUsername } from '../../ulities/Validations';
import { useState } from 'react';
import axiosClient from '../../api/axiosClient';

const cx = classNames.bind(styles);

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();
    const user = { email, username, password, fullName };
    const handleRegister = (e) => {
        e.preventDefault();
        const register = async () => {
            try {
                await axiosClient.post('/zola/auth/register', user);
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        };
        register();
    };

    //console.log('vuong@gmail.com'.match('/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/'));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
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
                            <h2>Đăng kí</h2>
                        </div>
                        <div className={cx('form-signin')}>
                            <Input
                                type="text"
                                placeholder="Username"
                                icon={<i className="bx bxs-user"></i>}
                                standard={/^\w{3,}$/}
                                validation={isUsername}
                                data={setUsername}
                            />
                            <Input
                                type="text"
                                placeholder="Email"
                                icon={<i className="bx bxs-envelope"></i>}
                                standard={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}
                                validation={isEmail}
                                data={setEmail}
                            />

                            <Input
                                type="text"
                                placeholder="Họ và tên"
                                icon={<i className="bx bxs-envelope"></i>}
                                data={setFullName}
                            />
                            <Input
                                type="password"
                                placeholder="Mật khẩu"
                                icon={<i className="bx bxs-lock"></i>}
                                standard={/^\w{8,}$/}
                                // validation={isPassword}
                                data={setPassword}
                            />

                            <Input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                icon={<i className="bx bxs-lock"></i>}
                                standard={password}
                                validation={isRePassword}
                            />
                            <div style={{ padding: '4px' }}></div>
                            <button className={cx('btn-register')} onClick={handleRegister}>
                                Đăng kí
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Register;
