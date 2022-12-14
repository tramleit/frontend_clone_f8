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
                        <img
                            src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                            alt=""
                        />
                    </Link>
                </h4>
                <p className={cx('description')}>
                    Đây là khóa học đầy đủ và chi tiết nhất bạn có thể tìm thấy được ở trên Internet!
                </p>
                <button className={cx('btn')}>
                    <Link to="/landing/htmlcss">
                        <span>Tìm hiểu thêm</span>
                    </Link>
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
