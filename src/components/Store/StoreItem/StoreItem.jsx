import classNames from 'classnames/bind';

import styles from './StoreItem.module.scss';

const cx = classNames.bind(styles);
const StoreItem = ({ title, children, style = null, icon, onclick = () => {} }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('store-item-header')} onClick={onclick}>
                {icon}
                <span style={{ ...style }}>{title}</span>
            </div>
            {children}
        </div>
    );
};
export default StoreItem;
