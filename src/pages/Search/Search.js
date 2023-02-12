import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Posts from './Posts';
import Videos from './Videos';
import Courses from './Courses';
import useDebounce from '~/hooks/useDebounce';
import HeadingTabs from '~/components/HeadingTabs';
import { searchByName } from '~/services/apiSearch';

import styles from './Search.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Search() {
    const [posts, setPost] = useState([]);
    const [videos, setVideos] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const debounced = useDebounce(searchValue, 600);
    const q = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        if (!q) {
            navigate(`${config.routes.search}${config.routes.courses}?q=`);
        } else {
            setSearchValue(q);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q]);

    useEffect(() => {
        if (searchValue !== '') {
            navigate(`${config.routes.search}/${slug}?q=${searchValue}`);
        }

        if (!searchValue) {
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
                    setPost(result.data.blogs);
                    setVideos(result.data.videos);
                    setCourses(result.data.courses);
                } else {
                    setLoading(false);
                }
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced, searchValue]);

    const handleOnChange = (e) => {
        setSearchValue(e);
        setActiveTab(true);

        if (searchValue === '') {
            setPost([]);
            setVideos([]);
            setCourses([]);
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
                    onChange={(e) => handleOnChange(e.target.value)}
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
