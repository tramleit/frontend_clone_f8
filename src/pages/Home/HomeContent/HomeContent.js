import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import CommonItem from '~/components/CommonItem';
import config from '~/config';

import styles from './HomeContent.module.scss';

const cx = classNames.bind(styles);

function HomeContent({ isNew = false, title, data = [], countStudent = 0, type }) {
    return (
        <div className={cx('content-wrap')}>
            <div className={cx('heading')}>
                {type === 'free' && (
                    <p className={cx('sub-heading')}>
                        <strong>{countStudent}+</strong>
                        <span>người khác đã học</span>
                    </p>
                )}

                <div className={cx('heading-wrap')}>
                    <h4 className={cx('title')}>
                        {title}

                        {isNew && <span className={cx('course-new')}>Mới</span>}
                    </h4>
                    <Link className={cx('view-all')} to={config.routes.learning}>
                        Xem lộ trình
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                </div>
            </div>
            <div className={cx('list')}>
                {data.map((child) => (
                    <CommonItem type={type} key={child._id} data={child} />
                ))}
            </div>
        </div>
    );
}

export default HomeContent;
