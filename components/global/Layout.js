import Sidebar from "@/components/global/sidebar";
import Head from "next/head";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

const Layout = ({children}) => {
    const [active, setActive] = useState(false);
    const router = useRouter();
    const topDivRef = useRef(null);

    useEffect(() => {
        const handleRouteChange = () => {
            if (topDivRef.current) {
                topDivRef.current.scrollIntoView({behavior: "smooth"});
            }
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    useEffect(() => {
        setActive(false);
        if (router.pathname.includes('/admin') && !router.pathname.includes('/admin/auth')) {
            axios('/api/get-account-status').then(res => {

            }).catch(({response}) => {
                if (response.status === 403) {
                    router.push('/admin/auth/create-account-success');
                } else if (response.status === 401) {
                    router.push('/admin/auth/login');
                }
            });
        }


    }, [router]);


    return (
        <div className='flex h-[100vh]  relative overflow-x-hidden overflow-y-auto lg:overflow-x-auto'>
            <Head>
                <link rel="icon" type="image/x-icon"
                      href="https://i.ibb.co/4Wh3gKQ/logo.png"/>
            </Head>
            {
                !router.pathname.includes('/admin/auth') ?
                    <>

                        <div
                            className={`lg:w-[16%] w-[70%] md:w-[40%] lg:block h-full lg:sticky duration-500 fixed top-0 left-0 z-[100] ${active ? 'translate-x-0' : 'translate-x-[-100%] lg:translate-x-0'}  lg:translate-x-0 `}>
                            <Sidebar active={active} setActive={setActive}/>
                        </div>

                        <div
                            className={`lg:w-[84%] w-full h-full  duration-500 overflow-y-auto delay-150  ${active ? 'translate-x-[70%] md:translate-x-[40%] lg:translate-x-0' : 'translate-x-0 lg:translate-x-0'} ${router.pathname.includes('/admin') ? 'bg-admin-primary text-base-200' : ''}`}>
                            <div ref={topDivRef} className='w-1 '></div>
                            {children}
                        </div>
                    </> : <div className={` w-full h-full bg-[#161B21] text-base-200`}>{children}</div>

            }
        </div>
    );
};

export default Layout;
