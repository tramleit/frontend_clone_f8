import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Topic.module.scss';

const cx = classNames.bind(styles);

function Topic({ config, slug }) {
    return (
        <div className={cx('wrapper')}>
            <h4>Các chủ đề được đề xuất</h4>
            <ul>
                {config.topics.map(
                    (topic, index) =>
                        topic.slug !== slug && (
                            <li key={index}>
                                <Link to={`${config.routes.blog}${config.routes.topic}/${topic.slug}`}>
                                    {topic.label}
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </div>
    );
}

export default Topic;
