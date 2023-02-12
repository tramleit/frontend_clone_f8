import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Heading from '~/components/Heading';
import LearningPathItem from './LearningPathItem';
import LayoutWrapper from '~/components/LayoutWrapper';
import SuggestionBox from '~/components/SuggestionBox';
import { getLearningRoute } from '~/services/apiCourse';
import { showNotification } from '~/redux/reducer/modunReducer';

import styles from './Learning.module.scss';

const cx = classNames.bind(styles);

function Learning() {
    const [learningPath, setLearningPath] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const type = searchParams.get('type');

    useEffect(() => {
        setSearchParams({ type: 'tab' });
        document.title = 'Lộ trình học lập trình cho người mới tại F8';
    }, [setSearchParams]);

    useEffect(() => {
        if (type) {
            const fetchApi = async () => {
                const result = await getLearningRoute(type);

                if (result.statusCode === 0) {
                    setLearningPath(result.data);
                } else {
                    dispatch(showNotification(result.message));
                }
            };
            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return (
        <LayoutWrapper>
            <Heading
                name="Lộ trình học"
                desc="Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí
                    “Lập trình viên Front-end” bạn nên tập trung vào lộ trình “Front-end”."
            />

            <div className={cx('body')}>
                <div className={cx('content')}>
                    {learningPath.map((route) => (
                        <LearningPathItem key={route._id} data={route} />
                    ))}
                </div>

                <SuggestionBox
                    title="Tham gia cộng đồng học viên F8 trên Facebook"
                    desc="Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau
                    trong quá trình học nhé."
                    path="https://www.facebook.com/groups/f8official"
                    nameBtn="Tham gia nhóm"
                />
            </div>
        </LayoutWrapper>
    );
}

export default Learning;
