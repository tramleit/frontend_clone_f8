import classNames from 'classnames/bind';
import HandlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './MyCourse.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function MyCourse() {
    const [active, setActive] = useState(false);
    const [courses, setCourses] = useState([]);

    const user = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        const myCourses = user.data.myCourses;
        setCourses(myCourses);
    }, [user.myCourses]);

    return (
        <div className={cx('wrapper')}>
            <HandlessTippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('course-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('header')}>
                            <h4 className={cx('title')}>Khóa học của tôi</h4>
                        </div>
                        <div className={cx('content')}>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <div className={cx('item')}>
                                        <Link>
                                            <img className={cx('img')} src={course.image} alt={course.name} />
                                        </Link>
                                        <div className={cx('info')}>
                                            <h5 className={cx('info-title')}>
                                                <Link>{course.name}</Link>
                                            </h5>
                                            <p className={cx('complete')}>Học cách đây 7 ngày trước</p>
                                            <Tippy content="20%" placement="bottom">
                                                <div className={cx('vertical')}></div>
                                            </Tippy>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={cx('unregistered')}>Bạn chưa đăng ký khóa học nào</div>
                            )}
                        </div>
                    </div>
                )}
            >
                <button className={cx('btn')} onClick={() => setActive(!active)}>
                    Khóa học của tôi
                </button>
            </HandlessTippy>
        </div>
    );
}

export default MyCourse;
