import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import config from '~/config';
import Heading from '~/components/Heading';
import CommonItem from '~/components/CommonItem';
import SuggestionBox from '~/components/SuggestionBox';
import LayoutWrapper from '~/components/LayoutWrapper';
import styles from './Courses.module.scss';
import { getCombinedCourses } from '~/services/apiCourse';
import { showNotification } from '~/redux/reducer/modunReducer';

const cx = classNames.bind(styles);

function Courses() {
    const [coursePro, setCoursePro] = useState([]);
    const [courseFree, setCourseFree] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const type = searchParams.get('type');

    useEffect(() => {
        setSearchParams({ type: 'tab' });
        document.title = 'Danh sách các khóa học lập trình tại F8';
    }, [setSearchParams]);

    useEffect(() => {
        if (type) {
            const fetchApi = async () => {
                const result = await getCombinedCourses(type);

                if (result.statusCode === 0) {
                    setCourseFree(result.data.coursesFree);
                    setCoursePro(result.data.coursesPro);
                } else {
                    dispatch(showNotification(result.message));
                }
            };
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return (
        <LayoutWrapper>
            <Heading
                name="Khóa học"
                desc="Các khóa học được thiết kế phù hợp cho cả người mới, nhiều khóa học miễn phí, chất lượng, nội dung dễ hiểu."
            />

            <div className={cx('course')}>
                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>
                                Khóa học Pro
                                <span className={cx('course-new')}>Mới</span>
                            </h4>
                        </div>
                    </div>
                    <div className={cx('list')}>
                        {coursePro.map((course) => (
                            <CommonItem type="pro" key={course._id} data={course} />
                        ))}
                    </div>
                </div>

                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Khóa học miễn phí</h4>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        {courseFree?.map((course) => (
                            <CommonItem type="free" key={course._id} data={course} />
                        ))}
                    </div>
                </div>

                <SuggestionBox
                    title="Bạn đang tìm kiếm lộ trình học cho người mới?"
                    desc="Các khóa học được thiết kế phù hợp cho người mới, lộ trình học rõ ràng, nội dung dễ hiểu."
                    path={config.routes.learning}
                    nameBtn="Xem lộ trình"
                />
            </div>
        </LayoutWrapper>
    );
}

export default Courses;
