import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { IconCourse } from '~/assets/image';
import CircularProgressBar from '../CircularProgressBar';
import styles from './LearningPathItem.module.scss';

const cx = classNames.bind(styles);

function LearningPathItem({ title, desc, image, path }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <h3 className={cx('title')}>
                        <Link>{title}</Link>
                    </h3>
                    <p className={cx('desc')}>{desc}</p>
                </div>
                <div className={cx('thumb')}>
                    <Link>
                        <img src={image} alt={title} />
                    </Link>
                </div>
            </div>

            <div className={cx('list-course')}>
                {title === 'Lộ trình học Front-end' ? (
                    <>
                        <CircularProgressBar content="Kiến Thức Nhập Môn IT" image={IconCourse.iconKTNM} />
                        <CircularProgressBar content="HTML CSS từ Zero đến Hero" image={IconCourse.iconHTML} />
                        <CircularProgressBar content="Responsive Với Grid System" image={IconCourse.iconResponsive} />
                        <CircularProgressBar content="Lập Trình JavaScript Cơ Bản" image={IconCourse.iconJs} />
                        <CircularProgressBar content="Lập Trình JavaScript Nâng Cao" image={IconCourse.iconJs} />
                        <CircularProgressBar content="Làm việc với Terminal & Ubuntu" image={IconCourse.iconUbuntu} />
                        <CircularProgressBar content="Xây Dựng Website với ReactJS" image={IconCourse.iconReact} />
                    </>
                ) : (
                    <>
                        <CircularProgressBar content="Kiến Thức Nhập Môn IT" image={IconCourse.iconKTNM} />
                        <CircularProgressBar content="Lập Trình JavaScript Cơ Bản" image={IconCourse.iconJs} />
                        <CircularProgressBar content="Lập Trình JavaScript Nâng Cao" image={IconCourse.iconJs} />
                        <CircularProgressBar content="Làm việc với Terminal & Ubuntu" image={IconCourse.iconUbuntu} />
                        <CircularProgressBar content="Node & ExpressJS" image={IconCourse.iconNode} />
                    </>
                )}
            </div>

            <div className={cx('btn-detail')}>
                <Link to={path}>Xem chi tiết</Link>
            </div>
        </div>
    );
}

export default LearningPathItem;
