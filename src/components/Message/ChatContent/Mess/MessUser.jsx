import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MessUser.module.scss';

const cx = classNames.bind(styles);

const MessUser = (props) => {
    return (
        <div className={cx('message', props.own ? 'own' : '')}>
            <div className={cx('messTop')}>
                <div className={cx('messImg')}>
                    <img src="https://i.pinimg.com/originals/24/c8/03/24c803872ffa8700bc0f0e236c57c91c.jpg" alt="" />
                </div>
                <div className={cx('messText')}>
                    SPY×FAMILY (スパイファミリー Supai Famirī?, đọc như Spy-Family)[a] là một bộ manga Nhật Bản được
                    viết và minh họa bởi Endo Tatsuya. Bộ truyện được đăng tải mỗi 2 tuần trên tạp chí trực tuyến Shōnen
                    Jump+ kể từ ngày 25 tháng 3 năm 2019. Tính đến nay, đã có tổng cộng 9 tập tankōbon được phát hành
                    bởi Shueisha. Viz Media mua bản quyền và xuất bản phiên bản tiếng Anh tại thị trường Bắc Mỹ. Tại
                    Việt Nam, bộ truyện được phát hành bởi Nhà xuất bản Kim Đồng. Phiên bản anime truyền hình chuyển thể
                    gồm hai phần được sản xuất bởi xưởng phim Wit Studio và CloverWorks, bắt đầu phát sóng từ tháng 4
                    năm 2022
                </div>
            </div>
            <div className={cx('messBot')}>1 hour ago</div>
        </div>
    );
};

MessUser.propTypes = {};

export default MessUser;
