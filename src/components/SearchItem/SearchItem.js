import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '~/assets/image';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ data, handleHideResult }) {
    let Component, noreferrer;

    if (data.urlVideo) {
        Component = 'a';
        noreferrer = true;
    } else {
        Component = Link;
        noreferrer = false;
    }

    return (
        <Fragment>
            <Component
                className={cx('wrapper')}
                target={noreferrer ? '_blank' : undefined}
                rel={noreferrer ? 'noreferrer' : undefined}
                href={`https://youtu.be/${data.urlVideo}`}
                to={data.imagePreview ? `/blog/${data.slug}` : `/courses/${data.slug}`}
                onClick={handleHideResult}
            >
                <img src={data.image || data.imagePreview || Image.avatar} alt={data.title} />
                <span>{data.title}</span>
            </Component>
        </Fragment>
    );
}

export default SearchItem;
