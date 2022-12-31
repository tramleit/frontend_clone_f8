import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Image } from '~/assets/image';
import Search from '../Search';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import MyCourse from '~/layouts/components/MyCourse';
import Notify from '../Notify';
import MyInfo from '../MyInfo';
import BackButton from '~/components/BackButton';

const cx = classNames.bind(styles);

function Header({ noneSearch }) {
    const isUser = useSelector((state) => state.auth.login.currentUser);
    const pathName = useLocation().pathname;
    const hasAtSymbol = pathName.includes('/@');

    return (
        <div className={hasAtSymbol ? cx('wrapper', 'active') : cx('wrapper')}>
            <div className={cx('logo')}>
                <Link to="/">
                    <img src={Image.iconLogo} alt="logo F8" />
                </Link>
                {pathName === '/' ? <h4>Học Lập Trình Để Đi Làm</h4> : <BackButton />}
            </div>

            {!hasAtSymbol || (noneSearch && <Search />)}

            <div className={cx('action')}>
                {isUser !== null ? (
                    <div className={cx('is-login')}>
                        {noneSearch && <button className={cx('public-post')}>Xuất bản</button>}
                        {!hasAtSymbol && <MyCourse />}
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
