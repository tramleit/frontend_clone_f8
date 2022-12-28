import classNames from 'classnames/bind';
import TrackItem from '../TrackItem/TrackItem';
import styles from './SidebarTrack.module.scss';

const cx = classNames.bind(styles);

function SidebarTrack() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('learn-list')}>
                <div className={cx('header')}>
                    <h2 className={cx('heading')}>Nội dung khóa học</h2>
                </div>

                <div className={cx('body')}>
                    <TrackItem />
                    <TrackItem />
                    <TrackItem />
                </div>
            </div>
        </div>
    );
}

export default SidebarTrack;
