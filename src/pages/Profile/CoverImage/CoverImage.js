import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import FallbackAvatar from '~/components/FallbackAvatar';
import Cropper from 'react-easy-crop';
import { Image } from '~/assets/image';
import { faCamera, faCheckCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import styles from './CoverImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { changeAvatarUser, changeCoverUser } from '~/services/apiAuth';
import { showNotification } from '~/redux/reducer/modunReducer';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function CoverImage({ infoUser }) {
    const [upload, setUpload] = useState(false);
    const [active, setActive] = useState(false);
    const [cover, setCover] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const inputRef = useRef();
    const fileRef = useRef();
    const dispatch = useDispatch();
    const { username } = useParams();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
            cover && URL.revokeObjectURL(cover.preview);
        };
    }, [avatar, cover]);

    const handlePreviewAvatar = (e) => {
        let file = e.target.files[0];
        file.preview = URL.createObjectURL(file);

        setAvatar(file);
    };

    const handleSaveAvatar = async () => {
        if (avatar) {
            let formData = new FormData();
            formData.append('avatar', avatar);

            const result = await changeAvatarUser(formData, currentUser.accessToken, dispatch);
            if (result.statusCode === 0) {
                setAvatar(null);
                window.location.reload();
                dispatch(showNotification(result.message));
            } else {
                dispatch(showNotification(result.message));
            }
        } else {
            dispatch(showNotification('Vui lòng chọn ảnh đại diện'));
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log('croppedArea: ', croppedArea);
        console.log('croppedAreaPixels: ', croppedAreaPixels);
    }, []);

    const handleSaveCover = async () => {
        if (cover) {
            let formData = new FormData();
            formData.append('cover', cover);

            const result = await changeCoverUser(formData, currentUser.accessToken, dispatch);

            if (result.statusCode === 0) {
                setUpload(false);
                setCover(null);
                window.location.reload();
                dispatch(showNotification(result.message));
            } else {
                dispatch(showNotification(result.message || 'Lỗi cập nhật ảnh bìa'));
            }
        } else {
            dispatch(showNotification('Vui lòng chọn ảnh bìa'));
        }
    };

    const handlePreviewCover = (e) => {
        let file = e.target.files[0];
        file.preview = URL.createObjectURL(file);

        setCover(file);
        setUpload(false);
    };

    const handleSetActive = () => {
        if (username === currentUser.username) {
            setActive(true);
        }
    };

    const handleSelectCover = () => {
        setUpload(!upload);
        setCover(null);
    };

    return (
        <div
            className={cx('banner')}
            style={{
                backgroundImage: `url('${infoUser?.cover || Image.coverProfile}')`,
            }}
        >
            {cover && (
                <Cropper
                    cropSize={{ width: 1099.56, height: 308 }}
                    image={cover.preview}
                    crop={crop}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    objectFit="auto-cover"
                />
            )}
            <div className={cx('user')}>
                <div
                    className={infoUser?.admin ? cx('user-avatar', 'pro') : cx('user-avatar')}
                    onClick={handleSetActive}
                    onMouseLeave={() => setActive(false)}
                >
                    <FallbackAvatar
                        style={window.innerWidth < 740 ? { '--font-size': '12px' } : { '--font-size': '17.2px' }}
                        image={avatar ? avatar.preview : infoUser?.avatar}
                        alt={infoUser?.name}
                        admin={infoUser?.admin}
                    />

                    {active && (
                        <div className={cx('choose-avatar')} onClick={() => inputRef.current.click()}>
                            <FontAwesomeIcon icon={faCamera} />

                            <input
                                ref={inputRef}
                                onChange={handlePreviewAvatar}
                                type="file"
                                accept="image/jpg, image/jpeg, image/png"
                                hidden
                            />
                        </div>
                    )}
                </div>
                {avatar && (
                    <div className={cx('confirm-upload', 'avatar')}>
                        <button className={cx('button-confirm', 'cancel')} onClick={() => setAvatar(null)}>
                            Hủy
                        </button>
                        <button className={cx('button-confirm', 'save')} onClick={handleSaveAvatar}>
                            Lưu lại
                        </button>
                    </div>
                )}
                <div className={cx('user-name')}>
                    <span>{infoUser?.name}</span>
                    {infoUser?.tick && <FontAwesomeIcon icon={faCheckCircle} />}
                </div>
            </div>

            {username === currentUser?.username && (
                <div className={cx('btn-change')} onClick={window.innerWidth > 1023 ? handleSelectCover : null}>
                    <FontAwesomeIcon icon={faCamera} />
                    <span>Chỉnh sửa ảnh bìa</span>
                </div>
            )}
            {upload && (
                <div className={cx('upload')}>
                    <label className={cx('label')} onClick={() => fileRef.current.click()}>
                        <div className={cx('label-item')}>
                            <FontAwesomeIcon icon={faUpload} />
                            <span>Tải ảnh lên</span>
                        </div>
                    </label>
                    <input
                        ref={fileRef}
                        onChange={handlePreviewCover}
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        hidden
                    />
                </div>
            )}
            {cover && (
                <div className={cx('confirm-upload')}>
                    <button className={cx('button-confirm', 'cancel')} onClick={() => setCover(null)}>
                        Hủy
                    </button>
                    <button className={cx('button-confirm', 'save')} onClick={handleSaveCover}>
                        Lưu lại
                    </button>
                </div>
            )}
        </div>
    );
}

export default CoverImage;
