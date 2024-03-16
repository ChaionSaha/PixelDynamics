import logo from '@/assets/logo-gif.gif';
import {contactLinks, pages} from '@/components/global/links';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const Sidebar = () => {
    const router = useRouter();
    const [sidebarBg, setSidebarBg] = useState('');

    useEffect(() => {
        const selectedPath = pages.find((p) => p.link === router.asPath);
        if (selectedPath) setSidebarBg(selectedPath.bg);
        else setSidebarBg('');
    }, [router.asPath]);

    return (
        <div
            className={`flex flex-col justify-between w-full h-full py-10 text-base-200 bg-theme-black `}
            style={{backgroundImage: `url(${sidebarBg})`}}
        >
            <div className=''>
                <Link href='/' className='flex flex-col xl:flex-row items-start gap-x-5 xl:px-7  px-3'>
                    <Image src={logo} alt='logo' className='w-10 h-10'/>
                    <div className='flex flex-col select-none'>
                        <p className='text-lg font-bold'>PixelDynamics</p>
                        <p className='text-xs translate-y-[-30%]'>.studio</p>
                    </div>
                </Link>
                <p className='text-sm xl:px-7 px-3 mt-7'>
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
        </div>
    );
};

export default Sidebar;
