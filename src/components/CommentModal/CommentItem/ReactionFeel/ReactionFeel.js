import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './ReactionFeel.module.scss';

const cx = classNames.bind(styles);

function ReactionFeel() {
    return (
        <Tippy
            trigger="mouseenter focus"
            interactive
            placement="top-start"
            offset={[-40, 8]}
            delay={[300, 400]}
            appendTo={document.body}
            render={(attrs) => (
                <div className={cx('reaction')} tabIndex="-1" {...attrs}>
                    <div className={cx('container')}>
                        <div className={cx('icon')}>
                            <div className={cx('title')}>Thích</div>
                            <img
                                src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673283027/Course/like_iwpexh.svg"
                                alt="Thích"
                            />
                        </div>
                        <div className={cx('icon')}>
                            <div className={cx('title')}>Yêu Thích</div>
                            <img
                                src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673284171/Course/love_may2gp.svg"
                                alt="Yêu Thích"
                            />
                        </div>
                        <div className={cx('icon')}>
                            <div className={cx('title')}>Thương Thương</div>
                            <img
                                src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673284437/Course/dear_yzi2fd.svg"
                                alt="Thương Thương"
                            />
                        </div>
                        <div className={cx('icon')}>
                            <div className={cx('title')}>Haha</div>
                            <img
                                src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673283101/Course/haha_s7c8pj.svg"
                                alt="Haha"
                            />
                        </div>
                        <div className={cx('icon')}>
                            <div className={cx('title')}>Wow</div>
                            <img
                                src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673284529/Course/wow_qxxlin.svg"
                                alt="Wow"
                            />
                        </div>
                        <div className={cx('icon')}>
                            <div className={cx('title')}>Buồn</div>
                            <img
                                src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673284400/Course/said_wqhjf6.svg"
                                alt="Buồn"
                            />
                        </div>
                        <div className={cx('icon')}>
                            <div className={cx('title')}>Phẫn Nộ</div>
                            <img
                                src="https://res.cloudinary.com/dwld3bqia/image/upload/v1673284171/Course/angry_f9301i.svg"
                                alt="Phẫn Nộ"
                            />
                        </div>
                    </div>
                </div>
            )}
        >
            <span>Thích</span>
        </Tippy>
    );
}

export default ReactionFeel;
