import classNames from 'classnames/bind';
import styles from './LinkCommon.module.scss';

const cx = classNames.bind(styles);

function LinkCommon() {
    return (
        <a className={coming ? cx('link', 'disabled') : cx('link')} href={pathName} target="_blank" rel="noreferrer">
            <img className={cx('image')} src={coming ? imageComing : image} alt={name} />
            <button className={cx('btn-view')}>Xem khóa học</button>

            {type === 'pro' && (
                <div className={cx('crown')}>
                    <img
                        src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                        alt="Crown"
                    />
                </div>
            )}

            {type === 'video' && (
                <div className={cx('video-wrap')}>
                    <div className={cx('play')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div className={cx('duration')}>
                        <span>{dataVideo.timeVideo}</span>
                    </div>
                </div>
            )}
        </a>
    );
}

export default LinkCommon;
