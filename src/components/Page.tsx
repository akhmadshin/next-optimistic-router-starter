import type { ParentComponent } from '@/types/general';
import { useQueryClient } from '@tanstack/react-query';
import { useLayoutEffect } from 'react';

export const Page: ParentComponent = ({children}) => {
  const queryClient = useQueryClient()

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!queryClient.isFetching()) {
      window.placeholderData = undefined;
    }
    if (window.pageMounted) {
      window.pageMounted();
      window.pageMounted = undefined;
    }
  })
  return children;
}