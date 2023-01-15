import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import styles from './MyPostItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const cx = classNames.bind(styles);

function MyPostItem({ type, title, path, time, author, readingTime }) {
    const [active, setActive] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')} title={title}>
                <Link to={`/blog/${path}`}>
                    <span>{title}</span>
                </Link>
            </h3>

            <div className={cx('author')}>
                <Link to={`/blog/${path}`}>
                    {type !== 'my-post' ? 'Đã lưu' : 'Xuất bản'} {time}
                </Link>
                <span className={cx('dot')}>·</span>
                <span>
                    {type !== 'my-post' ? 'Tác giả' : `${readingTime} phút đọc`}
                    <strong>{author}</strong>
                </span>
            </div>

            <Tippy
                visible={active}
                interactive
                onClickOutside={() => setActive(false)}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('more-tippy')} tabIndex="-1" {...attrs}>
                        <span>Xóa {type !== 'my-post' ? 'khỏi mục đã lưu' : 'bài viết'}</span>
                    </div>
                )}
            >
                <span className={cx('more')} onClick={() => setActive(!active)}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </span>
            </Tippy>
        </div>
    );
}

export default MyPostItem;
