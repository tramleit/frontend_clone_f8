import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Heading from '~/components/Heading';
import HeadingTabs from '~/components/HeadingTabs';
import MyPostItem from '~/components/MyPostItem';
import { showNotification } from '~/redux/reducer/modunReducer';
import { getMyPosts } from '~/services/apiBlog';
import styles from './MyPost.module.scss';

const cx = classNames.bind(styles);

function MyPost() {
    const [myPosts, setMyPosts] = useState([]);
    const { tab } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getMyPosts(currentUser._id);

            if (result.errCode === 0) {
                setMyPosts(result.data.myBlogs);
            } else {
                dispatch(showNotification(result.message || 'Lỗi lấy dữ liệu bài viết đã xuất bản'));
            }
        };
        fetchApi();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    return (
        <div className={cx('wrapper')}>
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
                                Bạn có thể <Link to="/new-post">viết bài mới</Link> hoặc
                                <Link to="/blog"> đọc bài viết</Link> khác trên F8 nhé.
                            </p>
                        </div>
                    ) : (
                        <>
                            {myPosts.length > 0 ? (
                                myPosts.map((myPost) => <MyPostItem key={myPost._id} type="my-post" myPost={myPost} />)
                            ) : (
                                <div className={cx('no-result')}>
                                    <p>Bạn chưa xuất bản bài viết nào.</p>
                                    <p>
                                        Bạn có thể <Link to="/new-post">viết bài mới</Link> hoặc
                                        <Link to="/blog"> đọc bài viết</Link> khác trên F8 nhé.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyPost;
