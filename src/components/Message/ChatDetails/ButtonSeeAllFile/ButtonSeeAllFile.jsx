import classNames from 'classnames/bind';
import { useState } from 'react';
import Modal from 'react-modal';
import styles from './ButtonSeeAllFile.module.scss';
import { imgStore } from '../../../../DataTest/DataTest';
import StoreItem from '../../../Store/StoreItem/StoreItem';
import ListViewItem from '../../../ListView/ListViewItem/ListViewItem';

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

const items = [
    {
        id: 1,
        name: 'Ảnh/Video',
    },
    {
        id: 2,
        name: 'Files',
    },
];

const ButtonSeeAllFile = () => {
    const [showModal, setShowModal] = useState(false);
    const [choose, setChoose] = useState('1');
    Modal.setAppElement('#root');

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleChoose = (id) => {
        setChoose(id);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <button className={cx('btn-see-all')} onClick={handleShowModal}>
                Xem tất cả
            </button>
            <Modal isOpen={showModal} style={customStyles} onRequestClose={closeModal}>
                <div className={cx('wrapper')}>
                    <ul className={cx('header')}>
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className={cx({ active: item.id === choose })}
                                onClick={() => handleChoose(item.id)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    <div className={cx('content-w')}>
                        {choose.toString() === '1' ? (
                            <div className={cx('content', 'gridv2')}>
                                {imgStore.map((img) => (
                                    <>
                                        <div className={cx('wrapper-media')}>
                                            <img
                                                src={img.img}
                                                alt="img"
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src =
                                                        "data:image/svg+xml;charset=utf-8,%3Csvg width='68' height='54' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cfilter x='-7.2%25' y='-7.2%25' width='114.4%25' height='114.4%25' filterUnits='objectBoundingBox' id='a'%3E%3CfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.10118007 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3Cfilter x='-.7%25' y='1.2%25' width='101.4%25' height='109.3%25' filterUnits='objectBoundingBox' id='c'%3E%3CfeOffset in='SourceAlpha' result='shadowOffsetOuter1'/%3E%3CfeGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0858828671 0' in='shadowBlurOuter1'/%3E%3C/filter%3E%3Cpath d='M20.51 8.048h24.88c2.942 0 4.009.306 5.084.882a5.997 5.997 0 012.495 2.495c.575 1.075.882 2.142.882 5.084v24.878c0 2.942-.307 4.01-.882 5.085a5.997 5.997 0 01-2.495 2.495c-1.075.575-2.142.881-5.084.881H20.51c-2.942 0-4.008-.306-5.084-.881a5.997 5.997 0 01-2.495-2.495c-.575-1.076-.881-2.143-.881-5.085V16.51c0-2.942.306-4.009.881-5.084a5.997 5.997 0 012.495-2.495c1.076-.576 2.142-.882 5.084-.882z' id='b'/%3E%3Cpath d='M55.357 29.174l10.86 17.996a3.577 3.577 0 01-3.063 5.424H41.435a3.577 3.577 0 01-3.062-5.424l10.86-17.996a3.577 3.577 0 016.124 0z' id='d'/%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(-.05 -.05)'%3E%3Cpath d='M8.774 8.63l24.14-6.018c2.854-.712 3.963-.673 5.146-.375a5.997 5.997 0 013.024 1.817c.819.904 1.374 1.866 2.086 4.72l6.018 24.14c.712 2.854.673 3.963.375 5.146a5.997 5.997 0 01-1.817 3.024c-.904.819-1.866 1.374-4.72 2.086l-24.14 6.018c-2.854.712-3.963.673-5.146.375a5.997 5.997 0 01-3.024-1.817c-.819-.904-1.374-1.866-2.086-4.72l-6.018-24.14c-.712-2.854-.673-3.963-.375-5.146a5.997 5.997 0 011.817-3.024c.904-.819 1.866-1.374 4.72-2.086z' fill='%23ABCDFF'/%3E%3Cuse fill='%23000' filter='url(%23a)' xlink:href='%23b'/%3E%3Cuse fill='%23FFF' xlink:href='%23b'/%3E%3Cpath d='M43.316 29.205c.053.053.105.107.155.163l6.528 7.34v.83c0 2.941-.306 4.008-.881 5.084a5.997 5.997 0 01-2.495 2.495c-1.075.575-2.142.881-5.084.881H24.36c-2.942 0-4.008-.306-5.084-.881a5.997 5.997 0 01-2.495-2.495c-.575-1.076-.881-2.143-.881-5.085v-.407l5.154-4.132a3.85 3.85 0 015.154.305l1.028 1.046a3.85 3.85 0 005.468.023l5.168-5.167a3.85 3.85 0 015.444 0z' fill='%23ABCDFF'/%3E%3Ccircle fill='%23ABCDFF' cx='23.16' cy='20.698' r='3.3'/%3E%3C/g%3E%3Cg transform='translate(-1 -1)'%3E%3Cuse fill='%23000' filter='url(%23c)' xlink:href='%23d'/%3E%3Cuse fill='%23FFE9C3' xlink:href='%23d'/%3E%3C/g%3E%3Cg transform='translate(50.312 33.417)' fill='%23F9A716'%3E%3Ccircle cx='1.228' cy='12.528' r='1.228'/%3E%3Cpath d='M0 1.121v7.583c0 .62.55 1.122 1.228 1.122.679 0 1.228-.503 1.228-1.122V1.121C2.456.502 1.906 0 1.228 0 .55 0 0 .502 0 1.121z' fill-rule='nonzero'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
                                                }}
                                            />
                                        </div>
                                    </>
                                ))}
                            </div>
                        ) : (
                            <>
                                <ListViewItem
                                    icon={<i class="bx bx-file" style={{ marginRight: '4px', fontSize: '24px' }}></i>}
                                    title="nhom5.doc"
                                />
                                <ListViewItem
                                    icon={<i class="bx bx-file" style={{ marginRight: '4px', fontSize: '24px' }}></i>}
                                    title="nhom5.doc"
                                />
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ButtonSeeAllFile;
