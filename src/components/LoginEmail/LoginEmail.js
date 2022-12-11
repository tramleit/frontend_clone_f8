import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './LoginEmail.module.scss';

const cx = classNames.bind(styles);

function LoginEmail() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

        if (regexEmail.test(email) && regexPassword.test(password)) {
            setActive(true);
        }
    }, [email, password]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('form-label')}>
                    <label>Email</label>
                    <label>Đăng nhập với SĐT</label>
                </div>
                <div className={cx('form-input')}>
                    <input
                        type="email"
                        placeholder="Địa chỉ email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('form')}>
                <div className={cx('form-input')}>
                    <input
                        type="text"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className={active ? cx('btn-login', 'active') : cx('btn-login')}>
                Đăng nhập
            </button>
        </div>
    );
}

export default LoginEmail;
