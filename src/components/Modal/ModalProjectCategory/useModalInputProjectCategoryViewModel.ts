import { useMemo } from 'react'
import { DefaultProjectCategory, ProjectCategorySchema } from '../../../shared/schemas/ProjectCategorySchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProjectCategoryNamespace from '../../../@types/project-category';
import { storeProjectCategory, updateProjectCategory } from '../../../rest/ProjectCategory';

const useModalInputProjectCategoryViewModel = () => {
  const schema = useMemo(() => {
    return ProjectCategorySchema();
  }, [])

  const form = useForm(
    {
      mode: "all",
      resolver: yupResolver(schema),
      defaultValues: DefaultProjectCategory
    }
  )

  const onSubmit = async ({ payload }: { payload: ProjectCategoryNamespace.bodyType }) => {
    try {
      const response = await storeProjectCategory(payload);
      return response
    } catch (error) {
      return error
    }
  }

  const onEdit = async ({ payload }: { payload: ProjectCategoryNamespace.bodyType }) => {
    try {
      const response = await updateProjectCategory(payload);
      return response
    }
    catch (error) {
      return
    }
  }

  return {
    form,
    onSubmit,
    onEdit,
  }
}

export default useModalInputProjectCategoryViewModel
