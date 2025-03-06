import React, { useEffect } from 'react';
import CertificateTable from './CertificateTable';
import useListCertificateViewModel from './useListCertificateViewModel';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import useModalInputCertificate from '../../../components/Modal/hooks/useModalInputCertificate';

const CertificatePage: React.FC = () => {
  const { certificates, isValidating } = useListCertificateViewModel();
  const { openModal } = useModalInputCertificate();
  const [, setLoading] = useGlobalLoading();

  useEffect(() => {
    setLoading(isValidating);
  }, [isValidating, setLoading]);

  return (
    <>
      <div className="card shadow-lg border border-spacing-1 border-neutral-content rounded-sm mt-2">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="w-8/12">
              <label className="input input-bordered flex items-center gap-2 input-sm rounded-sm">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-accent text-primary-content rounded-md">
                Download
              </button>
              <button
                className="btn btn-sm btn-primary rounded-md"
                onClick={() => openModal()}
              >
                + Add Data
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <CertificateTable data={certificates?.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificatePage;
