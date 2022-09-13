import classNames from 'classnames/bind';

import styles from './ListView.module.scss';

const cx = classNames.bind(styles);

const ListView = ({ children }) => {
    return <ul className={cx('wrapper')}>{children}</ul>;
};

export default ListView;
