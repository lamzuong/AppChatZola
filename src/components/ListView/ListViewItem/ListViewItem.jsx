import classNames from 'classnames/bind';

import styles from './ListViewItem.module.scss';

const cx = classNames.bind(styles);

const ListViewItem = ({ title, icon, className }) => {
    const classes = cx('item-view', { [className]: className });
    return (
        <li className={classes}>
            {icon}
            {title}
        </li>
    );
};

export default ListViewItem;
