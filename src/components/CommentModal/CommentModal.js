import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import CommentItem from './CommentItem';
import styles from './CommentModal.module.scss';

const cx = classNames.bind(styles);

function CommentModal() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('close-modal')}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className={cx('content')}>
                    <div className={cx('detail')}>
                        <div className={cx('heading')}>
                            <h4 className={cx('title')}>13 hỏi đáp</h4>
                            <p className={cx('help')}>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
                        </div>

                        <div className={cx('my-comment')}>
                            <div className={cx('my-avatar')}>
                                <img
                                    src="https://files.fullstack.edu.vn/f8-prod/user_photos/180680/622b69e00e285.jpg"
                                    alt=""
                                />
                            </div>
                            <div className={cx('comment-content')}>
                                <div className={cx('placeholder')}>
                                    <span>Bạn có thắc mắc gì trong bài học này?</span>
                                </div>
                            </div>
                        </div>

                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                        <CommentItem />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentModal;