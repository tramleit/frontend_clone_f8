import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './MyCourse.module.scss';
import { useSelector } from 'react-redux';
import { getAllMyCourses } from '~/services/apiAuth';
import VerticalProgressBar from '~/components/VerticalProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const cx = classNames.bind(styles);

function MyCourse() {
    const [allMyCourse, setAllMyCourse] = useState([]);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleGetAllMyCourses = async () => {
        setActive(!active);
        setLoading(true);
        if (!active) {
            const result = await getAllMyCourses(currentUser._id);

            if (result.errCode === 0) {
                setAllMyCourse(result.data);
                setLoading(false);
            } else {
                alert('Lỗi api lấy khóa học đang học');
                setLoading(false);
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
                            {allMyCourse?.length > 0 ? (
                                allMyCourse.map((course) => (
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
                <button className={cx('btn')} onClick={handleGetAllMyCourses}>
                    Khóa học của tôi
                </button>
            </Tippy>
        </div>
    );
}

export default MyCourse;
