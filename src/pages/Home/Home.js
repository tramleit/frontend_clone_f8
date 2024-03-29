import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import HomeContent from './HomeContent';
import Banner from '~/components/Banner';
import { getDataHomePage } from '~/services/apiSearch';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [slideshow, setSlideshow] = useState([]);
    const [coursePro, setCoursePro] = useState([]);
    const [courseFree, setCourseFree] = useState([]);
    const [countStudent, setCountStudent] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const type = searchParams.get('type');

    useEffect(() => {
        setSearchParams({ type: 'tab' });
        document.title = 'F8 - Học lâp trình để đi làm!';
    }, [setSearchParams]);

    useEffect(() => {
        let totalStudent = 0;

        courseFree.forEach((course) => {
            totalStudent += course.userLearning;
        });

        setCountStudent(totalStudent);
    }, [courseFree]);

    useEffect(() => {
        if (type) {
            const fetchApi = async () => {
                const result = await getDataHomePage(type);

                if (result.statusCode === 0) {
                    setSlideshow(result.data.slideshow);
                    setCoursePro(result.data.coursesPro);
                    setCourseFree(result.data.coursesFree);
                    setBlogs(result.data.blogs);
                    setVideos(result.data.videos);
                } else {
                    dispatch(showNotification(result.message));
                }
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banner slideshows={slideshow} />
            </div>

            <div className={cx('content')}>
                <HomeContent title="Khóa học Pro" type="pro" isNew={true} data={coursePro} />
                <HomeContent title="Khóa học miễn phí" type="free" countStudent={countStudent} data={courseFree} />
                <HomeContent title="Bài viết nổi bật" type="blog" data={blogs} />
                <HomeContent title="Videos nổi bật" type="video" data={videos} />
            </div>
        </div>
    );
}

export default Home;
