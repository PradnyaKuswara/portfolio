/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select from 'react-select';
import { useGlobalFilter } from '../../hooks/useGlobalFilter';
import { IFilterAtom } from '../../@types/atom';

interface SelectFilterProps {
  isLabel?: boolean;
  label?: string;
  placeHolder?: string;
  filterKey: keyof IFilterAtom;
  options: { value: string; label: string }[];
}

const SelectFilter = (props: SelectFilterProps) => {
  const { isLabel = false, label, placeHolder, filterKey, options } = props;
  const { filters, updateFilter } = useGlobalFilter();

  const handleChange = (newValue: { value: string; label: string } | null) => {
    if (newValue) {
      updateFilter(filterKey, newValue.value);
    } else {
      updateFilter(filterKey, '');
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '0.2rem',
      // boxShadow: '0 0 0 2px rgba(56, 189, 248, 0.5)',
      '&:hover': {
        borderColor: '#0284c7',
      },
      fontSize: '0.7rem',
      width: '210px',
      padding: '0.1rem',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#0284c7',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e0f2fe' : 'white',
      color: state.isFocused ? '#0284c7' : 'black',
      fontSize: '0.875rem',
    }),
  };

  return (
    <React.Fragment>
      <fieldset className="fieldset">
        {isLabel && <label className="fieldset-label">{label}</label>}
        <Select
          onChange={handleChange}
          value={
            options.find((option) => option.value === filters[filterKey]) ||
            null
          }
          options={options}
          placeholder={placeHolder || 'Pilih Kategori'}
          styles={customStyles}
          isSearchable
        />
      </fieldset>
    </React.Fragment>
  );
};

export default SelectFilter;
