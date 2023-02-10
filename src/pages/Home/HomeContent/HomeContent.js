import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import CommonItem from '~/components/CommonItem';

import styles from './HomeContent.module.scss';

const cx = classNames.bind(styles);

function HomeContent({ isNew = false, title, data = [], countStudent = 0, type }) {
    let Component, titleViewAll, pathViewAll;

    switch (type) {
        case 'free':
            Component = Link;
            titleViewAll = 'Xem lộ trình';
            pathViewAll = config.routes.learning;
            break;
        case 'blog':
            Component = Link;
            titleViewAll = 'Xem tất cả';
            pathViewAll = config.routes.blog;
            break;
        case 'video':
            Component = 'a';
            titleViewAll = 'Xem tất cả';
            pathViewAll = 'https://www.youtube.com/c/F8VNOfficial/videos';
            break;
        default:
            Component = Link;
            titleViewAll = 'Xem tất cả';
            pathViewAll = config.routes.home;
    }

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
                        {!isNew && (
                            <Component className={cx('view-all-icon')} href={pathViewAll} to={pathViewAll}>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Component>
                        )}
                    </h4>

                    {!isNew && (
                        <Component className={cx('view-all')} href={pathViewAll} to={pathViewAll}>
                            {titleViewAll}
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Component>
                    )}
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
