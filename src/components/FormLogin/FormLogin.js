import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as apiRequest from '~/redux/apiRequest';
import styles from './FormLogin.module.scss';

const cx = classNames.bind(styles);

function FormLogin({ role, nameBtn }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [active, setActive] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState('');
    const [validPassword, setValidPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPassword = /^.{8,}$/;

        if (regexEmail.test(email) && regexPassword.test(password)) {
            setActive(true);
        } else {
            setActive(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password]);

    const handleSubmit = async () => {
        if (active) {
            if (role) {
                const user = {
                    email: email,
                    password: password,
                };
                const resBackend = await apiRequest.loginUser(user, dispatch, navigate);

                if (resBackend?.data.errCode === 1) {
                    setValidEmail(resBackend.data.message);
                } else if (resBackend?.data.errCode === 2) {
                    setValidPassword(resBackend.data.message);
                }
            } else {
                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                };
                await apiRequest.RegisterNewUser(newUser, dispatch, navigate);
            }
        }
    };

    const handleValid = (name) => {
        // eslint-disable-next-line no-useless-escape
        const regexName = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$/g;

        if (regexName.test(name)) {
            setValidName(true);
        } else {
            setValidName(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {role ? (
                Fragment
            ) : (
                <>
                    <div className={cx('form')}>
                        <div className={cx('form-label')}>
                            <label>Tên của bạn</label>
                        </div>
                        <div className={validName ? cx('form-input', 'active') : cx('form-input')}>
                            <input
                                type="text"
                                placeholder="Họ và tên của bạn"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setValidName(false);
                                }}
                                onBlur={() => handleValid(name)}
                            />
                        </div>
                        {validName ? <div className={cx('message')}>Tên của bạn không hợp lệ</div> : Fragment}
                    </div>
                </>
            )}
            <div className={cx('form')}>
                <div className={cx('form-label')}>
                    <label>Email</label>
                    <label>{nameBtn} với SĐT</label>
                </div>
                <div className={validEmail !== '' ? cx('form-input', 'active') : cx('form-input')}>
                    <input
                        type="email"
                        placeholder="Địa chỉ email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setValidEmail('');
                        }}
                    />
                </div>
                {validEmail !== '' ? <div className={cx('message')}>{validEmail}</div> : Fragment}
            </div>
            <div className={cx('form')}>
                <div className={validPassword !== '' ? cx('form-input', 'active') : cx('form-input')}>
                    <input
                        type="password"
                        id="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setValidPassword('');
                        }}
                    />
                </div>
                {validPassword !== '' ? <div className={cx('message')}>{validPassword}</div> : Fragment}
            </div>
            <button
                type="submit"
                className={active ? cx('btn-login', 'active') : cx('btn-login')}
                onClick={handleSubmit}
            >
                {nameBtn}
            </button>
        </div>
    );
}

export default FormLogin;
