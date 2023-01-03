import classNames from 'classnames/bind';
import Heading from '~/components/Heading';
import LearningPath from './LearningPath';

import styles from './FrontEnd.module.scss';

const cx = classNames.bind(styles);

function FrontEnd() {
    return (
        <div className={cx('wrapper')}>
            <Heading
                name="Lộ trình học Front-end"
                desc="Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là Front-end và Back-end. Front-end là phần giao diện người dùng nhìn thấy và có thể tương tác, đó chính là các ứng dụng mobile hay những website bạn đã từng sử dụng. Vì vậy, nhiệm vụ của lập trình viên Front-end là xây dựng các giao diện đẹp, dễ sử dụng và tối ưu trải nghiệm người dùng."
            />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <LearningPath />
                    <LearningPath />
                </div>
            </div>
        </div>
    );
}

export default FrontEnd;
