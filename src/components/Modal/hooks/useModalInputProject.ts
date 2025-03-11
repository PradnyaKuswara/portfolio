import ProjectNamespace from '../../../@types/project';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import { ModalInputProjectAtom } from '../../../shared/atoms/atom';
import { useRecoilState } from 'recoil';

const useModalInputProject = () => {
  const [modalState, setModalState] = useRecoilState(ModalInputProjectAtom);
  const [, setLoading] = useGlobalLoading();
  const openModal = () => {
    setLoading(true);
    setModalState({
      isOpen: true,
      isEdit: false,
      data: null
    });
    setLoading(false);
  };

  const editModal = (data: ProjectNamespace.Project) => {
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

export default useModalInputProject
