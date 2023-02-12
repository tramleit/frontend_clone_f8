import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import config from '~/config';
import styles from './CircularProgressBar.module.scss';

const cx = classNames.bind(styles);

function CircularProgressBar({ course, currentUser }) {
    const checkRegistered = currentUser.myCourses.map((course) => course.course);

    return (
        <Tippy content={course.title}>
            <Link className={cx('wrapper')} to={`${config.routes.courses}/${course.slug}`}>
                <img
                    className={checkRegistered.includes(course._id) ? '' : cx('active')}
                    src={course.icon}
                    alt={course.title}
                />
            </Link>
        </Tippy>
    );
}

export default CircularProgressBar;
