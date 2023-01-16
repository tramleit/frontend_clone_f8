import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { closeModalComment } from '~/redux/reducer/modunReducer';
import CommentItem from './CommentItem';
import { getAllComments } from '~/services/apiCourse';
import ReplyBox from './ReplyBox';

import styles from './CommentModal.module.scss';
import FallbackAvatar from '../FallbackAvatar';
import { createPortal } from 'react-dom';

const cx = classNames.bind(styles);

function CommentModal() {
    const [isChat, setIsChat] = useState(false);
    const [allComment, setAllComment] = useState([]);

    const modalComment = useSelector((state) => state.modun.modalComment.status);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const location = useLocation();
    const lessonId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        if (modalComment) {
            const fetchApi = async () => {
                const result = await getAllComments(lessonId);
                if (result.errCode === 0) {
                    setAllComment(result.data);
                } else {
                    alert('Lỗi gọi api lấy bình luận');
                }
            };
            fetchApi();
        }
    }, [lessonId, modalComment]);

    const handleCloseModalComment = () => {
        dispatch(closeModalComment());
    };

    return createPortal(
        <div className={modalComment ? cx('wrapper') : cx('wrapper', 'open')} onClick={handleCloseModalComment}>
            <div className={cx('container')}>
                <div className={cx('close-modal')} onClick={handleCloseModalComment}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className={cx('content')} onClick={(event) => event.stopPropagation()}>
                    <div className={cx('detail')}>
                        <div className={cx('heading')}>
                            <h4 className={cx('title')}>{allComment?.length} hỏi đáp</h4>
                            <p className={cx('help')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
                        </div>

                        <div className={isChat ? cx('my-comment', 'active') : cx('my-comment')}>
                            {isChat ? (
                                <ReplyBox
                                    lessonId={lessonId}
                                    type="create"
                                    setIsChat={setIsChat}
                                    arrCmt={allComment}
                                    setArrCmt={setAllComment}
                                />
                            ) : (
                                <>
                                    <div className={cx('my-avatar')}>
                                        <FallbackAvatar
                                            style={{ '--font-size': '4.2px' }}
                                            image={currentUser.avatar}
                                            alt={currentUser.name}
                                        />
                                    </div>
                                    <div className={cx('comment-content')}>
                                        <div className={cx('placeholder')} onClick={() => setIsChat(true)}>
                                            <span>Bạn có thắc mắc gì trong bài học này?</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {allComment?.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} ownerComment={comment._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default CommentModal;
