import { ArtStationIcon, BehanceIcon, FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "@/assets/CustomIcons/CustomIcon";

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
        icon: <LinkedinIcon className='w-5 h-5 fill-[#d9d9d9]'/>,
    },
    {
        link: 'https://www.facebook.com/profile.php?id=61550213669968',
        icon: <FacebookIcon className='w-5 h-5 fill-[#d9d9d9]'/>,
    },
    {
        link: 'https://www.instagram.com/pixeldynamics.studio/',
        icon: <InstagramIcon className='w-5 h-5 fill-[#d9d9d9]'/>,
    },
    {
        link: 'https://twitter.com/Pixel_Dynamics',
        icon: <TwitterIcon className='w-5 h-5 fill-[#d9d9d9]'/>,
    },
];


export const contactPageExtraLinks = [
    {
        link: 'https://www.linkedin.com/company/pixel-dynamics-studio/about/',
        icon: <LinkedinIcon className='w-5 h-5 fill-[#333]'/>,
    },
    {
        link: 'https://www.facebook.com/profile.php?id=61550213669968',
        icon: <FacebookIcon className='w-5 h-5 fill-[#333]'/>,
    },
    {
        link: 'https://www.instagram.com/pixeldynamics.studio/',
        icon: <InstagramIcon className='w-5 h-5 fill-[#333]'/>,
    },
    {
        link: 'https://twitter.com/Pixel_Dynamics',
        icon: <TwitterIcon className='w-5 h-5 fill-[#333]'/>,
    },
    {
        link: 'https://www.behance.net/PixelDynamicsStudio',
        icon: <BehanceIcon className='w-5 h-5 fill-[#333]'/>
    },
    {
        link: 'https://www.artstation.com/pixeldynamics_studio',
        icon: <ArtStationIcon className='w-5 h-5 fill-[#333]'/>
    
    }

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
        icon: 'bi bi-grid',

    },
    {
        name: 'Team',
        link: '/admin/team',
        icon: 'bi bi-people',

    },
    {
        name: 'Blog',
        link: '/admin/blog',
        icon: 'bi bi-file-text',

    },
    {
        name: 'Terms & Policy',
        link: '/admin/terms',
        icon: 'bi bi-info-circle',
    },
    {
        name: 'Clients',
        link: '/admin/clients',
        icon: 'bi bi-people',
    },
    {
        name: 'Admin Accounts',
        link: '/admin/accounts',
        icon: 'bi bi-person-gear',
    },
]