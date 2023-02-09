import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import CourseDetail from '~/components/CourseDetail';
import FooterTrack from '~/components/tracks/FooterTrack';
import HeaderTrack from '~/components/tracks/HeaderTrack';
import { getCourseByPathName } from '~/services/apiCourse';
import SidebarTrack from '~/components/tracks/SidebarTrack';
import ContentTrack from '~/components/tracks/ContentTrack';
import { openModalComment, showNotification } from '~/redux/reducer/modunReducer';

import styles from './Tracks.module.scss';

const cx = classNames.bind(styles);

function Tracks() {
    const [courses, setCourse] = useState({});
    const [registered, setRegistered] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { slug } = useParams();
    const location = useLocation();
    const lessonId = new URLSearchParams(location.search).get('id');
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse?.status);

    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                const result = await getCourseByPathName(slug, currentUser.accessToken);

                if (result.statusCode === 0) {
                    setCourse(result.data);
                    setRegistered(result.registered);

                    if (result.registered) {
                        navigate(`/courses/${slug}?id=${result.data.chapter[0].lesson[0]._id}`);
                    }
                } else {
                    dispatch(showNotification(result.message || 'Lỗi gọi api lấy khóa học'));
                }
            };
            fetchApi();
        } else {
            navigate(config.routes.login);
            dispatch(showNotification('Vui lòng đăng nhập'));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handleOpenModalComment = () => {
        const action = {
            type: 'lesson',
            uid: lessonId,
        };
        dispatch(openModalComment(action));
    };

    return (
        <>
            {registered ? (
                <div className={cx('wrapper')}>
                    <Fragment>
                        <HeaderTrack title={courses.title} />
                        <SidebarTrack chapters={courses.chapter} slug={slug} />
                        <ContentTrack />
                        <FooterTrack chapters={courses.chapter} />

                        <div className={sidebarCourse ? cx('comment') : cx('comment', 'active')}>
                            <button className={cx('comment-btn')} onClick={handleOpenModalComment}>
                                <FontAwesomeIcon icon={faComments} />
                                <span>Hỏi đáp</span>
                            </button>
                        </div>
                    </Fragment>
                </div>
            ) : (
                <CourseDetail course={courses} pathName={slug} />
            )}
        </>
    );
}

export default Tracks;
