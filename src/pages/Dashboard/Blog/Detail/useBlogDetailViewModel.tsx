import useSWR from 'swr';
import { showArticle } from '../../../../rest/BlogRest';

const useBlogDetailViewModel = (slug?: string) => {
  const { data: blog, isValidating } = useSWR(
    ['fetch-blog', slug],
    () => showArticle(slug),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  return {
    blog,
    isValidating,
  };
};

export default useBlogDetailViewModel;
