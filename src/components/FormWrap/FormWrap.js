import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '~/config';
import FormInput from '../FormInput';
import FormControl from '../FormControl';
import { loginUser, registerNewUser, sendEmailVerify } from '~/services/apiAuth';

import styles from './FormWrap.module.scss';

const cx = classNames.bind(styles);

function FormWrap({ role, textBtn }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const [validName, setValidName] = useState('');
    const [validEmail, setValidEmail] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [validCode, setValidCode] = useState('');

    const [btnText, setBtnText] = useState('Gửi mã');
    const [btnCount, setBtnCount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [activeCode, setActiveCode] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (active) {
            if (role) {
                const user = {
                    email: email,
                    password: password,
                };

                const result = await loginUser(user, dispatch);

                if (result.statusCode === 0) {
                    navigate(config.routes.home);
                } else if (result.statusCode === 1) {
                    setValidPassword(result.message);
                } else {
                    setValidEmail(result.message || 'Lỗi đăng nhập tài khoản');
                }
            } else {
                const newUser = {
                    name: name,
                    email: email,
                    password: password,
                    code: code,
                };

                const result = await registerNewUser(newUser, dispatch);
                setActive(false);

                if (result.statusCode === 0) {
                    navigate(config.routes.home);
                } else if (result.statusCode === 3) {
                    setValidPassword(result.message);
                } else if (result.statusCode === 4) {
                    setValidCode(result.message);
                } else {
                    setValidEmail(result.message || 'Lỗi đăng ký tài khoản');
                }
            }
        }
    };

    const handleSendCode = async () => {
        if (activeCode) {
            setDisabled(false);
            setActiveCode(false);
            setLoading(true);

            const result = await sendEmailVerify(email);
            setLoading(false);

            if (result.statusCode === 0) {
                setBtnCount(120);
            } else {
                setValidEmail(result.message);
                setActiveCode(true);
            }
        }
    };

    useEffect(() => {
        let interval;

        if (btnCount > 0) {
            interval = setInterval(() => {
                setBtnCount(btnCount - 1);
            }, 1000);

            setBtnText(`Gửi lại sau ${btnCount}s`);
            setActiveCode(false);
        } else if (btnCount === 0) {
            setBtnText('Gửi mã');
            setActiveCode(true);
        }

        return () => clearInterval(interval);
    }, [btnCount]);

    useEffect(() => {
        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (role) {
            if (regexEmail.test(email) && password.length > 7) {
                setActive(true);
            }
        } else {
            if (name.length > 2 && regexEmail.test(email) && password.length > 7 && btnCount === 0) {
                setActiveCode(true);
            } else if (name.length > 2 && regexEmail.test(email) && password.length > 7 && code.length === 6) {
                setActive(true);
            } else {
                setActiveCode(false);
                setActive(false);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, email, password, code]);

    return (
        <div className={cx('wrapper')}>
            {!role && (
                <FormControl>
                    <FormInput
                        type="name"
                        role={role}
                        label="Tên của bạn?"
                        placeholder="Họ và tên của bạn"
                        value={name}
                        setValue={setName}
                        valid={validName}
                        setValid={setValidName}
                    />
                </FormControl>
            )}

            <FormControl>
                <FormInput
                    type="email"
                    role={role}
                    label="Email"
                    placeholder="Địa chỉ email"
                    textBtn={textBtn}
                    value={email}
                    setValue={setEmail}
                    valid={validEmail}
                    setValid={setValidEmail}
                />
            </FormControl>

            <FormControl>
                <FormInput
                    type="password"
                    role={role}
                    help="Gợi ý: Mật khẩu cần có ít nhất 8 kí tự"
                    placeholder="Mật khẩu"
                    value={password}
                    setValue={setPassword}
                    valid={validPassword}
                    setValid={setValidPassword}
                />
            </FormControl>

            {!role && (
                <FormControl>
                    <FormInput
                        type="code"
                        role={role}
                        placeholder="Nhập mã xác nhận"
                        value={code}
                        setValue={setCode}
                        activeCode={activeCode}
                        disabled={disabled}
                        handleSendCode={handleSendCode}
                        btnText={btnText}
                        loading={loading}
                        valid={validCode}
                        setValid={setValidCode}
                    />
                </FormControl>
            )}

            <button
                type="submit"
                className={active ? cx('btn-submit', 'active') : cx('btn-submit')}
                onClick={handleSubmit}
            >
                {textBtn}
            </button>
        </div>
    );
}

export default FormWrap;
