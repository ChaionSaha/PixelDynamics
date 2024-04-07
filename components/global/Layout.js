import Sidebar from "@/components/global/sidebar";
import Head from "next/head";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const Layout = ({children}) => {
    const [active, setActive] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setActive(false);
    }, [router.asPath]);

    return (
        <div className='flex h-[100vh] relative overflow-x-hidden lg:overflow-x-auto'>
            <Head>
                <link rel="icon" type="image/x-icon"
                      href="https://i.ibb.co/4Wh3gKQ/logo.png"/>
            </Head>
            <div
                className={`lg:w-[16%] w-[70%] md:w-[40%] lg:block h-full lg:sticky duration-500 fixed top-0 left-0 z-[100] ${active ? 'translate-x-0' : 'translate-x-[-100%] lg:translate-x-0'}  lg:translate-x-0 `}>
                <Sidebar active={active} setActive={setActive}/>
            </div>
            <div
                className={`lg:w-[84%] w-full h-full duration-500 delay-150 overflow-y-auto ${active ? 'translate-x-[70%] md:translate-x-[40%] lg:translate-x-0' : 'translate-x-0 lg:translate-x-0'}`}>{children}</div>
        </div>
    );
};

export default Layout;