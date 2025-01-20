import React from 'react';
import { cn } from '../../libs/utils';
import { DotPattern } from '../../components/UI/dot-pattern';
import { useTranslation } from 'react-i18next';
import useAboutViewModel from './useAboutViewModel';
import { HoverEffectSertificate } from '../../components/UI/card-hover-effect-sertificate';
import MetadataAboutPage from './MetadataAboutPage';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const { certificates, totalPages, currentPage, onPageChange } =
    useAboutViewModel();
  return (
    <>
      <MetadataAboutPage />
      <div className="min-h-screen py-36 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]'
          )}
        />
        <section className="grid lg:grid-cols-12 place-items-center  gap-4">
          <div
            className="lg:col-span-8 flex flex-col gap-4"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h1 className="text-4xl">{t('about-page.title')}</h1>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
              {t('words.full-name-2')}
            </h1>
            <p className="leading-relaxed lg:leading-7">
              {t('about-page.section-about.description')}
            </p>
            <p className="leading-relaxed lg:leading-7">
              {t('about-page.section-about.description-2')}
            </p>
          </div>
          <div
            className="lg:col-span-4"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <img
              src="/assets/images/user.jpg"
              alt="image-user"
              className="rounded-md"
            ></img>
          </div>
        </section>

        <section className="mt-20" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
            {t('about-page.section-certificate.title')}
          </h1>

          {certificates && certificates.data.length > 0 ? (
            <div>
              {' '}
              <HoverEffectSertificate
                items={certificates.data}
              ></HoverEffectSertificate>{' '}
            </div>
          ) : (
            <div className="text-center text-lg font-bold mt-10">
              {' '}
              Certificate not found 😢{' '}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center">
            {certificates && certificates.total > 6 && (
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
        <section className="mt-10" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
            {t('about-page.section-contact.title')}
          </h1>
          <div className="flex flex-col gap-4 mt-4">
            <p className="leading-relaxed">
              {t('about-page.section-contact.description')}
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
