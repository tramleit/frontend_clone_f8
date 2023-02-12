import moment from 'moment';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEllipsis, faSpinner } from '@fortawesome/free-solid-svg-icons';

import ReplyBox from '../ReplyBox';
import ReactionFeel from './ReactionFeel';
import CommentReply from '../CommentReply';
import ParserComment from '../ParserComment';
import FallbackAvatar from '~/components/FallbackAvatar';
import { showNotification } from '~/redux/reducer/modunReducer';
import { createCommentReply, getCommentReply } from '~/services/apiCourse';

import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ comment, ownerComment }) {
    const [isChat, setIsChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [moreReplies, setMoreReplies] = useState(false);
    const [commentReply, setCommentReply] = useState([]);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    // Gọi api lấy comment con theo từng điều kiện
    const handleGetCmtReplies = async (commentId) => {
        if (!moreReplies && commentReply.length === 0) {
            setLoading(true);

            const result = await getCommentReply(commentId, currentUser.accessToken);

            if (result.statusCode === 0) {
                setCommentReply(result.data);
                setLoading(false);
                setMoreReplies(true);
            } else {
                setLoading(false);
            }
        } else {
            if (commentReply.length > 0 && moreReplies) {
                setMoreReplies(false);
            } else {
                setMoreReplies(true);
            }
        }
    };

    // Trả lời comment cha
    const handleReplyComment = async (comment) => {
        const result = await createCommentReply(comment, currentUser.accessToken);

        if (result.statusCode === 0) {
            setCommentReply([...commentReply, result.data]);
            setIsChat(false);
            setMoreReplies(true);
        } else {
            dispatch(showNotification(result.message));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Link to={`/@${comment.author?.username}`}>
                    <FallbackAvatar
                        style={{ '--font-size': '4.2px' }}
                        image={comment.author?.avatar}
                        alt={comment.author?.name}
                    />
                </Link>
            </div>

            <div className={cx('body')}>
                <div className={cx('wrap')}>
                    <div className={cx('content')}>
                        <Link to={`/@${comment.author?.username}`}>
                            <span className={cx('author')}>{comment.author?.name}</span>
                        </Link>
                        <div className={cx('text')}>
                            <ParserComment data={comment.contentMarkdown} fontSize="1.4rem" />
                        </div>

                        {comment.feel.length > 0 && (
                            <div className={cx('count-feel')}>
                                <div className={cx('feel')}>
                                    <img
                                        src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673283027/Course/like_iwpexh.svg"
                                        alt=""
                                    />
                                    <img
                                        src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673283101/Course/haha_s7c8pj.svg"
                                        alt=""
                                    />
                                </div>
                                <div className={cx('count')}>{comment.feel.length}</div>
                            </div>
                        )}
                    </div>

                    <div className={cx('time')}>
                        <p className={cx('createdAt')}>
                            <button className={cx('icon')}>
                                <ReactionFeel />
                            </button>
                            <span>·</span>
                            <span className={cx('reply-comment')} onClick={() => setIsChat(true)}>
                                Trả lời
                            </span>
                            <span>·</span>
                            <span className={cx('create-time')}>{moment(comment?.createdAt).fromNow()}</span>
                            <span className={cx('more-btn-wrap')}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </button>
                            </span>
                        </p>
                    </div>
                </div>

                {isChat && (
                    <ReplyBox
                        type="reply"
                        setIsChat={setIsChat}
                        ownerComment={ownerComment}
                        authorReply={comment.author?._id}
                        authorCmt={comment.author}
                        handleReplyComment={handleReplyComment}
                    />
                )}

                {comment.replies?.length > 0 || commentReply.length > 0 ? (
                    <div className={cx('replies-btn')} onClick={() => handleGetCmtReplies(comment._id)}>
                        <span>
                            {!moreReplies
                                ? `Xem ${commentReply?.length || comment.replies?.length} câu trả lời`
                                : 'Ẩn câu trả lời'}
                        </span>

                        {!moreReplies ? (
                            loading ? (
                                <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
                            ) : (
                                <FontAwesomeIcon icon={faAngleDown} />
                            )
                        ) : (
                            <FontAwesomeIcon icon={faAngleUp} />
                        )}
                    </div>
                ) : (
                    Fragment
                )}

                {moreReplies && commentReply?.length > 0 && (
                    <div className={cx('replies-cmt')}>
                        {commentReply.map((reply) => (
                            <CommentReply
                                key={reply._id}
                                reply={reply}
                                ownerComment={ownerComment}
                                setCommentReply={setCommentReply}
                                commentReply={commentReply}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
