import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentModal from '~/components/CommentModal';
import ContentTrack from '~/components/tracks/ContentTrack';
import FooterTrack from '~/components/tracks/FooterTrack';
import HeaderTrack from '~/components/tracks/HeaderTrack';
import SidebarTrack from '~/components/tracks/SidebarTrack';
import { openModalComment } from '~/redux/reducer/modunReducer';
import { getAllComments, getCourseByPathName } from '~/services/apiCourse';

import styles from './Tracks.module.scss';

const cx = classNames.bind(styles);

function Tracks() {
    const [course, setCourse] = useState({});
    const [commentItem, setCommentItem] = useState(null);

    const dispatch = useDispatch();
    const slug = useParams().slug;
    const currentLesson = useSelector((state) => state.lesson?.currentLesson);

    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse?.status);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCourseByPathName(slug);

            if (result.errCode === 0) {
                setCourse(result.data);
            } else {
                alert('Lỗi gọi api lấy khóa học');
            }
        };
        fetchApi();
    }, [slug]);

    const handleGetAllCommentsLesson = async () => {
        const result = await getAllComments(currentLesson._id);
        setCommentItem(result);
    };

    const handleOpenModalComment = () => {
        dispatch(openModalComment());
        handleGetAllCommentsLesson();
    };

    return (
        <div className={cx('wrapper')}>
            <HeaderTrack name={course.name} />
            <SidebarTrack chapters={course.chapter} slug={slug} />
            <ContentTrack />
            <FooterTrack />

            <div className={sidebarCourse ? cx('comment') : cx('comment', 'active')}>
                <button className={cx('comment-btn')} onClick={handleOpenModalComment}>
                    <FontAwesomeIcon icon={faComments} />
                    <span>Hỏi đáp</span>
                </button>
            </div>
            <CommentModal allComments={commentItem} />
        </div>
    );
}

export default Tracks;
