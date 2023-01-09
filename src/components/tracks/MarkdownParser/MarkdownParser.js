import classNames from 'classnames/bind';
import styles from './MarkdownParser.module.scss';

const cx = classNames.bind(styles);

function MarkdownParser({ author = null, data, fontSize }) {
    return (
        <div
            className={cx('wrapper')}
            style={{ fontSize: fontSize }}
            dangerouslySetInnerHTML={
                author ? { __html: `<span class="author-comment">${author.name}</span> ${data}` } : { __html: data }
            }
        ></div>
    );
}

export default MarkdownParser;
