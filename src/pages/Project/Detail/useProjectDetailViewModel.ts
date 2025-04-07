import useSWR from 'swr'
import { showProduct } from '../../../rest/ProjectRest'

const useProjectDetailViewModel = (slug?: string) => {
  const { data: project, isValidating } = useSWR(
    ['fetch-project', slug],
    () => showProduct(slug),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  )

  return {
    project,
    isValidating,
  }
}

export default useProjectDetailViewModel
