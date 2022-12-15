import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Form from '~/components/Form';
import Loading from '~/components/Loading';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    const isFetching = useSelector((state) => state.auth.register.isFetching);

    return (
        <div className={cx('wrapper')}>
            {isFetching && <Loading />}
            <Form
                name="Đăng ký tài khoản F8"
                nameBtn="Đăng ký"
                question="Bạn đã có tài khoản?"
                path="/login"
                action="Đăng nhập"
                role={false}
            />
        </div>
    );
}

export default Register;
