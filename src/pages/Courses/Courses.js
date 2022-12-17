import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Courses.module.scss';

const cx = classNames.bind(styles);

function Courses() {
    useEffect(() => {
        document.title = 'Danh sách các khóa học lập trình tại F8';
    });

    return <div className={cx('wrapper')}>Courses</div>;
}

export default Courses;
