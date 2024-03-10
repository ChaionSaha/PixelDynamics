import React from 'react';
import logo from '@/assets/logo-gif.gif'
import Image from 'next/image';
import Link from "next/link";
import {useRouter} from "next/router";

const pages = [
    {
        "name": 'Portfolio',
        "link": '/portfolio',
        "icon": "bi bi-distribute-vertical"
    },
    {
        "name": 'Services',
        "link": '/services',
        "icon": "bi bi-grid-fill"
    },
    {
        "name": 'Team',
        "link": '/team',
        "icon": "bi bi-people-fill"
    },
    {
        "name": 'Contact',
        "link": '/contact',
        "icon": "bi bi-envelope-fill"
    },
]

const contactLinks = [
    {
        'link': 'https://www.linkedin.com/company/pixel-dynamics-studio/about/',
        'icon': 'bi bi-linkedin'
    },
    {
        'link': 'https://www.facebook.com/profile.php?id=61550213669968',
        'icon': 'bi bi-facebook'
    },
    {
        'link': 'https://www.instagram.com/pixeldynamics.studio/',
        'icon': 'bi bi-instagram'
    },
    {
        'link': 'https://twitter.com/Pixel_Dynamics',
        'icon': 'bi bi-twitter-x'
    }
]
const Sidebar = () => {
    const router = useRouter();

    return (
        <div className='h-full flex flex-col justify-between text-base-200 w-full bg-theme-black py-10'>
            <div className="">
                <Link href='/' className="flex gap-x-5 items-start  px-7">
                    <Image
                        src={logo}
                        alt='logo'
                        className='w-10 h-10'
                    />
                    <div className="flex flex-col select-none">
                        <p className='text-xl font-bold'>PixelDynamics</p>
                        <p className='text-xs translate-y-[-30%]'>.studio</p>
                    </div>
                </Link>
                <p className='px-7 text-sm mt-7'>A studio powered by industry leading professionals.</p>
            </div>

            <ul className="flex flex-col gap-y-2">
                {
                    pages.map((p, i) => {
                        return <li key={i}>
                            <Link href={p.link}
                                  className={`flex gap-x-4 w-full text-lg px-10 py-2 hover:bg-base-200 hover:text-theme-black duration-150 ${p.link === router.asPath ? 'sidebar-link-active' : ''}`}>
                                <i className={p.icon}></i>
                                <p>{p.name}</p>
                            </Link>
                        </li>
                    })
                }
            </ul>

            <ul className="flex px-10 justify-between">
                {
                    contactLinks.map((cl, i) => {
                        return <li key={i}>
                            <a href={cl.link} target='_blank'
                               className='rounded-full p-1 px-2 text-lg hover:bg-base-200 hover:text-theme-black duration-150'>
                                <i className={cl.icon}></i>
                            </a>
                        </li>
                    })
                }
            </ul>
        </div>
    );
};

export default Sidebar;