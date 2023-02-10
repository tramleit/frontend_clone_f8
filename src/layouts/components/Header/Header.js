import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import Search from '../Search';
import Notify from '../Notify';
import MyInfo from '../MyInfo';
import MobileMenu from './MobileMenu';
import { Image } from '~/assets/image';
import BackButton from '~/components/BackButton';
import PreviewPost from '~/components/PreviewPost';
import MyCourse from '~/layouts/components/MyCourse';
import { openModalMobile } from '~/redux/reducer/modunReducer';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header({ post, activePublic, dataNewPost }) {
    const [height, setHeight] = useState(false);
    const [activePrevPost, setActivePrevPost] = useState(false);

    const dispatch = useDispatch();
    const isUser = useSelector((state) => state.auth.login.currentUser);
    const pathName = useLocation().pathname;
    const checkPathProfile = pathName.includes('/@');
    const checkPathNewPost = pathName.includes(config.routes.newPost) || pathName.includes(config.routes.search);

    const handleOpenModal = () => {
        dispatch(openModalMobile());
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200 && window.innerWidth < 740) {
                setHeight(true);
            } else {
                setHeight(false);
            }
        });
    }, []);

    const className =
        checkPathProfile && height
            ? cx('wrapper', 'active', 'mobile')
            : checkPathProfile
            ? cx('wrapper', 'active')
            : cx('wrapper');

    return (
        <div className={className}>
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
                        {!checkPathProfile && (
                            <Link className={cx('action-btn')} to={config.routes.search}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                            </Link>
                        )}

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
