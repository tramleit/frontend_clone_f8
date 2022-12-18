import { faCamera, faUpload, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ActivityItem from '~/components/ActivityItem';
import CourseItem from '~/components/CourseItem';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [upload, setUpload] = useState(false);

    const isActive = true;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('user')}>
                    <div className={cx('user-avatar')}>
                        <img
                            className={cx('avatar')}
                            src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                            alt=""
                        />
                    </div>
                    <div className={cx('user-name')}>
                        <span>Mã Việt Hà</span>
                    </div>
                </div>
                <div className={cx('btn-change')} onClick={() => setUpload(true)}>
                    <FontAwesomeIcon icon={faCamera} />
                    <span>Chỉnh sửa ảnh bìa</span>
                </div>
                {upload && (
                    <div className={cx('upload')}>
                        <label className={cx('label')}>
                            <div className={cx('label-item')}>
                                <FontAwesomeIcon icon={faUpload} />
                                <span>Tải ảnh lên</span>
                            </div>
                        </label>
                        <input type="file" accept="image/jpg, image/jpeg, image/png" />
                    </div>
                )}
            </div>

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('left')}>
                        <div className={cx('content-box')}>
                            <div className={cx('box')}>
                                <h4 className={cx('box-title')}>Giới thiệu</h4>
                                <div className={cx('participation')}>
                                    <FontAwesomeIcon icon={faUserGroup} />
                                    <span>
                                        Thành viên của <strong>F8 - Học lập trình để đi làm</strong> từ 7 ngày trước
                                    </span>
                                </div>
                            </div>
                            <div className={cx('box')}>
                                <h4 className={cx('box-title')}>Hoạt động gần đây</h4>
                                <div className={cx('no-participation')}>
                                    {isActive ? (
                                        <>
                                            <ActivityItem />
                                            <ActivityItem />
                                            <ActivityItem />
                                            <ActivityItem />
                                        </>
                                    ) : (
                                        <span>Chưa có hoạt động gần đây</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('content-box')}>
                            <div className={cx('box')}>
                                <h4 className={cx('box-title')}>Các khóa học đã tham gia</h4>
                                <div className={cx('no-participation')}>
                                    {isActive ? (
                                        <>
                                            <CourseItem />
                                            <CourseItem />
                                            <CourseItem />
                                        </>
                                    ) : (
                                        <span>Chưa có khóa học nào được đăng ký</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
