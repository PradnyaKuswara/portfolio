import React from 'react';

interface TextInputProps {
  props: {
    field: React.InputHTMLAttributes<HTMLInputElement>;
    fieldState: { error?: { message?: string } };
    type: string;
    placeHolder?: string;
    label: string;
    isLabel: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  sx?: React.CSSProperties;
}

const TextInput: React.FC<TextInputProps> = ({ props, sx }) => {
  const {
    field,
    type,
    placeHolder,
    label,
    fieldState,
    isLabel = false,
    onChange,
  } = props;

  return (
    <div className="form-control w-full">
      {isLabel && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        {...field}
        value={field.value || ''}
        onChange={onChange ? onChange : field.onChange}
        type={type}
        placeholder={placeHolder || 'Enter your text'}
        className="input input-sm rounded-[0.2rem] input-bordered text-xs"
        style={sx}
      />
      <p className="text-xs text-error mt-2">{fieldState.error?.message}</p>
    </div>
  );
};

export default TextInput;
