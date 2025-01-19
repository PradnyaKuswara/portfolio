import HeroSection from './HeroSection';

function HomePage() {
  return (
    <>
      <HeroSection></HeroSection>
      <div className="max-w-screen-lg mx-6 lg:mx-auto pt-0 pb-10 lg:ptb-20 lg:pb-20 2xl:pt-0  2xl:pb-10 ">
        <section
          className="flex flex-col justify-center items-center text-center gap-4 mt-20"
          data-aos="fade-up"
        >
          <div className="badge badge-primary">
            <span className="text-xs">Featured</span>
          </div>
          <h1 className="text-3xl lg:text-4xl night:text-red font-extrabold">
            I Like Building Things
          </h1>
          <p className="leading-7 lg:leading-7 max-w-xl text-sm">
            During my free time, I like to build things that I find interesting.
            I like to learn new things and experiment with new technologies. I
            like to build things that I can use in my daily life. I like to
            build things that I can share with others.
          </p>
        </section>
      </div>
    </>
  );
}

export default HomePage;
