/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import MainLayout from '~/components/layouts/MainLayout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'jotai';
import { api } from '../utils/api';
import CartContextProvider from '~/providers/CartContextProvider';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

    return (
        <SessionProvider session={session}>
            <Provider>
                <CartContextProvider>
                    {getLayout(<Component {...pageProps} />)}
                </CartContextProvider>
            </Provider>
        </SessionProvider>
    );
}

export default api.withTRPC(MyApp);
