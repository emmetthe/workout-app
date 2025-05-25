import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="bg-hero bg-no-repeat bg-center bg-cover md:bg-contain 
        dark:bg-dark-bg relative z-10 overflow-hidden bg-white pb-16 pt-[120px] 
        md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="wow fadeInUp mx-auto max-w-[800px] text-center" data-wow-delay=".2s">
                {/* header description */}
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Your Journey Starts Here
                </h1>
                <p className="dark:text-gray-light mb-12 text-base !leading-relaxed text-body-color sm:text-lg md:text-xl">
                  A simple fitness experience for everyone
                </p>

                {/* buttons */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    to="/register"
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
