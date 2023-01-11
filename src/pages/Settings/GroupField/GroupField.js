import classNames from 'classnames/bind';
import { IconFaceBook, IconPhone } from '~/assets/Icon';
import FieldWrapper from '../FieldWrapper';
import InputField from '../InputField';
import PhotoField from '../PhotoField';
import styles from './GroupField.module.scss';

const cx = classNames.bind(styles);

function GroupField({ type, heading, title_1, title_2, title_3 }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>{heading}</h2>

            {type === 'link' && (
                <div className={cx('connections')}>
                    <div>
                        <div className={cx('label')}>{title_1}</div>
                        <div className={cx('content')}>
                            <div>
                                <div className={cx('avatar')}>
                                    <img
                                        src="https://lh3.googleusercontent.com/a/AEdFTp7kuWva8xM4O4Ul2V3364dvtKTxEYYaqKMXNyNg=s96-c"
                                        alt=""
                                    />
                                </div>
                                <span className={cx('provider-name')}>mavietha.info@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('label')}>{title_2}</div>
                        <div className={cx('content')}>
                            <span className={cx('no-connections')}>Chưa liên kết tài khoản Facebook</span>
                            <button className={cx('btn-connections')}>
                                <IconFaceBook /> Liên kết Facebook
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className={cx('label')}>{title_3}</div>
                        <div className={cx('content')}>
                            <span className={cx('no-connections')}>Chưa liên kết số điện thoại nào</span>
                            <button className={cx('btn-connections')}>
                                <IconPhone /> Liên kết số điện thoại
                            </button>
                        </div>
                    </div>
                    <div></div>
                </div>
            )}

            {type === 'info' && (
                <>
                    <FieldWrapper>
                        <InputField
                            label="Họ tên"
                            placeholder="Thêm tên của bạn"
                            defaultValue="Name You"
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
                        <PhotoField />
                    </FieldWrapper>

                    <FieldWrapper>
                        <InputField
                            type="info"
                            label="Email"
                            placeholder="Eg. hoclaptrinh@f8.edu.vn"
                            defaultValue="mavietha.info@gmail.com"
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <InputField
                            type="info"
                            label="User Name"
                            placeholder="Thêm user name"
                            defaultValue="nameyou"
                            desc="URL: https://fullstack.edu.vn/@nameyou"
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
