import React, { useEffect } from 'react';
import useListArticleViewModel from '../../../pages/Dashboard/Blog/useListArticleViewModel';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import useModalInputBlog from '../hooks/useModalInputBlog';
import useModalInputBlogVIewModel from './useModalInputBlogVIewModel';
import toast from 'react-hot-toast';
import { Box, Grid, Modal, ModalClose, Sheet, Typography } from '@mui/joy';
import { Controller } from 'react-hook-form';
import TextInput from '../../FormInput/TextInput';
import TextEditor from '../../TextEditor/TextEditor';
import UploadCare from '../../FormInput/FileUpload/UploadCare';
import TextAreaInput from '../../FormInput/TextAreaInput';
import '@uploadcare/react-uploader/core.css';

const ModalInputBlog: React.FC = () => {
  const { modalState, closeModal } = useModalInputBlog();
  const { form, onSubmit, onEdit } = useModalInputBlogVIewModel();
  const [loading, setLoading] = useGlobalLoading();
  const { refetch } = useListArticleViewModel();

  useEffect(() => {
    if (modalState.isEdit) {
      form.setValue('title', modalState.data?.title || '');
      form.setValue('content', modalState.data?.content || '');
      form.setValue('thumbnail', modalState.data?.thumbnail || '');
      form.setValue('meta_desc', modalState.data?.meta_desc || '');
      form.setValue('meta_keyword', modalState.data?.meta_keyword || '');
      form.setValue(
        'tags',
        modalState.data?.tags?.map((tag) => tag.name).join(', ') || ''
      );
    }
  }, [modalState.data, modalState.isEdit, form]);

  if (!modalState.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const isValid = await form.trigger();
    if (!isValid) return;

    setLoading(true);

    const res = await onSubmit({ payload: form.getValues() });

    setLoading(false);
    if (res instanceof Error) {
      return toast.error(res.message);
    }

    refetch();
    toast.success('Add article success');
    closeModal();
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const isValid = await form.trigger();
    if (!isValid) return;

    setLoading(true);

    const payload = { slugParam: modalState.data?.slug, ...form.getValues() };

    const res = await onEdit({ payload });
    setLoading(false);
    if (res instanceof Error) {
      return toast.error(res.message);
    }

    refetch();
    toast.success('Edit article success');
    closeModal();
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={modalState.isOpen}
      onClose={closeModal}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: 'md',
          p: 4,
          boxShadow: 'lg',
          overflow: 'auto',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
          {modalState.isEdit ? 'Edit Blog' : 'Add Blog'}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 2 }}>
          {modalState.isEdit
            ? 'Edit your Blog data'
            : 'Fill in the form below to add a new Blog'}
        </Typography>

        <Box
          component="form"
          onSubmit={modalState.isEdit ? handleEdit : handleSubmit}
          width="100%"
        >
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Controller
                control={form.control}
                name="content"
                render={({ field, fieldState }) => (
                  <>
                    <TextEditor
                      field={field}
                      fieldState={fieldState}
                      label="Content"
                      isLabel
                    />
                  </>
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="thumbnail"
                render={({ field, fieldState }) => (
                  <UploadCare
                    onChange={field.onChange}
                    fieldState={fieldState}
                    label="Thumbnail"
                    isLabel
                    value={field.value || null}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      label: 'Title',
                      placeHolder: 'Title',
                      isLabel: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                name="tags"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      label: 'Tag',
                      placeHolder: 'Input Tag Article',
                      isLabel: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="meta_desc"
                render={({ field, fieldState }) => (
                  <TextAreaInput
                    field={field}
                    fieldState={fieldState}
                    placeHolder="Input meta description project"
                    label="Meta Description"
                    isLabel
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="meta_keyword"
                render={({ field, fieldState }) => (
                  <TextAreaInput
                    field={{ ...field, value: field.value || '' }}
                    fieldState={fieldState}
                    placeHolder="Input meta keyword project"
                    label="Meta Keyword"
                    isLabel
                  />
                )}
              />
            </Grid>
          </Grid>
          <button
            type="submit"
            className="btn btn-primary mt-4 rounded-sm btn-sm"
            style={{ width: '100%', padding: '10px' }}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </Box>
      </Sheet>
    </Modal>
  );
};

export default ModalInputBlog;
