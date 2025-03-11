import * as yup from 'yup'

export const ProjectCategorySchema = () => {
  return yup.object().shape({
    name: yup.string().required('Name is required'),
  })
}

export const DefaultProjectCategory = {
  name: '',
}