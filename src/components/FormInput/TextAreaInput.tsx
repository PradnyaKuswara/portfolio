import Textarea from '@mui/joy/Textarea';
import React from 'react';

interface TextAreaInputProps {
  field?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  fieldState?: { error?: { message?: string } };
  placeHolder?: string;
  label: string;
  isLabel: boolean;
}

const TextAreaInput: React.FC<TextAreaInputProps> = (props) => {
  const { field, placeHolder, label, fieldState, isLabel = false } = props;
  
  return (
    <div className="form-control w-full">
      {isLabel && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      {/* <Textarea
        required
        {...field}
        placeholder={placeHolder || 'Enter your text'}
        className="input input-sm rounded-[0.2rem] input-bordered text-sm"
      /> */}

      <Textarea
        placeholder={placeHolder || 'Enter your text'}
        className="input input-sm !rounded-[0.2rem] input-bordered !text-xs "
        sx={{
          mb: 1,
          width: '100%',
          height: '10rem', // Set the width to control the number of columns
        }}
        onChange={field?.onChange}
        value={field?.value}
        onBlur={field?.onBlur}
        minRows={100}
        maxRows={200}
      />
      <p className="text-sm text-error mt-2">{fieldState?.error?.message}</p>
    </div>
  );
};

export default TextAreaInput;
