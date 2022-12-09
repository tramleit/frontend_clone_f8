import classNames from 'classnames/bind';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img src={data.image} alt={data.fullName} />
            <span>{data.fullName}</span>
        </div>
    );
}

export default SearchItem;
