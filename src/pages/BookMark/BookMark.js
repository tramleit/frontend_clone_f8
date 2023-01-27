import config from '~/config';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Heading from '~/components/Heading';
import HeadingTabs from '~/components/HeadingTabs';
import MyPostItem from '~/components/MyPostItem';
import { showNotification } from '~/redux/reducer/modunReducer';
import { getPostSave } from '~/services/apiAuth';
import styles from './BookMark.module.scss';
import LayoutWrapper from '~/components/LayoutWrapper';
const cx = classNames.bind(styles);

function BookMark() {
    const [postSaves, setPostSaves] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                const result = await getPostSave(currentUser.accessToken);

                if (result.statusCode === 0) {
                    setPostSaves(result.data);
                } else {
                    dispatch(showNotification(result.message || 'Lỗi lấy bài viết đã lưu'));
                }
            };
            fetchApi();
        } else {
            navigate(config.routes.login);
            dispatch(showNotification('Vui lòng đăng nhập'));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSaves.length]);

    return (
        <LayoutWrapper>
            <Heading name="Bài viết đã lưu" />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <HeadingTabs
                        titles={[
                            {
                                title: `Bài viết (${postSaves.length})`,
                                pathname: config.routes.bookmark,
                            },
                        ]}
                    />

                    {postSaves.length > 0 ? (
                        postSaves.map((postSave) => (
                            <MyPostItem key={postSave._id} myPost={postSave} setMyPosts={setPostSaves} />
                        ))
                    ) : (
                        <div className={cx('no-result')}>
                            <p>Bạn chưa lưu bài viết nào.</p>
                            <p>
                                Bấm vào đây để <Link to={config.routes.blog}>xem các bài viết nổi bật.</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default BookMark;
