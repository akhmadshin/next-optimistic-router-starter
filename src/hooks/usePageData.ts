import { DehydratedState, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePageDataOptions } from 'next-optimistic-router';
import { useRouter } from 'next/router';

export const usePageData = <T>() => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { queryKey, queryFn } = usePageDataOptions(router, Boolean(process.env.__NEXT_TRAILING_SLASH));
  const placeholderData = typeof window === 'undefined' ? undefined : window.placeholderData;


  const res =  useQuery<unknown, unknown, T>({
    queryKey,
    queryFn: async () => {
      const serverData = queryClient.getQueryData([...queryKey]);
      if (serverData && !res.isStale) {
        return serverData;
      }

      return queryFn().then((props) => {
        const res = props as { dehydratedState: DehydratedState};
        return res?.dehydratedState ? res.dehydratedState.queries[0].state.data : props;
      })
    },
    placeholderData,
  });
  return res;
}