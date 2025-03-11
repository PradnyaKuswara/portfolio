
import { useMemo } from 'react'
import { DefaultProject, ProjectSchema } from '../../../shared/schemas/ProjectSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ProjectNamespace from '../../../@types/project';
import { storeProject, updateProject } from '../../../rest/ProjectRest';

const useModalInputProjectViewModel = () => {
  const schema = useMemo(() => {
    return ProjectSchema();
  }, [])

  const form = useForm(
    {
      mode: "all",
      resolver: yupResolver(schema),
      defaultValues: DefaultProject
    }
  )

  const onSubmit = async ({ payload }: { payload: ProjectNamespace.bodyType }) => {
    try {
      const response = await storeProject(payload);
      return response
    } catch (error) {
      return error
    }
  }

  const onEdit = async ({ payload }: { payload: ProjectNamespace.bodyType }) => {
    try {
      const response = await updateProject(payload);
      return response
    }
    catch (error) {
      return error
    }
  }

  return {
    form,
    onSubmit,
    onEdit
  }

}

export default useModalInputProjectViewModel
