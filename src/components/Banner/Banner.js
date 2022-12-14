import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <h4 className={cx('title')}>
                    <Link to="/landing/htmlcss">
                        <span>Khóa học HTML CSS Pro</span>
                        <FontAwesomeIcon icon={faCrown} />
                    </Link>
                </h4>
                <p className={cx('description')}>
                    Đây là khóa học đầy đủ và chi tiết nhất bạn có thể tìm thấy được ở trên Internet!
                </p>
                <button className={cx('btn')}>
                    <span>Tìm hiểu thêm</span>
                </button>
            </div>
            <div className={cx('right')}>
                <Link to="/landing/htmlcss">
                    <img src={Image.htmlCssPro} alt="Khóa Học HTML CSS Pro" />
                </Link>
            </div>
        </div>
    );
}

export default Banner;
