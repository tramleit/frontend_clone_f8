import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconCrownUser } from '~/assets/Icon';
import { Image } from '~/assets/image';
import ActionPost from '~/components/ActionPost';
import MarkdownParser from '~/components/tracks/MarkdownParser';
import config from '~/config';
import { getPostBySlug } from '~/services/apiBlog';
import styles from './Posts.module.scss';
import Reaction from './Reaction';

const cx = classNames.bind(styles);

function Posts() {
    const [post, setPost] = useState(null);
    const slug = useParams().slug;

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getPostBySlug(slug);

            setPost(result);
            document.title = result.title;
        };
        fetchApi();
    }, [slug]);

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

                            <Reaction like={post?.reactionsCount} comment={post?.comments} />
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

                            <MarkdownParser data={post?.contentHTML} fontSize="1.8rem" />

                            <div className={cx('footer-post')}>
                                <Reaction like={post?.reactionsCount} comment={post?.comments} />

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
                                    {post?.author.myBlogs.length > 0 ? (
                                        <ul className={cx('same-list')}>
                                            {post?.author.myBlogs.slice(-5).map((blog, index) => {
                                                return (
                                                    blog.slug !== slug && (
                                                        <li key={index}>
                                                            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
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
