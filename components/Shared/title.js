import Head from "next/head";
import { useRouter } from "next/router";

const Title = ({title}) => {
    const router = useRouter();

    return (
        <Head>
            {!router.pathname.includes('/admin') && <title>{`${title} | PixelDynamics`}</title>}
            {router.pathname.includes('/admin') && <title>{`${title} - Admin | PixelDynamics`}</title>}
        </Head>
    );
};

export default Title;