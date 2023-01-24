import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LinkCommon from './LinkCommon';
import PostCommon from './PostCommon';
import VideoCommon from './VideoCommon';
import VerticalProgressBar from '../VerticalProgressBar';

import styles from './CommonItem.module.scss';

const cx = classNames.bind(styles);

function CommonItem({
    type,
    pathName,
    student,
    coming = false,
    title,
    imageComing,
    image,
    author,
    dataVideo,
    readingTime,
    progress,
    styles = null,
}) {
    return (
        <div className={cx('wrapper')} style={styles}>
            <div className={cx('item')}>
                <LinkCommon
                    type={type}
                    pathName={pathName}
                    title={title}
                    image={image}
                    coming={coming}
                    dataVideo={dataVideo}
                    imageComing={imageComing}
                />

                <h4 className={cx('name')}>
                    <Link to={pathName} className={coming ? cx('disabled-name') : ''} title={title}>
                        {title}
                    </Link>
                </h4>

                {type === 'pro' && !coming && (
                    <div className={cx('price')}>
                        <span className={cx('old-price')}>2.499.000đ</span>
                        <span className={cx('new-price')}>1.299.000đ</span>
                    </div>
                )}

                {type === 'free' && (
                    <div className={cx('studying')}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{student}</span>
                    </div>
                )}

                {type === 'blog' && <PostCommon author={author} readingTime={readingTime} />}

                {type === 'video' && <VideoCommon dataVideo={dataVideo} />}

                {type === 'my' && (
                    <div className={cx('progress')}>
                        <p className={cx('last-completed')}>Học cách đây 2 tháng trước</p>
                        <VerticalProgressBar progress={progress} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommonItem;
