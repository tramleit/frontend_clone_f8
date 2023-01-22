import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import config from '~/config';
import Heading from '~/components/Heading';
import PostItem from '~/components/PostItem';
import Pagination from '~/components/Pagination';
import LayoutWrapper from '~/components/LayoutWrapper';
import { getPageBlogs, getTopic } from '~/services/apiBlog';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './Blog.module.scss';

const cx = classNames.bind(styles);

function Blog() {
    const [dataPages, setDataPages] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [nameHeading, setNameHeading] = useState(null);
    const [descHeading, setDescHeading] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { slug } = useParams();
    const page = new URLSearchParams(location.search).get('page');

    useEffect(() => {
        const fetchApi = async () => {
            if (!page && !slug) {
                navigate(`${config.routes.blog}?page=1`);
            } else if (slug && !page) {
                navigate(`${config.routes.blog}${config.routes.topic}/${slug}?page=1`);
            }

            if (page && !slug) {
                const result = await getPageBlogs(page);

                if (result.errCode === 0) {
                    setDataPages(result.data);
                    setTotalPage(result.totalPages);
                } else {
                    dispatch(showNotification(result.message || 'Lỗi lấy dữ liệu bài viết'));
                }
            } else if (slug && page) {
                const result = await getTopic(slug, page);

                if (result.errCode === 0) {
                    setDataPages(result.data);
                    setTotalPage(result.totalPages);
                } else {
                    dispatch(showNotification(result.message || 'Lỗi lấy dữ liệu bài viết'));
                }
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, slug]);

    useEffect(() => {
        document.title = 'Danh sách bài viết về lĩnh vực IT';
    }, []);

    useEffect(() => {
        config.topics.filter((topic) => {
            if (topic.slug === slug) {
                setNameHeading(topic.label);
                setDescHeading(topic.desc);
            }

            return topic;
        });
    }, [slug]);

    return (
        <LayoutWrapper>
            <Heading
                name={slug ? nameHeading : 'Bài viết nổi bật'}
                desc={
                    slug
                        ? descHeading
                        : 'Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.'
                }
            />

            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('content-left')}>
                        {dataPages.length > 0 ? (
                            dataPages?.map((post) => <PostItem key={post._id} dataPost={post} />)
                        ) : (
                            <div className={cx('no-result')}>
                                {slug
                                    ? `Chưa có bài viết nào về chủ đề ${nameHeading} `
                                    : 'Chưa có bài biết nào được đăng'}
                            </div>
                        )}

                        {totalPage > 0 && <Pagination totalPage={totalPage} />}
                    </div>
                </div>
                <div className={cx('right')}>
                    <h4>Các chủ đề được đề xuất</h4>
                    <ul>
                        {config.topics.map(
                            (topic, index) =>
                                topic.slug !== slug && (
                                    <li key={index}>
                                        <Link to={`${config.routes.blog}${config.routes.topic}/${topic.slug}`}>
                                            {topic.label}
                                        </Link>
                                    </li>
                                )
                        )}
                    </ul>
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default Blog;
