import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Warning from './Warning';

import axiosCilent from '../../api/axiosClient';
const cx = classNames.bind(styles);

const Loading = (props) => {
    const [countdown, setCountdown] = useState(120);

    const refdiv = useRef();
    const ref = useRef(props.state);

    useEffect(() => {
        const deleteUser = async () => {
            const req = { username: props.usernameReg, email: props.mailReg };
            await axiosCilent.delete('/zola/auth/deleteUser', {
                data: req,
            });
        };
        if (countdown === 0) {
            props.state(false);
            props.stateW(true);
            deleteUser();
            return;
        }
        const timerId = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [countdown > 0]);

    const handleCancel = () => {
        const deleteUser = async () => {
            const req = { username: props.usernameReg, email: props.mailReg };
            await axiosCilent.delete('/zola/auth/deleteUser', {
                data: req,
            });
        };
        deleteUser();
        props.state(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <h1> Vui lòng xác nhận mail của bạn trong vòng:</h1>

                <div className={cx('wrapper-countdown')} ref={refdiv}>
                    <div className={cx('clock')}>
                        <h2 className={cx('second')}>{countdown} giây</h2>
                    </div>
                </div>
                <button className={cx('btn-cancel')} onClick={handleCancel}>
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default Loading;
