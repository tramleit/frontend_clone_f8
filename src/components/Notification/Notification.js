import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import styles from './Notification.module.scss';
import { hideNotification } from '~/redux/reducer/modunReducer';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Notification = () => {
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const content = useSelector((state) => state.modun.notification?.content);

    useEffect(() => {
        if (content !== '') {
            setVisible(true);
            const timeout = setTimeout(() => {
                setVisible(false);
                dispatch(hideNotification());
            }, 2000);
            return () => clearTimeout(timeout);
        } else {
            setVisible(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    if (!visible) return null;

    return createPortal(
        <div className={cx('wrapper')}>
            <span className={cx('content')}>{content}</span>
        </div>,
        document.body
    );
};
export default Notification;
