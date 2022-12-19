import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import Heading from '~/components/Heading';
import PostItem from '~/components/PostItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Blog() {
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
                        <PostItem
                            title="Làm thế nào để Copy CSS selector một cách nhanh nhất?"
                            desc="Extension chặn đứng Sử dụng sai `CSS selector`. Nó cho phép bạn copy tất cả hoặc một phần (bạn
                        lựa chọn) tên `id`, tên `class` từ `file HTML` sang `file CSS`"
                        />
                        <PostItem
                            title="Ôn lại kiến thức Javascript phần 2"
                            desc="Hôm nay chúng ta sẽ tìm hiểu về các method trong javascript như foreach(), map(), find(), some(), every(), reduce(), filter()...."
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/5632/638cd33fcfb81.png"
                        />
                        <PostItem
                            title="Làm thế nào để Copy CSS selector một cách nhanh nhất?"
                            desc="Extension chặn đứng Sử dụng sai `CSS selector`. Nó cho phép bạn copy tất cả hoặc một phần (bạn
                        lựa chọn) tên `id`, tên `class` từ `file HTML` sang `file CSS`"
                        />
                        <PostItem
                            title="Ôn lại kiến thức Javascript phần 2"
                            desc="Hôm nay chúng ta sẽ tìm hiểu về các method trong javascript như foreach(), map(), find(), some(), every(), reduce(), filter()...."
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/5632/638cd33fcfb81.png"
                        />
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
