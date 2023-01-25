import queryString from 'query-string';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ totalPage, currentPage, setCurrentPage }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePageChange = (page) => {
        const parsed = queryString.parse(location.search);
        parsed.page = page;
        const stringified = queryString.stringify(parsed);
        location.search = stringified;
        navigate(`${location.pathname}?${location.search}`);
        setCurrentPage(page);
        localStorage.setItem('currentPage', page);
    };

    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(
            <span
                key={i}
                className={cx('page', { active: Number(currentPage) === i })}
                onClick={Number(currentPage) !== i ? () => handlePageChange(i) : undefined}
            >
                {i}
            </span>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <span
                className={cx('page', { disabled: Number(currentPage) === 1 })}
                onClick={Number(currentPage) !== 1 ? () => handlePageChange(Number(currentPage) - 1) : undefined}
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </span>

            {pages.map((page) => page)}

            <span
                className={cx('page', { disabled: Number(currentPage) === totalPage })}
                onClick={
                    Number(currentPage) !== totalPage ? () => handlePageChange(Number(currentPage) + 1) : undefined
                }
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </span>
        </div>
    );
}

export default Pagination;
