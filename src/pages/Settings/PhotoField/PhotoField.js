import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FallbackAvatar from '~/components/FallbackAvatar';
import Notification from '~/components/Notification';
import { showNotification } from '~/redux/reducer/modunReducer';
import { changeAvatarUser } from '~/services/apiAuth';

import styles from './PhotoField.module.scss';

const cx = classNames.bind(styles);

function PhotoField({ avatar, name }) {
    const [active, setActive] = useState(false);
    const [image, setImage] = useState(null);

    const inputRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    const handleChangeAvatar = async () => {
        if (image) {
            const formData = new FormData();

            formData.append('avatar', image);
            formData.append('id', currentUser._id);
            setActive(false);

            const result = await changeAvatarUser(formData, dispatch);
            if (result.errCode === 0) {
                dispatch(showNotification('Cập nhật thành công'));
            } else {
                dispatch(showNotification(`${result.message}`));
            }
        } else {
            setActive(false);
        }
    };

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);

        setImage(file);
    };

    return (
        <>
            <div className={cx('container')}>
                <h3 className={cx('label')}>Avatar</h3>
                <div className={cx('content')}>
                    <div className={cx('body')}>Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.</div>
                    <div className={cx('image')}>
                        <div className={cx('avatar')} onClick={() => setActive(true)}>
                            <FallbackAvatar
                                style={{ '--font-size': '8.9px' }}
                                image={image?.preview || avatar}
                                alt={name}
                            />
                        </div>
                        {active && (
                            <>
                                <div className={cx('choose-avatar')} onClick={() => inputRef.current.click()}>
                                    <FontAwesomeIcon icon={faCamera} />
                                </div>
                                <div className={cx('pick-avatar')}>
                                    <input
                                        ref={inputRef}
                                        onChange={handlePreviewAvatar}
                                        type="file"
                                        accept="image/jpg, image/jpeg, image/png"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('btn')}>
                {!active ? (
                    <button className={cx('default-btn')} onClick={() => setActive(true)}>
                        Chỉnh sửa
                    </button>
                ) : (
                    <div className={cx('more-btn')}>
                        <button className={cx('save-btn')} onClick={handleChangeAvatar}>
                            Lưu
                        </button>
                        <button
                            className={cx('default-btn')}
                            onClick={() => {
                                setActive(false);
                                setImage(null);
                            }}
                        >
                            Hủy
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default PhotoField;
