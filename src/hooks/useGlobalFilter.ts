// hooks/useFilters.ts
import { useRecoilState } from 'recoil';
import { GlobalFilterAtom } from '../shared/atoms/atom';
import { IFilterAtom } from '../@types/atom';

export const useGlobalFilter = () => {
  const [filters, setFilters] = useRecoilState(GlobalFilterAtom);

  const updateFilter = <K extends keyof IFilterAtom>(key: K, value: IFilterAtom[K]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return {
    filters,
    updateFilter,
  };
};
