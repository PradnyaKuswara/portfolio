import { useRecoilValue } from 'recoil';
import {
  ConfirmationModalAtom,
  ModalInputBlogAtom,
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

const ModalInputBlog = React.lazy(() => import('./ModalBlog/ModalInputBlog'));

export default function ModalContainer() {
  const valueModalConfirmation = useRecoilValue(ConfirmationModalAtom);
  const valueModalInputCertificate = useRecoilValue(ModalInputCertificateAtom);
  const valueModalInputProjectCategory = useRecoilValue(
    ModalInputProjectCategoryAtom
  );
  const valueModalInputProject = useRecoilValue(ModalInputProjectAtom);
  const valueModalInputBlog = useRecoilValue(ModalInputBlogAtom);

  const Loading = () => (
    <div className="fixed top-0 left-0 z-[9999999] w-screen h-screen flex items-center justify-center bg-black bg-opacity-20 ">
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  );

  return (
    <>
      <Suspense fallback={<Loading />}>
        {valueModalConfirmation.isOpen && <ModalConfirmation />}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {valueModalInputCertificate.isOpen && <ModalInputCertificate />}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {valueModalInputProjectCategory.isOpen && <ModalInputProjectCategory />}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {valueModalInputProject.isOpen && <ModalInputProject />}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {valueModalInputBlog.isOpen && <ModalInputBlog />}
      </Suspense>
    </>
  );
}
