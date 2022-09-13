import classNames from 'classnames/bind';

import styles from './StoreItem.module.scss';

const cx = classNames.bind(styles);
const StoreItem = ({ title, children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('store-item-header')}>
                <span>{title}</span>
            </div>
            {children}
        </div>
    );
};
export default StoreItem;
