import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
// import CommentModal from '~/components/CommentModal';
import ContentTrack from '~/components/tracks/ContentTrack';
import FooterTrack from '~/components/tracks/FooterTrack';
import HeaderTrack from '~/components/tracks/HeaderTrack';
import SidebarTrack from '~/components/tracks/SidebarTrack';

import styles from './Tracks.module.scss';

const cx = classNames.bind(styles);

function Tracks() {
    return (
        <div className={cx('wrapper')}>
            <HeaderTrack />
            <SidebarTrack />
            <ContentTrack />
            <FooterTrack />

            <div className={cx('comment')}>
                <button className={cx('comment-btn')}>
                    <FontAwesomeIcon icon={faComments} />
                    <span>Hỏi đáp</span>
                </button>
            </div>
            {/* <CommentModal /> */}
        </div>
    );
}

export default Tracks;
