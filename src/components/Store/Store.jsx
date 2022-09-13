import classNames from 'classnames/bind';

import styles from './Store.module.scss';

const cx = classNames.bind(styles);

const Store = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default Store;
