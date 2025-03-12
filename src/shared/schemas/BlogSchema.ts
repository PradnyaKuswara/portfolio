import * as yup from 'yup';

export const BlogSchema = () => {
  return yup.object().shape({
    title: yup.string()
      .required('Title is required')
      .min(2, 'Title must be at least 2 characters long'),
    content: yup.string()
      .required('Content is required')
      .min(2, 'Content must be at least 2 characters long'),
    tags: yup.string().required('Tag is required'),
    meta_desc: yup.string()
      .required('Meta description is required')
      .min(2, 'Meta description must be at least 2 characters long'),
    meta_keyword: yup.string()
      .required('Meta keyword is required')
      .min(2, 'Meta keyword must be at least 2 characters long'),
    thumbnail: yup.string().required('Image is required'),
  });
}

export const DefaultBlog = {
  title: '',
  content: '',
  tags: '',
  meta_desc: '',
  meta_keyword: '',
  thumbnail: ''
}