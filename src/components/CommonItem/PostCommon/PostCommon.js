import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import FallbackAvatar from '~/components/FallbackAvatar';

import styles from './PostCommon.module.scss';

const cx = classNames.bind(styles);

function PostCommon({ readingTime, author }) {
    return (
        <div className={cx('author')}>
            <Link className={cx('avatar-wrap')} to={`/@${author?.username}`}>
                <FallbackAvatar
                    style={{ '--font-size': '2.32px' }}
                    image={author?.avatar}
                    alt={author?.name}
                    admin={author?.admin}
                />
            </Link>
            <Link className={cx('name-author')} to={`/@${author?.username}`}>
                <span className={cx('user-name')}>{author?.name}</span>
                {author?.tick && <FontAwesomeIcon icon={faCircleCheck} />}
                <span className={cx('dot')}>·</span>
                <span>{readingTime > 0 ? readingTime : '1'} phút đọc</span>
            </Link>
        </div>
    );
}

export default PostCommon;
