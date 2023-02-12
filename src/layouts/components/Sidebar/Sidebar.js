import { useState } from 'react';
import classNames from 'classnames/bind';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faRoad, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import CreateButton from '~/components/CreateButton';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const [isHovered, setIsHovered] = useState(false);

    const pathName = useLocation().pathname;
    const hasAtSymbol = pathName.includes('/@') || (pathName.includes('/blog/') && !pathName.includes('/blog/topic/'));

    return (
        <div className={hasAtSymbol ? cx('wrapper', 'active') : cx('wrapper')}>
            <div
                className={hasAtSymbol && !isHovered ? cx('sidebar', 'active') : cx('sidebar')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div>
                    <CreateButton />
                </div>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={config.routes.home}>
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={config.routes.learning}>
                            <FontAwesomeIcon icon={faRoad} />
                            <span>Lộ trình</span>
                        </NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={config.routes.courses}>
                            <FontAwesomeIcon icon={faLightbulb} />
                            <span>Học</span>
                        </NavLink>
                    </li>
                    <li className={cx('item')}>
                        <NavLink
                            className={(nav) => cx('link', { active: nav.isActive })}
                            to={config.routes.blog}
                            onClick={() => localStorage.setItem('currentPage', 1)}
                        >
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
