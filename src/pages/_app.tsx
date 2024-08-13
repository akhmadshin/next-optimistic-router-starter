import "@/styles/globals.css";
import type { AppProps } from "next/app";
import singletonRouter from 'next/dist/client/router';
import { OptimisticRouterProvider } from 'next-optimistic-router';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Layout } from '@/components/Layout';
import { createRouteLoader } from 'next/dist/client/route-loader';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


(() => {
  if (typeof window === 'undefined') {
    return;
  }
  const routeLoader = createRouteLoader('');
  routeLoader.prefetch('/').catch((e: string) => { throw new Error(e) });
  routeLoader.prefetch('/blog/[slug]').catch((e: string) => { throw new Error(e) });
})()

export default function App({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState}>) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch = async () => Promise.resolve(undefined);

    router.beforePopState(() => {
      return true;
    });
  }, [router])

  return (
    <WithQueryClientProvider>
      <OptimisticRouterProvider singletonRouter={singletonRouter}>
        <HydrationBoundary state={pageProps.dehydratedState} options={{
          defaultOptions: {},
        }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HydrationBoundary>
      </OptimisticRouterProvider>
    </WithQueryClientProvider>

  );
}
