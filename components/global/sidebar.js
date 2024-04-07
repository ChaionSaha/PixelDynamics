import {contactLinks, pages} from '@/components/global/links';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import HamburgerMenu from './HamburgerMenu';

const Sidebar = ({active, setActive}) => {
    const router = useRouter();
    const [sidebarBg, setSidebarBg] = useState('');


    useEffect(() => {
        const selectedPath = pages.find((p) => p.link === router.asPath);
        if (selectedPath) setSidebarBg(selectedPath.bg);
        else setSidebarBg('');
    }, [router.asPath]);

    return (
        <div
            className='relative flex flex-col justify-between w-full h-full py-10 text-base-200 bg-theme-black'
            style={{backgroundImage: `url(${sidebarBg})`}}
        >
            <div className=''>
                <Link
                    scroll={false}
                    href='/'
                    className='flex flex-wrap items-start px-3 flex-row gap-x-5 xl:px-7'
                >
                    <div className='w-10 h-10'>
                        <img
                            src='https://i.ibb.co/brBd1wT/logo-gif.gif'
                            alt='logo'
                            className='w-full h-full'
                        />
                    </div>
                    <div className='flex flex-col select-none'>
                        <p className='text-xl font-bold'>PixelDynamics</p>
                        <p className='text-xs translate-y-[-30%]'>.studio</p>
                    </div>
                </Link>
                <p className='px-3 text-sm xl:px-7 mt-7'>
                    A studio powered by industry leading professionals.
                </p>
            </div>

            <ul className='flex flex-col gap-y-2'>
                {pages.map((p, i) => {
                    return (
                        <li key={i}>
                            <Link
                                href={p.link}
                                className={`flex gap-x-4 w-full text-lg px-3 xl:px-10 py-2 hover:bg-base-200 hover:text-theme-black duration-150 ${
                                    p.link === router.asPath ? 'sidebar-link-active' : ''
                                }`}
                                scroll={false}
                            >
                                <i className={p.icon}></i>
                                <p>{p.name}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <ul className='flex justify-between px-3 xl:px-10'>
                {contactLinks.map((cl, i) => {
                    return (
                        <li key={i}>
                            <a
                                href={cl.link}
                                target='_blank'
                                className='p-1 px-2 text-lg contactLinks '
                            >
                                <i className={cl.icon}></i>
                            </a>
                        </li>
                    );
                })}
            </ul>
            <div className='absolute right-[-5%] translate-x-[100%] top-[2%] z-[100]'>
                <HamburgerMenu active={active} setActive={setActive}/>
            </div>
        </div>
    );
};

export default Sidebar;
