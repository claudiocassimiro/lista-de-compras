import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import OneSignal from 'react-onesignal';
import { store } from '../store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    OneSignal.init({
      appId: `5b4e963b-c153-47f9-a99e-2266300b3af1`,
      // safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID!,
      allowLocalhostAsSecureOrigin: process.env.NODE_ENV === `development`,
      serviceWorkerParam: {
        scope: `/js/push/onesignal/`,
      },
      serviceWorkerPath: `./js/push/onesignal/OneSignalSDKWorker.js`,
    });

    const cancelTimeout = setTimeout(() => {
      OneSignal.showSlidedownPrompt();
    }, 15000);

    return () => {
      clearTimeout(cancelTimeout);
    };
  }, []);

  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6028675375262842"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="shortcut icon" href="/icon-192x192.png" />
        <title>App Lista de Compras</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
