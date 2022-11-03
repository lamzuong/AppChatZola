import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import style from './OptionMess.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-modal';
import UserItemSearch from '../../../ChatList/UserItemSearch/UserItemSerach';

const cx = classNames.bind(style);

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
const OptionMess = ({ noOwn }) => {
    const [showMore, setShowMore] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
        setShowMore(false);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {});
    return (
        <Tippy
            visible={showMore}
            interactive={true}
            render={(attrs) => (
                <ul className={cx('wrapper-more')} tabIndex="-1" {...attrs}>
                    {!noOwn && <li onClick={() => alert('ll')}>Thu hồi</li>}
                    <li onClick={openModal}>Chuyển tiếp</li>
                    <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={closeModal} ariaHideApp={false}>
                        <div className={cx('wrapper-modal')}>
                            <div className={cx('header-md')}>
                                <span className={cx('title')}>Chuyển tiếp </span>
                                <FontAwesomeIcon icon={faXmark} className={cx('close-md')} onClick={closeModal} />
                            </div>
                            <div className={cx('body-md')}>
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />

                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                                <UserItemSearch
                                    name="Minh Vuong"
                                    ava="https://i.pinimg.com/736x/18/b7/c8/18b7c8278caef0e29e6ec1c01bade8f2.jpg"
                                    button="Gửi"
                                />
                            </div>
                        </div>
                    </Modal>
                </ul>
            )}
        >
            <div onClick={() => setShowMore(!showMore)}>
                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className={cx('icon-more')}
                    style={{ color: '#ccc', fontSize: '25', margin: '0 10', cursor: 'pointer' }}
                />
            </div>
        </Tippy>
    );
};

export default OptionMess;
