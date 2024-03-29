import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './LearningGroup.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function LearningGroup({ group }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>
                {group.priority}. {group.title}
            </h2>
            <div className={cx('desc')}>{group.description}</div>

            <div className={cx('body')}>
                {group.courses.map((course) => (
                    <div className={cx('item')} key={course._id}>
                        <div className={cx('wrap')}>
                            <div className={cx('thumb')}>
                                <Link to={`${config.routes.courses}/${course.slug}`}>
                                    <img src={course.image} alt={course.title} />
                                </Link>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('title-course')}>
                                    <Link to={`${config.routes.courses}/${course.slug}`}>
                                        <span>{course.title}</span>
                                        <span className={cx('free')}>{course.price > 0 ? 'Pro' : 'Miễn phí'}</span>
                                    </Link>
                                </div>
                                <p className={cx('desc-course')}>{course.description}</p>
                                <Link className={cx('btn-course')} to={`${config.routes.courses}/${course.slug}`}>
                                    {currentUser?.myCourses.includes(course._id) ? 'Tiếp tục học' : 'Xem khóa học'}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearningGroup;
