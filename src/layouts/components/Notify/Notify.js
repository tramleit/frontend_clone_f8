import classNames from 'classnames/bind';
import HandlessTippy from '@tippyjs/react/headless';
import styles from './Notify.module.scss';
import { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { HiCheck } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Notify() {
    const [active, setActive] = useState(false);
    const [watch, setWatch] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <HandlessTippy
                interactive
                visible={active}
                onClickOutside={() => setActive(false)}
                render={(attrs) => (
                    <div className={cx('notify-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('header')}>
                            <h4 className={cx('title')}>Thông báo</h4>

                            <HandlessTippy
                                interactive
                                visible={watch}
                                onClickOutside={() => setWatch(false)}
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
                            </HandlessTippy>
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
                    <FontAwesomeIcon icon={faBell} />
                </button>
            </HandlessTippy>
        </div>
    );
}

export default Notify;
