import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './MyInfo.module.scss';
import { Image } from '~/assets/image';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '~/services/apiAuth';
import { loginSuccess } from '~/redux/reducer/authReducer';
import { createAxios } from '~/redux/createInstance';
import config from '~/config';

const cx = classNames.bind(styles);

function MyInfo() {
    const [active, setActive] = useState(false);

    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const accessToken = currentUser?.accessToken;
    const id = currentUser?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (path) => {
        setActive(false);
        if (!path) {
            const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
            await logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
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
                                <img
                                    src={currentUser.avatar !== '' ? currentUser.avatar : Image.avatar}
                                    alt={currentUser.name}
                                />
                            </div>
                            <div className={cx('info')}>
                                <span className={cx('name')}>{currentUser.name}</span>
                                <div className={cx('username')}>@{currentUser.username}</div>
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
                                                            ? `/@${currentUser.username}`
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
                    <img src={currentUser.avatar !== '' ? currentUser.avatar : Image.avatar} alt={currentUser.name} />
                </div>
            </Tippy>
        </div>
    );
}

export default MyInfo;
