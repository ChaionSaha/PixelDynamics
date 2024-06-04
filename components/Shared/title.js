import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Title = ({title}) => {
    const router = useRouter();

    useEffect(() => {
        console.log('chaion');
        document.querySelector("meta[name=viewport]").setAttribute('content', `width=device-width, initial-scale=${(1/window.devicePixelRatio)}, maximum-scale=${(1/window.devicePixelRatio)}, user-scalable=0`);
    },[])

    return (
        <Head>
            {!router.pathname.includes('/admin') && <title>{`${title} | PixelDynamics`}</title>}
            {router.pathname.includes('/admin') && <title>{`${title} - Admin | PixelDynamics`}</title>}
        </Head>
    );
};

export default Title;