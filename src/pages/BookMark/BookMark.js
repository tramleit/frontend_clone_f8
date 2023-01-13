import classNames from 'classnames/bind';
import Heading from '~/components/Heading';
import HeadingTabs from '~/components/HeadingTabs';
import styles from './BookMark.module.scss';
import PostSave from './PostSave';

const cx = classNames.bind(styles);

function BookMark() {
    return (
        <div className={cx('wrapper')}>
            <Heading name="Bài viết đã lưu" />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <HeadingTabs titles={[{ title: `Bài viết (${1})`, pathname: '/me/bookmark/posts' }]} />

                    <PostSave />
                    <PostSave />
                    <PostSave />
                    <PostSave />
                    <PostSave />
                </div>
            </div>
        </div>
    );
}

export default BookMark;
