import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useHashtagTrend = (hashtag: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    hashtag ? `/api/trends/${hashtag}` : null,
    fetcher
  );

  return { data, error, isLoading, mutate };
};
