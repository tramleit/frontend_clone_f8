import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import config from '~/config';
import styles from './ReactionFeel.module.scss';

const cx = classNames.bind(styles);

function ReactionFeel() {
    return (
        <Tippy
            trigger="mouseenter focus"
            interactive
            placement="top-start"
            offset={[-40, 8]}
            delay={[300, 400]}
            appendTo={document.body}
            render={(attrs) => (
                <div className={cx('reaction')} tabIndex="-1" {...attrs}>
                    <div className={cx('container')}>
                        {config.listAction.map((action, index) => (
                            <div className={cx('icon')} key={index}>
                                <div className={cx('title')}>{action.title}</div>
                                <img src={action.icon} alt={action.title} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        >
            <span>Thích</span>
        </Tippy>
    );
}

export default ReactionFeel;
