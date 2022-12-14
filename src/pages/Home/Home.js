import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Banner from '~/components/Banner';
import styles from './Home.module.scss';
import CourseItem from '~/components/CourseItem';

const cx = classNames.bind(styles);

function Home() {
    useEffect(() => {
        document.title = 'Học lâp trình để đi làm';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banner />
            </div>

            <div className={cx('course')}>
                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <h4 className={cx('title')}>Khóa học Pro</h4>
                        <span>Mới</span>
                    </div>

                    <div className={cx('list-course')}>
                        <CourseItem
                            name="HTML CSS Pro"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                        />
                        <CourseItem
                            coming={true}
                            name="JavaScript Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png"
                        />
                        <CourseItem
                            coming={true}
                            name="ReactJS Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/20/62f13dded314e.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
