import HandlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './MyInfo.module.scss';
import { Image } from '~/assets/image';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '~/services/apiAuth';
import { loginSuccess } from '~/redux/reducer/authReducer';
import { createAxios } from '~/redux/createInstance';

const cx = classNames.bind(styles);

function MyInfo() {
    const [active, setActive] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);

    const accessToken = user?.accessToken;

    const id = user?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLout = async () => {
        const axiosJWT = createAxios(user, dispatch, loginSuccess);
        await logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
    };

    return (
        <div className={cx('wrapper')}>
            <HandlessTippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('my-info')} tabIndex="-1" {...attrs}>
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <img
                                    src={user.data?.avatar !== '' ? user.data?.avatar : Image.avatar}
                                    alt={user.data?.name}
                                />
                            </div>
                            <div className={cx('info')}>
                                <span className={cx('name')}>{user.data?.name}</span>
                                <div className={cx('username')}>@{user.data?.username}</div>
                            </div>
                        </div>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to={`/@${user.data?.username}`}>Trang cá nhân</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="new-post">Viết blog</Link>
                            </li>
                            <li className={cx('item')}>
                                <Link to="/me/post/:tab">Bài viết của tôi</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="/me/bookmark/posts">Bài viết đã lưu</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link to="/settings">Cài đặt</Link>
                            </li>
                            <li className={cx('item')} onClick={handleLout}>
                                <Link>Đăng xuất</Link>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('btn-info')} onClick={() => setActive(!active)}>
                    <img src={user.data?.avatar !== '' ? user.data?.avatar : Image.avatar} alt={user.data?.name} />
                </div>
            </HandlessTippy>
        </div>
    );
}

export default MyInfo;
