import React, { useEffect } from 'react';
import useListProjectViewModel from './useListProjectViewModel';
import useModalInputProject from '../../../components/Modal/hooks/useModalInputProject';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import toast from 'react-hot-toast';
import ProjectTable from './ProjectTable';
import { Pagination } from '@mui/material';

const ProjectPage: React.FC = () => {
  const {
    projects,
    isValidating,
    onDelete,
    refetch,
    currentPage,
    totalPages,
    onSearch,
    startIndex,
    endIndex,
    onPageChange,
    onChangeStatus,
  } = useListProjectViewModel();

  const { openModal, editModal } = useModalInputProject();
  const [loading, setLoading] = useGlobalLoading();

  useEffect(() => {
    setLoading(isValidating);
  }, [isValidating, setLoading]);

  const handleDelete = async (slug: string) => {
    if (loading) return;
    setLoading(true);

    const res = await onDelete(slug);

    if (res instanceof Error) {
      setLoading(false);
      toast.error(res.message);
      return;
    }

    setLoading(false);
    toast.success('Delete project category success');
    refetch();
  };

  const handleChangeStatus = async (slug: string) => {
    if (loading) return;
    setLoading(true);

    const res = await onChangeStatus(slug);

    if (res instanceof Error) {
      setLoading(false);
      toast.error(res.message);
      return;
    }

    setLoading(false);
    toast.success('Update project category success');
    refetch();
  };

  return (
    <React.Fragment>
      <div className="card shadow-sm border border-spacing-1 border-neutral-content rounded-sm mt-2">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="w-8/12">
              <label className="input input-bordered flex items-center gap-2 input-sm rounded-sm">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSearch(e.currentTarget.value);
                    }
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
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
            <ProjectTable
              data={projects?.data}
              editModal={editModal}
              handleDelete={handleDelete}
              handleChangeStatus={handleChangeStatus}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <span className="text-xs text-primary-content">
                Showing {startIndex + 1}-{endIndex} of {projects?.total} entries
              </span>
            </div>
            <div>
              <Pagination
                count={totalPages}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                defaultPage={currentPage}
                color="primary"
                onChange={(_, page) => onPageChange(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectPage;
