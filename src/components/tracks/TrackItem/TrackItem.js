import classNames from 'classnames/bind';
import { faChevronDown, faChevronUp, faCircleCheck, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './TrackItem.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function TrackItem() {
    const [activeIcon, setActiveIcon] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('track-wrap')} onClick={() => setActiveIcon(!activeIcon)}>
                <h3 className={cx('title')}>1. Giới thiệu</h3>
                <span className={cx('desc')}>3/3 | 07:28</span>
                <span className={cx('icon')}>
                    {activeIcon ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
                </span>
            </div>

            {!activeIcon && (
                <div className={cx('track-list')}>
                    <div className={cx('step-item')}>
                        <div className={cx('info')}>
                            <h3 className={cx('step-title')}>1. Lời khuyên trước khóa học</h3>
                            <p className={cx('step-desc')}>
                                <FontAwesomeIcon icon={faCompactDisc} />
                                <span>04:20</span>
                            </p>
                        </div>
                        <div className={cx('step-icon')}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    </div>
                    <div className={cx('step-item')}>
                        <div className={cx('info')}>
                            <h3 className={cx('step-title')}>1. Lời khuyên trước khóa học</h3>

                            <p className={cx('step-desc')}>
                                <FontAwesomeIcon icon={faCompactDisc} />
                                <span>04:20</span>
                            </p>
                        </div>
                        <div className={cx('step-icon')}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrackItem;
