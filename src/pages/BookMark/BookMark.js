import classNames from 'classnames/bind';
import Heading from '~/components/Heading';
import HeadingTabs from '~/components/HeadingTabs';
import MyPostItem from '~/components/MyPostItem';
import styles from './BookMark.module.scss';
const cx = classNames.bind(styles);

function BookMark() {
    return (
        <div className={cx('wrapper')}>
            <Heading name="Bài viết đã lưu" />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <HeadingTabs titles={[{ title: `Bài viết (${1})`, pathname: '/me/bookmark/posts' }]} />

                    <MyPostItem
                        title="Bỏ túi 21 lệnh Git cơ bản + Cách nhớ, giúp newDev làm chủ Git quản lý tốt mã nguồn!"
                        path="bo-tui-21-lenh-git-co-ban-cach-nho-giup-newdev-lam-chu-git-quan-ly-tot-ma-ngu"
                        time="2 giờ trước"
                        author="Nguyễn Thanh Hòa"
                    />
                </div>
            </div>
        </div>
    );
}

export default BookMark;
