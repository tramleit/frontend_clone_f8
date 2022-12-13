import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
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
                        <Link className={cx('link', 'active')} to="/">
                            <FontAwesomeIcon icon={faHome} />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className={cx('item')}>
                        <Link className={cx('link')} to="/learning">
                            <FontAwesomeIcon icon={faRoad} />
                            <span>Lộ trình</span>
                        </Link>
                    </li>
                    <li className={cx('item')}>
                        <Link className={cx('link')} to="/courses">
                            <FontAwesomeIcon icon={faLightbulb} />
                            <span>Học</span>
                        </Link>
                    </li>
                    <li className={cx('item')}>
                        <Link className={cx('link')} to="/blog">
                            <FontAwesomeIcon icon={faNewspaper} />
                            <span>Blog</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
