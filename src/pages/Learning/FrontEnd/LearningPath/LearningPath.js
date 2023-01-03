import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './LearningPath.module.scss';

const cx = classNames.bind(styles);

function LearningPath() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>1. Tìm hiểu về ngành IT</h2>
            <div className={cx('desc')}>
                Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã có sẵn tố chất phù hợp với ngành
                chưa? Cùng thăm quan các công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành này nhé các
                bạn.
            </div>

            <div className={cx('body')}>
                <div className={cx('item')}>
                    <div className={cx('wrap')}>
                        <div className={cx('thumb')}>
                            <Link>
                                <img src="https://files.fullstack.edu.vn/f8-prod/courses/7.png" alt="" />
                            </Link>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('title-course')}>
                                <Link>
                                    <span>Kiến Thức Nhập Môn IT</span>
                                    <span className={cx('free')}>Miễn phí</span>
                                </Link>
                            </div>
                            <p className={cx('desc-course')}>
                                Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa
                                này trước nhé.
                            </p>
                            <Link className={cx('btn-course')}>Tiếp tục học</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningPath;
