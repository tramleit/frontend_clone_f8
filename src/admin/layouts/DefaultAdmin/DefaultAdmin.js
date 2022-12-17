import React from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import classNames from 'classnames/bind';
import styles from './DefaultAdmin.module.scss';
import FooterAdmin from '../components/FooterAdmin';

const cx = classNames.bind(styles);

function DefaultAdmin({ children }) {
    return (
        <>
            <HeaderAdmin />
            <div className={cx('container')}>
                {/* <Sidebar /> */}
                <div className={cx('content')}>
                    {children}
                    {/* <NewFeed /> */}
                </div>
            </div>
            <FooterAdmin />
        </>
    );
}

export default DefaultAdmin;
