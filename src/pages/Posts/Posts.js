import moment from 'moment';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import Reaction from './Reaction';
import { Image } from '~/assets/image';
import { IconCrownUser } from '~/assets/Icon';
import ActionPost from '~/components/ActionPost';
import MarkdownParser from '~/components/tracks/MarkdownParser';
import { showNotification } from '~/redux/reducer/modunReducer';
import { getPostBySlug, reactionPosts } from '~/services/apiBlog';

import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

function Posts() {
    const [post, setPost] = useState(null);

    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getPostBySlug(slug);

            if (result.statusCode === 0) {
                setPost(result.data);
                document.title = `${result.data.title} | by ${result.data.author.name} | F8`;
            } else {
                dispatch(showNotification(result.message));
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const handleReaction = async () => {
        if (currentUser) {
            const result = await reactionPosts(post._id, currentUser.accessToken);

            if (result.statusCode === 0) {
                setPost(result.data);
            } else {
                dispatch(showNotification(result.message));
            }
        } else {
            navigate(config.routes.login);
            dispatch(showNotification('Bạn chưa đăng nhập'));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('info-post')}>
                        <div className={cx('aside')}>
                            <Link to={`/@${post?.author.username}`}>
                                <h3 className={cx('name-author')}>{post?.author.name}</h3>
                            </Link>
                            <p className={cx('author-bio')}>{post?.author.bio}</p>
                            <hr />

                            <Reaction handleReaction={handleReaction} post={post} userId={currentUser?._id} />
                        </div>
                    </div>

                    <div className={cx('content-post')}>
                        <div style={{ height: 'auto' }}>
                            <h1 className={cx('title-post')}>{post?.title}</h1>

                            <div className={cx('info-author')}>
                                <div className={cx('author-user')}>
                                    <Link className={cx('avatar-wrap')} to={`/@${post?.author.username}`}>
                                        <div className={post?.author.admin ? cx('avatar', 'active') : cx('avatar')}>
                                            <img
                                                src={post?.author.avatar ? post?.author.avatar : Image.avatar}
                                                alt={post?.author.name}
                                            />
                                        </div>
                                        {post?.author.admin && (
                                            <IconCrownUser width="1.7rem" height="1.7rem" className={cx('crown')} />
                                        )}
                                    </Link>

                                    <div className={cx('info-user')}>
                                        <Link to={`/@${post?.author.username}`}>
                                            <span className={cx('info-name')}>{post?.author.name}</span>
                                            {post?.author.tick && <FontAwesomeIcon icon={faCircleCheck} />}
                                        </Link>
                                        <p className={cx('time')}>
                                            {moment(post?.createdAt).fromNow()} <span className={cx('dot')}>·</span>{' '}
                                            {post?.readingTime > 0 ? post?.readingTime : '0'} phút đọc
                                        </p>
                                    </div>
                                </div>

                                <ActionPost dataPost={post} />
                            </div>

                            <MarkdownParser
                                data={post?.contentHTML}
                                fontSize={window.innerWidth < 740 ? '1.6rem' : '1.8rem'}
                            />

                            <div className={cx('footer-post')}>
                                <Reaction handleReaction={handleReaction} post={post} userId={currentUser?._id} />

                                {post?.tags && (
                                    <div className={cx('tags-post')}>
                                        {post?.tags.map((tag, index) => (
                                            <Link
                                                to={`${config.routes.blog}${config.routes.topic}/${tag.value}`}
                                                className={cx('tags')}
                                                key={index}
                                            >
                                                {tag.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                <div className={cx('same-author')}>
                                    <h3 className={cx('same-title')}>Bài đăng cùng tác giả</h3>
                                    {post?.author.myBlogs?.length > 1 ? (
                                        <ul className={cx('same-list')}>
                                            {post?.author.myBlogs.slice(-5).map((blog, index) => {
                                                return (
                                                    blog.slug !== slug && (
                                                        <li key={index}>
                                                            <Link to={`/blog/${blog.slug}`}>{blog.metaTitle}</Link>
                                                        </li>
                                                    )
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <span className={cx('no-result')}>Tác giả chưa có bài đăng nào khác.</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
