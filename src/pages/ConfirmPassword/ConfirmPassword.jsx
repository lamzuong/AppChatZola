import styles from './ConfirmPassword.module.scss';
import Modal from 'react-modal';
import { useState } from 'react';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

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
const ConfirmPassword = (props) => {
    const [code, setCode] = useState('');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>
                    <a style={{ cursor: 'auto' }}></a>
                </h1>
                <h2>Khôi phục mật khẩu Zola</h2>
            </div>
            <div className={cx('body')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h2>Nhập mã xác thực tại đây</h2>
                    </div>
                    <div className={cx('form-code')}>
                        <Input type="text" placeholder="Nhập mã xác thực tại đây" icon={<i class="bx bx-key"></i>} />
                        <Input type="password" placeholder="Mật khẩu mới" icon={<i class="bx bxs-lock"></i>} />
                        <Input type="password" placeholder="Xác nhận mật khẩu" icon={<i class="bx bxs-lock"></i>} />
                        <div style={{ padding: '4px' }}></div>
                        <button className={cx('btn-confirm')}>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
