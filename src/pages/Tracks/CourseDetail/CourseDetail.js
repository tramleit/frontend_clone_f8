import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import Purchase from './Purchase';
import { DefaultLayout } from '~/layouts';
import PreviewCourse from './PreviewCourse';
import CourseCurriculum from './CourseCurriculum';
import { registerCourse } from '~/services/apiAuth';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './CourseDetail.module.scss';

const cx = classNames.bind(styles);

function CourseDetail({ course, pathName }) {
    const [allLesson, setAllLesson] = useState(0);
    const [numberTime, setNumberTime] = useState('');
    const [allChapter, setAllChapter] = useState([]);
    const [modalPrev, setModalPrev] = useState(false);

    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setAllChapter(course.chapter);
    }, [course]);

    useEffect(() => {
        if (allChapter) {
            let totalLessons = 0;
            let totalSeconds = 0;

            for (const chapter of allChapter) {
                totalLessons += chapter.lesson.length;

                for (const lesson of chapter.lesson) {
                    const time = lesson.timeVideo.split(':');
                    totalSeconds += parseInt(time[0]) * 60 + parseInt(time[1]);
                }
            }

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);

            setAllLesson(totalLessons);
            setNumberTime(`${hours} giờ ${minutes} phút`);
        }
    }, [allChapter]);

    const handleRegisterCourse = async () => {
        if (currentUser._id && pathName) {
            const result = await registerCourse(pathName, dispatch, currentUser.accessToken);

            if (result.statusCode === 0) {
                window.location.reload();
            } else {
                dispatch(showNotification(result.message));
            }
        } else {
            navigate(config.routes.login);
            dispatch(showNotification('Vui lòng đăng nhập'));
        }
    };

    return (
        <DefaultLayout>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content-left')}>
                        <h1 className={cx('course-name')}>{course.title}</h1>
                        <div className={cx('course-des')}>{course.description}</div>

                        {window.innerWidth < 1024 && (
                            <Purchase
                                course={course}
                                allLesson={allLesson}
                                numberTime={numberTime}
                                onClick={handleRegisterCourse}
                                setModalPrev={setModalPrev}
                            />
                        )}

                        <div className={cx('what-list')}>
                            <h3 className={cx('list-title')}>Bạn sẽ học được gì?</h3>

                            <div className={cx('list-wrap')}>
                                <div className={cx('wrap')}>
                                    <ul className={cx('list-item')}>
                                        {course.learnWhat?.map((learnWhat, index) => (
                                            <li key={index}>
                                                <FontAwesomeIcon icon={faCheck} />
                                                <span>{learnWhat.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={cx('content-learning')}>
                            <div className={cx('learning-title')}>
                                <div className={cx('learn-heading')}>
                                    <h3>Nội dung khóa học</h3>
                                </div>
                                <div className={cx('sub-heading')}>
                                    <ul>
                                        <li>
                                            <strong>{course.chapter?.length}</strong>
                                            <span> chương</span>
                                        </li>
                                        <li className={cx('dot')}>•</li>
                                        <li>
                                            <strong>{allLesson}</strong>
                                            <span> bài học</span>
                                        </li>
                                        <li className={cx('dot')}>•</li>
                                        <li>
                                            <span>Thời lượng </span>
                                            <strong>{numberTime}</strong>
                                        </li>
                                    </ul>

                                    <div className={cx('btn-toggle')}>Mở rộng tất cả</div>
                                </div>
                            </div>

                            <div className={cx('course-curriculum')}>
                                {course.chapter?.map((chapters, index) => (
                                    <CourseCurriculum key={chapters._id} chapters={chapters} index={index} />
                                ))}
                            </div>
                        </div>

                        <div className={cx('request')}>
                            <h2 className={cx('request-title')}>Yêu cầu</h2>

                            <div className={cx('request-wrap')}>
                                <div className={cx('wrap')}>
                                    <ul className={cx('request-list')}>
                                        {config.request.map((req, index) => (
                                            <li key={index}>
                                                <FontAwesomeIcon icon={faCheck} />
                                                <span>{req.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('btn-registered')} onClick={handleRegisterCourse}>
                        <button>ĐĂNG KÝ MIỄN PHÍ</button>
                    </div>

                    {window.innerWidth > 1023 && (
                        <Purchase
                            course={course}
                            allLesson={allLesson}
                            numberTime={numberTime}
                            onClick={handleRegisterCourse}
                            setModalPrev={setModalPrev}
                        />
                    )}
                </div>
            </div>
            <PreviewCourse course={course} modalPrev={modalPrev} setModalPrev={setModalPrev} />
        </DefaultLayout>
    );
}

export default CourseDetail;
