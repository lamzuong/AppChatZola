import styles from './Letter.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Letter = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('ava')}>
                    <img src="https://i.pinimg.com/736x/b5/13/02/b513025f923ab9f85c7900f58f871d19.jpg" alt="" />
                </div>
                <span>Minh Vuong</span>
            </div>
            <div className={cx('btns')}>
                <button className={cx('btn-reject')}>Từ chối</button>
                <button className={cx('btn-allow')}>Chấp nhận</button>
            </div>
        </div>
    );
};
export default Letter;
