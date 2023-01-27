import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import config from '~/config';
import Heading from '~/components/Heading';
import CommonItem from '~/components/CommonItem';
import LayoutWrapper from '~/components/LayoutWrapper';
import { getCoursesRegistered } from '~/services/apiCourse';
import { showNotification } from '~/redux/reducer/modunReducer';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './MyCourses.module.scss';

const cx = classNames.bind(styles);

function MyCourses() {
    const [courses, setCourses] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                const result = await getCoursesRegistered(currentUser?.accessToken);

                if (result.statusCode === 0) {
                    setCourses(result.data);
                } else {
                    dispatch(showNotification(result.message || 'Lỗi lấy dữ liệu khóa học đã đăng ký'));
                }
            };
            fetchApi();
            document.title = 'Khóa học bạn đã đăng ký tại F8';
        } else {
            navigate(config.routes.login);
            dispatch(showNotification('Vui lòng đăng nhập'));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LayoutWrapper>
            <Heading
                name="Khóa học của tôi"
                desc={
                    currentUser.myCourses.length > 0
                        ? 'Những khóa học mà bạn đã đăng ký tại F8'
                        : 'Bạn chưa đăng ký khóa học nào'
                }
            />

            <div className={cx('body')}>
                <div className={cx('container')}>
                    <div className={cx('list')}>
                        <div className={cx('wrap')}>
                            {courses.map((course) => (
                                <div className={cx('item')} key={course._id}>
                                    <CommonItem
                                        type="my"
                                        key={course._id}
                                        data={course.course}
                                        styles={{ width: '100%' }}
                                        progress={course.userProgress}
                                        lastCompletedAt={course.lastCompletedAt}
                                    />
                                </div>
                            ))}

                            <div className={cx('item')}>
                                <Link className={cx('add-course')} to={config.routes.courses}>
                                    <FontAwesomeIcon icon={faCirclePlus} />

                                    <div className={cx('stars')}></div>
                                    <button className={cx('add')}>Thêm khóa học</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default MyCourses;
