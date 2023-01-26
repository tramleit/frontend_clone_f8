import Select from 'react-select';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNewPosts } from '~/services/apiBlog';
import { handleUploadImage } from '~/services/apiImage';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './PreviewPost.module.scss';

const cx = classNames.bind(styles);

const options = [
    { value: 'front-end-mobile-apps', label: 'Front-end / Mobile apps' },
    { value: 'back-end-devops', label: 'Back-end / Devops' },
    { value: 'ui-ux-design', label: 'UI / UX / Design' },
];

function PreviewPost({ setActivePrevPost, dataNewPost }) {
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState(null);
    const [prevTitle, setPrevTitle] = useState('');
    const [prevDesc, setPrevDesc] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        const subTitle = dataNewPost.title.substring(0, 100);
        setPrevTitle(subTitle);
        titleRef.current.innerHTML = subTitle;

        if (dataNewPost.text.length > 50) {
            const subDesc =
                dataNewPost.text
                    .substring(0, 150)
                    .replace(/[#*_`)(~+>[|\-\]]/g, '')
                    .trim() + '...';

            setPrevDesc(subDesc);
            descRef.current.innerHTML = subDesc;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnInput = (e, type) => {
        const value = e.target.textContent;

        if (type === 'title') {
            if (value.length <= 100) {
                setPrevTitle(value);
            } else {
                titleRef.current.innerHTML = prevTitle;
            }
        } else {
            if (value.length <= 160) {
                setPrevDesc(value);
            } else {
                descRef.current.innerHTML = prevDesc;
            }
        }
    };

    const handlePublicNewPost = async () => {
        const newPost = {
            title: dataNewPost.title,
            metaTitle: prevTitle,
            metaDescription: prevDesc,
            contentHTML: dataNewPost.html,
            contentMarkdown: dataNewPost.text,
            readingTime: dataNewPost.wordCount,
            imagePreview: image,
            tags: tags,
        };

        const result = await createNewPosts(newPost, dispatch, currentUser.accessToken);
        if (result.statusCode === 0) {
            navigate(`/blog/${result.data.slug}`);
        } else {
            dispatch(result.message || 'Lỗi tạo mới bài viết');
        }
    };

    const handlePreviewImage = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const result = await handleUploadImage(formData, dispatch);
        if (result.errCode === 0) {
            setImage(result.data.urlImage);
        } else {
            dispatch(showNotification(result.message || 'Lỗi lấy đường dẫn ảnh'));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('close')} onClick={() => setActivePrevPost(false)}>
                ×
            </div>

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('wrap')}>
                        <div className={cx('box')}>
                            <div className={cx('preview')}>
                                <h3>Xem trước</h3>

                                <div
                                    className={cx('image-prev')}
                                    onClick={() => inputRef.current.click()}
                                    style={image && { backgroundImage: `url(${image})` }}
                                >
                                    <input ref={inputRef} onChange={handlePreviewImage} type="file" />
                                    <p>
                                        Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                                    </p>
                                    <span>Bấm vào đây để chọn ảnh</span>
                                </div>
                                <div
                                    className={cx('prev-title')}
                                    contentEditable
                                    onInput={(e) => handleOnInput(e, 'title')}
                                    ref={titleRef}
                                />
                                {prevTitle.length > 80 && (
                                    <div className={prevTitle.length === 100 ? cx('limit', 'max') : cx('limit')}>
                                        {prevTitle.length}/100
                                    </div>
                                )}

                                <div
                                    className={cx('prev-desc')}
                                    contentEditable
                                    onInput={(e) => handleOnInput(e, 'desc')}
                                    ref={descRef}
                                />
                                {prevDesc.length > 120 && (
                                    <div className={prevDesc.length === 160 ? cx('limit', 'max') : cx('limit')}>
                                        {prevDesc.length}/160
                                    </div>
                                )}

                                <p className={cx('note')}>
                                    <strong>Lưu ý: </strong>
                                    <span>
                                        Chỉnh sửa tại đây sẽ thay đổi cách bài viết được hiển thị tại trang chủ, tin nổi
                                        bật - Chứ không ảnh hưởng tới nội dung bài viết của bạn.
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className={cx('box')}>
                            <div className={cx('preview-tag')}>
                                <p>Thêm thẻ để độc giả biết bài viết của bạn nói về điều gì.</p>

                                <Select
                                    isMulti
                                    placeholder="Chọn thẻ phù hợp với chủ đề của bạn"
                                    onChange={setTags}
                                    options={options}
                                />

                                <div className={cx('action')}>
                                    <button className={cx('action-public')} onClick={handlePublicNewPost}>
                                        Xuất bản ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewPost;
