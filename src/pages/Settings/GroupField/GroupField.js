import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { IconFaceBook, IconPhone } from '~/assets/Icon';
import { Image } from '~/assets/image';
import FieldWrapper from '../FieldWrapper';
import InputField from '../InputField';
import PhotoField from '../PhotoField';
import styles from './GroupField.module.scss';

const cx = classNames.bind(styles);

function GroupField({ type, heading }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>{heading}</h2>

            {type === 'link' && (
                <div className={cx('connections')}>
                    <div>
                        <div className={cx('label')}>Liên kết Google</div>
                        <div className={cx('content')}>
                            <div>
                                <div className={cx('avatar')}>
                                    <img
                                        src={currentUser?.avatar ? currentUser?.avatar : Image.avatar}
                                        alt={currentUser?.name}
                                    />
                                </div>
                                <span className={cx('provider-name')}>{currentUser?.email}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('label')}>Liên kết Facebook</div>
                        <div className={cx('content')}>
                            <span className={cx('no-connections')}>Chưa liên kết tài khoản Facebook</span>
                            <button className={cx('btn-connections')}>
                                <IconFaceBook /> Liên kết Facebook
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className={cx('label')}>Liên kết số điện thoại</div>
                        <div className={cx('content')}>
                            <span className={cx('no-connections')}>Chưa liên kết số điện thoại nào</span>
                            <button className={cx('btn-connections')}>
                                <IconPhone /> Liên kết số điện thoại
                            </button>
                        </div>
                    </div>
                    <div />
                </div>
            )}

            {type === 'info' && (
                <>
                    <FieldWrapper>
                        <InputField
                            label="Họ tên"
                            placeholder="Thêm tên của bạn"
                            defaultValue={currentUser?.name}
                            desc="Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn."
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <InputField
                            label="Bio"
                            placeholder="Thêm giới thiệu"
                            desc="Bio hiển thị trên trang cá nhân và trong các bài viết (blog) của bạn."
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <PhotoField avatar={currentUser?.avatar} name={currentUser?.name} />
                    </FieldWrapper>

                    <FieldWrapper>
                        <InputField
                            label="Email"
                            placeholder="Eg. hoclaptrinh@f8.edu.vn"
                            defaultValue={currentUser?.email}
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <InputField
                            type="username"
                            label="User Name"
                            placeholder="Thêm user name"
                            defaultValue={currentUser?.username}
                            desc={`https://fullstack.edu.vn/@${currentUser?.username}`}
                        />
                    </FieldWrapper>
                </>
            )}

            {type === 'social' && (
                <>
                    <FieldWrapper>
                        <InputField
                            type="social"
                            label="Facebook"
                            placeholder="Eg. https://www.facebook.com/hoclaptrinhf8"
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <InputField
                            type="social"
                            label="Youtube"
                            placeholder="Eg. https://www.youtube.com/c/F8VNOfficial"
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <InputField
                            type="social"
                            label="Linkedin"
                            placeholder="Eg. https://www.linkedin.com/in/hoclaptrinhf8/"
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <InputField
                            type="social"
                            label="Instagram"
                            placeholder="Eg. https://www.instagram.com/hoclaptrinhf8/"
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <InputField type="social" label="Twitter" placeholder="Eg. https://twitter.com/hoclaptrinhf8" />
                    </FieldWrapper>
                </>
            )}
        </div>
    );
}

export default GroupField;
