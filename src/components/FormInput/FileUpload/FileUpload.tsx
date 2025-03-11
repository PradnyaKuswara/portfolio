import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { Grid, styled } from '@mui/joy';
import { ControllerRenderProps, Path } from 'react-hook-form';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

interface FileUploadProps<T extends Record<string, unknown>> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: { error?: { message?: string } };
  label: string;
  isLabel: boolean;
}

export default function FileUpload<T extends Record<string, unknown>>(
  props: FileUploadProps<T>
): JSX.Element {
  const { field, fieldState, label, isLabel } = props;
  const [, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      field.onChange(selectedFile);

      // Create a preview URL for the selected file
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid xs={12} sm={12}>
          {isLabel && (
            <div className="label">
              <span className="label-text">{label}</span>
            </div>
          )}
          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 112.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>
            }
          >
            Upload a file
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              onBlur={field.onBlur}
              value="" // Ensure the value is always an empty string
            />
          </Button>
        </Grid>

        <Grid xs={12} sm={6}>
          {previewUrl && (
            <div className="preview relative aspect-video border border-gray-300 rounded-md overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain object-center"
              />
            </div>
          )}
        </Grid>

        <p className="text-xs text-error mt-2">{fieldState.error?.message}</p>
      </Grid>
    </>
  );
}
