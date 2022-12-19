import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { IconCrownUser } from '~/assets/Icon';

import styles from './PostItem.module.scss';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function PostItem({ title, desc, image }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('author')}>
                    <Link>
                        <div className={cx('avatar-wrap')}>
                            <div className={cx('avatar')}>
                                <img
                                    src="https://files.fullstack.edu.vn/f8-prod/user_avatars/36050/628a1334d274d.jpg"
                                    alt=""
                                />
                            </div>
                            <IconCrownUser />
                        </div>
                    </Link>
                    <Link>
                        <span>Nguyễn Thanh Hòa</span>
                        <FontAwesomeIcon icon={faCircleCheck} />
                    </Link>
                </div>

                <div className={cx('actions')}>
                    <div className={cx('btn-save')}>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                    <div className={cx('btn-option')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            </div>

            <div className={cx('body')}>
                <div className={cx('content')}>
                    <Link>
                        <h2 className={cx('title')}>{title}</h2>
                    </Link>
                    <p className={cx('desc')}>{desc}</p>
                    <div className={cx('info')}>
                        <Link className={cx('tags')}>Front-end</Link>
                        <span>8 ngày trước</span>
                        <span className={cx('dot')}>·</span>
                        <span>10 phút đọc</span>
                    </div>
                </div>
                {!!image && (
                    <div className={cx('thumb')}>
                        <Link>
                            <img src={image} alt="" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostItem;
