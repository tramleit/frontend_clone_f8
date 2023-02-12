import moment from 'moment';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { Link, useLocation } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import { getCoursesRegistered } from '~/services/apiCourse';
import VerticalProgressBar from '~/components/VerticalProgressBar';

import styles from './MyCourse.module.scss';

const cx = classNames.bind(styles);

function MyCourse() {
    const [myCourses, setMyCourses] = useState([]);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleGetAllMyCourses = async () => {
        if (pathname !== config.routes.myCourses) {
            setActive(!active);
            setLoading(true);

            if (!active) {
                const result = await getCoursesRegistered(currentUser.accessToken);

                if (result.statusCode === 0) {
                    setMyCourses(result.data);
                    setLoading(false);
                } else {
                    dispatch(result.message);
                    setLoading(false);
                }
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('course-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('header')}>
                            <h4 className={cx('title')}>Khóa học của tôi</h4>
                        </div>
                        <div className={cx('content')}>
                            {myCourses?.length > 0 ? (
                                myCourses.map((course) => (
                                    <div className={cx('item')} key={course._id}>
                                        <Link to={`/courses/${course.course.slug}`}>
                                            <img
                                                className={cx('img')}
                                                src={course.course.image}
                                                alt={course.course.title}
                                            />
                                        </Link>
                                        <div className={cx('info')}>
                                            <h5 className={cx('info-title')}>
                                                <Link to={`/courses/${course.course.slug}`}>{course.course.title}</Link>
                                            </h5>
                                            <p className={cx('complete')}>{`Học cách đây ${moment(
                                                course.lastCompletedAt
                                            ).fromNow()}`}</p>
                                            <VerticalProgressBar progress={course.progression} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {loading ? (
                                        <div className={cx('loading')}>
                                            <FontAwesomeIcon icon={faSpinner} />
                                        </div>
                                    ) : (
                                        <div className={cx('unregistered')}>Bạn chưa đăng ký khóa học nào</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            >
                <button
                    className={cx('btn', { active: pathname === config.routes.myCourses })}
                    onClick={handleGetAllMyCourses}
                >
                    Khóa học của tôi
                </button>
            </Tippy>
        </div>
    );
}

export default MyCourse;
