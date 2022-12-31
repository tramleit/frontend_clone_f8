import Select from 'react-select';
import classNames from 'classnames/bind';

import styles from './PreviewPost.module.scss';
import { colourOptions } from './data.ts';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function PreviewPost() {
    const [image, setImage] = useState(null);
    const inputRef = useRef();

    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log('file: ', file);
        setImage(file.preview);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('close')}>×</div>

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('wrap')}>
                        <div className={cx('box')}>
                            <div className={cx('preview')}>
                                <h3>Xem trước</h3>

                                <div
                                    className={cx('image-prev')}
                                    onClick={() => inputRef.current.click()}
                                    style={{ backgroundImage: image }}
                                >
                                    <input ref={inputRef} onChange={handleSelectImage} type="file" />
                                    <p>
                                        Thêm một ảnh đại diện hấp dẫn sẽ giúp bài viết của bạn cuốn hút hơn với độc giả.
                                    </p>
                                    <span>Bấm vào đây để chọn ảnh</span>
                                </div>
                                <div className={cx('prev-title')}>Test title</div>
                                <div className={cx('prev-desc')}>Test description</div>

                                <p className={cx('text')}>
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
                                    defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
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
