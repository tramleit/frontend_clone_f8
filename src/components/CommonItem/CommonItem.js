import moment from 'moment';
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

function CommonItem({ type, data, progress, lastCompletedAt, styles = null }) {
    let slug, title, image;

    switch (type) {
        case 'video':
            slug = `https://youtu.be/${data?.urlVideo}`;
            title = data.title;
            image = data.image;
            break;

        case 'blog':
            slug = `/blog/${data?.slug}`;
            title = data.metaTitle;
            image = data.imagePreview;
            break;

        case 'free' || 'my':
            slug = `/courses/${data?.slug}`;
            title = data.title;
            image = data.image;
            break;

        case 'pro':
            slug = `/landing/${data?.slug}`;
            title = data.title;
            image = data.image;
            break;

        case 'my':
            slug = `/courses/${data?.slug}`;
            title = data.title;
            image = data.image;
            break;

        default:
            slug = '';
            title = data.title;
            image = data.image;
    }

    return (
        <div className={cx('wrapper')} style={styles}>
            <div className={cx('item')}>
                <LinkCommon
                    type={type}
                    pathName={slug}
                    title={title}
                    image={image}
                    coming={data?.comingSoon}
                    dataVideo={data}
                />

                <h4 className={cx('name')}>
                    {data?.comingSoon ? (
                        <div className={cx('disabled-name')} title={title}>
                            {title}
                        </div>
                    ) : (
                        <Link to={slug} title={title}>
                            {title}
                        </Link>
                    )}
                </h4>

                {type === 'pro' && (
                    <div className={cx('price')}>
                        <span className={cx('old-price')}>
                            {!data?.comingSoon && `${data?.oldPrice.toLocaleString()}đ`}
                        </span>
                        <span className={cx('new-price')}>
                            {!data?.comingSoon && `${data?.price.toLocaleString()}đ`}
                        </span>
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
