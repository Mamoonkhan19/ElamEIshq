import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { fetchHybridQuotes, SearchParams } from "../../services/quoteService";
import { Quote } from "../../types/domain";

export const useGetQuotes = (params: SearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_QUOTES, params],
    queryFn: () => fetchHybridQuotes(params),
  });
};

export const useGetInfiniteQuotes = (params: Omit<SearchParams, 'page'>) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_QUOTES, params],
    queryFn: async ({ pageParam = 1 }) => {
      const results = await fetchHybridQuotes({ ...params, page: pageParam as number });
      return { quotes: results, page: pageParam as number };
    },
    getNextPageParam: (lastPage) => {
      // Stop if the last page returned nothing
      if (!lastPage.quotes || lastPage.quotes.length === 0) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
    select: (data) => ({
      ...data,
      // Flatten all pages into a single deduplicated quote array
      pages: data.pages,
      allQuotes: data.pages.flatMap(p => p.quotes),
    }),
  });
};

export const useSearchQuotes = (params: SearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_QUOTES, params],
    queryFn: () => fetchHybridQuotes(params),
    enabled: !!(params.query || params.category),
  });
};
