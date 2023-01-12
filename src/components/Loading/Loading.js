import classNames from 'classnames/bind';
import { createPortal } from 'react-dom';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return createPortal(<div className={cx('loading')}></div>, document.body);
}

export default Loading;
