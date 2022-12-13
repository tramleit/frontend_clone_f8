import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import Search from '../Search';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import MyCourse from '~/layouts/components/MyCourse';
import Notify from '../Notify';
import MyInfo from '../MyInfo';

const cx = classNames.bind(styles);

function Header() {
    const isUser = useSelector((state) => state.auth.login.currentUser);

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
                {isUser !== null ? (
                    <div className={cx('is-login')}>
                        <MyCourse />
                        <Notify />
                        <MyInfo />
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
