import 'moment/locale/vi';
import moment from 'moment/moment';
import classNames from 'classnames/bind';
import { HiCheck } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import HandlessTippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getNotifyUser, markWatched } from '~/services/apiAuth';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './Notify.module.scss';

const cx = classNames.bind(styles);

function Notify() {
    const [notify, setNotify] = useState([]);
    const [active, setActive] = useState(false);
    const [watch, setWatch] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getNotifyUser(currentUser.accessToken);

            if (result.statusCode === 0) {
                setNotify(result.data);
            } else {
                dispatch(showNotification(result.message || 'Lỗi lấy dữ liệu thông báo'));
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notify.length]);

    const handleMarkWatch = async (notiId, watch) => {
        if (!watch) {
            const result = await markWatched('odd', currentUser.accessToken, notiId);

            if (result.statusCode === 0) {
                setNotify([]);
            } else {
                dispatch(showNotification(result.message || 'Lỗi vui lòng thử lại'));
            }
        }
    };

    const handleBookmarkSeeAll = async () => {
        const allWatch = !notify.some((notify) => !notify.watch);

        if (!allWatch) {
            const result = await markWatched('all', currentUser.accessToken);

            if (result.statusCode === 0) {
                setNotify([]);
            } else {
                dispatch(showNotification(result.message || 'Lỗi vui lòng thử lại'));
            }
        }
        setWatch(false);
    };

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
                                        <div className={cx('send')} onClick={handleBookmarkSeeAll}>
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
                            {notify?.map((noti) => (
                                <div
                                    className={noti.watch ? cx('item', 'read') : cx('item')}
                                    key={noti.timestamps}
                                    onClick={() => handleMarkWatch(noti._id, noti.watch)}
                                >
                                    <div className={cx('avatar')}>
                                        <img src={noti.avatar} alt={noti.description} />
                                    </div>
                                    <div className={cx('message')}>
                                        <div className={cx('message-tt')}>
                                            Chào mừng<strong> {currentUser?.name} </strong>đã gia nhập F8.{' '}
                                            {noti.description} &#129505;
                                        </div>
                                        <div className={cx('time')}>{moment(noti.timestamps).fromNow()}</div>
                                    </div>
                                </div>
                            ))}
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
