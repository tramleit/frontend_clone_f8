import classNames from 'classnames/bind';
import styles from './LayoutWrapper.module.scss';

const cx = classNames.bind(styles);

function LayoutWrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default LayoutWrapper;
