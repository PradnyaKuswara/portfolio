import React from 'react';
import useProjectViewModel from './useProjectViewModel';
import { HoverEffectProject } from '../../components/UI/card-hover-effect-project';
import MetadataProjectPage from './MetadataProjectPage';

const ProjectPage: React.FC = () => {
  const { projects, totalPages, currentPage, onPageChange } =
    useProjectViewModel();
  return (
    <>
      <MetadataProjectPage />
      <div className="min-h-screen py-36 lg:py-36 max-w-screen-xl lg:px-24 mx-4 lg:mx-auto">
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text "
          data-aos="fade-right"
          data-aos-delay="100"
        >
          My Projects
        </h1>
        <p className="mt-2" data-aos="fade-right" data-aos-delay="100">
          Showcase of my works{' '}
        </p>
        <section data-aos="fade-up" data-aos-delay="100">
          {projects?.data.length > 0 ? (
            <HoverEffectProject items={projects?.data} />
          ) : (
            <div className="text-center text-lg font-bold mt-10">
              {' '}
              Project not found 😢{' '}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center">
            {projects && projects.total > 6 && (
              <div className="join grid grid-cols-2">
                <button
                  className="join-item btn btn-outline"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  className="join-item btn btn-outline"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectPage;
