import config from '~/config';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Banner from '~/components/Banner';
import styles from './Home.module.scss';
import CommonItem from '~/components/CommonItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { getAllCourses } from '~/services/apiCourse';
import { getDataHomePage } from '~/services/apiSearch';

const cx = classNames.bind(styles);

function Home() {
    const [countStudent, setCountStudent] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [videos, setVideos] = useState([]);

    const dispatch = useDispatch();
    const courses = useSelector((state) => state.home.courses.currentCourses);

    useEffect(() => {
        let totalStudent = 0;

        courses?.forEach((course) => {
            totalStudent += course.userLearning;
        });

        setCountStudent(totalStudent);
    }, [courses]);

    useEffect(() => {
        const fetchApi = async () => {
            await getAllCourses(dispatch);

            const dataHome = await getDataHomePage();

            if (dataHome.errCode === 0) {
                setBlogs(dataHome.data.homeBlogs);
                setVideos(dataHome.data.homeVideos);
            }
        };
        fetchApi();

        document.title = 'F8 - Học lâp trình để đi làm!';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banner />
            </div>

            <div className={cx('content')}>
                <div className={cx('content-wrap')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>
                                Khóa học Pro
                                <span className={cx('course-new')}>Mới</span>
                            </h4>
                        </div>
                    </div>
                    <div className={cx('list')}>
                        {courses &&
                            [...courses]
                                .sort((a, b) => a.priority - b.priority)
                                .map(
                                    (course) =>
                                        course.price > 0 && (
                                            <CommonItem
                                                type="pro"
                                                key={course._id}
                                                title={course.title}
                                                image={course.image}
                                                coming={course.comingSoon}
                                                imageComing="https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png"
                                            />
                                        )
                                )}
                    </div>
                </div>

                <div className={cx('content-wrap')}>
                    <div className={cx('heading')}>
                        <p className={cx('sub-heading')}>
                            <strong>{countStudent}+</strong>
                            <span>người khác đã học</span>
                        </p>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Khóa học miễn phí</h4>
                            <Link className={cx('view-all')} to={config.routes.learning}>
                                Xem lộ trình
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>

                    {/* Tạo ra bản sao của mảng rồi sắp xếp theo thứ tự ưu tiên tăng dần và có giá = 0 */}
                    <div className={cx('list')}>
                        {courses &&
                            [...courses]
                                .sort((a, b) => a.priority - b.priority)
                                .map(
                                    (course) =>
                                        course.price === 0 && (
                                            <CommonItem
                                                type="free"
                                                key={course._id}
                                                student={course.userLearning}
                                                title={course.title}
                                                image={course.image}
                                                pathName={`/courses/${course.slug}`}
                                            />
                                        )
                                )}
                    </div>
                </div>

                <div className={cx('content-wrap')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Bài viết nổi bật</h4>
                            <Link className={cx('view-all')} to="/blog">
                                Xem tất cả
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        {blogs
                            .slice(-8)
                            .map(
                                (blog) =>
                                    blog.homePage && (
                                        <CommonItem
                                            type="blog"
                                            key={blog._id}
                                            title={blog.title}
                                            image={blog.imagePreview}
                                            author={blog.author}
                                            readingTime={blog.readingTime}
                                            pathName={`/blog/${blog.slug}`}
                                        />
                                    )
                            )}
                    </div>
                </div>

                <div className={cx('content-wrap')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Videos nổi bật</h4>
                            <a className={cx('view-all')} href="https://www.youtube.com/c/F8VNOfficial/videos">
                                Xem tất cả
                                <FontAwesomeIcon icon={faChevronRight} />
                            </a>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        {videos.map(
                            (video) =>
                                video.status && (
                                    <CommonItem
                                        type="video"
                                        key={video._id}
                                        title={video.title}
                                        image={video.image}
                                        pathName={`https://www.youtube.com/watch?v=${video.urlVideo}`}
                                        dataVideo={video}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
