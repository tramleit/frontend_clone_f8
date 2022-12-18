import React from 'react';
import classNames from 'classnames/bind';
import styles from './ActivityItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ActivityItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img src="https://files.fullstack.edu.vn/f8-prod/user_photos/253914/63391f65d6f9d.jpg" alt="" />
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Link className={cx('author')}>
                        <span>Name You</span>
                    </Link>
                    <span className={cx('reaction')}>&#128518;</span>
                    <span>đã bày tỏ cảm xúc về bình luận của </span>
                    <Link className={cx('author')}>
                        <span>Tuấn Trần:</span>
                    </Link>
                    <Link className={cx('message')}>
                        <span>"a Sơn bảo: " Họ Lê khá là ổn " haha"</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ActivityItem;
