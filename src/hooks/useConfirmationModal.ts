import { useSetRecoilState } from 'recoil';
import { ConfirmationModalAtom } from '../shared/atoms/atom';

export const useConfirmationModal = () => {
  const setModalState = useSetRecoilState(ConfirmationModalAtom);

  const openModal = (action: () => void) => {
    setModalState({
      isOpen: true,
      onConfirm: action,
    });
  };

  const closeModal = () => {
    setModalState(
      (prev: { isOpen: boolean; onConfirm: (() => void) | null }) => ({
        ...prev,
        isOpen: false,
      })
    );
  };

  const confirm = () => {
    setModalState(
      (prev: { isOpen: boolean; onConfirm: (() => void) | null }) => {
        const { onConfirm } = prev;
        if (onConfirm) {
          onConfirm();
        }
        return { ...prev, isOpen: false };
      }
    );
  };

  return {
    openModal,
    closeModal,
    confirm,
  };
};
