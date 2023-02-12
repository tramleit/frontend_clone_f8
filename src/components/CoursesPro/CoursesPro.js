import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import CommonItem from '../CommonItem';
import { getCombinedCourses } from '~/services/apiCourse';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './CoursesPro.module.scss';

const cx = classNames.bind(styles);

function CoursesPro() {
    const [courses, setCourses] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCombinedCourses('pro');

            if (result.statusCode === 0) {
                setCourses(result.data);
            } else {
                dispatch(showNotification(result.message));
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>
                Các khóa học Pro tại F8
                <img
                    className={cx('crown-icon')}
                    src="https://res.cloudinary.com/dwld3bqia/image/upload/v1672844503/Banner/crown_icon_qjnbtf.svg"
                    alt="Crown Icon"
                />
            </h2>

            <p className={cx('desc')}>
                Các khóa học Pro được thiết kế đầy đủ chi tiết, bài bản. Với đa dạng các loại bài học và bài tập thực
                hành đi kèm, code luôn ở trang web. Cuối khóa học sẽ được thực hành từ 8 - 10 dự án thực chiến với cấp
                độ từ dễ đến khó.
            </p>

            <div className={cx('courses')}>
                <div className={cx('wrap')}>
                    {courses.map((course) => (
                        <div className={cx('content')} key={course._id}>
                            <CommonItem styles={{ width: '100%' }} type="pro" data={course} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CoursesPro;
