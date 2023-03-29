import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import Setup from "./setup";
import {readSettings} from "../utils/storagehelper";
import {ToastContainer} from "react-toastify";

interface MyAppProps extends AppProps {
    isFirstVisit: boolean;
}

function MyApp({ Component, pageProps, isFirstVisit }: MyAppProps) {
    if(isFirstVisit)
        return <Setup />
    else
        return (
            <Layout>
                <Component {...pageProps} />
                <ToastContainer />
            </Layout>
        );
}

MyApp.getInitialProps = async (appContext: any) => {
    const settings = readSettings();
    const isFirstVisit = (settings == null) ? true : settings.isFirstVisit;
    const {Component, ctx} = appContext;
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps, isFirstVisit };
}

export default MyApp;