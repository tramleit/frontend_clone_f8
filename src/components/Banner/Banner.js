import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Slideshow from './Slideshow';

const cx = classNames.bind(styles);

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={cx(className, 'arrow')} style={{ ...style }} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );
}

function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 6000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settings}>
                <div>
                    <Slideshow
                        color="#6828fa"
                        background="linear-gradient(to right, rgb(104, 40, 250), rgb(255, 186, 164))"
                        title="Khóa học HTML CSS Pro"
                        desc="Đây là khóa học đầy đủ và chi tiết nhất bạn có thể tìm thấy được ở trên Internet!"
                        link="https://fullstack.edu.vn/landing/htmlcss"
                        textBtn="Tìm hiểu thêm"
                        img="https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png"
                    />
                </div>
                <div>
                    <Slideshow
                        color="#2877FA"
                        background="linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))"
                        title="Học ReactJS Miễn Phí!"
                        desc="Khóa học ReactJS từ cơ bản tới nâng cao. Kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS."
                        link="/courses/reactjs"
                        textBtn="Đăng ký ngay"
                        img="https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png"
                    />
                </div>
                <div>
                    <Slideshow
                        color="#7612ff"
                        background="linear-gradient(to right, rgb(118, 18, 255), rgb(5, 178, 255))"
                        title="Thành Quả của Học Viên"
                        desc="Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ."
                        link="/blog/"
                        textBtn="Xem thành quả"
                        img="https://files.fullstack.edu.vn/f8-prod/banners/Banner_01_2.png"
                    />
                </div>
                <div>
                    <Slideshow
                        color="#fe215e"
                        background="linear-gradient(to right, rgb(254, 33, 94), rgb(255, 148, 2))"
                        title="F8 trên Youtube"
                        desc="F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó."
                        link="https://www.youtube.com/channel/UCNSCWwgW-rwmoE3Yc4WmJhw"
                        textBtn="Truy cập kênh"
                        img="https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png"
                    />
                </div>
                <div>
                    <Slideshow
                        color="#007efe"
                        background="linear-gradient(to right, rgb(0, 126, 254), rgb(6, 195, 254))"
                        title="F8 trên Facebook"
                        desc="F8 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F8 sẽ ở đó."
                        link="https://www.facebook.com/f8vnofficial"
                        textBtn="Truy cập Facebook"
                        img="https://files.fullstack.edu.vn/f8-prod/banners/Banner_04_2.png"
                    />
                </div>
            </Slider>
        </div>
    );
}

export default Banner;
