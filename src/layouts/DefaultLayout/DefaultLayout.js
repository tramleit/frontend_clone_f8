import classNames from 'classnames/bind';
import Footer from '~/layouts/components/Footer';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className="content">{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
