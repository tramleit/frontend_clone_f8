import React from 'react';
import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CourseItem({ data }) {
    console.log('data: ', data);
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('thumb')} to={`/courses/${data.course.slug}`}>
                <img src={data.course.image} alt={data.course.title} />
            </Link>
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <Link to={`/courses/${data.course.slug}`}>{data.course.title}</Link>
                </h4>
                <p className={cx('desc')}>{data.course.description}</p>
            </div>
        </div>
    );
}

export default CourseItem;
