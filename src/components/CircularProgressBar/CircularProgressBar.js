import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styles from './CircularProgressBar.module.scss';

const cx = classNames.bind(styles);

function CircularProgressBar({ content, image }) {
    return (
        <Tippy content={content}>
            <div className={cx('wrapper')}>
                <img src={image} alt={content} />
            </div>
        </Tippy>
    );
}

export default CircularProgressBar;
