import React from 'react';
import Select, { OnChangeValue } from 'react-select';

interface SelectCourierProps {
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
  fieldState?: { error?: { message?: string } };
}

const SelectCourier: React.FC<SelectCourierProps> = (props) => {
  const options = [
    { value: 'JNE', label: 'JNE' },
    { value: 'J&T', label: 'J&T' },
    { value: 'POS Indonesia', label: 'POS Indonesia' },
    { value: 'TIKI', label: 'TIKI' },
  ];

  return (
    <>
      <div className="form-control">
        <div className="label">
          <span className="label-text"></span>
        </div>
        <Select
          {...props}
          isClearable
          isSearchable
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          isLoading={!options.length}
          placeholder="Pilih Kurir"
          className="text-sm w-8/12 lg:w-full"
          
        />
        <p className="text-sm text-error mt-2 ">
          {props.fieldState?.error?.message}
        </p>
      </div>
    </>
  );
};

export default SelectCourier;
