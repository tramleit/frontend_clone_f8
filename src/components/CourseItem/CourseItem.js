import React from 'react';
import classNames from 'classnames/bind';
import styles from './CourseItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CourseItem() {
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('thumb')}>
                <img src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png" alt="" />
            </Link>
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <Link>Làm việc với Terminal & Ubuntu</Link>
                </h4>
                <p className={cx('desc')}>
                    Sở hữu một Terminal hiện đại, mạnh mẽ trong tùy biến và học cách làm việc với Ubuntu là một bước
                    quan trọng trên con đường trở thành một Web Developer.
                </p>
            </div>
        </div>
    );
}

export default CourseItem;
