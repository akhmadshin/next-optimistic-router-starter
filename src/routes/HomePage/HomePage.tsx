import React from 'react';

import { Meta } from '@/components/Meta';
import { Container } from '@/components/Container';
import { ArticleList } from '@/components/ArticleList';
import { usePageData } from '@/hooks/usePageData';
import { HomePageProps } from '@/types/pages/homePage';


export const HomePage = () => {
  const { data: articles, isLoading, isFetching} = usePageData<HomePageProps>();

  return (
    <Container>
      <Meta
        title="Next.js site with optimistic navigation and View Transitions API"
        description="No matter how slow the user’s Internet is or how weak his hardware is, site navigation remains instantaneous"
      />
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Next.js site with optimistic navigation and View Transitions API.
        </h1>
        <p className="mt-10 text-lg text-zinc-600 dark:text-zinc-100">
          This site implements optimistic navigation in NextJS.
          No matter how slow the user’s Internet is or how weak his hardware is, site navigation remains instantaneous.
          Click on any card below to see it.
        </p>
      </div>
      <ArticleList articles={articles} isLoading={isLoading || isFetching} />
    </Container>
  );
}
