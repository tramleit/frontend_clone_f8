import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import config from '~/config';
import Form from '~/components/Form';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (currentUser) {
            navigate(config.routes.home);
        }
    }, [currentUser, navigate, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <Form
                name="Đăng nhập vào F8"
                textBtn="Đăng nhập"
                question="Bạn chưa có tài khoản?"
                path={config.routes.register}
                action="Đăng ký"
                role={true}
            />
        </div>
    );
}

export default Login;
