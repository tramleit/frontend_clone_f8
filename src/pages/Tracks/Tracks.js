import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CommentModal from '~/components/CommentModal';
import CourseDetail from '~/components/CourseDetail';
import ContentTrack from '~/components/tracks/ContentTrack';
import FooterTrack from '~/components/tracks/FooterTrack';
import HeaderTrack from '~/components/tracks/HeaderTrack';
import SidebarTrack from '~/components/tracks/SidebarTrack';
import { openModalComment } from '~/redux/reducer/modunReducer';
import { getCourseByPathName } from '~/services/apiCourse';

import styles from './Tracks.module.scss';

const cx = classNames.bind(styles);

function Tracks() {
    const [courses, setCourse] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const slug = useParams().slug;

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const currentLesson = useSelector((state) => state.lesson?.currentLesson);
    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse?.status);
    const lessonId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCourseByPathName(slug);

            if (result.errCode === 0) {
                setCourse(result.data);
                console.log('result.data: ', result.data);

                // Kiểm tra xem nếu id bài hiện tại và id bài đang chọn khác nhau và người dùng
                // chưa đăng ký khóa học thì chuyển về bài đầu của khóa học

                const checkRegister = currentUser?.myCourses.find((course) => {
                    return course.course === result.data._id;
                });

                if (currentLesson?._id !== lessonId && !!checkRegister) {
                    navigate(`/courses/${slug}?id=${result.data.chapter[0].lesson[0]._id}`);
                }
            } else {
                alert('Lỗi gọi api lấy khóa học');
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handleOpenModalComment = () => {
        dispatch(openModalComment());
    };

    return (
        <>
            {!!currentUser?.myCourses.find((course) => {
                return course.course === courses._id;
            }) ? (
                <div className={cx('wrapper')}>
                    <>
                        <HeaderTrack name={courses.name} />
                        <SidebarTrack chapters={courses.chapter} slug={slug} />
                        <ContentTrack />
                        <FooterTrack chapters={courses.chapter} />

                        <div className={sidebarCourse ? cx('comment') : cx('comment', 'active')}>
                            <button className={cx('comment-btn')} onClick={handleOpenModalComment}>
                                <FontAwesomeIcon icon={faComments} />
                                <span>Hỏi đáp</span>
                            </button>
                        </div>
                        <CommentModal />
                    </>
                </div>
            ) : (
                <CourseDetail course={courses} pathName={slug} />
            )}
        </>
    );
}

export default Tracks;
