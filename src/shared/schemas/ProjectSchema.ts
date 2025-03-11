import * as yup from 'yup'

export const ProjectSchema = () => {
  return yup.object().shape({
    project_category_id: yup.string().required('Project Category is required'),
    title: yup.string().required('Title is required'),
    image: yup.string().required('Image is required'),
    stack: yup.string().required('Stack is required'),
    description: yup.string().required('Description is required'),
    link_github: yup.string().nullable(),
    link_project: yup.string().nullable(),
    link_documentation: yup.string().nullable(),
    meta_desc: yup.string().required('Meta Description is required'),
    meta_keyword: yup.string().nullable(),
  })
}

export const DefaultProject = {
  project_category_id: '',
  title: '',
  image: '',
  description: '',
  stack: '',
  link_github: '',
  link_project: '',
  link_documentation: '',
  meta_desc: '',
  meta_keyword: '',
}