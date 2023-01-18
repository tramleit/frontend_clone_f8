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
                <FallbackAvatar style={{ '--font-size': '4.3px' }} image={data.author.avatar} alt={data.author.name} />
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Link className={cx('author')} to={`/@${data.author.username}`}>
                        <span>{data.author.name}</span>
                        {data.author.tick && <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />}
                    </Link>
                    <span>{data.authorReply ? ' đã trả lời bình luận của' : ' đã bình luận bài viết:'} </span>
                    {data.authorReply && (
                        <Link className={cx('author')} to={`/@${data.authorReply.username}`}>
                            <span>{data.authorReply.name}</span>
                            {data.authorReply.tick && <FontAwesomeIcon className={cx('tick')} icon={faCheckCircle} />}
                        </Link>
                    )}
                    <Link className={cx('message')}>
                        <span>"{data.contentMarkdown}"</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ActivityItem;
