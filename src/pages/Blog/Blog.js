import { useEffect } from 'react';
import classNames from 'classnames/bind';
import Heading from '~/components/Heading';
import PostItem from '~/components/PostItem';
import { Link } from 'react-router-dom';
import Pagination from '~/components/Pagination';

import styles from './Blog.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Blog() {
    const currentPage = useSelector((state) => state.pageBlog.currentPageBlogs);

    useEffect(() => {
        document.title = 'Danh sách bài viết về lĩnh vực IT';
    });

    return (
        <div className={cx('wrapper')}>
            <Heading
                name="Bài viết nổi bật"
                desc="Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web."
            />

            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('content-left')}>
                        {currentPage?.map((post) => (
                            <PostItem key={post._id} dataPost={post} />
                        ))}

                        <Pagination />
                    </div>
                </div>
                <div className={cx('right')}>
                    <h4>Các chủ đề được đề xuất</h4>
                    <ul>
                        <li>
                            <Link>Front-end / Mobile apps</Link>
                        </li>
                        <li>
                            <Link>Back-end / Devops</Link>
                        </li>
                        <li>
                            <Link>UI / UX / Design</Link>
                        </li>
                        <li>
                            <Link>Others</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Blog;
