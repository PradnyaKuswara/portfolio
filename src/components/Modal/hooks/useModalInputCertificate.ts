import CertificateNamespace from '../../../@types/certificate';
import { ModalInputCertificateAtom } from '../../../shared/atoms/atom';
import { useRecoilState } from 'recoil';

const useModalInputCertificate = () => {
  const [modalState, setModalState] = useRecoilState(ModalInputCertificateAtom);
  const openModal = () => {
    setModalState({
      isOpen: true,
      data: null
    });
  };

  const editModal = (data: CertificateNamespace.Certificate) => {
    setModalState({
      isOpen: true,
      data: data
    });
  }

  const closeModal = () => {
    setModalState(
      (prev: { isOpen: boolean; }) => ({
        ...prev,
        isOpen: false,
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

export default useModalInputCertificate
