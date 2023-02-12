import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import EditorNewPost from '~/components/EditorNewPost';

import styles from './NewPost.module.scss';

const cx = classNames.bind(styles);

function NewPost() {
    const [text, setText] = useState('');
    const [html, setHtml] = useState('');
    const [title, setTitle] = useState('');
    const [activePublic, setActivePublic] = useState(false);

    useEffect(() => {
        if (title) {
            document.title = title;
        } else {
            document.title = 'Viết blog | F8';
        }
    }, [title]);

    const words = text.split(' ');
    const wordCount = (words.length / 60).toFixed();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const author = currentUser?._id;

    useEffect(() => {
        if (text !== '' && title !== '') {
            setActivePublic(true);
        } else {
            setActivePublic(false);
        }
    }, [text, title]);

    return (
        <div className={cx('wrapper')}>
            <Header post={true} activePublic={activePublic} dataNewPost={{ title, text, html, wordCount, author }} />

            <div className={cx('container')}>
                <div className={cx('title')}>
                    <input type="text" placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={cx('text-editor')}>
                    <EditorNewPost setText={setText} setHtml={setHtml} />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default NewPost;
