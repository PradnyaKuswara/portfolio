import { useRecoilValue } from 'recoil';
import { ConfirmationModalAtom } from '../../shared/atoms/atom';
import React, { Suspense } from 'react';

const ModalConfirmation = React.lazy(
  () => import('./ConfirmationModal/ConfirmationModal')
);

export default function ModalContainer() {
  const valueModalConfirmation = useRecoilValue(ConfirmationModalAtom);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {valueModalConfirmation.isOpen && <ModalConfirmation />}
      </Suspense>
    </>
  );
}
