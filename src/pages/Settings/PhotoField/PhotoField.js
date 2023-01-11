import classNames from 'classnames/bind';
import FallbackAvatar from '~/components/FallbackAvatar';

import styles from './PhotoField.module.scss';

const cx = classNames.bind(styles);

function PhotoField() {
    return (
        <>
            <div className={cx('container')}>
                <h3 className={cx('label')}>Avatar</h3>
                <div className={cx('content')}>
                    <div className={cx('body')}>Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.</div>
                    <div className={cx('image')}>
                        <div className={cx('avatar')}>
                            <FallbackAvatar
                                style={{ '--font-size': '8.9px' }}
                                image="https://files.fullstack.edu.vn/f8-prod/user_photos/253914/63391f65d6f9d.jpg"
                                alt="Name You"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('btn')}>
                <button>Chỉnh sửa</button>
            </div>
        </>
    );
}

export default PhotoField;
