import { faAngleDown, faAngleUp, faEllipsis, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import moment from 'moment';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import MarkdownParser from '~/components/tracks/MarkdownParser';
import { createCommentReply, getCommentReply } from '~/services/apiCourse';
import ReplyBox from '../ReplyBox';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ comment, ownerComment }) {
    const [isChat, setIsChat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [moreReplies, setMoreReplies] = useState(false);
    const [commentReply, setCommentReply] = useState([]);

    const handleSendCmtReplies = async (commentId) => {
        if (!moreReplies) {
            setLoading(true);

            const result = await getCommentReply(commentId);

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

    const handleReplyComment = async (comment, commentId) => {
        const result = await createCommentReply(comment);

        if (!result) alert('Lỗi vui lòng liên hệ admin');

        if (result.errCode === 0) {
            if (!commentReply) {
                handleSendCmtReplies(commentId);
            } else {
                setCommentReply([result.data, ...commentReply]);
            }

            setIsChat(false);
            setMoreReplies(true);
        } else {
            alert('Lỗi thêm mới bình luận');
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
                            <MarkdownParser
                                author={comment?.authorReply}
                                data={comment.contentHTML}
                                fontSize="1.4rem"
                            />
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
                        handleReplyComment={handleReplyComment}
                    />
                )}

                {comment.replies?.length > 0 || commentReply?.length > 0 ? (
                    <div className={cx('replies-btn')} onClick={() => handleSendCmtReplies(comment._id)}>
                        <span>
                            {!moreReplies
                                ? `Xem ${comment.replies?.length || commentReply?.length} câu trả lời`
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
                        {commentReply.map((reply) => {
                            return <CommentItem key={reply?._id} comment={reply} ownerComment={comment._id} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommentItem;
