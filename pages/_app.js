import Layout from "@/components/global/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import NextNProgress from 'nextjs-progressbar';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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

