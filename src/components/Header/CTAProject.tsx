import React from 'react';
import {
  IconAddressBook,
  IconBrandGithub,
  IconDots,
  IconPaperclip,
  IconShare3,
  IconClipboard,
} from '@tabler/icons-react';
import ProjectNamespace from '../../@types/project';
import moment from 'moment';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

interface CTAProjectProps {
  project?: ProjectNamespace.Project;
}

const CTAProject: React.FC<CTAProjectProps> = ({ project }) => {
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link disalin ke clipboard!');
  };

  return (
    <div className="border-t border-b py-3 px-4 flex items-center justify-between text-gray-600 w-full">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <p className="text-sm dark:text-gray-400">
          <span>
            {project?.createdAt
              ? new Date(project.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </span>
          <span className="text-gray-400 italic ml-2">
            ({moment(project?.createdAt).fromNow()})
          </span>
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {project?.link_github && (
          <a
            href={project.link_github}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-gray-800"
          >
            <IconBrandGithub size={20} />
          </a>
        )}
        {project?.link_project && (
          <a
            href={project.link_project}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-gray-800"
          >
            <IconPaperclip size={20} />
          </a>
        )}
        {project?.link_documentation && (
          <a
            href={project.link_documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-gray-800"
          >
            <IconAddressBook size={20} />
          </a>
        )}

        {/* Share Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer hover:text-gray-800"
          >
            <IconShare3 size={20} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-4 shadow-lg flex flex-col gap-2"
          >
            <li>
              <FacebookShareButton
                url={url}
                className="flex items-center gap-2"
              >
                <FacebookIcon size={28} round />
                <span>Bagikan ke Facebook</span>
              </FacebookShareButton>
            </li>
            <li>
              <TwitterShareButton url={url} className="flex items-center gap-2">
                <TwitterIcon size={28} round />
                <span>Bagikan ke Twitter</span>
              </TwitterShareButton>
            </li>
            <li>
              <WhatsappShareButton
                url={url}
                className="flex items-center gap-2"
              >
                <WhatsappIcon size={28} round />
                <span>Bagikan ke WhatsApp</span>
              </WhatsappShareButton>
            </li>
            <li>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1"
              >
                <IconClipboard size={20} />
                <span>Salin tautan</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="cursor-pointer hover:text-gray-800">
          <IconDots size={20} />
        </div>
      </div>
    </div>
  );
};

export default CTAProject;
