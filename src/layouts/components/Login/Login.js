import classNames from 'classnames/bind';
import { useState } from 'react';
import { FaFacebookSquare, FaGithub, FaUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import LoginEmail from '~/components/LoginEmail';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [loginEmail, setLoginEmail] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <img className={cx('logo')} src={Image.iconLogo} alt="Logo F8" />
                        <h2 className={cx('title')}>Đăng nhập vào F8</h2>
                    </div>
                    <div className={cx('body')}>
                        {loginEmail ? (
                            <div className={cx('login')}>
                                <div className={cx('btn-login')} onClick={() => setLoginEmail(false)}>
                                    <FaUser className={cx('icon-user')} />
                                    <span>Sử dụng email / số điện thoại</span>
                                </div>
                                <div className={cx('btn-login', 'next')}>
                                    <FcGoogle />
                                    <span>Tiếp tục với Google</span>
                                </div>
                                <div className={cx('btn-login', 'next')}>
                                    <FaFacebookSquare className={cx('icon-face')} />
                                    <span>Tiếp tục với Facebook</span>
                                </div>
                                <div className={cx('btn-login', 'next')}>
                                    <FaGithub />
                                    <span>Tiếp tục với Github</span>
                                </div>
                            </div>
                        ) : (
                            <LoginEmail />
                        )}

                        <p className={cx('question')}>
                            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                        </p>
                    </div>

                    <div className={cx('accept')}>
                        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với
                        <Link to="/terms"> Điều khoản sử dụng</Link> của chúng tôi.
                    </div>
                </div>

                <div className={cx('about')}>
                    <Link to="/about-us">Giới thiệu về F8</Link>
                    <span>|</span>
                    <a href="https://www.youtube.com/c/F8VNOfficial">F8 trên Youtube</a>
                    <span>|</span>
                    <a href="https://www.facebook.com/groups/f8official">F8 trên Facebook</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
