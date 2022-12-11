import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { FaFacebookSquare, FaGithub, FaUser } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { HiChevronLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import FormLogin from '~/components/FormLogin';

import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function Form({ name, nameBtn, question, path, action, role }) {
    const [loginEmail, setLoginEmail] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {loginEmail ? (
                        Fragment
                    ) : (
                        <div className={cx('btn-back')} onClick={() => setLoginEmail(true)}>
                            <HiChevronLeft />
                        </div>
                    )}

                    <div className={cx('header')}>
                        <img className={cx('logo')} src={Image.iconLogo} alt="Logo F8" />
                        <h2 className={cx('title')}>{name}</h2>
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
                            <FormLogin role={role} nameBtn={nameBtn} />
                        )}
                        <p className={cx('question')}>
                            {question} <Link to={path}>{action}</Link>
                        </p>

                        {loginEmail === false && role === true ? (
                            <p className={cx('forgot-password')}>Quên mật khẩu?</p>
                        ) : (
                            Fragment
                        )}
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

export default Form;
