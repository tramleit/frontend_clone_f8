import moment from 'moment';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import config from '~/config';
import CoverImage from './CoverImage';
import CourseItem from './CourseItem';
import ActivityItem from './ActivityItem';
import { getInfoUserByUsername } from '~/services/apiAuth';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [infoUser, setInfoUser] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username } = useParams();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                const result = await getInfoUserByUsername(currentUser.accessToken, username);

                if (result.statusCode === 0) {
                    setInfoUser(result.data);
                    document.title = `${result.data.name} | F8`;
                } else {
                    document.title = 'Người dùng không tồn tại';
                    dispatch(showNotification(result.message));
                }
            };
            fetchApi();
        } else {
            navigate(config.routes.login);
            dispatch(showNotification('Vui lòng đăng nhập'));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    return (
        <div className={cx('wrapper')}>
            <CoverImage infoUser={infoUser} />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('left')}>
                        <div className={cx('box')}>
                            <h4 className={cx('box-title')}>Giới thiệu</h4>
                            {infoUser?.bio && (
                                <div className={cx('bio')}>
                                    <span>{infoUser?.bio}</span>
                                </div>
                            )}
                            <div className={cx('participation')}>
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span>
                                    Thành viên của <strong>F8 - Học lập trình để đi làm </strong>
                                    {moment(infoUser?.createdAt).fromNow()}
                                </span>
                            </div>

                            {infoUser?.facebook && (
                                <div className={cx('social-link')}>
                                    <div className={cx('social-icon')}>
                                        <FontAwesomeIcon icon={faFacebookSquare} />
                                    </div>
                                    <a
                                        href={infoUser?.facebook}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cx('link')}
                                    >
                                        {infoUser?.facebook}
                                    </a>
                                </div>
                            )}

                            {infoUser?.youtube && (
                                <div className={cx('social-link')}>
                                    <div className={cx('social-icon')}>
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </div>
                                    <a href={infoUser?.youtube} target="_blank" rel="noreferrer" className={cx('link')}>
                                        {infoUser?.youtube}
                                    </a>
                                </div>
                            )}

                            {infoUser?.instagram && (
                                <div className={cx('social-link')}>
                                    <div className={cx('social-icon')}>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </div>
                                    <a
                                        href={infoUser?.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cx('link')}
                                    >
                                        {infoUser?.instagram}
                                    </a>
                                </div>
                            )}

                            {infoUser?.linkedin && (
                                <div className={cx('social-link')}>
                                    <div className={cx('social-icon')}>
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </div>
                                    <a
                                        href={infoUser?.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cx('link')}
                                    >
                                        {infoUser?.linkedin}
                                    </a>
                                </div>
                            )}

                            {infoUser?.twitter && (
                                <div className={cx('social-link')}>
                                    <div className={cx('social-icon')}>
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </div>
                                    <a href={infoUser?.twitter} target="_blank" rel="noreferrer" className={cx('link')}>
                                        {infoUser?.twitter}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className={cx('box')}>
                            <h4 className={cx('box-title')}>Hoạt động gần đây</h4>
                            <div className={cx('no-participation')}>
                                {infoUser?.activities.length > 0 ? (
                                    infoUser?.activities
                                        .slice(-10)
                                        .map((comment, index) => <ActivityItem key={index} data={comment} />)
                                ) : (
                                    <span>Chưa có hoạt động gần đây</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('box')}>
                            <h4 className={cx('box-title')}>Các khóa học đã tham gia</h4>
                            <div className={cx('no-participation')}>
                                {infoUser?.myCourses.length > 0 ? (
                                    infoUser?.myCourses
                                        .slice(-10)
                                        .map((course, index) => <CourseItem key={index} data={course} />)
                                ) : (
                                    <span>Chưa có khóa học nào được đăng ký</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
