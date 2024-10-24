import { FileText, GitHub, Linkedin } from "react-feather";
import { Button } from "./ui/moving-border";
import { useTheme } from "../../providers/theme-provider";
import Link from "next/link";
import BoxReveal from "./ui/box-reveal";
import Marquee from "./ui/marquee";
import {
  AlpinejsOriginal,
  BootstrapOriginal,
  Css3Original,
  Html5Original,
  LaravelOriginal,
  MysqlOriginalWordmark,
  ReactOriginal,
  TailwindcssOriginal,
} from "devicons-react";
import Meteors from "./ui/meteor";

const HeroSection = () => {
  const { theme } = useTheme();

  let backgroundColor = theme == "light" ? "#FFFFFF" : "#00000";

  return (
    <>
      <div
        className={`${backgroundColor} min-h-screen relative w-full overflow-hidden rounded-md`}
      >
        <Meteors number={50} />
        <div className="pt-36 lg:pt-48 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
          <div className="flex flex-col gap-4">
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <h1>Hi!</h1>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <h1 className="text-4xl  font-bold">
                You can call me <span className="text-primary">Kuswara.</span>
                👋
              </h1>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <p className="text-lg">Web Developer</p>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <p className="lg:leading-7">
                {/* description */}
                I&apos;m a web developer based in Bali, Indonesia. I&apos;m
                passionate about web development and I love to learn new things.
                I&apos;m currently working as a freelance web developer.
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <div className="flex gap-4">
                <Link
                  href="/projects"
                  className="hover:scale-110 transition-all"
                >
                  <Button
                    borderRadius="0.8rem"
                    className="bg-transparent text-primary  dark:text-accent   "
                    borderClassName="border-accent"
                  >
                    My Portfolio
                  </Button>
                </Link>
                <Link href="/about" className="hover:scale-110 transition-all">
                  <Button
                    borderRadius="0.8rem"
                    className="bg-secondary border-none  dark:text-accent "
                    borderClassName="border-accent"
                    duration={1}
                  >
                    About Me
                  </Button>
                </Link>
              </div>
            </BoxReveal>

            <div className="flex flex-wrap gap-4 mt-2">
              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <Link
                  href="https://drive.google.com/file/d/1wt_CXmcLNoT8sE2w1cX8xPtl-Sm6VVjX/view?usp=sharing"
                  className="hover:text-primary"
                >
                  <div className="flex gap-2 items-center">
                    <FileText className="w-5 h-5"></FileText>
                    <span className=" text-sm">Resume</span>
                  </div>
                </Link>
              </BoxReveal>
              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <Link
                  href="https://github.com/PradnyaKuswara"
                  className="hover:text-primary"
                >
                  <div className="flex gap-2 items-center">
                    <GitHub className="w-5 h-5"></GitHub>
                    <span className=" text-sm">Pradnya Kuswara</span>
                  </div>
                </Link>
              </BoxReveal>
              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <Link
                  href="https://www.linkedin.com/in/pradnya-kuswara/"
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
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <Html5Original size="60" />
                </BoxReveal>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <Css3Original size="60" />
                </BoxReveal>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <BootstrapOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <TailwindcssOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <LaravelOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <ReactOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <AlpinejsOriginal size="60" />
                </BoxReveal>
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
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
