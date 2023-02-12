import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './VerticalProgressBar.module.scss';

const cx = classNames.bind(styles);

function VerticalProgressBar({ progress = 0 }) {
    const style = { [`--progress`]: `${progress}%` };

    return (
        <Tippy content={`${progress}%`} placement="bottom">
            <div className={cx('wrapper')} style={style}></div>
        </Tippy>
    );
}

export default VerticalProgressBar;
