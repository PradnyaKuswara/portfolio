import { useTranslation } from 'react-i18next';
import HeroSection from './HeroSection';
import MetadataHomePage from './MetadataHomePage';

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <MetadataHomePage />
      <HeroSection></HeroSection>
      <div className="max-w-screen-lg mx-6 lg:mx-auto pt-0 pb-10 lg:ptb-20 lg:pb-20 2xl:pt-0  2xl:pb-10 ">
        <section
          className="flex flex-col justify-center items-center text-center gap-4 mt-20"
          data-aos="fade-up"
        >
          <div className="badge badge-primary">
            <span className="text-xs">{t('home-page.section-things.title-header')}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl night:text-red font-extrabold">
            {t('home-page.section-things.title')}
          </h1>
          <p className="leading-relaxed lg:leading-7 max-w-xl text-sm ">
            {t('home-page.section-things.description')}
          </p>
        </section>
      </div>
    </>
  );
}

export default HomePage;
