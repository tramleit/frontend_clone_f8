import { Fragment } from 'react';
import classNames from 'classnames/bind';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './FormInput.module.scss';

const cx = classNames.bind(styles);

function FormInput({
    role,
    type,
    label,
    placeholder,
    help,
    textBtn,
    setValue,
    value,
    activeCode,
    disabled,
    handleSendCode,
    btnText,
    loading,
    valid = '',
    setValid,
}) {
    return (
        <Fragment>
            <div className={cx('label')}>
                {label && <label>{label}</label>}
                {textBtn && <label>{textBtn} với SĐT</label>}
            </div>

            <div className={valid !== '' ? cx('input', 'active') : cx('input')}>
                <input
                    type={type === 'password' ? 'password' : type === 'code' ? 'number' : 'text'}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    maxLength={type === 'code' ? 6 : 50}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setValid('');
                    }}
                />

                {type === 'code' && (
                    <div className={cx('send-code', { active: activeCode })} onClick={handleSendCode}>
                        <span>{btnText}</span>
                        {loading && <FontAwesomeIcon icon={faSpinner} className={cx('icon-loading')} />}
                    </div>
                )}
            </div>
            {!role && help && <div className={cx('help')}>{help}</div>}

            {valid !== '' && <div className={cx('message')}>{valid}</div>}
        </Fragment>
    );
}

export default FormInput;
