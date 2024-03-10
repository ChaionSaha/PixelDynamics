import "@/styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Layout from "@/components/global/Layout";

export default function App({Component, pageProps}) {
    return (
        <NextUIProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NextUIProvider>);

}
