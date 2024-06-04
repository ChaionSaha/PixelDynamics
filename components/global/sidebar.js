import { ContactIcon, TermsIcon } from '@/assets/CustomIcons/CustomIcon';
import { adminPagesLinks, contactLinks, pages } from '@/components/global/links';
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClientSidebarLinks from './ClientSidebarLinks';
import HamburgerMenu from './HamburgerMenu';

const Sidebar = ({active, setActive}) => {
    const router = useRouter();
    const [sidebarBg, setSidebarBg] = useState('');


    useEffect(() => {
        const selectedPath = pages.find((p) => router.asPath.includes(p.link));
        if (selectedPath) setSidebarBg(selectedPath.bg);
        else setSidebarBg('');
    }, [router.asPath]);

    return (
        <div
            className={`relative flex flex-col justify-between w-full h-full py-10 text-base-200 ${router.pathname.includes('/admin') ? 'bg-admin-secondary' : 'bg-theme-black'} `}
        >
            <div className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none z-[1]">
                <video
                    className=' w-[100vw] h-[100vh] '
                    style={{
                        objectFit: 'cover',
                        overflowClipMargin: 'content-box',
                        overflow: 'clip',
                    }}
                    src={sidebarBg}
                    type='video/mp4'
                    loop
                    autoPlay
                    muted
                    playsInline
                    preload='none'
                />
            </div>
            <div className=' z-[10]'>
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

            <ul className='flex flex-col gap-y-2 z-[10]'>
                
                {!router.pathname.includes('/admin') && <ClientSidebarLinks/>}
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

            {!router.pathname.includes('/admin') &&
                <div className="flex flex-col z-[10]">
                    <Link
                        href={'/terms'}
                        className={`flex items-center gap-x-4 w-full text-lg px-3 xl:px-10 py-2 mb-2 hover:bg-base-200 hover:text-theme-black duration-150 group ${
                            router.asPath.includes('/terms') ? 'sidebar-link-active' : ''
                        }`}
                        scroll={false}
                    >
                        <TermsIcon className={`w-5 h-5 group-hover:fill-black ${router.asPath.includes('/terms') ? 'fill-black' : 'fill-white'}`} />
                        <p>Terms & Policy</p>
                    </Link>
                    <Link
                        href={'/contact'}
                        className={`flex items-center gap-x-4 w-full text-lg px-3 xl:px-10 py-2 mb-10 hover:bg-base-200 hover:text-theme-black duration-150 group ${
                            router.asPath.includes('/contact') ? 'sidebar-link-active' : ''
                        }`}
                        scroll={false}
                    >
                        <ContactIcon className={`w-5 h-5 group-hover:fill-black ${router.asPath.includes('/contact') ? 'fill-black' : 'fill-white'}`} />
                        <p>Contact</p>
                    </Link>
            
                    <ul className='flex justify-between px-3 xl:px-10'>
                        {contactLinks.map((cl, i) => {
                            return (
                                <li key={i}>
                                    <a
                                        href={cl.link}
                                        target='_blank'
                                    >
                                        {cl.icon}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            }

            {router.pathname.includes('/admin') &&
                <div className='flex flex-col gap-y-3 z-[10]'>
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
