import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { IconSearch } from '@tabler/icons-react';
import { useGlobalFilter } from '../../hooks/useGlobalFilter';
import { IFilterAtom } from '../../@types/atom';

interface SearchFilterProps {
  placeHolder: string;
  isLabel?: boolean;
  label?: string;
  filterKey: keyof IFilterAtom;
}

const SearchFilter = (props: SearchFilterProps) => {
  const { placeHolder, isLabel = false, label, filterKey } = props;
  const { filters, updateFilter } = useGlobalFilter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter(filterKey, e.target.value);
  };

  return (
    <div>
      <fieldset className="fieldset">
        {isLabel && <legend className="fieldset-legend">{label}</legend>}

        <InputGroup width={'18rem'}>
          <InputLeftElement pointerEvents="none">
            <IconSearch size={14} />
          </InputLeftElement>
          <Input
            onChange={handleChange}
            type="search"
            fontSize="0.7rem"
            className="grow rounded-sm !w-full"
            placeholder={placeHolder}
            value={
              typeof filters[filterKey] === 'object'
                ? filters[filterKey].toString()
                : filters[filterKey]
            }
          />
        </InputGroup>
      </fieldset>
    </div>
  );
};

export default SearchFilter;
