import React from 'react';
import { DateRangePicker } from 'rsuite';
import { DateRange } from 'rsuite/esm/DateRangePicker';

interface DateRangePickerInputProps {
  placeHolder?: string;
  className?: string;
  isLabel?: boolean;
  label?: string;
  onChange?: (value: DateRange | null, event: React.SyntheticEvent<Element, Event>) => void;
  onBlur?: () => void;
  fieldState?: { error?: { message?: string } };
  value?: DateRange;
}

const DateRangePickerInput: React.FC<DateRangePickerInputProps> = (props) => {
  const { placeHolder, className, isLabel, label, onChange, onBlur, value } =
    props;

  return (
    <label className={`form-control w-full ${className}`}>
      {isLabel && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}

      <DateRangePicker
        format="yyyy/MM/dd"
        character="–"
        placeholder={placeHolder || 'Choose Date Range'}
        className="bg-base-100"
        style={{ width: '230px' }}
        placement="bottomEnd"
        preventOverflow
        container={() => document.body}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
};

export default DateRangePickerInput;
