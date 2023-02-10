import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReplyBox from '../ReplyBox';
import styles from '../CommentItem/CommentItem.module.scss';
import { createCommentReply } from '~/services/apiCourse';
import ReactionFeel from '../CommentItem/ReactionFeel';
import FallbackAvatar from '~/components/FallbackAvatar';
import { useDispatch, useSelector } from 'react-redux';
import ParserComment from '../ParserComment';

const cx = classNames.bind(styles);

function CommentReply({ reply, ownerComment, setCommentReply, commentReply }) {
    const [isChat, setIsChat] = useState(false);
    const [activeFeel, setActiveFeel] = useState(false);
    const [hoverTimer, setHoverTimer] = useState(null);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    // Trả lời comment con
    const handleReplyComment = async (comment) => {
        const result = await createCommentReply(comment, currentUser.accessToken);

        if (!result) alert('Lỗi vui lòng liên hệ admin');
        if (result.statusCode === 0) {
            setCommentReply([...commentReply, result.data]);

            setIsChat(false);
        } else {
            dispatch(result.message);
        }
    };

    const handleMouseEnter = () => {
        clearTimeout(hoverTimer);
        setHoverTimer(setTimeout(() => setActiveFeel(true), 200));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <Link to={`/@${reply.author?.username}`}>
                    <FallbackAvatar
                        style={{ '--font-size': '4px' }}
                        image={reply.author?.avatar}
                        alt={reply.author?.name}
                    />
                </Link>
            </div>
            <div className={cx('body')}>
                <div className={cx('wrap')}>
                    <div className={cx('content')}>
                        <Link to={`/@${reply.author?.username}`}>
                            <span className={cx('author')}>{reply.author?.name}</span>
                        </Link>
                        <div className={cx('text')}>
                            <ParserComment author={reply?.authorReply} data={reply.contentMarkdown} fontSize="1.4rem" />
                        </div>

                        {reply.feel.length > 0 && (
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
                                <div className={cx('count')}>{reply.feel.length}</div>
                            </div>
                        )}
                    </div>

                    <div className={cx('time')}>
                        <p className={cx('createdAt')}>
                            <button className={cx('icon')} onMouseEnter={handleMouseEnter}>
                                <ReactionFeel />
                            </button>
                            <span>·</span>
                            <span className={cx('reply-comment')} onClick={() => setIsChat(true)}>
                                Trả lời
                            </span>
                            <span>·</span>
                            {activeFeel && <ReactionFeel />}
                            <span className={cx('create-time')}>{moment(reply?.createdAt).fromNow()}</span>
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
                        authorReply={reply.author._id}
                        authorCmt={reply.author}
                        handleReplyComment={handleReplyComment}
                    />
                )}
            </div>
        </div>
    );
}

export default CommentReply;
