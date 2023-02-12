import { Image } from '~/assets/image';
import classNames from 'classnames/bind';
import styles from './FallbackAvatar.module.scss';

const cx = classNames.bind(styles);

function FallbackAvatar({ style, image, alt, admin = false }) {
    return (
        <div className={admin ? cx('avatar', 'pro') : cx('avatar')} style={style}>
            <img className={cx('image')} src={image || Image.avatar} alt={alt || 'Avatar'} />

            {admin && (
                <img
                    className={cx('crown')}
                    src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673777416/Avatar/crown.8edf462029b3c37a7f673303d8d3bedc_xqbnob.svg"
                    alt="Crown"
                />
            )}
        </div>
    );
}

export default FallbackAvatar;
