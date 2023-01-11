import classNames from 'classnames/bind';
import styles from './FieldWrapper.module.scss';

const cx = classNames.bind(styles);

function FieldWrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default FieldWrapper;
