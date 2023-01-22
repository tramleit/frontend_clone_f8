import Select from 'react-select';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleCreateNewPost } from '~/services/apiBlog';

import styles from './PreviewPost.module.scss';

const cx = classNames.bind(styles);

const options = [
    { value: 'front-end-mobile-apps', label: 'Front-end / Mobile apps' },
    { value: 'back-end-devops', label: 'Back-end / Devops' },
    { value: 'ui-ux-design', label: 'UI / UX / Design' },
    { value: 'others', label: 'Others' },
];

function PreviewPost({ setActivePrevPost, dataNewPost }) {
    const [image, setImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [metaTitle, setMetaTitle] = useState('');
    console.log('metaTitle: ', metaTitle);
    const [metaDesc, setMetaDesc] = useState('');
    console.log('metaDesc: ', metaDesc);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        const subTitle = dataNewPost.title.substring(0, 100);
        const subDesc = dataNewPost.text.substring(0, 160);

        setMetaTitle(subTitle);
        setMetaDesc(subDesc);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChangeMetaTitle = (e) => {
        console.log('innerHTML: ', e.target.innerHTML);
        console.log('textContent: ', e.target.textContent);
        const value = e.target.innerHTML;
        console.log('value.length: ', value.length);
        console.log('value: ', value);
        if (value.length <= 100) {
            setMetaTitle(value);
        }
    };

    const handlePublicNewPost = async () => {
        const tagsString = JSON.stringify(selectedOption);

        let formData = new FormData();
        formData.append('title', dataNewPost.title);
        formData.append('author', currentUser._id);
        formData.append('contentHTML', dataNewPost.html);
        formData.append('contentMarkdown', dataNewPost.text);
        formData.append('readingTime', dataNewPost.wordCount);
        formData.append('image', image);
        formData.append('tags', tagsString);

        const result = await handleCreateNewPost(formData, dispatch);

        if (result.errCode === 0) {
            navigate(`/blog/${result.data.slug}`);
        } else {
            alert(`Lỗi : ${result.message}`);
        }
    };

    const handlePreviewImage = (e) => {
        let file = e.target.files[0];
        file.preview = URL.createObjectURL(file);

        setImage(file);
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
                                    style={image && { backgroundImage: `url(${image.preview})` }}
                                >
                                    <input ref={inputRef} onChange={handlePreviewImage} type="file" />
                                    <p>
                                        Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                                    </p>
                                    <span>Bấm vào đây để chọn ảnh</span>
                                </div>
                                {/* <ContentEditable
                                    className={cx('prev-title')}
                                    html={metaTitle}
                                    onChange={(e) => handleOnChangeMetaTitle(e)}
                                /> */}
                                <div
                                    className={cx('prev-title')}
                                    contentEditable
                                    spellCheck={false}
                                    // onInput={handleOnChangeMetaTitle}
                                    onChange={handleOnChangeMetaTitle}
                                    dangerouslySetInnerHTML={{ __html: metaTitle }}
                                ></div>
                                {metaTitle?.length > 70 && <div className={cx('limit')}>{metaTitle.length}/100</div>}

                                <ContentEditable
                                    className={cx('prev-desc')}
                                    html={metaDesc}
                                    onChange={(e) => setMetaDesc(e.target.value)}
                                />
                                {metaDesc?.length > 100 && <div className={cx('limit')}>{metaDesc.length}/160</div>}

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
                                    onChange={setSelectedOption}
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
