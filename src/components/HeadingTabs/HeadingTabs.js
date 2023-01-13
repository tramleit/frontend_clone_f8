import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './HeadingTabs.module.scss';

const cx = classNames.bind(styles);

function HeadingTabs({ titles = [] }) {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('tabs')}>
                {titles.map((title, index) => (
                    <li key={index}>
                        <NavLink className={(nav) => cx({ active: nav.isActive })} to={title.pathname}>
                            {title.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className={cx('divider')}></div>
        </div>
    );
}

export default HeadingTabs;
