import classNames from 'classnames/bind';
import Form from '~/components/Form';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <Form
                name="Đăng nhập vào F8"
                nameBtn="Đăng nhập"
                question="Bạn chưa có tài khoản?"
                path="/register"
                action="Đăng ký"
                role={true}
            />
        </div>
    );
}

export default Login;
