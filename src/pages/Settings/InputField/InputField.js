import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeInfoUser } from '~/services/apiAuth';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

function InputField({ type, label, placeholder, defaultValue = '', desc = '' }) {
    const [active, setActive] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleChangeInfo = async () => {
        if (value !== defaultValue) {
            let formData;
            switch (type) {
                case 'name':
                    formData = {
                        name: value,
                    };
                    break;
                case 'bio':
                    formData = {
                        bio: value,
                    };
                    break;
                case 'facebook':
                    formData = {
                        facebook: value,
                    };
                    break;
                case 'youtube':
                    formData = {
                        youtube: value,
                    };
                    break;
                case 'linkedin':
                    formData = {
                        linkedin: value,
                    };
                    break;
                case 'instagram':
                    formData = {
                        instagram: value,
                    };
                    break;
                case 'twitter':
                    formData = {
                        twitter: value,
                    };
                    break;
                default:
                    return;
            }

            setActive(false);
            const result = await changeInfoUser(formData, currentUser.accessToken, dispatch);

            if (result.statusCode === 0) {
                dispatch(showNotification(result.message));
                window.location.reload();
            } else {
                dispatch(showNotification(result.message));
                setValue(defaultValue);
            }
        } else {
            setActive(false);
        }
    };

    return (
        <>
            <div className={cx('content')}>
                <h3 className={cx('label')}>{label}</h3>

                <div className={cx('content-edit')}>
                    <input
                        type="text"
                        maxLength={50}
                        placeholder={placeholder}
                        disabled={!active}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <div className={cx('description')}>
                        <p>
                            {type === 'username' && <span>URL: </span>}
                            {desc}
                        </p>
                    </div>
                </div>
            </div>

            {type !== 'email' && type !== 'username' && (
                <div className={cx('btn')}>
                    {!active ? (
                        <button className={cx('btn-edit')} onClick={() => setActive(true)}>
                            Chỉnh sửa
                        </button>
                    ) : (
                        <div className={cx('more-btn')}>
                            <button className={cx('save-btn')} onClick={handleChangeInfo}>
                                Lưu
                            </button>
                            <button
                                className={cx('default-btn')}
                                onClick={() => {
                                    setActive(false);
                                    setValue(defaultValue);
                                }}
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default InputField;
