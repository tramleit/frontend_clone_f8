import { faCheckCircle, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import FallbackAvatar from '~/components/FallbackAvatar';
import config from '~/config';
import { closeModalMobile, showNotification } from '~/redux/reducer/modunReducer';
import { logoutUser } from '~/services/apiAuth';

import styles from './MobileMenu.module.scss';

const cx = classNames.bind(styles);

function MobileMenu() {
    const [active, setActive] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const { status } = useSelector((state) => state.modun.modalMobile);

    const handleToggle = () => {
        setActive(!active);
    };

    const handleLogout = async () => {
        const result = await logoutUser(dispatch, currentUser.accessToken);

        if (result.statusCode === 0) {
            navigate(config.routes.login);
            window.location.reload();
        } else {
            dispatch(showNotification('Đăng xuất thất bại'));
        }
    };

    return (
        <div
            className={status ? cx('wrapper', 'open') : cx('wrapper', 'close')}
            onClick={() => dispatch(closeModalMobile())}
        >
            <div className={cx('body')} onClick={(event) => event.stopPropagation()}>
                <div className={cx('scrollable')}>
                    <div className={cx('user')}>
                        <div className={cx('avatar-wrap')}>
                            <FallbackAvatar
                                style={{ '--font-size': '8.8px' }}
                                image={currentUser.avatar}
                                alt={currentUser.name}
                                admin={currentUser.admin}
                            />
                        </div>
                        <div className={cx('username')}>
                            <span className={cx('full-name')}>
                                Mã Việt Hà {currentUser.tick && <FontAwesomeIcon icon={faCheckCircle} />}
                            </span>
                        </div>
                    </div>

                    <div className={cx('list-wrap')}>
                        {config.menuMobile.map((menu, index) => (
                            <ul className={cx('list')} key={index}>
                                {menu.map((item, index) => (
                                    <Fragment key={index}>
                                        <li className={cx('item')}>
                                            {item.path ? (
                                                <NavLink
                                                    className={(nav) => cx({ active: nav.isActive })}
                                                    onClick={() => dispatch(closeModalMobile())}
                                                    to={
                                                        item.path === 'profile'
                                                            ? `/@${currentUser.username}`
                                                            : item.path
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={item.icon} />
                                                    <span>{item.title}</span>

                                                    {item.sub?.length > 0 && (
                                                        <div className={cx('sub-item')}>
                                                            <FontAwesomeIcon icon={faChevronRight} />
                                                        </div>
                                                    )}
                                                </NavLink>
                                            ) : (
                                                <div
                                                    className={cx('no-path')}
                                                    onClick={item.sub ? handleToggle : handleLogout}
                                                >
                                                    <FontAwesomeIcon icon={item.icon} />
                                                    <span>{item.title}</span>
                                                    {item.sub?.length > 0 && (
                                                        <div className={cx('sub-item')}>
                                                            {active ? (
                                                                <FontAwesomeIcon icon={faChevronDown} />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faChevronRight} />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </li>
                                        {item.sub?.length > 0 && (
                                            <ul className={active ? cx('list-sub') : cx('list-sub', 'active')}>
                                                {item.sub.map((child, index) => (
                                                    <li key={index}>
                                                        {child?.sub ? (
                                                            <div
                                                                className={cx('no-path')}
                                                                onClick={() => {
                                                                    dispatch(closeModalMobile());
                                                                    setActive(false);
                                                                }}
                                                            >
                                                                {child.title}
                                                            </div>
                                                        ) : (
                                                            <NavLink
                                                                to={child.path}
                                                                onClick={() => {
                                                                    dispatch(closeModalMobile());
                                                                    setActive(false);
                                                                }}
                                                            >
                                                                <span>{child.title}</span>
                                                            </NavLink>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </Fragment>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
