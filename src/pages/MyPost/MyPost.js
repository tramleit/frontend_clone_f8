import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import config from '~/config';
import Heading from '~/components/Heading';
import { getMyPosts } from '~/services/apiBlog';
import MyPostItem from '~/components/MyPostItem';
import HeadingTabs from '~/components/HeadingTabs';
import LayoutWrapper from '~/components/LayoutWrapper';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './MyPost.module.scss';

const cx = classNames.bind(styles);

function MyPost() {
    const [myPosts, setMyPosts] = useState([]);

    const { tab } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                const result = await getMyPosts(currentUser.accessToken);

                if (result.statusCode === 0) {
                    setMyPosts(result.data);
                } else {
                    dispatch(showNotification(result.message));
                }
            };
            fetchApi();
        } else {
            navigate(config.routes.login);
            dispatch(showNotification('Bạn chưa đăng nhập'));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myPosts.length]);

    return (
        <LayoutWrapper>
            <Heading name="Bài viết của tôi" />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <HeadingTabs
                        titles={[
                            { title: `Bản nháp`, pathname: `/me/posts/drafts` },
                            { title: `Đã xuất bản`, pathname: `/me/posts/published` },
                        ]}
                    />

                    {tab === 'drafts' ? (
                        <div className={cx('no-result')}>
                            <p>Chức năng này đang trong quá trình phát triển</p>
                            <p>
                                Bạn có thể <Link to={config.routes.newPost}>viết bài mới</Link> hoặc
                                <Link to={config.routes.blog}> đọc bài viết</Link> khác trên F8 nhé.
                            </p>
                        </div>
                    ) : (
                        <Fragment>
                            {myPosts.length > 0 ? (
                                myPosts.map((myPost) => (
                                    <MyPostItem
                                        key={myPost._id}
                                        type="my-post"
                                        setMyPosts={setMyPosts}
                                        myPost={myPost}
                                    />
                                ))
                            ) : (
                                <div className={cx('no-result')}>
                                    <p>Bạn chưa xuất bản bài viết nào.</p>
                                    <p>
                                        Bạn có thể <Link to={config.routes.newPost}>viết bài mới</Link> hoặc
                                        <Link to={config.routes.blog}> đọc bài viết</Link> khác trên F8 nhé.
                                    </p>
                                </div>
                            )}
                        </Fragment>
                    )}
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default MyPost;
