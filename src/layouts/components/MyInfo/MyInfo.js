import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import config from '~/config';
import { logoutUser } from '~/services/apiAuth';
import FallbackAvatar from '~/components/FallbackAvatar';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './MyInfo.module.scss';

const cx = classNames.bind(styles);

function MyInfo() {
    const [active, setActive] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleClick = async (path) => {
        setActive(false);

        if (!path) {
            const result = await logoutUser(dispatch, currentUser.accessToken);

            if (result.statusCode === 0) {
                navigate(config.routes.login);
                window.location.reload();
            } else {
                dispatch(showNotification('Đăng xuất thất bại'));
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('my-info')} tabIndex="-1" {...attrs}>
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <FallbackAvatar
                                    style={{ '--font-size': '5.6px' }}
                                    image={currentUser?.avatar}
                                    alt={currentUser?.name}
                                />
                            </div>
                            <div className={cx('info')}>
                                <span className={cx('name')}>{currentUser?.name}</span>
                                <div className={cx('username')}>@{currentUser?.username}</div>
                            </div>
                        </div>
                        <hr />
                        {config.menu.map((menu, index) => (
                            <Fragment key={index}>
                                <ul className={cx('list')}>
                                    {menu.map((menu, index) => (
                                        <li key={index} onClick={() => handleClick(menu.path)}>
                                            {menu.path ? (
                                                <Link
                                                    to={
                                                        menu.path === 'profile'
                                                            ? `/@${currentUser?.username}`
                                                            : menu.path
                                                    }
                                                >
                                                    {menu.title}
                                                </Link>
                                            ) : (
                                                <span>Đăng xuất</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {index !== config.menu.length - 1 && <hr />}
                            </Fragment>
                        ))}
                    </div>
                )}
            >
                <div className={cx('btn-info')} onClick={() => setActive(!active)}>
                    <FallbackAvatar
                        style={{ '--font-size': '3.2px' }}
                        image={currentUser?.avatar}
                        alt={currentUser?.name}
                    />
                </div>
            </Tippy>
        </div>
    );
}

export default MyInfo;
