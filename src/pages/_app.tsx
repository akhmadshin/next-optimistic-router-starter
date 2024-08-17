import "@/styles/globals.css";
import "@/styles/shiki.css";
import "@/styles/yt-embed.css";
import type { AppProps } from "next/app";
import singletonRouter from 'next/dist/client/router';
import { handleOptimisticNavigation, OptimisticRouterProvider } from 'next-optimistic-router';
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Layout } from '@/components/Layout';
import { createRouteLoader } from 'next/dist/client/route-loader';
import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { transitionHelper } from '@/lib/transitionHelper';
import { ThemeProvider } from 'next-themes';


// Prefetch all js chunks after the page loads
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

  useLayoutEffect(() => {
    router.prefetch = async () => Promise.resolve(undefined);

    router.beforePopState((state) => {
      handleOptimisticNavigation({
        href: state.as,
        singletonRouter,
        withTrailingSlash: Boolean(process.env.__NEXT_TRAILING_SLASH),
      });
      transitionHelper({
        updateDOM: async () => {
          if (window.pageMounted) {
            await window.pageMountedPromise;
          }
        },
      });

      return true;
    });
  }, [router])

  return (
    <WithQueryClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <OptimisticRouterProvider singletonRouter={singletonRouter}>
          <HydrationBoundary state={pageProps.dehydratedState} options={{
            defaultOptions: {},
          }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </HydrationBoundary>
        </OptimisticRouterProvider>
      </ThemeProvider>
    </WithQueryClientProvider>

  );
}
