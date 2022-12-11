import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { BsBellFill } from 'react-icons/bs';
import { Image } from '~/assets/image';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const isLogin = false;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img src={Image.iconLogo} alt="logo F8" />
                </Link>
                <h4>Học Lập Trình Để Đi Làm</h4>
            </div>

            <Search />

            <div className={cx('action')}>
                {isLogin ? (
                    <div className={cx('is-login')}>
                        <button className={cx('my-course')}>Khóa học của tôi</button>
                        <div className={cx('notify')}>
                            <BsBellFill />
                        </div>
                        <div className={cx('info')}>
                            <img src="https://i.imgur.com/nRKM19b.jpg" alt="Avatar" />
                        </div>
                    </div>
                ) : (
                    <div className={cx('btn-login')}>
                        <Link to="/login">Đăng nhập</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
