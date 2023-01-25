import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import styles from './VideoCommon.module.scss';

const cx = classNames.bind(styles);

function VideoCommon({ dataVideo }) {
    return (
        <div className={cx('stats')}>
            <div className={cx('stats-box')}>
                <FontAwesomeIcon icon={faEye} />
                <span>{new Intl.NumberFormat('it-IT').format(dataVideo?.view)}</span>
            </div>
            <div className={cx('stats-box')}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>{new Intl.NumberFormat('it-IT').format(dataVideo?.like.toLocaleString())}</span>
            </div>
            <div className={cx('stats-box')}>
                <FontAwesomeIcon icon={faComment} />
                <span>{new Intl.NumberFormat('it-IT').format(dataVideo?.comment)}</span>
            </div>
        </div>
    );
}

export default VideoCommon;
