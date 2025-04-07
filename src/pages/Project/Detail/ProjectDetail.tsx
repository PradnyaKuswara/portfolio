import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Metadata from '../../../components/Metadata';
import useProjectDetailViewModel from './useProjectDetailViewModel';
import { useLoadingBar } from 'react-top-loading-bar';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, isValidating } = useProjectDetailViewModel(slug);
  const { start, complete } = useLoadingBar();

  useEffect(() => {
    if (isValidating) {
      start();
    } else {
      complete();
    }
  }, [isValidating, start, complete]);

  return (
    <React.Fragment>
      <Metadata>
        <title>{project?.data?.title}</title>
      </Metadata>
      {project?.data ? (
        <div className="min-h-screen py-28 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1
              className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {project?.data?.title}
            </h1>
            <img src={project?.data?.image} alt="" />
            <p
              className="mt-2 leading-relaxed"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {project?.data?.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen py-28 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto flex justify-center items-center">
          Project not found, sorry.
        </div>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
