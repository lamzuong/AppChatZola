import classNames from 'classnames/bind';
import styles from './UserItemAdded.module.scss';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

const UserItemAdded = ({ name, ava }) => {
    return (
        <li className={cx('added-item')}>
            <div className={cx('img-added')}>
                <img src={ava} alt="" />
            </div>

            <span>{name.length > 7 ? name.slice(0, 5) + '...' : name}</span>
            <div className={cx('btnCleanText-h')}>
                <FontAwesomeIcon icon={faXmarkCircle} color=" #0091ff" />
            </div>
        </li>
    );
};

export default UserItemAdded;
