import { useRecoilValue } from 'recoil';
import {
  ConfirmationModalAtom,
  ModalInputCertificateAtom,
  ModalInputProjectAtom,
  ModalInputProjectCategoryAtom,
} from '../../shared/atoms/atom';
import React, { Suspense } from 'react';

const ModalConfirmation = React.lazy(
  () => import('./ModalConfirmation/ConfirmationModal')
);

const ModalInputCertificate = React.lazy(
  () => import('./ModalCertificate/ModalInputCertificate')
);

const ModalInputProjectCategory = React.lazy(
  () => import('./ModalProjectCategory/ModalInputProjectCategory')
);

const ModalInputProject = React.lazy(
  () => import('./ModalProject/ModalInputProject')
);

export default function ModalContainer() {
  const valueModalConfirmation = useRecoilValue(ConfirmationModalAtom);
  const valueModalInputCertificate = useRecoilValue(ModalInputCertificateAtom);
  const valueModalInputProjectCategory = useRecoilValue(
    ModalInputProjectCategoryAtom
  );
  const valueModalInputProject = useRecoilValue(ModalInputProjectAtom);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {valueModalConfirmation.isOpen && <ModalConfirmation />}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {valueModalInputCertificate.isOpen && <ModalInputCertificate />}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {valueModalInputProjectCategory.isOpen && <ModalInputProjectCategory />}
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        {valueModalInputProject.isOpen && <ModalInputProject />}
      </Suspense>
    </>
  );
}
