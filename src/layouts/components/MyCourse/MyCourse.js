import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './MyCourse.module.scss';

const cx = classNames.bind(styles);

function MyCourse() {
    const [active, setActive] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                visible={active}
                render={(attrs) => (
                    <div className={cx('course-result')} tabIndex="-1" {...attrs}>
                        <div className={cx('header')}>
                            <h4 className={cx('title')}>Khóa học của tôi</h4>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('item')}>
                                <Link>
                                    <img
                                        className={cx('img')}
                                        src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png"
                                        alt=""
                                    />
                                </Link>
                                <div className={cx('info')}>
                                    <h5 className={cx('info-title')}>
                                        <Link>Làm việc với Terminal & Ubuntu</Link>
                                    </h5>
                                    <p className={cx('complete')}>Học cách đây 7 ngày trước</p>
                                    <Tippy content="20%" placement="bottom">
                                        <div className={cx('vertical')}></div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('item')}>
                                <Link>
                                    <img
                                        className={cx('img')}
                                        src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png"
                                        alt=""
                                    />
                                </Link>
                                <div className={cx('info')}>
                                    <h5 className={cx('info-title')}>
                                        <Link>Làm việc với Terminal & Ubuntu</Link>
                                    </h5>
                                    <p className={cx('complete')}>Học cách đây 7 ngày trước</p>
                                    <Tippy content="20%" placement="bottom">
                                        <div className={cx('vertical')}></div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('item')}>
                                <Link>
                                    <img
                                        className={cx('img')}
                                        src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png"
                                        alt=""
                                    />
                                </Link>
                                <div className={cx('info')}>
                                    <h5 className={cx('info-title')}>
                                        <Link>Làm việc với Terminal & Ubuntu</Link>
                                    </h5>
                                    <p className={cx('complete')}>Học cách đây 7 ngày trước</p>
                                    <Tippy content="20%" placement="bottom">
                                        <div className={cx('vertical')}></div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('item')}>
                                <Link>
                                    <img
                                        className={cx('img')}
                                        src="https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png"
                                        alt=""
                                    />
                                </Link>
                                <div className={cx('info')}>
                                    <h5 className={cx('info-title')}>
                                        <Link>Làm việc với Terminal & Ubuntu</Link>
                                    </h5>
                                    <p className={cx('complete')}>Học cách đây 7 ngày trước</p>
                                    <Tippy content="20%" placement="bottom">
                                        <div className={cx('vertical')}></div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            >
                <button className={cx('btn')} onClick={() => setActive(!active)}>
                    Khóa học của tôi
                </button>
            </Tippy>
        </div>
    );
}

export default MyCourse;
