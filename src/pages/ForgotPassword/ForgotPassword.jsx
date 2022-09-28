import styles from './ForgotPassword.module.scss';
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
const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    Modal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
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

                            <div style={{ padding: '4px' }}></div>
                            <button className={cx('btn-login')} onClick={openModal}>
                                Tiếp tục
                            </button>
                            <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal}>
                                <div className={cx('wrapper-modal')}>
                                    <div className={cx('header-modal')}>
                                        <span>Zola-Xác nhận</span>
                                        <i class="bx bx-x" onClick={closeModal}></i>
                                    </div>
                                    <div className={cx('body-modal')}>
                                        <span>Xác nhận email:</span>
                                        <h4 className={cx('my-email')}>{email}</h4>
                                        <p className={cx('desc')}>
                                            Mã xác thực sẽ được gửi đến email của bạn. Vui lòng dùng mã xác thực này để
                                            đặt lại mật khẩu.
                                        </p>
                                    </div>
                                    <div className={cx('footer-modal')}>
                                        <Link to={'/forgot-password/confirm'} className={cx('btn-confirm')}>
                                            Xác nhận
                                        </Link>
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
        </div>
    );
};

export default ForgotPassword;
