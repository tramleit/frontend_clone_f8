import { faBatteryFull, faCirclePlay, faClock, faFilm, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Purchase.module.scss';

const cx = classNames.bind(styles);

function Purchase({ course, allLesson, numberTime, setModalPrev, onClick }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('purchase')}>
                <div className={cx('preview')} onClick={() => setModalPrev(true)}>
                    <div className={cx('img-bg')} style={{ backgroundImage: `url(${course.image})` }}></div>

                    <FontAwesomeIcon icon={faCirclePlay} />
                    <p>Xem giới thiệu khóa học</p>
                </div>
                <h4>{course.price > 0 ? 'PRO' : 'Miễn phí'}</h4>
                <button className={cx('btn-register')} onClick={onClick}>
                    ĐĂNG KÝ HỌC
                </button>

                <ul>
                    <li>
                        <FontAwesomeIcon icon={faGaugeHigh} />
                        <span>Trình độ trung bình</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faFilm} />
                        <span>
                            Tổng số <strong>{allLesson}</strong> bài học
                        </span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faClock} />
                        <span>
                            Thời lượng <strong>{numberTime}</strong>
                        </span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faBatteryFull} />
                        <span>Học mọi lúc, mọi nơi</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Purchase;
