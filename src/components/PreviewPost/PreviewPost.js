import Select from 'react-select';
import classNames from 'classnames/bind';

import styles from './PreviewPost.module.scss';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);

function PreviewPost({ setActivePrevPost }) {
    const [image, setImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    console.log('selectedOption: ', selectedOption);

    const options = [
        { value: 'Front-end / Mobile apps', label: 'Front-end / Mobile apps' },
        { value: 'Back-end / Devops', label: 'Back-end / Devops' },
        { value: 'UI / UX / Design', label: 'UI / UX / Design' },
        { value: 'Others', label: 'Others' },
    ];

    const inputRef = useRef();

    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file.preview);
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
                                    <input ref={inputRef} onChange={handleSelectImage} type="file" />
                                    <p>
                                        Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                                    </p>
                                    <span>Bấm vào đây để chọn ảnh</span>
                                </div>
                                <div className={cx('prev-title')}>
                                    <input type="text" placeholder="Tiêu đề khi tin được hiển thị" />
                                </div>
                                <div className={cx('prev-desc')}>
                                    <input type="text" placeholder="Mô tả khi tin được hiển thị" />
                                </div>

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
                                <p>Thêm tối đa 5 thẻ để độc giả biết bài viết của bạn nói về điều gì.</p>

                                <Select
                                    isMulti
                                    placeholder="Chọn tags của chủ đề của bạn"
                                    onChange={setSelectedOption}
                                    options={options}
                                />

                                <div className={cx('action')}>
                                    <button className={cx('action-public')}>Xuất bản ngay</button>
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
