import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';

import { useDispatch } from 'react-redux';
import { IconBullHorn } from '~/assets/Icon';
import { openModal } from '~/redux/reducer/modunReducer';

import styles from './NewFeed.module.scss';

const cx = classNames.bind(styles);

function NewFeed() {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
    };

    return (
        <div className={cx('wrapper')}>
            <Tippy content="Bảng tin F8">
                <button className={cx('btn')} onClick={handleOpenModal}>
                    <span className={cx('icon')}>
                        <IconBullHorn />
                    </span>
                </button>
            </Tippy>
        </div>
    );
}

export default NewFeed;
