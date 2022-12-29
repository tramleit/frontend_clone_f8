import { faArrowRight, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeSidebarCourse, openSidebarCourse } from '~/redux/reducer/modunReducer';
import styles from './FooterTrack.module.scss';

const cx = classNames.bind(styles);

function FooterTrack() {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();

    const handleToggleSidebar = () => {
        if (active) {
            dispatch(openSidebarCourse());
            setActive(false);
        } else {
            dispatch(closeSidebarCourse());
            setActive(true);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <button className={cx('btn-left')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Bài trước</span>
            </button>
            <button className={cx('btn-right')}>
                <span>Bài tiếp theo</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className={cx('toggle-sidebar')} onClick={handleToggleSidebar}>
                <h3 className={cx('title')}>1. Giới thiệu</h3>
                <button className={cx('toggle-btn')}>
                    {active ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faArrowRight} />}
                </button>
            </div>
        </div>
    );
}

export default FooterTrack;
