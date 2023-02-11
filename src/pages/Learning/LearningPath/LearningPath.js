import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import CoursesPro from '~/components/CoursesPro';
import Heading from '~/components/Heading';
import LayoutWrapper from '~/components/LayoutWrapper';
import { showNotification } from '~/redux/reducer/modunReducer';
import { getLearningRouteBySlug } from '~/services/apiCourse';
import LearningGroup from './LearningGroup';

import styles from './LearningPath.module.scss';

const cx = classNames.bind(styles);

function LearningPath() {
    const [route, setRoute] = useState(null);

    const { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getLearningRouteBySlug(slug);

            if (result.statusCode === 0) {
                setRoute(result.data);
            } else {
                dispatch(showNotification(result.message) || 'Lỗi lấy dữ liệu lộ trình');
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
        <LayoutWrapper>
            <Heading name={route?.title} desc={route?.content} />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    {route?.groups.map((group) => (
                        <LearningGroup key={group._id} group={group} />
                    ))}

                    <CoursesPro />
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default LearningPath;
