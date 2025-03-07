import { DatePicker } from 'rsuite';

interface DatePickerInputProps {
  placeHolder?: string;
  className?: string;
  isLabel?: boolean;
  label?: string;
  onChange?: (
    value: Date | null,
    event: React.SyntheticEvent<Element, Event>
  ) => void;
  onBlur?: () => void;
  fieldState: { error?: { message?: string } };
  value?: Date;
}

const DatePickerInput: React.FC<DatePickerInputProps> = (props) => {
  const {
    placeHolder,
    className,
    isLabel,
    label,
    onChange,
    onBlur,
    value,
    fieldState,
  } = props;
  return (
    <div className={`form-control w-full ${className}`}>
      {isLabel && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}

      <DatePicker
        format="yyyy/MM/dd"
        placeholder={placeHolder || 'Choose Date Range'}
        className="bg-base-100 w-full text-xs"
        style={{ width: '230px', borderRadius: '0.2rem', fontSize: '0.75rem' }}
        placement="bottomEnd"
        preventOverflow
        container={() => document.body}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <p className="text-xs text-error mt-2">{fieldState.error?.message}</p>
    </div>
  );
};

export default DatePickerInput;
