import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "@/assets/CustomIcons/CustomIcon";

export const pages = [
    {
        name: 'Portfolio',
        link: '/portfolio',
        icon: 'bi bi-distribute-vertical',
        bg: '/portfolio-bg.png',
    },
    {
        name: 'Services',
        link: '/services',
        icon: 'bi bi-grid-fill',
        bg: '/services-bg.png',
    },
    {
        name: 'Team',
        link: '/team',
        icon: 'bi bi-people-fill',
        bg: '/team-bg.png',
    },
    {
        name: 'Contact',
        link: '/contact',
        icon: 'bi bi-envelope-fill',
        bg: '/contact-bg.png',
    },
];

export const contactLinks = [
    {
        link: 'https://www.linkedin.com/company/pixel-dynamics-studio/about/',
        icon: <LinkedinIcon className='w-5 h-5'/>,
    },
    {
        link: 'https://www.facebook.com/profile.php?id=61550213669968',
        icon: <FacebookIcon className='w-5 h-5'/>,
    },
    {
        link: 'https://www.instagram.com/pixeldynamics.studio/',
        icon: <InstagramIcon className='w-5 h-5'/>,
    },
    {
        link: 'https://twitter.com/Pixel_Dynamics',
        icon: <TwitterIcon className='w-5 h-5'/>,
    },
];


export const contactPageExtraLinks = [
    {
        link: 'https://www.linkedin.com/company/pixel-dynamics-studio/about/',
        icon: 'bi bi-linkedin',
    },
    {
        link: 'https://www.facebook.com/profile.php?id=61550213669968',
        icon: 'bi bi-facebook',
    },
    {
        link: 'https://www.instagram.com/pixeldynamics.studio/',
        icon: 'bi bi-instagram',
    },
    {
        link: 'https://twitter.com/Pixel_Dynamics',
        icon: 'bi bi-twitter-x',
    },
    {
        link: 'https://www.behance.net/PixelDynamicsStudio',
        icon: 'bi bi-behance',
    },

];

export const adminPagesLinks = [
    {
        name: 'Portfolio',
        link: '/admin/portfolio',
        icon: 'bi bi-distribute-vertical',

    },
    {
        name: 'Services',
        link: '/admin/services',
        icon: 'bi bi-grid-fill',

    },
    {
        name: 'Team',
        link: '/admin/team',
        icon: 'bi bi-people-fill',

    },
    {
        name: 'Blog',
        link: '/admin/blog',
        icon: 'bi bi-file-text-fill',

    },
    {
        name: 'Accounts',
        link: '/admin/accounts',
        icon: 'bi bi-person-gear',
    },
]