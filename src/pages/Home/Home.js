import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Banner from '~/components/Banner';
import styles from './Home.module.scss';
import CommonItem from '~/components/CommonItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    useEffect(() => {
        document.title = 'F8 - Học lâp trình để đi làm!';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banner />
            </div>

            <div className={cx('course')}>
                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>
                                Khóa học Pro
                                <span className={cx('course-new')}>Mới</span>
                            </h4>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        <CommonItem
                            type="pro"
                            name="HTML CSS Pro"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png"
                        />
                        <CommonItem
                            type="pro"
                            coming={true}
                            name="JavaScript Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png"
                        />
                        <CommonItem
                            type="pro"
                            coming={true}
                            name="ReactJS Pro"
                            imageComing="https://files.fullstack.edu.vn/f8-prod/courses/20/62f13dded314e.png"
                        />
                    </div>
                </div>

                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <p className={cx('sub-heading')}>
                            <strong>268.579+ </strong>
                            <span>người khác đã học</span>
                        </p>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Khóa học miễn phí</h4>
                            <Link className={cx('view-all')} to="/learning">
                                Xem lộ trình
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        <CommonItem
                            type="free"
                            student="91.875"
                            name="Kiến Thức Nhập Môn IT"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                        />
                        <CommonItem
                            type="free"
                            student="140.893"
                            name="HTML CSS từ Zero đến Hero"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/2.png"
                        />
                        <CommonItem
                            type="free"
                            student="32.006"
                            name="Responsive Với Grid System"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/3.png"
                        />
                        <CommonItem
                            type="free"
                            student="91.590"
                            name="Lập Trình JavaScript Cơ Bản"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/1.png"
                        />
                        <CommonItem
                            type="free"
                            student="24.010"
                            name="Lập Trình JavaScript Nâng Cao"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/12.png"
                        />
                        <CommonItem
                            type="free"
                            student="9.349"
                            name="Làm việc với Terminal & Ubuntu"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png"
                        />
                        <CommonItem
                            type="free"
                            student="38.527"
                            name="Xây Dựng Website với ReactJS"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
                        />
                        <CommonItem
                            type="free"
                            student="26.921"
                            name="Node & ExpressJS"
                            image="https://files.fullstack.edu.vn/f8-prod/courses/6.png"
                        />
                        <CommonItem
                            type="free"
                            student="6.251"
                            name='App "Đừng Chạm Tay Lên Mặt"'
                            image="https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png"
                        />
                    </div>
                </div>

                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Bài viết nổi bật</h4>
                            <Link className={cx('view-all')} to="/blog">
                                Xem tất cả
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        <CommonItem
                            type="blog"
                            name="Tổng hợp các sản phẩm của học viên tại F8"
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png"
                        />
                        <CommonItem
                            type="blog"
                            name="[Phần 1] Tạo dự án ReactJS với Webpack và Babel"
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/279/6153f692d366e.jpg"
                        />
                        <CommonItem
                            type="blog"
                            name="Ký sự ngày thứ 25 học ở F8"
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/51/6139c6453456e.png"
                        />
                        <CommonItem
                            type="blog"
                            name="Cách đưa code lên GitHub và tạo GitHub Pages"
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/677/615436b218d0a.png"
                        />
                        <CommonItem
                            type="blog"
                            name="Các nguồn tài nguyên hữu ích cho 1 front-end developer"
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/107/613a1f3685814.png"
                        />
                        <CommonItem
                            type="blog"
                            name="Thời gian và Động lực"
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/1671/61b6368983c16.jpg"
                        />
                        <CommonItem
                            type="blog"
                            name="Tổng hợp tài liệu tự học tiếng anh cơ bản."
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/273/614043e523ad9.png"
                        />
                        <CommonItem
                            type="blog"
                            name="Học như thế nào là phù hợp ?"
                            image="https://files.fullstack.edu.vn/f8-prod/blog_posts/791/615de64de7e8f.jpg"
                        />
                    </div>
                </div>

                <div className={cx('course-wrapper')}>
                    <div className={cx('heading')}>
                        <div className={cx('heading-wrap')}>
                            <h4 className={cx('title')}>Videos nổi bật</h4>
                            <a className={cx('view-all')} href="https://www.youtube.com/c/F8VNOfficial/videos">
                                Xem tất cả
                                <FontAwesomeIcon icon={faChevronRight} />
                            </a>
                        </div>
                    </div>

                    <div className={cx('list')}>
                        <CommonItem
                            type="video"
                            name="Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?"
                            image="https://i.ytimg.com/vi/YH-E4Y3EaT4/maxresdefault.jpg"
                        />
                        <CommonItem
                            type="video"
                            name='"Code Thiếu Nhi Battle" Tranh Giành Trà Sữa Size L'
                            image="https://i.ytimg.com/vi/sgq7BH6WxL8/maxresdefault.jpg"
                        />
                        <CommonItem
                            type="video"
                            name="Phương pháp học lập trình của Admin F8?"
                            image="https://i.ytimg.com/vi/DpvYHLUiZpc/maxresdefault.jpg"
                        />
                        <CommonItem
                            type="video"
                            name="Bạn sẽ làm được gì sau khóa học?"
                            image="https://i.ytimg.com/vi/R6plN3FvzFY/maxresdefault.jpg"
                        />
                        <CommonItem
                            type="video"
                            name="Làm sao để có thu nhập cao và đi xa hơn trong ngành IT?"
                            image="https://i.ytimg.com/vi/oF7isq9IjZM/maxresdefault.jpg"
                        />
                        <CommonItem
                            type="video"
                            name="Javascript có thể làm được gì? Giới thiệu qua về trang F8 | Học lập trình Javascript cơ bản"
                            image="https://i.ytimg.com/vi/0SJE9dYdpps/maxresdefault.jpg"
                        />
                        <CommonItem
                            type="video"
                            name="ReactJS là gì? Tại sao nên học ReactJS?"
                            image="https://i.ytimg.com/vi/x0fSBAgBrOQ/maxresdefault.jpg"
                        />
                        <CommonItem
                            type="video"
                            name="Code Music Player"
                            image="https://i.ytimg.com/vi/vAecGPWxzFE/maxresdefault.jpg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
