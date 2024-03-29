import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from 'react-redux';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toggleSavaPost } from '~/services/apiAuth';
import { deletePostById } from '~/services/apiBlog';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './MyPostItem.module.scss';

const cx = classNames.bind(styles);

function MyPostItem({ type = false, setMyPosts = null, myPost = null }) {
    const [active, setActive] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleRemovePostSave = async () => {
        if (!type) {
            // Xóa bài viết đã lưu
            if (myPost.post) {
                const result = await toggleSavaPost(currentUser.accessToken, dispatch, myPost.post._id);

                if (result.statusCode === 0) {
                    dispatch(showNotification('Xóa khỏi mục đã lưu'));
                    setMyPosts([]);
                    setActive(false);
                } else {
                    dispatch(showNotification(result.message));
                }
            } else {
                dispatch(showNotification('Bài viết không tồn tại'));
            }
        } else {
            // Xóa bài viết
            const resultDelete = await deletePostById(myPost._id, currentUser.accessToken);

            if (resultDelete.statusCode === 0) {
                setMyPosts([]);
                dispatch(showNotification('Xóa bài viết thành công'));
            } else {
                dispatch(showNotification(resultDelete.message));
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')} title={!type ? myPost.post?.title : myPost?.title}>
                <Link to={`/blog/${!type ? myPost.post?.slug : myPost?.slug}`}>
                    <span>{!type ? myPost.post?.title : myPost?.title}</span>
                </Link>
            </h3>

            <div className={cx('author')}>
                <Link to={`/blog/${!type ? myPost.post?.slug : myPost?.slug}`}>
                    {type !== 'my-post' ? 'Đã lưu ' : 'Xuất bản '}
                    {moment(!type ? myPost.timestamps : myPost.createdAt).fromNow()}
                </Link>
                <span className={cx('dot')}>·</span>
                <span>
                    {type !== 'my-post' ? 'Tác giả ' : `${myPost.readingTime} phút đọc`}
                    {!type && <strong>{myPost.post?.author?.name}</strong>}
                </span>
            </div>

            <Tippy
                visible={active}
                interactive
                onClickOutside={() => setActive(false)}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('more-tippy')} tabIndex="-1" {...attrs}>
                        <span onClick={handleRemovePostSave}>
                            Xóa {type !== 'my-post' ? 'khỏi mục đã lưu' : 'bài viết'}
                        </span>
                    </div>
                )}
            >
                <span className={cx('more')} onClick={() => setActive(!active)}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </span>
            </Tippy>
        </div>
    );
}

export default MyPostItem;
