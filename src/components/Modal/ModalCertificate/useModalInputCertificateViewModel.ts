import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';

import { useMemo } from "react"
import { CertificateSchema, DefaultCertificate } from "../../../shared/schemas/CertificateSchema"
import { storeCertificate, updateCertificate } from "../../../rest/CertificateRest";
import CertificateNamespace from "../../../@types/certificate";


const useModalInputCertificateViewModel = () => {
  const schema = useMemo(() => {
    return CertificateSchema();
  }, [])

  const form = useForm(
    {
      mode: "all",
      resolver: yupResolver(schema),
      defaultValues: DefaultCertificate
    }
  )

  const onSubmit = async ({ payload }: { payload: CertificateNamespace.bodyType }) => {
    try {
      const response = await storeCertificate(payload);
      return response
    } catch (error) {
      return error
    }
  }

  const onEdit = async ({ payload }: { payload: CertificateNamespace.bodyType }) => {
    try {
      const response = await updateCertificate(payload);
      return response
    }
    catch (error) {
      return error
    }
  }

  return {
    form,
    onSubmit,
    onEdit,
  }
}

export default useModalInputCertificateViewModel
