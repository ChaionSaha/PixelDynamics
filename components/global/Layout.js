import Sidebar from "@/components/global/sidebar";
import Head from "next/head";

const Layout = ({children}) => {
    return (
        <div className='flex h-[100vh] relative'>
            <Head>
                <link rel="icon" type="image/x-icon"
                      href="https://i.ibb.co/4Wh3gKQ/logo.png"/>
            </Head>
            <div className="lg:w-[16%] hidden lg:block h-full sticky top-0 left-0"><Sidebar/></div>
            <div className="lg:w-[84%] w-full h-full overflow-y-auto">{children}</div>
        </div>
    );
};

export default Layout;