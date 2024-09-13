// import React from 'react';
import LinkJoin from "./Linkjoin";

const HeroSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Create interactive quizzes in minutes with Edquiz
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Make a quiz with different question types to engage students in a
            classroom, train, or play trivia with friends
          </p>
          <a
            href="/Login"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>

          {/* Replaced the "Speak to Sales" button with LinkJoin component */}
          <LinkJoin />
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/Images/quizimg.png" alt="mockup" />
        </div>
      </div>
      <div>
        <div id="fq-home-how" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2
              id="fq-home-how-description"
              className="text-2xl font-bold mb-8"
            >
              <b>It’s simple!</b> Here’s how it works
            </h2>
            <div className="flex flex-wrap -mx-4">
              <div
                id="fq-home-how-card-create"
                className="w-full md:w-1/3 px-4 mb-8"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                  <div className="p-4 flex-grow">
                    <img
                      alt="Test Generator"
                      src="Images/Quizlogo2.jpg"
                      className="w-full h-50 object-cover object-center"
                    />
                  </div>
                  <div className="p-6 flex-shrink-0">
                    <h2 className="text-xl font-semibold mb-2">Create</h2>
                    <p>
                      Quickly <b>create great looking tests</b> using multiple
                      question types and formatting options.
                    </p>
                  </div>
                </div>
              </div>
              <div
                id="fq-home-how-card-publish"
                className="w-full md:w-1/3 px-4 mb-8"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                  <div className="p-4 flex-grow">
                    <img
                      alt="Publish"
                      src="Images/Quizlogo3.jpg"
                      className="w-full h-50 object-cover object-center"
                    />
                  </div>
                  <div className="p-6 flex-shrink-0">
                    <h2 className="text-xl font-semibold mb-2">Publish</h2>
                    <p>
                      Tests can either be{" "}
                      <b>
                        published privately to a select group or open them up
                      </b>{" "}
                      to everyone with a single link and registration page.
                    </p>
                  </div>
                </div>
              </div>
              <div
                id="fq-home-how-card-analyze"
                className="w-full md:w-1/3 px-4 mb-8"
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
                  <div className="p-4 flex-grow">
                    <img
                      alt="Analyze"
                      src="Images/Quizlogo4.jpg"
                      className="w-full h-50 object-cover object-center"
                    />
                  </div>
                  <div className="p-6 flex-shrink-0">
                    <h2 className="text-xl font-semibold mb-2">Analyze</h2>
                    <p>
                      EdQuiz instantly marks and grades your tests. Powerful
                      reports then allow you to <b>perform in-depth analysis</b>{" "}
                      across all responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
