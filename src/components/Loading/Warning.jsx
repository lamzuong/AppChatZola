import Modal from 'react-modal';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../../pages/Register/Register.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
const Warning = (props) => {
    let show = props.modalWarning;
    const [modalIsOpen, setModalIsOpen] = useState(show);
    const [isShow, setIsShow] = useState(true);

    const handleConfirm = () => {
        setIsShow(false);
    };

    return (
        isShow && (
            <Modal isOpen={props.modalWarning} style={customStyles} ariaHideApp={false}>
                <div className={cx('wrapper-modal')}>
                    <div className={cx('content-modal')}>
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={cx('icon-loading')}
                            style={{ color: 'green', fontSize: '25' }}
                        />
                        <div className={cx('text-confirm')}>Phiên đăng kí của bạn hết hạn. Vui lòng đăng kí lại</div>
                    </div>
                    <button className={cx('btn-confirm-mail')} onClick={handleConfirm}>
                        Đăng kí lại
                    </button>
                </div>
            </Modal>
        )
    );
};

export default Warning;
