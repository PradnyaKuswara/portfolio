import React, { useEffect } from 'react';
import useModalInputCertificate from '../hooks/useModalInputCertificate';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import useModalInputCertificateViewModel from './useModalInputCertificateViewModel';
import { Controller } from 'react-hook-form';
import TextInput from '../../FormInput/TextInput';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import toast from 'react-hot-toast';
import { Box, Grid } from '@mui/joy';
import useListCertificateViewModel from '../../../pages/Dashboard/Certificate/useListCertificateViewModel';

const ModalInputCertificate: React.FC = () => {
  const { modalState, closeModal } = useModalInputCertificate();
  const { form, onSubmit, onEdit } = useModalInputCertificateViewModel();
  const [loading, setLoading] = useGlobalLoading();
  const { refetch } = useListCertificateViewModel();

  useEffect(() => {
    if (modalState.isEdit) {
      form.setValue('name', modalState.data?.name || '');
      form.setValue('organization', modalState.data?.organization || '');
      form.setValue('month_obtained', modalState.data?.month_obtained || '');
      form.setValue('year_obtained', modalState.data?.year_obtained || '');
      form.setValue('month_expired', modalState.data?.month_expired || '');
      form.setValue('year_expired', modalState.data?.year_expired || '');
      form.setValue('url', modalState.data?.url || '');
      form.setValue('description', modalState.data?.description || '');
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
    toast.success('Add certificate success');
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
    toast.success('Edit certificate success');
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
          {modalState.isEdit ? 'Edit Certificate' : 'Add Certificate'}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary" sx={{ mb: 2 }}>
          {modalState.isEdit
            ? 'Edit your certificate data'
            : 'Fill in the form below to add a new certificate'}
        </Typography>

        <Box
          component="form"
          onSubmit={modalState.isEdit ? handleEdit : handleSubmit}
          width="100%"
        >
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input certificate name',
                      label: 'Name',
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
                name="organization"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input certificate organization',
                      label: 'Organization',
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
                name="month_obtained"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input month obtained',
                      label: 'Month Obtained',
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
                name="year_obtained"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input year obtained',
                      label: 'Year Obtained',
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
                name="month_expired"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input month expired',
                      label: 'Month Expired',
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
                name="year_expired"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input year expired',
                      label: 'Year Expired',
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
                name="url"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input your url',
                      label: 'URL',
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
                name="description"
                render={({ field, fieldState }) => (
                  <TextInput
                    props={{
                      field,
                      fieldState,
                      type: 'text',
                      placeHolder: 'Input your description',
                      label: 'Description',
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

export default ModalInputCertificate;
