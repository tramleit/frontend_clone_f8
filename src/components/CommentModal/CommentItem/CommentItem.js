import { faAngleDown, faAngleUp, faEllipsis, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import MarkdownParser from '~/components/tracks/MarkdownParser';
import { getCommentReply } from '~/services/apiCourse';
import ReplyBox from '../ReplyBox';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ comment, ownerComment }) {
    const [moreReplies, setMoreReplies] = useState(false);
    const [isChat, setIsChat] = useState(false);
    const [loading, setLoading] = useState(false);

    const [commentReply, setCommentReply] = useState([]);

    const handleSendCmtReplies = async () => {
        if (!moreReplies) {
            setLoading(true);
            const result = await getCommentReply(comment._id);
            if (result.errCode === 0) {
                setCommentReply(result.data);
                setLoading(false);
                setMoreReplies(true);
            } else {
                setLoading(false);
            }
        } else {
            setMoreReplies(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Link to={`/@${comment.author?.username}`}>
                    <img
                        src={comment.author?.avatar !== '' ? comment.author?.avatar : Image.avatar}
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
                            <MarkdownParser data={comment} fontSize="1.4rem" />
                        </div>
                    </div>

                    <div className={cx('time')}>
                        <p className={cx('createdAt')}>
                            <button className={cx('icon')}>
                                <span className={cx('like')}>Thích</span>
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
                        fontSize="3.2px"
                        ownerComment={ownerComment}
                        authorReply={comment.author._id}
                        authorCmt={comment.author}
                        arrCmt={commentReply}
                        setArrCmt={setCommentReply}
                        handleSendCmtReplies={handleSendCmtReplies}
                    />
                )}

                {comment.replies.length > 0 || commentReply.length ? (
                    <div className={cx('replies-btn')} onClick={handleSendCmtReplies}>
                        <span>
                            {!moreReplies
                                ? `Xem ${commentReply.length || comment.replies.length} câu trả lời`
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

                {moreReplies && (
                    <div className={cx('replies-cmt')}>
                        {commentReply.map((reply) => (
                            <CommentItem key={reply._id} comment={reply} ownerComment={ownerComment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
