import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBookmark as faBookmarkSave } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import { faEllipsis, faEnvelope, faFlag, faLink } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import { toggleSavaPost } from '~/services/apiAuth';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './ActionPost.module.scss';

const cx = classNames.bind(styles);

function ActionPost({ dataPost }) {
    const [option, setOption] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const checkSavePost = currentUser?.postSave.findIndex((postId) => postId.post === dataPost?._id);
    const url = `${window.location.host}${config.routes.blog}/${dataPost?.slug}`;

    const handleCopyUrl = () => {
        dispatch(showNotification('Đã sao chép liên kết'));
        setOption(false);
    };

    const handleSavePost = async () => {
        const result = await toggleSavaPost(dataPost._id, currentUser.accessToken, dispatch);

        if (result.statusCode === 0) {
            dispatch(showNotification(result.message));
        } else {
            dispatch(showNotification(result.message || 'Lỗi vui lòng thử lại'));
        }
    };
    return (
        <div className={cx('actions')}>
            <div className={cx('btn-save')} onClick={handleSavePost}>
                {checkSavePost === -1 ? (
                    <FontAwesomeIcon icon={faBookmark} />
                ) : (
                    <FontAwesomeIcon icon={faBookmarkSave} className={cx('book-mark')} />
                )}
            </div>

            <Tippy
                visible={option}
                interactive
                placement="bottom-end"
                onClickOutside={() => setOption(false)}
                render={(attrs) => (
                    <ul className={cx('options')} tabIndex="-1" {...attrs}>
                        <FacebookShareButton url={url} quote={dataPost?.title}>
                            <li onClick={() => setOption(false)}>
                                <FontAwesomeIcon icon={faFacebook} />
                                <span>Chia sẻ lên Facebook</span>
                            </li>
                        </FacebookShareButton>

                        <TwitterShareButton url={url}>
                            <li onClick={() => setOption(false)}>
                                <FontAwesomeIcon icon={faTwitter} />
                                <span>Chia sẻ lên Twitter</span>
                            </li>
                        </TwitterShareButton>
                        <EmailShareButton url={url} subject={dataPost?.title}>
                            <li onClick={() => setOption(false)}>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>Chia sẻ tới Email</span>
                            </li>
                        </EmailShareButton>
                        <CopyToClipboard text={url} onCopy={handleCopyUrl}>
                            <li>
                                <FontAwesomeIcon icon={faLink} />
                                <span>Sao chép liên kết</span>
                            </li>
                        </CopyToClipboard>

                        <li onClick={() => setOption(false)}>
                            <FontAwesomeIcon icon={faFlag} />
                            <span>Báo cáo bài viết</span>
                        </li>
                    </ul>
                )}
            >
                <div className={cx('btn-option')} onClick={() => setOption(!option)}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </Tippy>
        </div>
    );
}

export default ActionPost;
