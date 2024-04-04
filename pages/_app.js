import "@/styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Layout from "@/components/global/Layout";
import {AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import NextNProgress from 'nextjs-progressbar';
import {useEffect} from "react";

export default function App({Component, pageProps}) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            window.scrollTo(0, 0);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);
    return (
        <NextUIProvider>
            <NextNProgress color="#666" options={{showSpinner: false}}/>
            <Layout>
                <AnimatePresence mode="wait" initial={false}>
                    <Component {...pageProps} key={router.asPath}/>
                </AnimatePresence>
            </Layout>
        </NextUIProvider>);

}
