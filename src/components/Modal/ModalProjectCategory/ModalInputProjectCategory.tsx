import React, { useEffect } from 'react';
import useModalInputProjectCategory from '../hooks/useModalInputProjectCategory';
import useModalInputProjectCategoryViewModel from './useModalInputProjectCategoryViewModel';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import useListProjectCategoryViewModel from '../../../pages/Dashboard/ProjectCategory/useListProjectCategoryViewModel';
import toast from 'react-hot-toast';
import { Box, Grid, Modal, ModalClose, Sheet, Typography } from '@mui/joy';
import { Controller } from 'react-hook-form';
import TextInput from '../../FormInput/TextInput';

const ModalInputProjectCategory: React.FC = () => {
  const { modalState, closeModal } = useModalInputProjectCategory();
  const { form, onSubmit, onEdit } = useModalInputProjectCategoryViewModel();
  const [loading, setLoading] = useGlobalLoading();
  const { refetch } = useListProjectCategoryViewModel();

  useEffect(() => {
    if (modalState.isEdit) {
      form.setValue('name', modalState.data?.name || '');
    }
  }, [modalState.data, modalState.isEdit, form]);

  if (!modalState.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const isValid = await form.trigger();
    if (!isValid) return toast.error('Please check your form');

    setLoading(true);

    const res = await onSubmit({ payload: form.getValues() });
    setLoading(false);
    if (res instanceof Error) {
      return toast.error(res.message);
    }

    refetch();
    toast.success('Add project category success');
    closeModal();
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const isValid = await form.trigger();
    if (!isValid) return toast.error('Please check your form');

    setLoading(true);

    const payload = { uuid: modalState.data?.uuid, ...form.getValues() };

    const res = await onEdit({ payload });
    setLoading(false);
    if (res instanceof Error) {
      return toast.error(res.message);
    }

    refetch();
    toast.success('Edit project category success');
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
          width: '90%',
          maxWidth: '800px',
          minWidth: '500px',
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          maxHeight: '80vh',
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
          {modalState.isEdit ? 'Edit Project Category' : 'Add Project Category'}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 2 }}>
          {modalState.isEdit
            ? 'Edit your project category data'
            : 'Fill in the form below to add a new project category'}
        </Typography>

        <Box
          component="form"
          onSubmit={modalState.isEdit ? handleEdit : handleSubmit}
          width="100%"
        >
          <Grid container spacing={2}>
            <Grid xs={12} sm={12}>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input project category name',
                      label: 'Name',
                      isLabel: true,
                    }}
                    sx={{ width: '100%' }}
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

export default ModalInputProjectCategory;
