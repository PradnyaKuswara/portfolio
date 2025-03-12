import { ModalInputBlogAtom } from '../../../shared/atoms/atom';
import { useRecoilState } from 'recoil';
import ArticleNamespace from '../../../@types/article';

const useModalInputBlog = () => {
  const [modalState, setModalState] = useRecoilState(ModalInputBlogAtom);

  const openModal = () => {
    setModalState({
      isOpen: true,
      isEdit: false,
      data: null
    });
  };

  const editModal = (data: ArticleNamespace.Article) => {
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

export default useModalInputBlog
