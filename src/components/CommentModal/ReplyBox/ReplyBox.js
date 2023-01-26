import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FallbackAvatar from '~/components/FallbackAvatar';
import { createComment } from '~/services/apiCourse';
import EditorComment from '../EditorComment';
import styles from './ReplyBox.module.scss';

const cx = classNames.bind(styles);

function ReplyBox({
    type = 'create',
    setIsChat,
    ownerComment,
    authorReply,
    arrCmt,
    setArrCmt,
    authorCmt,
    handleReplyComment,
}) {
    const [text, setText] = useState('');
    const [html, setHTML] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const lessonId = new URLSearchParams(location.search).get('id');
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleGetDataChild = ({ html, text }) => {
        setText(text);
        setHTML(html);
    };

    const handleCloseChat = () => {
        if (setIsChat) {
            setIsChat(false);
        }
    };

    const handleCreateComment = async () => {
        if (type === 'reply') {
            const newText = text.replace(/@[^:]+:/g, ' ');
            const newHTML = html.replace(/@[^:]+:/g, ' ');

            const replyComment = {
                ownerComment,
                authorReply,
                contentHTML: newHTML.trim(),
                contentMarkdown: newText.trim(),
            };

            handleReplyComment(replyComment);
        } else {
            const newComment = {
                lessonId: lessonId,
                contentHTML: html,
                contentMarkdown: text,
            };
            const result = await createComment(newComment, currentUser.accessToken);

            if (result.statusCode === 0) {
                setArrCmt([result.data, ...arrCmt]);
                setIsChat(false);
            } else {
                dispatch(result.message || 'Lỗi thêm mới bình luận');
            }
        }
    };

    return (
        <div className={type === 'create' ? cx('wrapper', 'create') : cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('wrap-avatar')}>
                    <div className={cx('avatar')}>
                        <FallbackAvatar
                            style={{ '--font-size': '4.2px' }}
                            image={currentUser.avatar}
                            alt={currentUser.name}
                        />
                    </div>
                </div>

                <div className={cx('content-wrap')}>
                    <div className={cx('text-editor')}>
                        <EditorComment handleGetDataChild={handleGetDataChild} authorCmt={authorCmt} />
                    </div>
                    <div className={cx('actions')}>
                        <button className={cx('action-cancel')} onClick={handleCloseChat}>
                            Hủy
                        </button>
                        <button
                            className={text ? cx('action-ok', 'active') : cx('action-ok')}
                            onClick={handleCreateComment}
                        >
                            Bình luận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyBox;
