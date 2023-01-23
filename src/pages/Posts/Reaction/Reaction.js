import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';

import styles from './Reaction.module.scss';

const cx = classNames.bind(styles);

function Reaction({ like, comment }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('btn')}>
                <FontAwesomeIcon icon={faHeart} />
                <span>{like}</span>
            </div>
            <div className={cx('btn')}>
                <FontAwesomeIcon icon={faComment} />
                <span>{comment?.length}</span>
            </div>
        </div>
    );
}

export default Reaction;
