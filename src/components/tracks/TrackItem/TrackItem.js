import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { faChevronDown, faChevronUp, faCircleCheck, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TrackItem.module.scss';
import { getLessonById } from '~/services/apiCourse';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

function TrackItem({ active, chapter, index, slug }) {
    const [activeIcon, setActiveIcon] = useState(true);
    const [activeItemId, setActiveItemId] = useState(null);
    const [isFirstAccess, setIsFirstAccess] = useState(false);
    const [numberTime, setNumberTime] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lesson = useSelector((state) => state.lesson?.currentLesson);

    useEffect(() => {
        if (active.lesson.length > 0) {
            handleGetLesson(active?.lesson[0]._id);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active.lesson]);

    useEffect(() => {
        let totalTime = 0;

        chapter?.lesson.forEach((lesson) => {
            const time = lesson.timeVideo;
            const timeInSeconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
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

    const handleGetLesson = async (lessonId) => {
        if (!isFirstAccess || lesson._id !== lessonId) {
            navigate(`/courses/${slug}?id=${lessonId}`);
            setActiveItemId(lessonId);
            setIsFirstAccess(true);
            await getLessonById(lessonId, dispatch);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('track-wrap')} onClick={() => setActiveIcon(!activeIcon)}>
                <h3 className={cx('title')}>
                    {index + 1}. {chapter.nameChapter}
                </h3>
                <span className={cx('desc')}>
                    0/{chapter.lesson.length} | {numberTime}
                </span>
                <span className={cx('icon')}>
                    {activeIcon ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
                </span>
            </div>

            {!activeIcon && (
                <div className={cx('track-list')}>
                    {chapter.lesson.map((lesson, index) => (
                        <div
                            className={cx('step-item', { active: lesson._id === activeItemId })}
                            key={lesson._id}
                            onClick={() => handleGetLesson(lesson._id)}
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TrackItem;
