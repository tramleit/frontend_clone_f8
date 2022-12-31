import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Pagination.module.scss';
import { useDispatch } from 'react-redux';
import { getPageBlogs } from '~/services/apiBlog';

const cx = classNames.bind(styles);

function Pagination() {
    const savedPage = localStorage.getItem('currentPage');
    const initialPage = savedPage ? parseInt(savedPage, 10) : 1;

    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const dispatch = useDispatch();
    const location = useLocation();
    const page = new URLSearchParams(location.search).get('page');

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getPageBlogs(page, dispatch);

            if (result.errCode === 0) {
                setTotalPage(result.totalPages);
            } else {
                alert('Lỗi lấy dữ liệu bài viết');
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        localStorage.setItem('currentPage', page);
    };

    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(
            <Link
                key={i}
                className={cx('page', { active: currentPage === i })}
                to={`/blog?page=${i}`}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </Link>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <Link
                to={currentPage === 1 ? `/blog?page=${1}` : `/blog?page=${currentPage - 1}`}
                className={cx('page', { disabled: currentPage === 1 })}
                onClick={currentPage === 1 ? null : () => handlePageChange(currentPage - 1)}
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </Link>

            {pages.map((page) => page)}

            <Link
                to={currentPage === totalPage ? `/blog?page=${totalPage}` : `/blog?page=${currentPage + 1}`}
                className={cx('page', { disabled: currentPage === totalPage })}
                onClick={currentPage === totalPage ? null : () => handlePageChange(currentPage + 1)}
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </Link>
        </div>
    );
}

export default Pagination;
