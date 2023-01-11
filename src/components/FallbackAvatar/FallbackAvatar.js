import classNames from 'classnames/bind';
import styles from './FallbackAvatar.module.scss';

const cx = classNames.bind(styles);

function FallbackAvatar({ style, image, alt }) {
    return (
        <div className={cx('avatar')} style={style}>
            <img src={image} alt={alt} />
        </div>
    );
}

export default FallbackAvatar;
