import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import styles from './MyPostItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSavaPost } from '~/services/apiAuth';
import { showNotification } from '~/redux/reducer/modunReducer';
const cx = classNames.bind(styles);

function MyPostItem({ type, postSave = null, setPostSaves = null, myPost = null }) {
    const [active, setActive] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleRemovePostSave = async () => {
        if (!type) {
            const result = await toggleSavaPost(postSave.post._id, currentUser._id, dispatch);

            if (result.errCode === 0) {
                dispatch(showNotification(result.message));
                setPostSaves([]);
            } else {
                dispatch(showNotification(result.message || 'Lỗi xóa bài viết đã lưu'));
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')} title={postSave?.post.title || myPost.title}>
                <Link to={`/blog/${postSave?.post.slug || myPost.slug}`}>
                    <span>{postSave?.post.title || myPost.title}</span>
                </Link>
            </h3>

            <div className={cx('author')}>
                <Link to={`/blog/${postSave?.post.slug || myPost.slug}`}>
                    {type !== 'my-post' ? 'Đã lưu' : 'Xuất bản'}{' '}
                    {moment(postSave?.timestamps).fromNow() || moment(myPost.createdAt).fromNow()}
                </Link>
                <span className={cx('dot')}>·</span>
                <span>
                    {type !== 'my-post' ? 'Tác giả' : `${myPost.readingTime} phút đọc`}
                    <strong> {postSave?.post.author.name}</strong>
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
