import moment from 'moment';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

import VideoTrack from '../VideoTrack';
import MarkdownParser from '../MarkdownParser';
import { getLessonById } from '~/services/apiCourse';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './ContentTrack.module.scss';

const cx = classNames.bind(styles);

function ContentTrack() {
    const lesson = useSelector((state) => state.lesson.currentLesson);
    const sidebarCourse = useSelector((state) => state.modun.sidebarCourse?.status);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const location = useLocation();
    const lessonId = new URLSearchParams(location.search).get('id');

    const dispatch = useDispatch();
    const date = moment(lesson?.updatedAt);

    useEffect(() => {
        if (lessonId) {
            const fetchApi = async () => {
                const result = await getLessonById(lessonId, dispatch, currentUser.accessToken);

                if (result.statusCode !== 0) {
                    dispatch(showNotification(result.message));
                }
            };
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonId]);

    return (
        <div className={sidebarCourse ? cx('wrapper') : cx('wrapper', 'active')}>
            <VideoTrack status={sidebarCourse} />

            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('heading')}>
                        <h2 className={cx('title')}>{lesson?.nameLesson}</h2>
                        <p className={cx('time-update')}>
                            Cập nhật tháng {date.format('MM')} năm {date.format('YYYY')}
                        </p>
                    </div>

                    <button className={cx('note')}>
                        <FontAwesomeIcon icon={faPlus} />

                        <span className={cx('label')}>
                            Thêm ghi chú tại <span className={cx('number')}>00:00</span>
                        </span>
                    </button>
                </div>

                <MarkdownParser data={lesson?.descHTML} fontSize={window.innerWidth < 740 ? '1.4rem' : '1.6rem'} />
            </div>

            <p className={cx('powered')}>
                Made with <FontAwesomeIcon icon={faHeart} /> <span className={cx('dot')}>·</span> Powered by F8
            </p>
        </div>
    );
}

export default ContentTrack;
