import { useRecoilValue } from 'recoil';
import {
  ConfirmationModalAtom,
  ModalInputCertificateAtom,
} from '../../shared/atoms/atom';
import React, { Suspense } from 'react';

const ModalConfirmation = React.lazy(
  () => import('./ConfirmationModal/ConfirmationModal')
);

const ModalInputCertificate = React.lazy(
  () => import('./ModalCertificate/ModalInputCertificate')
);

export default function ModalContainer() {
  const valueModalConfirmation = useRecoilValue(ConfirmationModalAtom);
  const valueModalInputCertificate = useRecoilValue(ModalInputCertificateAtom);

  console.log(valueModalInputCertificate);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {valueModalConfirmation.isOpen && <ModalConfirmation />}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {valueModalInputCertificate.isOpen && <ModalInputCertificate />}
      </Suspense>
    </>
  );
}
