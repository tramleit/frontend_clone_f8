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
            const result = await getCoursesRegistered(currentUser._id);

            if (result.errCode === 0) {
                setCourses(result.data);
            } else {
                dispatch(showNotification(`Lỗi lấy dữ liệu khóa học của ${currentUser.name}`));
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
                                        styles={{ width: '100%' }}
                                        type="my"
                                        key={course._id}
                                        student={course.userLearning}
                                        title={course.title}
                                        image={course.image}
                                        pathName={`/courses/${course.slug}`}
                                        progress={course.userProgress}
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
