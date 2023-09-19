import "@/styles/reset.scss";
import "@/styles/global.scss";
import Head from "next/head";
import { Layout } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/*<link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
  ></link> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
