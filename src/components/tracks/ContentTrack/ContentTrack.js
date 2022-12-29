import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import MarkdownParser from '../MarkdownParser';
import VideoTrack from '../VideoTrack';
import styles from './ContentTrack.module.scss';

const cx = classNames.bind(styles);

function ContentTrack() {
    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse?.status);

    return (
        <div className={sidebarCourse ? cx('wrapper') : cx('wrapper', 'active')}>
            <VideoTrack status={false} />

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

            <p className={cx('powered')}>
                Made with <FontAwesomeIcon icon={faHeart} /> <span className={cx('dot')}>·</span> Powered by F8
            </p>
        </div>
    );
}

export default ContentTrack;
