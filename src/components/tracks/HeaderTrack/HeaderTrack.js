import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { faChevronLeft, faCircleQuestion, faFile } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import { Image } from '~/assets/image';
import styles from './HeaderTrack.module.scss';

const cx = classNames.bind(styles);

function HeaderTrack({ title }) {
    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back-btn')} title="Rời khỏi đây" onClick={() => navigate('/')}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <RouterLink className={cx('logo')} to={config.routes.home}>
                <img src={Image.iconLogo} alt="Logo" />
            </RouterLink>
            <div className={cx('title')}>{title}</div>

            <div className={cx('actions')}>
                <div className={cx('progress-wrap')}>
                    <div className={cx('progress')}>
                        <div className={cx('achieve')}>100%</div>
                    </div>
                    <div className={cx('completed')}>
                        <strong>
                            <span>178</span>/<span>206 </span>
                        </strong>
                        <span>bài học</span>
                    </div>
                    <div className={cx('cert')}>Xem chứng chỉ</div>
                </div>

                <button className={cx('action-btn')}>
                    <FontAwesomeIcon icon={faFile} />
                    <span>Ghi chú</span>
                </button>

                <button className={cx('action-btn', 'mobile')}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    <span>Hướng dẫn</span>
                </button>
            </div>
        </div>
    );
}

export default HeaderTrack;
