import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
    queryFn: ({ pageParam = 1 }) => fetchHybridQuotes({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useSearchQuotes = (params: SearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_QUOTES, params],
    queryFn: () => fetchHybridQuotes(params),
    enabled: !!(params.query || params.category),
  });
};
