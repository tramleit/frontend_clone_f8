import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CourseItem.module.scss';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faComment, faEye, faPlay, faThumbsUp, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IconCrownUser } from '~/assets/Icon';

const cx = classNames.bind(styles);

function CourseItem({ type, student, coming = false, name, imageComing, image }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-course')}>
                <Link className={coming ? cx('link', 'disabled') : cx('link')} to="/landing/htmlcss">
                    <img className={cx('image')} src={coming ? imageComing : image} alt="" />
                    <button className={cx('btn-view')}>Xem khóa học</button>

                    {type === 'pro' ? (
                        <div className={cx('crown')}>
                            <img
                                src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                                alt="Crown"
                            />
                        </div>
                    ) : (
                        Fragment
                    )}

                    {type === 'video' ? (
                        <div className={cx('video-wrap')}>
                            <div className={cx('play')}>
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                            <div className={cx('duration')}>
                                <span>34:51</span>
                            </div>
                        </div>
                    ) : (
                        Fragment
                    )}
                </Link>
                <h4 className={cx('name-course')}>
                    <Link to="/landing/htmlcss" className={coming ? cx('disabled-name') : ''}>
                        {name}
                    </Link>
                </h4>
                {type === 'pro' && !coming ? (
                    <div className={cx('price')}>
                        <span className={cx('old-price')}>2.499.000đ</span>
                        <span className={cx('new-price')}>1.299.000đ</span>
                    </div>
                ) : (
                    Fragment
                )}

                {type === 'free' ? (
                    <div className={cx('studying')}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{student}</span>
                    </div>
                ) : (
                    Fragment
                )}

                {type === 'blog' ? (
                    <div className={cx('author')}>
                        <Link className={cx('avatar-wrap')}>
                            <div className={cx('avatar')}>
                                <img
                                    src="https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png"
                                    alt="Sơn Đặng"
                                />
                            </div>
                            <IconCrownUser className={cx('crown-user')} />
                        </Link>
                        <Link className={cx('name-author')}>
                            <span className={cx('user-name')}>Sơn Đặng</span>
                            <FontAwesomeIcon icon={faCircleCheck} />
                            <span className={cx('dot')}>·</span>
                            <span>6 phút đọc</span>
                        </Link>
                    </div>
                ) : (
                    Fragment
                )}

                {type === 'video' ? (
                    <div className={cx('stats')}>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faEye} />
                            <span>212.524</span>
                        </div>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>3.124</span>
                        </div>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faComment} />
                            <span>229</span>
                        </div>
                    </div>
                ) : (
                    Fragment
                )}
            </div>
        </div>
    );
}

export default CourseItem;
