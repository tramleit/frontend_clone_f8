import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import styles from './PostSave.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PostSave() {
    const [active, setActive] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <h3
                className={cx('title')}
                title={`Bỏ túi 21 lệnh Git cơ bản + Cách nhớ, giúp newDev làm chủ Git quản lý tốt mã nguồn!`}
            >
                <Link>
                    <span>Bỏ túi 21 lệnh Git cơ bản + Cách nhớ, giúp newDev làm chủ Git quản lý tốt mã nguồn!</span>
                </Link>
            </h3>
            <div className={cx('author')}>
                <Link>Đã lưu vài giây trước</Link>
                <span className={cx('dot')}>·</span>
                <span>
                    Tác giả <strong>Nguyễn Thanh Hòa</strong>
                </span>
            </div>

            <Tippy
                visible={active}
                interactive
                onClickOutside={() => setActive(false)}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('more-tippy')} tabIndex="-1" {...attrs}>
                        <span>Xóa khỏi mục đã lưu</span>
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

export default PostSave;
