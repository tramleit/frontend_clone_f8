import config from '~/config';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './CircularProgressBar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CircularProgressBar({ course, currentUser }) {
    return (
        <Tippy content={course.title}>
            <Link className={cx('wrapper')} to={`${config.routes.courses}/${course.slug}`}>
                <img
                    className={currentUser.myCourses.includes(course._id) ? '' : cx('active')}
                    src={course.icon}
                    alt={course.title}
                />
            </Link>
        </Tippy>
    );
}

export default CircularProgressBar;
