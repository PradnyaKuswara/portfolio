import { Grid } from '@mui/joy';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import React from 'react';
import toast from 'react-hot-toast';

interface IUploadCareProps {
  onChange: (value: string) => void;
  fieldState: { error?: { message?: string }, value?: string };
  label: string;
  isLabel: boolean;
  value?: string | null
}

const UploadCare: React.FC<IUploadCareProps> = ({
  onChange,
  fieldState,
  isLabel,
  label,
  value,
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    value || null
  );
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid xs={12} sm={12}>
          {isLabel && (
            <div className="label">
              <span className="label-text">{label}</span>
            </div>
          )}
          <FileUploaderRegular
            sourceList="local, camera, facebook, gdrive"
            classNameUploader="uc-light"
            accept="image/*"
            pubkey="0e6e7dd6c03f9c12e4eb"
            maxLocalFileSizeBytes={1048576} // 1 MB in bytes
            multiple={false}
            onChange={(file) => {
              if (file.allEntries && file.allEntries.length > 0) {
                const cdnUrl = file.allEntries[0].cdnUrl || '';
                onChange(cdnUrl);
                setPreviewUrl(cdnUrl);
              }
            }}
            onFileRemoved={() => {
              onChange('');
              setPreviewUrl(null);
            }}
            onFileUploadFailed={() => {
              onChange('');
              setPreviewUrl(null);
              toast.error('Failed to upload file');
            }}
            onFileUploadSuccess={() => {
              toast.success('File uploaded successfully');
            }}
          />
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
      </Grid>

      <p className="text-xs text-error mt-2">{fieldState.error?.message}</p>
    </>
  );
};

export default UploadCare;
