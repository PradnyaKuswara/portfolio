import React from 'react';
import { GitHub, Linkedin, Mail } from 'react-feather';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="shadow-lg p-4">
        <div className="max-w-screen-xl px-4 py-6 mx-auto space-y-8 overflow-hidden sm:px-6 md:px-8">
          <nav className="flex flex-col flex-wrap items-center justify-center -mx-5 -my-2 gap-4">
            <div className="px-5">
              <p className="text-sm text-center font-bold">
                {t('footer.title')}
              </p>
            </div>
            <div className="px-5 flex gap-6">
              <a
                href="https://github.com/PradnyaKuswara"
                className=""
                target="_blank"
              >
                <span className="sr-only">Github</span>
                <GitHub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/pradnya-kuswara/"
                className=""
                target="_blank"
              >
                <span className="sr-only">Linkedin</span>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:pradnyakuswara24@gmail.com">
                <span className="sr-only">Email</span>
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <div className="px-5">
              <p className="text-sm text-center text-gray-400">
                {new Date().getFullYear()} © {t('footer.description')}.
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Footer;
