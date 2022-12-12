import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './MyInfo.module.scss';
import { Image } from '~/assets/image';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MyInfo({ avatar, name }) {
    const [active, setActive] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                visible={active}
                render={(attrs) => (
                    <div className={cx('my-info')} tabIndex="-1" {...attrs}>
                        <div className={cx('user')}>
                            <div className={cx('avatar')}>
                                <img
                                    src="https://files.fullstack.edu.vn/f8-prod/user_photos/253914/63391f65d6f9d.jpg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('info')}>
                                <span className={cx('name')}>Mã Việt Hà</span>
                                <div className={cx('username')}>@mavietha7z</div>
                            </div>
                        </div>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link>Trang cá nhân</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link>Viết blog</Link>
                            </li>
                            <li className={cx('item')}>
                                <Link>Bài viết của tôi</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link>Bài viết đã lưu</Link>
                            </li>
                        </ul>
                        <hr />
                        <ul className={cx('list')}>
                            <li className={cx('item')}>
                                <Link>Cài đặt</Link>
                            </li>
                            <li className={cx('item')}>
                                <Link>Đăng xuất</Link>
                            </li>
                        </ul>
                    </div>
                )}
            >
                <div className={cx('btn-info')} onClick={() => setActive(!active)}>
                    <img src={avatar !== '' ? avatar : Image.avatar} alt={name} />
                </div>
            </Tippy>
        </div>
    );
}

export default MyInfo;
