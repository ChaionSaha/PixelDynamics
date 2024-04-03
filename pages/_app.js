import "@/styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Layout from "@/components/global/Layout";
import {AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import NextNProgress from 'nextjs-progressbar';

export default function App({Component, pageProps}) {
    const router = useRouter();
    return (
        <NextUIProvider>
            <NextNProgress/>
            <Layout>
                <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)} mode="wait" initial={false}>
                    <Component {...pageProps} key={router.asPath}/>
                </AnimatePresence>
            </Layout>


        </NextUIProvider>);

}
