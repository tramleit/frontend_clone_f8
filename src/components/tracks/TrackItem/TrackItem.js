import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { faChevronDown, faChevronUp, faCircleCheck, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TrackItem.module.scss';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { closeSidebarCourse } from '~/redux/reducer/modunReducer';

const cx = classNames.bind(styles);

function TrackItem({ chapter, index, slug }) {
    const [activeIcon, setActiveIcon] = useState(true);
    const [activeItemId, setActiveItemId] = useState(null);
    const [numberTime, setNumberTime] = useState('');

    const location = useLocation();
    const dispatch = useDispatch();
    const lessonId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        setActiveItemId(lessonId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonId]);

    // Tính tổng thời gian cần học hết chương
    useEffect(() => {
        let totalTime = 0;

        chapter?.lesson?.forEach((lesson) => {
            const time = lesson.timeVideo;
            const timeInSeconds = parseInt(time?.split(':')[0]) * 60 + parseInt(time?.split(':')[1]);
            totalTime += timeInSeconds;
        });

        let formatted;
        if (totalTime >= 3600) {
            formatted = moment.utc(totalTime * 1000).format('hh:mm:ss');
        } else {
            formatted = moment.utc(totalTime * 1000).format('mm:ss');
        }

        setNumberTime(formatted);
    }, [chapter]);

    const handleSetCurrentLesson = (id) => {
        localStorage.setItem('currentLesson', id);

        if (window.innerWidth < 1024) {
            dispatch(closeSidebarCourse());
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('track-wrap')} onClick={() => setActiveIcon(!activeIcon)}>
                <h3 className={cx('title')}>
                    {index + 1}. {chapter.nameChapter}
                </h3>
                <span className={cx('desc')}>
                    0/{chapter.lesson?.length} | {numberTime}
                </span>
                <span className={cx('icon')}>
                    {activeIcon ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
                </span>
            </div>

            {!activeIcon && (
                <div className={cx('track-list')}>
                    {chapter.lesson.map((lesson, index) => (
                        <Link
                            className={cx('step-item', { active: lesson._id === activeItemId })}
                            key={lesson._id}
                            to={`/courses/${slug}?id=${lesson._id}`}
                            onClick={() => handleSetCurrentLesson(lesson._id)}
                        >
                            <div className={cx('info')}>
                                <h3 className={cx('step-title')}>
                                    {index + 1}. {lesson.nameLesson}
                                </h3>
                                <p className={cx('step-desc')}>
                                    <FontAwesomeIcon icon={faCompactDisc} />
                                    <span>{lesson.timeVideo}</span>
                                </p>
                            </div>
                            <div className={cx('step-icon')}>
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TrackItem;
