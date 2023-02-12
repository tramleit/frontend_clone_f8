import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';

import ReplyBox from './ReplyBox';
import CommentItem from './CommentItem';
import { createPortal } from 'react-dom';
import FallbackAvatar from '../FallbackAvatar';
import { getAllComments } from '~/services/apiCourse';
import { closeModalComment, showNotification } from '~/redux/reducer/modunReducer';

import styles from './CommentModal.module.scss';

const cx = classNames.bind(styles);

function CommentModal() {
    const [isChat, setIsChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allComment, setAllComment] = useState([]);
    const [totalComment, setTotalComment] = useState(0);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const { status, type, uid } = useSelector((state) => state.modun.modalComment);

    useEffect(() => {
        if (status) {
            setLoading(true);

            const fetchApi = async () => {
                const result = await getAllComments(currentUser.accessToken, type, uid);
                setLoading(false);

                if (result.statusCode === 0) {
                    setAllComment(result.data);
                    setTotalComment(result.total);
                } else {
                    dispatch(showNotification(result.message));
                }
            };
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    const handleCloseModalComment = () => {
        dispatch(closeModalComment());
    };

    return createPortal(
        <div className={status ? cx('wrapper') : cx('wrapper', 'open')} onClick={handleCloseModalComment}>
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
                                    <Fragment>{totalComment} </Fragment>
                                )}
                                bình luận
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
