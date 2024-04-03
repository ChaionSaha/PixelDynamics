import "@/styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Layout from "@/components/global/Layout";
import NextProgress from "next-progress";
import {AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";

export default function App({Component, pageProps}) {
    const router = useRouter();
    return (
        <NextUIProvider>
            <NextProgress delay={300} options={{showSpinner: false}}/>
            <Layout>
                <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)} mode="wait" initial={false}>
                    <Component {...pageProps} key={router.asPath}/>
                </AnimatePresence>
            </Layout>


        </NextUIProvider>);

}
