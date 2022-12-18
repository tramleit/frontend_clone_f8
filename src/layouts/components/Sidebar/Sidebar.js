import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faPlus, faRoad, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const [isHovered, setIsHovered] = useState(false);

    const pathName = useLocation().pathname;
    const hasAtSymbol = pathName.includes('/@');

    return (
        <div className={cx('wrapper')}>
            <div
                className={hasAtSymbol && !isHovered ? cx('sidebar', 'active') : cx('sidebar')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={cx('create-blog')}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <NavLink className={(nav) => cx('link', { active: nav.isActive })} to="/">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink className={(nav) => cx('link', { active: nav.isActive })} to="/learning">
                            <FontAwesomeIcon icon={faRoad} />
                            <span>Lộ trình</span>
                        </NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink className={(nav) => cx('link', { active: nav.isActive })} to="/courses">
                            <FontAwesomeIcon icon={faLightbulb} />
                            <span>Học</span>
                        </NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink className={(nav) => cx('link', { active: nav.isActive })} to="/blog">
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>Blog</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
