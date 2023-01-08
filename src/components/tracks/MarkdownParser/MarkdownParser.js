import classNames from 'classnames/bind';
import styles from './MarkdownParser.module.scss';

const cx = classNames.bind(styles);

function MarkdownParser({ data, fontSize }) {
    console.log('data: ', data);
    return (
        <div
            className={cx('wrapper')}
            style={{ fontSize: fontSize }}
            dangerouslySetInnerHTML={
                data.authorReply
                    ? { __html: `<span class="author-comment">${data.authorReply.name}</span> ${data.contentHTML}` }
                    : { __html: data.contentHTML }
            }
        ></div>
    );
}

export default MarkdownParser;
