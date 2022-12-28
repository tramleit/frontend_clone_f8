import classNames from 'classnames/bind';
import styles from './MarkdownParser.module.scss';

const cx = classNames.bind(styles);

function MarkdownParser({ fontSize }) {
    return (
        <div className={cx('wrapper')} style={{ fontSize: fontSize }}>
            <blockquote>
                <p>
                    <strong>
                        Nếu bạn chưa học HTML, CSS, vui lòng xem kỹ lộ trình học tại đây:{' '}
                        <a href="https://fullstack.edu.vn/learning-paths" target="_blank" rel="noreferrer">
                            https://fullstack.edu.vn/learning-paths
                        </a>
                    </strong>
                </p>
            </blockquote>
            <p>Tham gia các cộng đồng để cùng học hỏi, chia sẻ và “thám thính” xem F8 sắp có gì mới nhé!</p>
            <ul>
                <li>
                    Fanpage:
                    <a href="https://www.facebook.com/f8vnofficial" target="_blank" rel="noreferrer">
                        https://www.facebook.com/f8vnofficial
                    </a>
                </li>
                <li>
                    Group:
                    <a href="https://www.facebook.com/groups/649972919142215" target="_blank" rel="noreferrer">
                        https://www.facebook.com/groups/649972919142215
                    </a>
                </li>
                <li>
                    Youtube:
                    <a
                        href="/external-url?continue=https%3A%2F%2Fwww.youtube.com%2FF8VNOfficial"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://www.youtube.com/F8VNOfficial
                    </a>
                </li>
                <li>
                    Sơn Đặng:
                    <a
                        href="/external-url?continue=https%3A%2F%2Fwww.facebook.com%2Fsondnf8"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://www.facebook.com/sondnf8
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default MarkdownParser;
