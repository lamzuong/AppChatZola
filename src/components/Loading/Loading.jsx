import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const Loading = () => {
    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon
                    icon={faSpinner}
                    className={cx('icon-loading')}
                    style={{ color: '#0190f3', fontSize: '25' }}
                />
            </div>
        </div>
    );
};

export default Loading;
