import config from '~/config';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './CircularProgressBar.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function CircularProgressBar({ course }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    return (
        <Tippy content={course.name}>
            <Link className={cx('wrapper')} to={`${config.routes.courses}/${course.slug}`}>
                <img
                    className={currentUser.myCourses.includes(course._id) ? '' : cx('active')}
                    src={course.icon}
                    alt={course.name}
                />
            </Link>
        </Tippy>
    );
}

export default CircularProgressBar;
