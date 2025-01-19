import React from 'react';
import { cn } from '../../libs/utils';
import { DotPattern } from '../../components/UI/dot-pattern';

const AboutPage: React.FC = () => {
  return (
    <>
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
            <h1 className="text-4xl">About</h1>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
              I Gusti Ngurah A Pradnya Kuswara
            </h1>
            <p className="leading-relaxed lg:leading-7">
              I am a web developer based in Bali, Indonesia. I am passionate
              about web development and I love to learn new things. I am
              currently working as a freelance web developer.
            </p>
            <p className="leading-relaxed lg:leading-7">
              I am a web developer based in Bali, Indonesia. I am passionate
              about web development and I love to learn new things. I am
              currently working as a freelance web developer.
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
            Certificate
          </h1>

          {/* <FetchCertificates></FetchCertificates> */}
        </section>
        <section className="mt-10" data-aos="fade-up" data-aos-delay="100">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text">
            Contact
          </h1>
          <div className="flex flex-col gap-4 mt-4">
            <p className="leading-relaxed">
              Do contact me if you need my opinion about web development. I’ll
              be happy to help! (find my email in the footer)
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
