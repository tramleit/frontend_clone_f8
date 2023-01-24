import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ActivityItem.module.scss';
import FallbackAvatar from '~/components/FallbackAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ActivityItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <FallbackAvatar
                    style={{ '--font-size': '4.3px' }}
                    image={data.user.avatar}
                    alt={data.user.name}
                    admin={data.user.admin}
                />
            </div>

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Link className={cx('author')} to={`/@${data.user.username}`}>
                        <span>{data.user.name}</span>
                        {data.user.tick && <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />}
                    </Link>
                    <span className={cx('icon')}>
                        <img
                            src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673284171/Course/love_may2gp.svg"
                            alt="Yêu Thích"
                        />
                    </span>
                    <span>
                        {data.type === 'reaction-post' ? 'đã yêu thích bài viết của ' : 'đã bình luận bài viết:'}
                    </span>
                    {data.partner && (
                        <Link className={cx('author')} to={`/@${data.partner.username}`}>
                            <span>{data.partner.name}</span>
                            {data.partner.tick && <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />}
                        </Link>
                    )}

                    {data.type === 'reaction-post' ? (
                        <Link to={data.linkTo} className={cx('message')}>
                            <span>"{data.postTitle}"</span>
                        </Link>
                    ) : (
                        <Link className={cx('message')}>
                            <span>"{'Bình luận bài viết'}"</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ActivityItem;
