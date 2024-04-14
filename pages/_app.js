import "@/styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Layout from "@/components/global/Layout";
import {AnimatePresence} from "framer-motion";
import NextNProgress from 'nextjs-progressbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useRouter} from "next/router";
import {SessionProvider} from "next-auth/react";

export default function App({Component, pageProps}) {
    const router = useRouter();

    return (
        <SessionProvider session={pageProps.session}>
            <NextUIProvider>
                <NextNProgress color="#666" options={{showSpinner: false}}/>
                <Layout>
                    <AnimatePresence mode="wait" initial={false}>
                        <Component {...pageProps} key={router.asPath}/>
                    </AnimatePresence>
                </Layout>
            </NextUIProvider>
        </SessionProvider>);

}

