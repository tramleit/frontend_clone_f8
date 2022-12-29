import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import CommentModal from '~/components/CommentModal';
import ContentTrack from '~/components/tracks/ContentTrack';
import FooterTrack from '~/components/tracks/FooterTrack';
import HeaderTrack from '~/components/tracks/HeaderTrack';
import SidebarTrack from '~/components/tracks/SidebarTrack';
import { openModalComment } from '~/redux/reducer/modunReducer';

import styles from './Tracks.module.scss';

const cx = classNames.bind(styles);

function Tracks() {
    const dispatch = useDispatch();

    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse.status);

    const handleOpenModalComment = () => {
        dispatch(openModalComment());
    };
    return (
        <div className={cx('wrapper')}>
            <HeaderTrack />
            <SidebarTrack />
            <ContentTrack />
            <FooterTrack />

            <div className={sidebarCourse ? cx('comment') : cx('comment', 'active')}>
                <button className={cx('comment-btn')} onClick={handleOpenModalComment}>
                    <FontAwesomeIcon icon={faComments} />
                    <span>Hỏi đáp</span>
                </button>
            </div>
            <CommentModal />
        </div>
    );
}

export default Tracks;
