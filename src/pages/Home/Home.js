import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Banner from '~/components/Banner';
import { Image } from '~/assets/image';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    useEffect(() => {
        document.title = 'Học lâp trình để đi làm';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banner />
            </div>
        </div>
    );
}

export default Home;
