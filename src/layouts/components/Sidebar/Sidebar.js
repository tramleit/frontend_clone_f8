import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faPlus, faRoad, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
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
