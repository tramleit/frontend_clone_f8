import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';

import styles from './CreateButton.module.scss';

const cx = classNames.bind(styles);

function CreateButton() {
    const [click, setClick] = useState(false);

    return (
        <Tippy
            interactive
            visible={click}
            onClickOutside={() => setClick(false)}
            render={(attrs) => (
                <div className={cx('new-post')} tabIndex="-1" {...attrs}>
                    <Link to={config.routes.newPost}>
                        <FontAwesomeIcon icon={faPen} />
                        <span>Viết blog</span>
                    </Link>
                </div>
            )}
        >
            <div className={click ? cx('create-blog', 'active') : cx('create-blog')} onClick={() => setClick(!click)}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </Tippy>
    );
}

export default CreateButton;
