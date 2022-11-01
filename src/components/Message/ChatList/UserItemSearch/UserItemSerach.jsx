import style from './UserItemSearch.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const UserItemSearch = ({ name, ava }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src={ava} alt="" />
            </div>
            <div className={cx('name')}>
                <span>{name}</span>
            </div>
            {/* <button className={cx('btn-add-frend')}>Kết bạn</button> */}
        </div>
    );
};

export default UserItemSearch;
