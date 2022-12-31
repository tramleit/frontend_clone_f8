import classNames from 'classnames/bind';
import EditorNewPost from '~/components/EditorNewPost';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import styles from './NewPost.module.scss';

const cx = classNames.bind(styles);

function NewPost() {
    return (
        <div className={cx('wrapper')}>
            <Header noneSearch={true} />

            <div className={cx('container')}>
                <div className={cx('title')}>
                    <input type="text" placeholder="Tiêu đề" />
                </div>
                <div className={cx('text-editor')}>
                    <EditorNewPost />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default NewPost;
