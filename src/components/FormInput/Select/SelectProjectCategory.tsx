import React from 'react';
import Select, { OnChangeValue } from 'react-select';
import useListProjectCategoryViewModel from '../../../pages/Dashboard/ProjectCategory/useListProjectCategoryViewModel';
import ProjectCategoryNamespace from '../../../@types/project-category';

interface SelectProjectCategoryProps {
  isMulti?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  fieldState: { error?: { message?: string } };
  value?: string;
}

const SelectProjectCategory: React.FC<SelectProjectCategoryProps> = (props) => {
  const { projectCategories, isValidating } = useListProjectCategoryViewModel();
  const options = projectCategories?.data.map(
    (category: ProjectCategoryNamespace.ProjectCategory) => ({
      value: category.id,
      label: category.name,
    })
  );

  const handleSelectChange = (
    selectedOption: OnChangeValue<{ value: string; label: string }, boolean>
  ) => {
    if (selectedOption) {
      const value =
        typeof selectedOption === 'object'
          ? (selectedOption as { value: string; label: string }).value
          : selectedOption;
      props.onChange?.(value);
    }
  };

  return (
    <div className="form-control z-[10000]">
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
        value={options?.find(
          (option: { value: string; label: string }) =>
            option.value === props.value
        )}
        isLoading={isValidating}
        placeholder="Choose Category"
        className="rounded-[0.2rem] h-[2rem] text-xs"
        onChange={handleSelectChange}
      />
      <p className="text-xs text-error mt-2">
        {props.fieldState.error?.message}
      </p>
    </div>
  );
};

export default SelectProjectCategory;
