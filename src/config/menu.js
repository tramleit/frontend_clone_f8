import {
    faBookOpen,
    faUser,
    faHouse,
    faRoad,
    faLightbulb,
    faNewspaper,
    faBookmark,
    faInfoCircle,
    faUsers,
    faLaptopCode,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import routes from './routes';

const menu = [
    [
        {
            title: 'Trang cá nhân',
            path: 'profile',
        },
    ],
    [
        {
            title: 'Viết blog',
            path: routes.newPost,
        },
        {
            title: 'Bài viết của tôi',
            path: routes.drafts,
        },
    ],
    [
        {
            title: 'Bài viết đã lưu',
            path: routes.bookmark,
        },
    ],
    [
        {
            title: 'Cài đặt',
            path: routes.settings,
        },
        {
            title: 'Đăng xuất',
            path: null,
        },
    ],
];

export const menuMobile = [
    [
        {
            icon: faUser,
            title: 'Trang cá nhân',
            path: 'profile',
        },
        {
            icon: faBookOpen,
            title: 'Khóa học của tôi',
            path: routes.myCourses,
        },
    ],
    [
        {
            icon: faHouse,
            title: 'Tranh chủ',
            path: routes.home,
        },
        {
            icon: faRoad,
            title: 'Lộ trình',
            path: routes.learning,
        },
        {
            icon: faLightbulb,
            title: 'Khóa học',
            path: routes.courses,
        },
        {
            icon: faNewspaper,
            title: 'Blog',
            path: routes.blog,
        },
    ],
    [
        {
            icon: faBookmark,
            title: 'Bài viết đã lưu',
            path: routes.bookmark,
        },
    ],
    [
        {
            icon: faInfoCircle,
            title: 'Giới thiệu',
            path: 'about-us',
        },
        {
            icon: faUsers,
            title: 'Cơ hội việc làm',
            path: 'careers',
        },
        {
            icon: faLaptopCode,
            title: 'Cài đặt',
            sub: [
                {
                    title: 'Cài đặt tài khoản',
                    path: '/settings',
                },
                {
                    title: 'Quản lý tiếp thị liên kết',
                    sub: [],
                },
            ],
        },
    ],
    [
        {
            icon: faRightFromBracket,
            title: 'Đăng xuất',
            path: null,
        },
    ],
];

export const noUserMenu = [
    [
        {
            icon: faHouse,
            title: 'Tranh chủ',
            path: routes.home,
        },
        {
            icon: faRoad,
            title: 'Lộ trình',
            path: routes.learning,
        },
        {
            icon: faLightbulb,
            title: 'Khóa học',
            path: routes.courses,
        },
        {
            icon: faNewspaper,
            title: 'Blog',
            path: routes.blog,
        },
    ],
    [
        {
            icon: faInfoCircle,
            title: 'Giới thiệu',
            path: 'about-us',
        },
        {
            icon: faUsers,
            title: 'Cơ hội việc làm',
            path: 'careers',
        },
        {
            icon: faLaptopCode,
            title: 'Cài đặt',
            sub: [
                {
                    title: 'Cài đặt tài khoản',
                    path: '/settings',
                },
                {
                    title: 'Quản lý tiếp thị liên kết',
                    sub: [],
                },
            ],
        },
    ],
];

export const listAction = [
    {
        title: 'Thích',
        icon: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1673283027/Course/like_iwpexh.svg',
    },
    {
        title: 'Yêu Thích',
        icon: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1673284171/Course/love_may2gp.svg',
    },
    {
        title: 'Thương Thương',
        icon: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1673284437/Course/dear_yzi2fd.svg',
    },
    {
        title: 'Haha',
        icon: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1673283101/Course/haha_s7c8pj.svg',
    },
    {
        title: 'Wow',
        icon: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1673284529/Course/wow_qxxlin.svg',
    },
    {
        title: 'Buồn',
        icon: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1673284400/Course/said_wqhjf6.svg',
    },
    {
        title: 'Phẫn Nộ',
        icon: 'https://res.cloudinary.com/dwld3bqia/image/upload/v1673284171/Course/angry_f9301i.svg',
    },
];

export default menu;
