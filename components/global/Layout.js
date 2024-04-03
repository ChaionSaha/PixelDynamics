import Sidebar from "@/components/global/sidebar";
import Head from "next/head";

const Layout = ({children}) => {
    return (
        <div className='flex h-[100vh] relative'>
            <Head>
                <link rel="icon" type="image/x-icon"
                      href="https://i.ibb.co/4Wh3gKQ/logo.png"/>
            </Head>
            <div className="lg:w-[16%] overflow-x-hidden hidden lg:block h-full"><Sidebar/></div>

            <div className="lg:w-[84%] w-full h-full">{children}</div>
        </div>
    );
};

export default Layout;