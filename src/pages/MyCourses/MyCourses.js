import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Heading from '~/components/Heading';
import CommonItem from '~/components/CommonItem';
import LayoutWrapper from '~/components/LayoutWrapper';
import { getCoursesRegistered } from '~/services/apiCourse';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './MyCourses.module.scss';

const cx = classNames.bind(styles);

function MyCourses() {
    const [courses, setCourses] = useState([]);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCoursesRegistered(currentUser.accessToken);

            if (result.statusCode === 0) {
                setCourses(result.data);
            } else {
                dispatch(showNotification(result.message || 'Lỗi lấy dữ liệu khóa học đã đăng ký'));
            }
        };
        fetchApi();
        document.title = 'Khóa học bạn đã đăng ký tại F8';

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id, currentUser.name]);

    return (
        <LayoutWrapper>
            <Heading name="Khóa học của tôi" desc="Bạn chưa hoàn thành khóa học nào." />

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
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default MyCourses;
