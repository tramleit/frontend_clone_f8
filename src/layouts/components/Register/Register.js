import config from '~/config';

import classNames from 'classnames/bind';
import Form from '~/components/Form';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
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
