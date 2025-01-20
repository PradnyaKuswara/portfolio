import { FileText, GitHub, Linkedin } from 'react-feather';
import {
  AlpinejsOriginal,
  BootstrapOriginal,
  Css3Original,
  Html5Original,
  LaravelOriginal,
  MysqlOriginalWordmark,
  ReactOriginal,
  TailwindcssOriginal,
} from 'devicons-react';
import { useTheme } from '../../hooks/useTheme';
import Meteors from '../../components/UI/meteor';
import BoxReveal from '../../components/UI/box-reveal';
import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/moving-border';
import Marquee from '../../components/UI/marquee';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const backgroundColor = theme == 'light' ? '#FFFFFF' : '#00000';

  return (
    <>
      <div
        className={`${backgroundColor} relative w-full overflow-hidden rounded-md`}
      >
        <Meteors number={50} />
        <div className="pt-36 lg:pt-48 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
          <div className="flex flex-col gap-4">
            <BoxReveal boxColor={'#5046e6'} duration={0.5}>
              <h1>{t('words.Hi')}</h1>
            </BoxReveal>

            <BoxReveal boxColor={'#5046e6'} duration={0.5}>
              <h1 className="text-4xl  font-bold">
                {t('home-page.hero-section.title')}{' '}
                <span className="text-primary">{t('words.name')}</span>
                .👋
              </h1>
            </BoxReveal>

            <BoxReveal boxColor={'#5046e6'} duration={0.5}>
              <p className="text-lg">Web Developer</p>
            </BoxReveal>

            <BoxReveal boxColor={'#5046e6'} duration={0.5}>
              <p className="lg:leading-7">
                {/* description */}
                {t('home-page.hero-section.description')}
              </p>
            </BoxReveal>

            <BoxReveal boxColor={'#5046e6'} duration={0.5}>
              <div className="flex gap-4">
                <Link to="/projects" className="hover:scale-110 transition-all">
                  <Button
                    borderRadius="0.8rem"
                    className="bg-transparent text-primary  dark:text-accent   "
                    borderClassName="border-accent"
                  >
                    {t('home-page.hero-section.cta.cta-1')}
                  </Button>
                </Link>
                <Link to="/about" className="hover:scale-110 transition-all">
                  <Button
                    borderRadius="0.8rem"
                    className="bg-secondary border-none  dark:text-secondary-content "
                    borderClassName="border-accent"
                    duration={1}
                  >
                    {t('home-page.hero-section.cta.cta-2')}
                  </Button>
                </Link>
              </div>
            </BoxReveal>

            <div className="flex flex-wrap gap-4 mt-2">
              <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                <Link
                  to="https://drive.google.com/file/d/1wt_CXmcLNoT8sE2w1cX8xPtl-Sm6VVjX/view?usp=sharing"
                  className="hover:text-primary"
                >
                  <div className="flex gap-2 items-center">
                    <FileText className="w-5 h-5"></FileText>
                    <span className=" text-sm">Resume</span>
                  </div>
                </Link>
              </BoxReveal>
              <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                <Link
                  to="https://github.com/PradnyaKuswara"
                  className="hover:text-primary"
                >
                  <div className="flex gap-2 items-center">
                    <GitHub className="w-5 h-5"></GitHub>
                    <span className=" text-sm">Pradnya Kuswara</span>
                  </div>
                </Link>
              </BoxReveal>
              <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                <Link
                  to="https://www.linkedin.com/in/pradnya-kuswara/"
                  className="hover:text-primary"
                >
                  <div className="flex gap-2 items-center">
                    <Linkedin className="w-5 h-5"></Linkedin>
                    <span className=" text-sm">Pradnya Kuswara</span>
                  </div>
                </Link>
              </BoxReveal>
            </div>
          </div>

          <div className="flex justify-center items-center top-0 bottom-0">
            <div className="mt-10 lg:mt-28">
              <Marquee pauseOnHover className="[--duration:20s]">
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <Html5Original size="60" />
                </BoxReveal>
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <Css3Original size="60" />
                </BoxReveal>
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <BootstrapOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <TailwindcssOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <LaravelOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <ReactOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <AlpinejsOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                  <MysqlOriginalWordmark size="60" />
                </BoxReveal>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
