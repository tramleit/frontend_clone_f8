import classNames from 'classnames/bind';

import styles from './ParserComment.module.scss';

const cx = classNames.bind(styles);

function ParserComment({ author = null, data, fontSize }) {
    return (
        <div className={cx('wrapper')} style={{ fontSize: fontSize }}>
            <p>
                {author && <span className={cx('author-comment')}>{author?.name}</span>}
                {data}
            </p>
        </div>
    );
}
export default ParserComment;
