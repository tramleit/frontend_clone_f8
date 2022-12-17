import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Learning.module.scss';
import Heading from '~/components/Heading';
import LearningPathItem from '~/components/LearningPathItem';
import { Image } from '~/assets/image';

const cx = classNames.bind(styles);

function Learning() {
    useEffect(() => {
        document.title = 'Lộ trình học lập trình cho người mới tại F8';
    });
    return (
        <div className={cx('wrapper')}>
            <Heading
                name="Lộ trình học"
                desc="Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí
                    “Lập trình viên Front-end” bạn nên tập trung vào lộ trình “Front-end”."
            />

            <div className={cx('body')}>
                <div className={cx('content')}>
                    <LearningPathItem
                        title="Lộ trình học Front-end"
                        desc="Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé."
                        image={Image.frontend}
                        path="/learning/front-end-development"
                    />
                    <LearningPathItem
                        title="Lộ trình học Back-end"
                        desc="Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé."
                        image={Image.backend}
                        path="/learning/back-end-development"
                    />
                </div>

                <div className={cx('community')}>
                    <div className={cx('info')}>
                        <h2>Tham gia cộng đồng học viên F8 trên Facebook</h2>
                        <p>
                            Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ
                            trợ nhau trong quá trình học nhé.
                        </p>
                        <a href="https://www.facebook.com/groups/f8official" target="_blank" rel="noreferrer">
                            Tham gia nhóm
                        </a>
                    </div>
                    <div className={cx('image')}>
                        <img src={Image.imageLearning} alt="Học lập trình web (F8 - Fullstack.edu.vn)" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Learning;
