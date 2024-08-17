import { Header } from '@/components/Header';
import { Page } from '@/components/Page';

import React from 'react';
import { ParentComponent } from '@/types/general';


export const Layout: ParentComponent = ({ children }) => {
  return (
    <Page>
      <Header/>
      <main className="pb-28 pt-24">
        {children}
      </main>
    </Page>
  )
}