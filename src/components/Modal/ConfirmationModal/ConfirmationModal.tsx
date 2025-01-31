import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { ConfirmationModalAtom } from '../../../shared/atoms/atom';

const ConfirmationModal: React.FC = () => {
  const { isOpen, onConfirm } = useRecoilValue(ConfirmationModalAtom);
  const resetModalState = useResetRecoilState(ConfirmationModalAtom);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    resetModalState(); // Reset state modal setelah konfirmasi
  };

  const handleCancel = () => {
    resetModalState(); // Reset state modal setelah membatalkan
  };

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" p-6 rounded shadow-lg w-96 bg-base-100">
        <h2 className="text-lg font-semibold">Are you sure?</h2>
        <p className="mt-2">Do you really want to perform this action?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2  rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
