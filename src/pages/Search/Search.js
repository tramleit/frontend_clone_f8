import classNames from 'classnames/bind';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Courses from './Courses';
import Posts from './Posts';
import styles from './Search.module.scss';
import Videos from './Videos';
import useDebounce from '~/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { searchByName } from '~/services/apiSearch';
import HeadingTabs from '~/components/HeadingTabs';

const cx = classNames.bind(styles);

function Search() {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [courses, setCourses] = useState([]);
    const [posts, setPost] = useState([]);
    const [videos, setVideos] = useState([]);

    const navigate = useNavigate();
    const { slug } = useParams();
    const location = useLocation();
    const q = new URLSearchParams(location.search).get('q');

    const debounced = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!q) {
            navigate('/search/courses?q=');
        } else {
            setSearchValue(q);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q]);

    useEffect(() => {
        if (searchValue !== '') {
            navigate(`/search/${slug}?q=${searchValue}`);
        }

        if (searchValue === '') {
            setActiveTab(false);
        }

        if (!debounced.trim()) {
            return;
        }

        if (debounced.length > 1) {
            setLoading(true);
            const fetchApi = async () => {
                const result = await searchByName(debounced, 'odd');
                setActiveTab(true);

                if (result.statusCode === 0) {
                    setLoading(false);
                    setCourses(result.data.courses);
                    setPost(result.data.blogs);
                    setVideos(result.data.videos);
                } else {
                    setLoading(false);
                }
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleOnChangeInput = (e) => {
        setSearchValue(e);
        setActiveTab(true);

        if (searchValue === '') {
            setCourses([]);
            setPost([]);
            setVideos([]);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <input
                    className={activeTab ? cx('active') : ''}
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchValue}
                    onChange={(e) => handleOnChangeInput(e.target.value)}
                />

                <div className={cx('result')}>
                    <div className={cx('content')}>
                        {activeTab && searchValue !== '' && (
                            <HeadingTabs
                                searchValue={searchValue}
                                titles={[
                                    { title: 'Khóa học', pathname: `/search/courses?q=${searchValue}` },
                                    { title: 'Bài viết', pathname: `/search/posts?q=${searchValue}` },
                                    { title: 'Video', pathname: `/search/videos?q=${searchValue}` },
                                ]}
                            />
                        )}

                        {searchValue !== '' && (
                            <>
                                {slug === 'courses' && <Courses loading={loading} courses={courses} />}
                                {slug === 'posts' && <Posts loading={loading} posts={posts} />}
                                {slug === 'videos' && <Videos loading={loading} videos={videos} />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
