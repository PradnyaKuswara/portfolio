import * as yup from 'yup'

export const CertificateSchema = () => {
  return yup.object().shape({
    name: yup.string().required('Name is required'),
    organization: yup.string().required('Organization is required'),
    month_obtained: yup.string().required('Month obtained is required'),
    year_obtained: yup.string().required('Year obtained is required'),
    month_expired: yup.string().required('Month expired is required'),
    year_expired: yup.string().required('Year expired is required'),
    url: yup.string().required('URL is required'),
    description: yup.string().required('Description is required'),
  })
}

export const DefaultCertificate = {
  name: '',
  organization: '',
  month_obtained: '',
  year_obtained: '',
  month_expired: '',
  year_expired: '',
  url: '',
  description: '',
}