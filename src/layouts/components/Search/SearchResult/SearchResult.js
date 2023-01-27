import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import SearchItem from '~/components/SearchItem';

import styles from './SearchResult.module.scss';

const cx = classNames.bind(styles);

function SearchResult({ data, index, handleHideResult, searchValue }) {
    let title, path;

    switch (index) {
        case 0:
            title = 'KHÓA HỌC';
            path = 'courses';
            break;
        case 1:
            title = 'BÀI VIẾT';
            path = 'posts';
            break;
        case 2:
            title = 'VIDEO';
            path = 'videos';
            break;
        default:
            title = 'TIÊU ĐỀ';
            path = 'courses';
    }

    return (
        <Fragment>
            {data.length > 0 && (
                <Fragment>
                    <div className={cx('search-heading')}>
                        <h4>{title}</h4>
                        <Link to={`/search/${path}?q=${searchValue}`}>Xem thêm</Link>
                    </div>
                    {data.map((child) => (
                        <SearchItem handleHideResult={handleHideResult} key={child._id} data={child} />
                    ))}
                </Fragment>
            )}
        </Fragment>
    );
}

export default SearchResult;
