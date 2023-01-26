import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { closeModalComment, showNotification } from '~/redux/reducer/modunReducer';
import CommentItem from './CommentItem';
import { getAllComments } from '~/services/apiCourse';
import ReplyBox from './ReplyBox';

import styles from './CommentModal.module.scss';
import FallbackAvatar from '../FallbackAvatar';
import { createPortal } from 'react-dom';

const cx = classNames.bind(styles);

function CommentModal() {
    const [isChat, setIsChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allComment, setAllComment] = useState([]);

    const dispatch = useDispatch();
    const location = useLocation();

    const modalComment = useSelector((state) => state.modun.modalComment.status);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const lessonId = new URLSearchParams(location.search).get('id');

    useEffect(() => {
        if (modalComment) {
            setLoading(true);
            const fetchApi = async () => {
                const result = await getAllComments(lessonId, currentUser.accessToken);
                setLoading(false);
                if (result.statusCode === 0) {
                    setAllComment(result.data);
                } else {
                    dispatch(showNotification(result.message || 'Lỗi gọi api lấy bình luận'));
                }
            };
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonId, modalComment, currentUser.accessToken]);

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
                            <h4 className={cx('title')}>
                                {loading ? (
                                    <FontAwesomeIcon icon={faSpinner} className={cx('spinner')} />
                                ) : (
                                    <>{allComment?.length} </>
                                )}
                                hỏi đáp
                            </h4>

                            {!loading && (
                                <p className={cx('help')}>
                                    (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
                                </p>
                            )}
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

                        {!loading &&
                            allComment?.map((comment) => (
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
