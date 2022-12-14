import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/redux/modunSlice';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal() {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <h2 className={cx('heading')}>Bảng Tin F8</h2>

                    <div className={cx('list')}>
                        <div className={cx('item')}>
                            <h4 className={cx('title')}>Nhận diện tài khoản được xác thực bởi F8</h4>
                            <p className={cx('time')}>10 ngày trước</p>

                            <div className={cx('body')}>
                                <p>
                                    <span>Các tài khoản được </span>
                                    <em>Tích xanh</em>
                                    <span>
                                        {' '}
                                        là các tài khoản uy tín, được xác thực bởi F8. Đây là các tài khoản thuộc đội
                                        ngũ hỗ trợ của F8 hoặc là các thành viên có sức ảnh hưởng, có sự cống hiến cho
                                        sự phát triển chung của cộng đồng.
                                    </span>
                                </p>
                                <p>
                                    <em>Cách nhận biết:</em>
                                </p>
                                <p>
                                    <img
                                        src="https://files.fullstack.edu.vn/f8-prod/public-images/638ca557c37cb.png"
                                        alt="Tick"
                                    />
                                    <em>Tích xanh hiển thị cùng với tên tài khoản đã được xác thực.</em>
                                </p>
                                <blockquote>
                                    <p>
                                        Ví dụ tài khoản có tích xanh tại đây:{' '}
                                        <a
                                            href="https://fullstack.edu.vn/blog/ban-da-cai-nhung-extensions-huu-ich-nay-chua.html"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            https://fullstack.edu.vn/blog/ban-da-cai-nhung-extensions-huu-ich-nay-chua.html
                                        </a>
                                    </p>
                                </blockquote>
                                <p className={cx('author')}>
                                    <span>Đăng bởi: </span>
                                    <a href="/@son-dang">
                                        Sơn Đặng
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className={cx('item')}>
                            <h4 className={cx('title')}>F8 ra mắt chức năng NewFeeds &#128518;</h4>
                            <p className={cx('time')}>10 ngày trước</p>

                            <div className={cx('body')}>
                                <p>Các bạn ơiiiii,</p>
                                <p>
                                    <span>Từ nay các </span>
                                    <em>Admin</em>
                                    <span>
                                        {' '}
                                        của F8 sẽ cập nhật các tin tức mới và Hot nhất tại bảng tin này, giúp các bạn
                                        luôn biết F8 có gì mới nhé!
                                    </span>
                                </p>
                                <p>Chúc cả nhà ngày cuối tuần vui vẻ nhaa &#128536;</p>
                                <hr />
                                <p>
                                    <em>
                                        Ngoài ra, bạn có thể tham gia các cộng đồng để cùng học hỏi, chia sẻ và “thám
                                        thính” xem F8 sắp có gì mới nhé!
                                    </em>
                                </p>
                                <ul>
                                    <li>
                                        <p>
                                            Fanpage:{' '}
                                            <a href="https://www.facebook.com/f8vnofficial">
                                                https://www.facebook.com/f8vnofficial
                                            </a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Group:{' '}
                                            <a href="https://www.facebook.com/groups/649972919142215">
                                                https://www.facebook.com/groups/649972919142215
                                            </a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Youtube:{' '}
                                            <a href="https://www.youtube.com/F8VNOfficial">
                                                https://www.youtube.com/F8VNOfficial
                                            </a>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            Sơn Đặng:{' '}
                                            <a href="https://www.facebook.com/sondnf8">
                                                https://www.facebook.com/sondnf8
                                            </a>
                                        </p>
                                    </li>
                                </ul>
                                <p className={cx('author')}>
                                    <span>Đăng bởi</span>
                                    <a href="/@son-dang">
                                        Sơn Đặng
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('close')} onClick={handleCloseModal}>
                    ×
                </div>
            </div>
            <div className={cx('overlay')} onClick={handleCloseModal}></div>
        </>
    );
}

export default Modal;
