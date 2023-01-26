import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LinkCommon from './LinkCommon';
import PostCommon from './PostCommon';
import VideoCommon from './VideoCommon';

import VerticalProgressBar from '../VerticalProgressBar';

import styles from './CommonItem.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);

function CommonItem({ type, data, progress, lastCompletedAt, styles = null }) {
    return (
        <div className={cx('wrapper')} style={styles}>
            <div className={cx('item')}>
                <LinkCommon
                    type={type}
                    pathName={data}
                    title={data?.title}
                    image={data?.image}
                    coming={data?.comingSoon}
                    dataVideo={data}
                />

                <h4 className={cx('name')}>
                    <Link to={'pathName'} className={data?.comingSoon ? cx('disabled-name') : ''} title={data?.title}>
                        {data?.title}
                    </Link>
                </h4>

                {type === 'pro' && !data?.comingSoon && (
                    <div className={cx('price')}>
                        <span className={cx('old-price')}>{data?.oldPrice.toLocaleString()}đ</span>
                        <span className={cx('new-price')}>{data?.price.toLocaleString()}đ</span>
                    </div>
                )}

                {type === 'free' && (
                    <div className={cx('studying')}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{data?.userLearning}</span>
                    </div>
                )}

                {type === 'blog' && <PostCommon author={data?.author} readingTime={data?.readingTime} />}

                {type === 'video' && <VideoCommon dataVideo={data} />}

                {type === 'my' && (
                    <div className={cx('progress')}>
                        <p className={cx('last-completed')}>Học cách đây {moment(lastCompletedAt).fromNow()}</p>
                        <VerticalProgressBar progress={progress} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommonItem;
