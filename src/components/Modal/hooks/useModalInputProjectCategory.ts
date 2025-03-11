import ProjectCategoryNamespace from '../../../@types/project-category';
import { ModalInputProjectCategoryAtom } from '../../../shared/atoms/atom';
import { useRecoilState } from 'recoil';

const useModalInputProjectCategory = () => {
  const [modalState, setModalState] = useRecoilState(ModalInputProjectCategoryAtom);
  const openModal = () => {
    setModalState({
      isOpen: true,
      isEdit: false,
      data: null
    });
  };

  const editModal = (data: ProjectCategoryNamespace.ProjectCategory) => {
    setModalState({
      isOpen: true,
      isEdit: true,
      data: data
    });
  }

  const closeModal = () => {
    setModalState(
      (prev: { isOpen: boolean; isEdit: boolean; }) => ({
        ...prev,
        isOpen: false,
        isEdit: false,
        data: null
      })
    );
  };

  return {
    openModal,
    closeModal,
    editModal,
    modalState
  };
}

export default useModalInputProjectCategory
