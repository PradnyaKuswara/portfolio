import React from 'react';
import Select, { OnChangeValue } from 'react-select';

interface SelectGenderProps {
  isClearable?: boolean;
  isMulti?: boolean;
  onChange?: (
    value: OnChangeValue<{ value: string; label: string }, boolean>
  ) => void;
  onBlur?: () => void;
  value?:
    | { value: string; label: string }
    | { value: string; label: string }[]
    | null;
  fieldState: { error?: { message?: string } };
}

const SelectGender: React.FC<SelectGenderProps> = (props) => {
  const options = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' },
  ];

  return (
    <>
      <div className="form-control">
        <div className="label">
          <span className="label-text">Jenis Kelamin</span>
        </div>
        <Select
          {...props}
          isClearable
          isSearchable
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          isLoading={!options.length}
          placeholder="Pilih jenis kelamin"
          
          className='text-xs'
        />
        <p className="text-xs text-error mt-2">
          {props.fieldState.error?.message}
        </p>
      </div>
    </>
  );
};

export default SelectGender;
