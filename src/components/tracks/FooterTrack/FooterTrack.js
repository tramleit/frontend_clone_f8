import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { faArrowRight, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { closeSidebarCourse, openSidebarCourse } from '~/redux/reducer/modunReducer';
import styles from './FooterTrack.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function FooterTrack({ chapters }) {
    const [nextLesson, setNextLesson] = useState('');
    const [prevLesson, setPrevLesson] = useState('');
    const [nameChapter, setNameChapter] = useState('');
    const [active, setActive] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { slug } = useParams();
    const lessonId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        const lessonIds = [];

        for (let i = 0; i < chapters?.length; i++) {
            const chapter = chapters[i];
            for (let j = 0; j < chapter.lesson.length; j++) {
                const lesson = chapter.lesson[j];
                lessonIds.push(lesson._id);
            }
        }

        let prevId;
        let nextId;

        for (let i = 0; i < lessonIds.length; i++) {
            if (lessonIds[i] === lessonId) {
                if (i > 0) {
                    prevId = lessonIds[i - 1];
                }
                if (i < lessonIds.length - 1) {
                    nextId = lessonIds[i + 1];
                }
            }
        }
        setNextLesson(nextId);
        setPrevLesson(prevId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonId]);

    useEffect(() => {
        const targetLesson = chapters.find((chapter) => chapter.lesson.find((lesson) => lesson._id === lessonId));
        setNameChapter(targetLesson?.nameChapter);
    }, [chapters, lessonId]);

    const handleToggleSidebar = () => {
        if (active) {
            dispatch(openSidebarCourse());
            setActive(false);
        } else {
            dispatch(closeSidebarCourse());
            setActive(true);
        }
    };

    const handlePrevLesson = () => {
        if (prevLesson) {
            navigate(`${config.routes.courses}/${slug}?id=${prevLesson}`);
        }
    };

    const handleNextLesson = () => {
        if (nextLesson) {
            navigate(`${config.routes.courses}/${slug}?id=${nextLesson}`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <button className={prevLesson ? cx('btn-left') : cx('btn-left', 'active')} onClick={handlePrevLesson}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Bài trước</span>
            </button>
            <button className={nextLesson ? cx('btn-right') : cx('btn-right', 'active')} onClick={handleNextLesson}>
                <span>Bài tiếp theo</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div
                className={cx('toggle-sidebar')}
                onClick={window.innerWidth < 1024 ? () => dispatch(openSidebarCourse()) : handleToggleSidebar}
            >
                <h3 className={cx('title')}>{nameChapter}</h3>

                <button className={cx('toggle-btn')}>
                    {active || window.innerWidth < 1024 ? (
                        <FontAwesomeIcon icon={faBars} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowRight} />
                    )}
                </button>
            </div>
        </div>
    );
}

export default FooterTrack;
