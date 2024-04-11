import Sidebar from "@/components/global/sidebar";
import Head from "next/head";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";

const Layout = ({children}) => {
    const [active, setActive] = useState(false);
    const router = useRouter();
    const topDivRef = useRef(null);

    useEffect(() => {
        setActive(false);
        const handleRouteChange = () => {
            if (topDivRef.current) {
                topDivRef.current.scrollIntoView();
            }
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return (
        <div className='flex h-[100vh] relative overflow-x-hidden lg:overflow-x-auto'>
            <div ref={topDivRef}></div>
            <Head>
                <link rel="icon" type="image/x-icon"
                      href="https://i.ibb.co/4Wh3gKQ/logo.png"/>
            </Head>
            <div
                className={`lg:w-[16%] w-[70%] md:w-[40%] lg:block h-full lg:sticky duration-500 fixed top-0 left-0 z-[100] ${active ? 'translate-x-0' : 'translate-x-[-100%] lg:translate-x-0'}  lg:translate-x-0 `}>
                <Sidebar active={active} setActive={setActive}/>
            </div>
            <div
                className={`lg:w-[84%] w-full h-full duration-500 delay-150  ${active ? 'translate-x-[70%] md:translate-x-[40%] lg:translate-x-0' : 'translate-x-0 lg:translate-x-0'}`}>{children}</div>
        </div>
    );
};

export default Layout;