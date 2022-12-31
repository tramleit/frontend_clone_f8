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
import PreviewPost from '~/components/PreviewPost';

const cx = classNames.bind(styles);

function Header({ post, activePublic, dataNewPost }) {
    const isUser = useSelector((state) => state.auth.login.currentUser);
    const pathName = useLocation().pathname;
    const hasAtSymbol = pathName.includes('/@');

    const handlePublicNewPost = () => {
        const { author, html, image, text, title, wordCount } = dataNewPost;

        const newPost = {
            title: title,
            author: author,
            contentHTML: html,
            contentMarkdown: text,
            readingTime: wordCount,
            image: image,
        };
        console.log('newPost: ', newPost);
    };

    return (
        <div className={hasAtSymbol ? cx('wrapper', 'active') : cx('wrapper')}>
            <PreviewPost />
            <div className={cx('logo')}>
                <Link to="/">
                    <img src={Image.iconLogo} alt="logo F8" />
                </Link>
                {pathName === '/' ? <h4>Học Lập Trình Để Đi Làm</h4> : <BackButton />}
            </div>

            {!hasAtSymbol || (post && <Search />)}

            <div className={cx('action')}>
                {isUser !== null ? (
                    <div className={cx('is-login')}>
                        {post && (
                            <button
                                className={activePublic ? cx('public-post', 'active') : cx('public-post')}
                                onClick={handlePublicNewPost}
                            >
                                Xuất bản
                            </button>
                        )}
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
