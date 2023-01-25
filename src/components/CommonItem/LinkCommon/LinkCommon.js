import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './LinkCommon.module.scss';

const cx = classNames.bind(styles);

function LinkCommon({ type, pathName, title, image, coming, dataVideo }) {
    let Component, buttonText, slug;

    switch (type) {
        case 'video':
            Component = 'a';
            buttonText = 'Xem video';
            slug = `https://youtu.be/${pathName?.urlVideo}`;
            break;

        case 'blog':
            Component = Link;
            buttonText = 'Xem bài viết';
            slug = `/blog/${pathName?.slug}`;
            break;

        case 'free':
            Component = Link;
            buttonText = 'Xem khóa học';
            slug = `/courses/${pathName?.slug}`;
            break;

        case 'pro':
            Component = Link;
            buttonText = 'Xem khóa học';
            slug = `/landing/${pathName?.slug}`;
            break;

        default:
            Component = Link;
            buttonText = 'Xem';
            slug = '';
    }

    return (
        <Component
            className={coming ? cx('link', 'disabled') : cx('link')}
            href={slug}
            to={slug}
            target={type === 'video' ? '_blank' : null}
            rel={type === 'video' ? 'noreferrer' : null}
            title={title}
        >
            <img className={cx('image')} src={image} alt={title} />
            <button className={cx('btn-view')}>{buttonText}</button>

            {type === 'pro' && (
                <div className={cx('crown')}>
                    <img
                        src="https://fullstack.edu.vn/static/media/crown_icon.3e4800f7485935ab6ea312a7080a85fe.svg"
                        alt="Crown"
                    />
                </div>
            )}

            {type === 'video' && (
                <div className={cx('video-wrap')}>
                    <div className={cx('play')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div className={cx('duration')}>
                        <span>{dataVideo?.timeVideo}</span>
                    </div>
                </div>
            )}
        </Component>
    );
}

export default LinkCommon;
