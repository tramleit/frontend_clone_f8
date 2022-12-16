import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CommonItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faComment, faEye, faPlay, faThumbsUp, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IconCrownUser } from '~/assets/Icon';
import { useEffect, useState } from 'react';
import { getUserById } from '~/services/apiAuth';
import { Image } from '~/assets/image';

const cx = classNames.bind(styles);

function CommonItem({ type, patch, student, coming = false, name, imageComing, image, author, dataVideo }) {
    const [authorBlog, setAuthorBlog] = useState({});

    useEffect(() => {
        const idAuthor = author;
        if (idAuthor) {
            const fetchApi = async () => {
                const author = await getUserById(idAuthor);
                setAuthorBlog(author);
            };
            fetchApi();
        }
    }, [author]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-course')}>
                {type === 'video' ? (
                    <a
                        className={coming ? cx('link', 'disabled') : cx('link')}
                        href={patch}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img className={cx('image')} src={coming ? imageComing : image} alt={name} />
                        <button className={cx('btn-view')}>Xem khóa học</button>

                        {type === 'pro' && (
                            <div className={cx('crown')}>
                                <img
                                    src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                                    alt="Crown"
                                />
                            </div>
                        )}

                        {type === 'video' && (
                            <div className={cx('video-wrap')}>
                                <div className={cx('play')}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                                <div className={cx('duration')}>
                                    <span>{dataVideo.timeVideo}</span>
                                </div>
                            </div>
                        )}
                    </a>
                ) : (
                    <Link className={coming ? cx('link', 'disabled') : cx('link')} to={patch}>
                        <img className={cx('image')} src={coming ? imageComing : image} alt={name} />
                        <button className={cx('btn-view')}>Xem khóa học</button>

                        {type === 'pro' && (
                            <div className={cx('crown')}>
                                <img
                                    src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                                    alt="Crown"
                                />
                            </div>
                        )}

                        {type === 'video' && (
                            <div className={cx('video-wrap')}>
                                <div className={cx('play')}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                                <div className={cx('duration')}>
                                    <span>{dataVideo.timeVideo}</span>
                                </div>
                            </div>
                        )}
                    </Link>
                )}

                <h4 className={cx('name-course')}>
                    <Link to="/landing/htmlcss" className={coming ? cx('disabled-name') : ''}>
                        {name}
                    </Link>
                </h4>

                {type === 'pro' && !coming && (
                    <div className={cx('price')}>
                        <span className={cx('old-price')}>2.499.000đ</span>
                        <span className={cx('new-price')}>1.299.000đ</span>
                    </div>
                )}

                {type === 'free' && (
                    <div className={cx('studying')}>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{student}</span>
                    </div>
                )}

                {type === 'blog' && (
                    <div className={cx('author')}>
                        <Link className={cx('avatar-wrap')}>
                            <div className={cx('avatar')}>
                                <img
                                    src={authorBlog.avatar !== '' ? authorBlog.avatar : Image.avatar}
                                    alt={authorBlog.name}
                                />
                            </div>
                            {authorBlog.admin && <IconCrownUser className={cx('crown-user')} />}
                        </Link>
                        <Link className={cx('name-author')}>
                            <span className={cx('user-name')}>{authorBlog.name}</span>
                            {authorBlog.tick && <FontAwesomeIcon icon={faCircleCheck} />}
                            <span className={cx('dot')}>·</span>
                            <span>6 phút đọc</span>
                        </Link>
                    </div>
                )}

                {type === 'video' && (
                    <div className={cx('stats')}>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faEye} />
                            <span>{dataVideo.view}</span>
                        </div>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <span>{dataVideo.like}</span>
                        </div>
                        <div className={cx('stats-box')}>
                            <FontAwesomeIcon icon={faComment} />
                            <span>{dataVideo.comment}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommonItem;
