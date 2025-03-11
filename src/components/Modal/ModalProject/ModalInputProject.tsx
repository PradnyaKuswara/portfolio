import React, { useEffect } from 'react';
import useModalInputProject from '../hooks/useModalInputProject';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import useModalInputProjectViewModel from './useModalInputProjectViewModel';
import toast from 'react-hot-toast';
import useListProjectViewModel from '../../../pages/Dashboard/Project/useListProjectViewModel';
import { Box, Grid, Modal, ModalClose, Sheet, Typography } from '@mui/joy';
import TextInput from '../../FormInput/TextInput';
import { Controller } from 'react-hook-form';
import TextAreaInput from '../../FormInput/TextAreaInput';
import TextEditor from '../../TextEditor/TextEditor';
import SelectProjectCategory from '../../FormInput/Select/SelectProjectCategory';
import '@uploadcare/react-uploader/core.css';
import UploadCare from '../../FormInput/FileUpload/UploadCare';

const ModalInputProject: React.FC = () => {
  const { modalState, closeModal } = useModalInputProject();
  const { form, onSubmit, onEdit } = useModalInputProjectViewModel();
  const [loading, setLoading] = useGlobalLoading();
  const { refetch } = useListProjectViewModel();

  useEffect(() => {
    if (modalState.isEdit) {
      form.setValue('title', modalState.data?.title || '');
      form.setValue('description', modalState.data?.description || '');
      form.setValue('image', modalState.data?.image || '');
      form.setValue(
        'project_category_id',
        modalState.data?.project_category_id?.toString() || ''
      );
      form.setValue('stack', modalState.data?.stack || '');
      form.setValue('link_github', modalState.data?.link_github || '');
      form.setValue('link_project', modalState.data?.link_project || '');
      form.setValue(
        'link_documentation',
        modalState.data?.link_documentation || ''
      );
      form.setValue('meta_desc', modalState.data?.meta_desc || '');
      form.setValue('meta_keyword', modalState.data?.meta_keyword || '');
    }
  }, [modalState.data, modalState.isEdit, form]);

  if (!modalState.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const isValid = await form.trigger();
    if (!isValid) return toast.error('Please fill in the form correctly');

    setLoading(true);

    const values = form.getValues();

    const res = await onSubmit({
      payload: {
        ...values,
        image: values.image,
        link_github: values.link_github ?? '',
        link_project: values.link_project ?? '',
        link_documentation: values.link_documentation ?? '',
        meta_keyword: values.meta_keyword ?? '',
      },
    });
    setLoading(false);
    if (res instanceof Error) {
      return toast.error(res.message);
    }

    refetch();
    setLoading(false);
    toast.success('Add project success');

    closeModal();
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const isValid = await form.trigger();
    if (!isValid) return;

    setLoading(true);

    const values = form.getValues();

    const res = await onEdit({
      payload: {
        slugParam: modalState.data?.slug,
        ...values,
        image: values.image,
        link_github: values.link_github ?? '',
        link_project: values.link_project ?? '',
        link_documentation: values.link_documentation ?? '',
        meta_keyword: values.meta_keyword ?? '',
      },
    });
    setLoading(false);
    if (res instanceof Error) {
      return toast.error(res.message);
    }

    refetch();
    setLoading(false);
    toast.success('Edit project success');

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
          {modalState.isEdit ? 'Edit Project' : 'Add Project'}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 2 }}>
          {modalState.isEdit
            ? 'Edit your project data'
            : 'Fill in the form below to add a new project'}
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
                name="description"
                render={({ field, fieldState }) => (
                  <>
                    <TextEditor
                      field={field}
                      fieldState={fieldState}
                      label="Description"
                      isLabel
                    />
                  </>
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="image"
                render={({ field, fieldState }) => (
                  <UploadCare
                    onChange={field.onChange}
                    fieldState={fieldState}
                    label="image"
                    isLabel
                    value={field.value || null}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input title project',
                      label: 'Title',
                      isLabel: true,
                    }}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Controller
                control={form.control}
                name="project_category_id"
                render={({ field, fieldState }) => (
                  <SelectProjectCategory
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    fieldState={fieldState}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="stack"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input stack project',
                      label: 'Stack',
                      isLabel: true,
                    }}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="link_github"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field: { ...field, value: field.value || '' },
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input link github project',
                      label: 'Link Github',
                      isLabel: true,
                    }}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="link_project"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field: { ...field, value: field.value || '' },
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input link project',
                      label: 'Link Project',
                      isLabel: true,
                    }}
                    sx={{ width: '100%' }}
                  />
                )}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="link_documentation"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field: { ...field, value: field.value || '' },
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input link documentation project',
                      label: 'Link Documentation',
                      isLabel: true,
                    }}
                    sx={{ width: '100%' }}
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

export default ModalInputProject;
