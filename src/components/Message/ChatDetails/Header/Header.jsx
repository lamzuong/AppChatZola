import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = ({ title, className }) => {
    const classes = cx('wrapper', { [className]: className });
    return (
        <div className={classes}>
            <div>{title}</div>
        </div>
    );
};

export default Header;
