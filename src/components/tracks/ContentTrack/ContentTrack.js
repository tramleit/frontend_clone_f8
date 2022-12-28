import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import MarkdownParser from '../MarkdownParser';
import VideoTrack from '../VideoTrack';
import styles from './ContentTrack.module.scss';

const cx = classNames.bind(styles);

function ContentTrack() {
    return (
        <div className={cx('wrapper')}>
            <VideoTrack />

            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('heading')}>
                        <h2 className={cx('title')}>Lời khuyên trước khóa học</h2>
                        <p className={cx('time-update')}>Cập nhật tháng 11 năm 2022</p>
                    </div>

                    <button className={cx('note')}>
                        <FontAwesomeIcon icon={faPlus} />

                        <span className={cx('label')}>
                            Thêm ghi chú tại <span className={cx('number')}>00:00</span>
                        </span>
                    </button>
                </div>

                <MarkdownParser fontSize="1.6rem" />
            </div>
        </div>
    );
}

export default ContentTrack;
