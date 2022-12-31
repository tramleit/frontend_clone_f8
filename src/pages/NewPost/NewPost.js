import classNames from 'classnames/bind';
import styles from './NewPost.module.scss';

const cx = classNames.bind(styles);

function NewPost() {
    return <div className={cx('wrapper')}>NewPost</div>;
}

export default NewPost;
