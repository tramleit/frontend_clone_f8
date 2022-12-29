import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '~/assets/image';
import { closeModalComment } from '~/redux/reducer/modunReducer';
import CommentItem from './CommentItem';
import styles from './CommentModal.module.scss';

const cx = classNames.bind(styles);

function CommentModal({ data }) {
    const modalComment = useSelector((state) => state.modun.modalComment?.status);
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const dispatch = useDispatch();

    const handleCloseModalComment = () => {
        dispatch(closeModalComment());
    };

    return (
        <div className={modalComment ? cx('wrapper') : cx('wrapper', 'open')} onClick={handleCloseModalComment}>
            <div className={cx('container')}>
                <div className={cx('close-modal')} onClick={handleCloseModalComment}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className={cx('content')}>
                    <div className={cx('detail')}>
                        <div className={cx('heading')}>
                            <h4 className={cx('title')}>{data?.length} hỏi đáp</h4>
                            <p className={cx('help')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
                        </div>

                        <div className={cx('my-comment')}>
                            <div className={cx('my-avatar')}>
                                <img
                                    src={currentUser.avatar ? currentUser.avatar : Image.avatar}
                                    alt={currentUser.name}
                                />
                            </div>
                            <div className={cx('comment-content')}>
                                <div className={cx('placeholder')}>
                                    <span>Bạn có thắc mắc gì trong bài học này?</span>
                                </div>
                            </div>
                        </div>

                        {data.map((comment) => (
                            <CommentItem key={comment._id} comment={comment} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentModal;
