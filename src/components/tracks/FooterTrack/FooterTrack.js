import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './FooterTrack.module.scss';

const cx = classNames.bind(styles);

function FooterTrack() {
    return (
        <div className={cx('wrapper')}>
            <button className={cx('btn-left')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Bài trước</span>
            </button>
            <button className={cx('btn-right')}>
                <span>Bài tiếp theo</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className={cx('toggle-sidebar')}>
                <h3 className={cx('title')}>1. Giới thiệu</h3>
                <button className={cx('toggle-btn')}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
}

export default FooterTrack;
