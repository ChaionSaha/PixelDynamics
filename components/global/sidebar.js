import {adminPagesLinks, contactLinks, pages} from '@/components/global/links';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import HamburgerMenu from './HamburgerMenu';
import {signOut} from "next-auth/react";

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
            className={`relative flex flex-col justify-between w-full h-full py-10 text-base-200 ${router.pathname.includes('/admin') ? 'bg-admin-secondary' : 'bg-theme-black'} `}
            style={{backgroundImage: `url(${sidebarBg})`}}
        >
            <div className=''>

                <Link
                    scroll={false}
                    href={!router.pathname.includes('/admin') ? '/' : '/admin'}
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
                        {router.pathname.includes('/admin') ?
                            <span className='text-base translate-y-[-10%]'>Admin <i
                                className='bi bi-shield-check'></i></span> :
                            <p className='text-xs translate-y-[-30%]'>.studio</p>}
                    </div>
                </Link>
                {!router.pathname.includes('/admin') && <p className='px-3 text-sm xl:px-7 mt-7'>
                    A studio powered by industry leading professionals.
                </p>
                }
            </div>

            <ul className='flex flex-col gap-y-2'>
                {!router.pathname.includes('/admin') && pages.map((p, i) => {
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
                {router.pathname.includes('/admin') && adminPagesLinks.map((p, i) => {
                    return (
                        <li key={i}>
                            <Link
                                href={p.link}
                                className={`flex gap-x-4 w-full text-lg px-3 xl:px-10 py-2 hover:bg-base-200 hover:text-theme-black duration-150 ${
                                    router.asPath.includes(p.link) ? 'sidebar-link-active' : ''
                                }`}
                                scroll={false}
                            >
                                <i className={p.icon}></i>
                                <p>{p.name}</p>
                            </Link>
                        </li>
                    );
                })

                }
            </ul>

            {!router.pathname.includes('/admin') && <ul className='flex justify-between px-3 xl:px-10'>
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
            }

            {router.pathname.includes('/admin') &&
                <div className='flex flex-col gap-y-3'>
                    <Link
                        href='/'
                        className={`flex gap-x-4  w-full text-lg px-3 xl:px-10 py-2 hover:bg-[#0077E4] hover:text-white duration-150`}
                        scroll={false}
                    >
                        <i className='bi bi-arrow-left'></i>
                        <p>Go to Main Website</p>
                    </Link>

                    <button onClick={() => {
                        signOut({
                            redirect: false,
                        }).then(() => router.push('/admin/auth/login'));
                    }}
                            className='flex gap-x-4 w-full text-lg px-3 xl:px-10 py-2 hover:bg-base-200 hover:text-red-700  duration-150 '>
                        <i className='bi bi-box-arrow-right'></i> Log Out
                    </button>

                </div>
            }

            <div className='absolute right-[-5%] translate-x-[100%] top-[2%] z-[100]'>
                <HamburgerMenu active={active} setActive={setActive}/>
            </div>
        </div>
    );
};

export default Sidebar;
