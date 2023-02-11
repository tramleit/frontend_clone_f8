import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ totalPage, currentPage, setCurrentPage, setSearchParams }) {
    const handlePageChange = (page) => {
        setSearchParams({ page: page });
        setCurrentPage(page);
        localStorage.setItem('currentPage', page);
    };

    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
        pages.push(
            <div
                key={i}
                className={cx('page', { active: Number(currentPage) === i })}
                onClick={Number(currentPage) !== i ? () => handlePageChange(i) : undefined}
            >
                <span style={{ margin: '0 auto' }}>{i}</span>
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('page', 'pre', { disabled: Number(currentPage) === 1 })}
                onClick={Number(currentPage) !== 1 ? () => handlePageChange(Number(currentPage) - 1) : undefined}
            >
                <FontAwesomeIcon icon={faAnglesLeft} />
            </div>

            {pages.map((page) => page)}

            <div
                className={cx('page', 'next', { disabled: Number(currentPage) === totalPage })}
                onClick={
                    Number(currentPage) !== totalPage ? () => handlePageChange(Number(currentPage) + 1) : undefined
                }
            >
                <FontAwesomeIcon icon={faAnglesRight} />
            </div>
        </div>
    );
}

export default Pagination;
