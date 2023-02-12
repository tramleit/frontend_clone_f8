import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './BackButton.module.scss';

const cx = classNames.bind(styles);

function BackButton() {
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')} onClick={() => navigate(-1)}>
            <div className={cx('heading')}>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>QUAY LẠI</span>
            </div>
        </div>
    );
}

export default BackButton;
