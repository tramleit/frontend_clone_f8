import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './Notify.module.scss';
import { BsBellFill } from 'react-icons/bs';
import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { HiCheck } from 'react-icons/hi';

const cx = classNames.bind(styles);

function Notify() {
    const [active, setActive] = useState(false);
    const [watch, setWatch] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                visible={active}
                render={(attrs) => (
                    <div className={cx('course-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('header')}>
                            <h4 className={cx('title')}>Thông báo</h4>

                            <Tippy
                                interactive
                                visible={watch}
                                render={(attrs) => (
                                    <div className={cx('watched')} tabIndex="-1" {...attrs}>
                                        <div className={cx('send')}>
                                            <HiCheck />
                                            <span>Đánh dấu tất cả đã đọc</span>
                                        </div>
                                    </div>
                                )}
                            >
                                <span className={cx('dots')} onClick={() => setWatch(!watch)}>
                                    <HiDotsHorizontal />
                                </span>
                            </Tippy>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                            <div className={cx('item')}>
                                <div className={cx('avatar')}>
                                    <img src="https://fullstack.edu.vn/assets/images/f8_avatar.png" alt="" />
                                </div>
                                <div className={cx('message')}>
                                    <div className={cx('message-tt')}>
                                        Bài học
                                        <strong> Làm phần Subscription </strong>
                                        mới được thêm vào.
                                    </div>
                                    <div className={cx('time')}>7 ngày trước</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            >
                <button className={cx('btn-notify')} onClick={() => setActive(!active)}>
                    <BsBellFill />
                </button>
            </Tippy>
        </div>
    );
}

export default Notify;
