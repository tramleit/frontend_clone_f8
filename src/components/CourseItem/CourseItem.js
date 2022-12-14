import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CourseItem.module.scss';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function CourseItem({ coming = false, name, imageComing, image }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-course')}>
                <Link className={coming ? cx('link', 'disabled') : cx('link')} to="/landing/htmlcss">
                    <img className={cx('image')} src={coming ? imageComing : image} alt="" />
                    <button className={cx('btn-view')}>Xem khóa học</button>
                    <div className={cx('crown')}>
                        <img
                            src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                            alt="Crown"
                        />
                    </div>
                </Link>
                <h4 className={cx('name-course')}>
                    <Link to="/landing/htmlcss" className={coming ? cx('disabled-name') : ''}>
                        {name}
                    </Link>
                </h4>
                {coming ? (
                    <Fragment />
                ) : (
                    <div className={cx('price')}>
                        <span className={cx('old-price')}>2.499.000đ</span>
                        <span className={cx('new-price')}>1.299.000đ</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseItem;
