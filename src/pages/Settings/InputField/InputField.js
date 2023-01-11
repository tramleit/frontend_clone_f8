import classNames from 'classnames/bind';
import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

function InputField({ type = null, label, placeholder, defaultValue = '', desc = '' }) {
    return (
        <>
            <div className={cx('content')}>
                <h3 className={cx('label')}>{label}</h3>

                <div className={cx('content-edit')}>
                    <input type="text" maxLength={50} placeholder={placeholder} disabled defaultValue={defaultValue} />

                    {!type ||
                        (type === 'info' && (
                            <div className={cx('description')}>
                                <p>
                                    <span>URL: </span>
                                    {desc}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
            {type !== 'info' && (
                <div className={cx('btn')}>
                    <button className={cx('btn-edit')}>Chỉnh sửa</button>
                </div>
            )}
        </>
    );
}

export default InputField;
