import config from '~/config';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Image } from '~/assets/image';
import Search from '../Search';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import MyCourse from '~/layouts/components/MyCourse';
import Notify from '../Notify';
import MyInfo from '../MyInfo';
import BackButton from '~/components/BackButton';
import PreviewPost from '~/components/PreviewPost';
import { Fragment, useState } from 'react';
import MobileMenu from './MobileMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { openModalMobile } from '~/redux/reducer/modunReducer';

const cx = classNames.bind(styles);

function Header({ post, activePublic, dataNewPost }) {
    const [activePrevPost, setActivePrevPost] = useState(false);

    const dispatch = useDispatch();
    const isUser = useSelector((state) => state.auth.login.currentUser);
    const pathName = useLocation().pathname;
    const checkPathProfile = pathName.includes('/@');
    const checkPathNewPost = pathName.includes(config.routes.newPost) || pathName.includes(config.routes.search);

    const handleOpenModal = () => {
        dispatch(openModalMobile());
    };

    return (
        <div className={checkPathProfile ? cx('wrapper', 'active') : cx('wrapper')}>
            {activePrevPost && <PreviewPost setActivePrevPost={setActivePrevPost} dataNewPost={dataNewPost} />}

            <div className={cx('logo')}>
                <Link to={config.routes.home}>
                    <img src={Image.iconLogo} alt="logo F8" />
                </Link>
                {pathName === '/' ? <h4>Học Lập Trình Để Đi Làm</h4> : <BackButton />}
            </div>

            <button className={cx('mobile-menu')} onClick={handleOpenModal}>
                <div className={cx('menu')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </button>

            <MobileMenu />

            {checkPathProfile ? Fragment : !checkPathNewPost ? <Search /> : Fragment}

            <div className={cx('action')}>
                {isUser !== null ? (
                    <div className={cx('is-login')}>
                        {post && (
                            <button
                                className={activePublic ? cx('public-post', 'active') : cx('public-post')}
                                onClick={() => setActivePrevPost(true)}
                            >
                                Xuất bản
                            </button>
                        )}
                        {!checkPathProfile && <MyCourse />}
                        <Link className={cx('action-btn')} to={config.routes.search}>
                            <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                        </Link>
                        <Notify />
                        <MyInfo />
                    </div>
                ) : (
                    <div className={cx('btn-login')}>
                        <Link to={config.routes.login}>Đăng nhập</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
