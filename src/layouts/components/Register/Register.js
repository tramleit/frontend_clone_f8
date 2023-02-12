import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import config from '~/config';
import Form from '~/components/Form';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (currentUser) {
            navigate(config.routes.home);
            dispatch(showNotification('Bạn đã đăng nhập'));
        }
    }, [currentUser, navigate, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <Form
                name="Đăng ký tài khoản F8"
                textBtn="Đăng ký"
                question="Bạn đã có tài khoản?"
                path={config.routes.login}
                action="Đăng nhập"
                role={false}
            />
        </div>
    );
}

export default Register;
