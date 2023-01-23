import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as activeHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './Reaction.module.scss';

const cx = classNames.bind(styles);

function Reaction({ handleReaction, post, userId }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('btn')} onClick={handleReaction}>
                {post?.reactions.includes(userId) ? (
                    <FontAwesomeIcon className={cx('active')} icon={activeHeart} />
                ) : (
                    <FontAwesomeIcon icon={faHeart} />
                )}

                <span>{post?.reactions.length}</span>
            </div>
            <div className={cx('btn')}>
                <FontAwesomeIcon icon={faComment} />
                <span>{post?.comments.length}</span>
            </div>
        </div>
    );
}

export default Reaction;
