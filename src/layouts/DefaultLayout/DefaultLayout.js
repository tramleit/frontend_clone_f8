import config from '~/config';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Modal from '~/components/Modal';
import NewFeed from '~/components/NewFeed';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const modal = useSelector((state) => state.modun.modal.status);

    const pathname = useLocation().pathname;
    const settings = pathname.includes(config.routes.settings);
    const checkProfile = pathname.includes('/@');

    return (
        <>
            <Header />
            <div className={checkProfile ? cx('container', 'profile') : cx('container')}>
                {!settings && <Sidebar />}

                <div className={checkProfile ? cx('content', 'hidden') : cx('content')}>
                    {children}
                    {currentUser && !settings && <NewFeed />}
                </div>
            </div>
            {modal && <Modal />}
            <Footer />
        </>
    );
}

export default DefaultLayout;
