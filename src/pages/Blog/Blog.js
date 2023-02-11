import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import config from '~/config';
import Heading from '~/components/Heading';
import PostItem from '~/components/PostItem';
import Pagination from '~/components/Pagination';
import LayoutWrapper from '~/components/LayoutWrapper';
import { getPostByPage, getTopic } from '~/services/apiBlog';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './Blog.module.scss';
import TopicPosts from './Topic/Topic';

const cx = classNames.bind(styles);

function Blog() {
    const [totalPage, setTotalPage] = useState(0);
    const [dataPages, setDataPages] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('currentPage'));

    const [nameHeading, setNameHeading] = useState(null);
    const [descHeading, setDescHeading] = useState(null);

    const { slug } = useParams();
    const dispatch = useDispatch();
    const page = searchParams.get('page');

    useEffect(() => {
        if (currentPage && !slug) {
            setSearchParams({ page: currentPage });
        } else {
            setSearchParams({ page: 1 });
            setCurrentPage(1);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    useEffect(() => {
        document.title = 'Danh sách bài viết về lĩnh vực IT';

        if (page) {
            const fetchApi = async () => {
                if (page && !slug) {
                    const result = await getPostByPage(page);

                    if (result.statusCode === 0) {
                        setDataPages(result.data);
                        setTotalPage(result.totalPages);
                    } else {
                        dispatch(showNotification(result.message));
                    }
                } else if (slug && page) {
                    const result = await getTopic(slug, page);

                    if (result.statusCode === 0) {
                        setDataPages(result.data);
                        setTotalPage(result.totalPages);
                    } else {
                        dispatch(showNotification(result.message));
                    }
                }
            };
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, slug]);

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
                        {window.innerWidth < 1023 && <TopicPosts config={config} slug={slug} />}

                        {dataPages.length > 0 ? (
                            dataPages?.map((post) => <PostItem key={post._id} dataPost={post} />)
                        ) : (
                            <div className={cx('no-result')}>
                                {slug
                                    ? `Chưa có bài viết nào về chủ đề ${nameHeading} `
                                    : 'Chưa có bài biết nào được đăng'}
                            </div>
                        )}

                        {totalPage > 0 && (
                            <Pagination
                                totalPage={totalPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                setSearchParams={setSearchParams}
                            />
                        )}
                    </div>
                </div>

                <TopicPosts config={config} slug={slug} />
            </div>
        </LayoutWrapper>
    );
}

export default Blog;
