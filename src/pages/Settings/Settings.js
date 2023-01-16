import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '~/redux/reducer/modunReducer';
import GroupField from './GroupField';
import styles from './Settings.module.scss';

const cx = classNames.bind(styles);

function Settings() {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Thiết lập về tôi tại F8';

        if (!currentUser) {
            navigate('/login');
            dispatch(showNotification('Vui lòng đăng nhập'));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrap')}>
                    <div className={cx('content')}>
                        <h1 className={cx('heading')}>Cài đặt</h1>

                        <GroupField type="link" heading="Liên kết tài khoản đăng nhập" />

                        <GroupField type="info" heading="Thông tin cá nhân" />

                        <GroupField type="social" heading="Mạng xã hội" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
