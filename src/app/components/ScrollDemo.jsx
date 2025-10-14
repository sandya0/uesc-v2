'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': function () {
          const sections = gsap.utils.toArray('.horizontal-panel');
          if (containerRef.current) {
            containerRef.current.style.width = `${sections.length * 100}%`;
          }
          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: '.horizontal-container',
              pin: true,
              scrub: 0.1,
              end: () => '+=' + containerRef.current.offsetWidth,
            },
          });
        },
        '(max-width: 1023px)': function () {
          if (containerRef.current) {
            containerRef.current.style.width = '100%';
          }
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        ref={containerRef}
        className="horizontal-container flex flex-wrap lg:flex-nowrap lg:h-screen overflow-y-auto lg:overflow-y-hidden lg:overflow-x-hidden"
      >
        {/* Speech Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 relative">
          <div className="text-center w-full">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-6 sm:mb-8 lg:mb-12">Speech Division</h1>
            <img
              src="/images/speech3.webp"
              alt="speech division"
              className="rounded-lg shadow-lg mx-auto mb-6 sm:mb-8 lg:mb-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20 flex-wrap sm:flex-nowrap">
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">25+</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Active members</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">2-3</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Workshops attended</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">75%</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Confidence improved</p>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:absolute lg:right-6 xl:right-10 lg:bottom-6 xl:bottom-12 text-center lg:text-right w-full lg:w-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-2">
              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Focus</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Public speaking<br />Confident expression
                </p>
              </div>

              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Activities</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Workshops<br />Competitions<br />Peer coaching
                </p>
              </div>

              <div>
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Skills Developed</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Confidence in speaking<br />Storytelling techniques<br />Persuasive communication
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Speech Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-extrabold mb-6 sm:mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC Speech nurtures confident speakers who can inspire, persuade, and express themselves effectively
          </h1>
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/speech5.webp"
                alt="A person giving a passionate speech"
                className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl mb-4 sm:mb-6 lg:mb-8">
                Many members initially find public speaking intimidating. At UESC Speech, members are guided through structured exercises and hands-on workshops to overcome stage fright, build self-confidence, and refine their communication skills. Members learn how to organize ideas clearly, adapt their delivery to different audiences, and harness their unique voice to make a lasting impression.
              </p>
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl">
                Beyond technical skills, Speech also fosters creativity and critical thinking. Members explore storytelling techniques, persuasive strategies, and the art of emotional engagement. Through competitions and peer coaching, they receive constructive feedback and learn to continuously improve, which positively impacts their academic, social, and professional life.
              </p>
            </div>
          </div>
        </section>

        {/* Debate Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 relative">
          <div className="text-center w-full">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-6 sm:mb-8 lg:mb-12">Debate Division</h1>
            <img
              src="/images/debate3.webp"
              alt="debate division"
              className="rounded-lg shadow-lg mx-auto mb-6 sm:mb-8 lg:mb-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20 flex-wrap sm:flex-nowrap">
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">15+</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Active debaters</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">3-5</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Tournaments participated</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">15+</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Motions discussed</p>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:absolute lg:right-6 xl:right-10 lg:bottom-6 xl:bottom-12 text-center lg:text-right w-full lg:w-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-2">
              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Focus</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Logical thinking<br />Persuasive skills
                </p>
              </div>

              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Activities</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Debates<br />Strategy sessions<br />Team training
                </p>
              </div>

              <div>
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Skills Developed</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Critical thinking<br />Persuasive communication<br />Structured argumentation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Debate Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-extrabold mb-6 sm:mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC Debate develops critical thinkers who can analyze, articulate, and persuade with confidence
          </h1>
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/debate4.webp"
                alt="Two teams engaged in a debate"
                className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl mb-4 sm:mb-6 lg:mb-8">
                UESC Debate empowers members to examine complex issues critically, construct coherent arguments, and communicate ideas persuasively. Through training sessions, practice debates, and tournaments, members learn how to research thoroughly, identify logical fallacies, and present arguments in a compelling manner. Each session challenges members to think strategically and respond dynamically to opposing viewpoints.
              </p>
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl">
                The skills acquired in Debate extend beyond competitions. Members apply critical thinking and persuasive communication to academic projects, community engagement, and professional settings. The division cultivates intellectually agile individuals who can articulate ideas clearly, influence effectively, and approach challenges with strategic insight.
              </p>
            </div>
          </div>
        </section>

        {/* Scrabble Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 relative">
          <div className="text-center w-full">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-6 sm:mb-8 lg:mb-12">Scrabble Division</h1>
            <img
              src="/images/scrabble3.webp"
              alt="scrabble division"
              className="rounded-lg shadow-lg mx-auto mb-6 sm:mb-8 lg:mb-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20 flex-wrap sm:flex-nowrap">
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">30+</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Active players</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">5+</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Tournaments participated</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">70%</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Member retention rate</p>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:absolute lg:right-6 xl:right-10 lg:bottom-6 xl:bottom-12 text-center lg:text-right w-full lg:w-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-2">
              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Focus</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Vocabulary<br />Strategy development
                </p>
              </div>

              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Activities</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Scrabble games<br />Tournaments<br />Training
                </p>
              </div>

              <div>
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Skills Developed</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Word knowledge<br />Strategic thinking<br />Analytical skills
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scrabble Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-extrabold mb-6 sm:mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC Scrabble transforms language learning into strategic thinking and problem-solving
          </h1>
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/scrabble4.webp"
                alt="A close-up of a Scrabble board with a high-scoring word"
                className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl mb-4 sm:mb-6 lg:mb-8">
                Scrabble at UESC is more than a game; it is a platform for expanding vocabulary, enhancing strategic thinking, and sharpening problem-solving skills. Members learn to recognize patterns, identify high-value plays, and anticipate opponents' moves. Each game is a mental exercise in creativity, planning, and adaptability, encouraging members to think several steps ahead.
              </p>
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl">
                The division emphasizes both competition and collaboration. Through tournaments, team games, and workshops, members gain exposure to different play styles and strategies. UESC Scrabble empowers participants to think creatively, reason logically, and engage with challenges in a structured yet fun way.
              </p>
            </div>
          </div>
        </section>

        {/* MUN Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 relative">
          <div className="text-center w-full">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-6 sm:mb-8 lg:mb-12">MUN Division</h1>
            <img
              src="/images/mun3.webp"
              alt="mun division"
              className="rounded-lg shadow-lg mx-auto mb-6 sm:mb-8 lg:mb-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
            />
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20 flex-wrap sm:flex-nowrap">
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">20+</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Active delegates</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">2-4</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Conferences attended</p>
              </div>
              <div className="w-1/3 sm:w-auto">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">70%</h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">Resolution success rate</p>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:absolute lg:right-6 xl:right-10 lg:bottom-6 xl:bottom-12 text-center lg:text-right w-full lg:w-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-2">
              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Focus</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Diplomacy<br />International understanding
                </p>
              </div>

              <div className="lg:mb-4 xl:mb-6">
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Activities</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Model UN simulations<br />Workshops<br />Research
                </p>
              </div>

              <div>
                <p className="text-gray-400 uppercase text-xs sm:text-sm mb-1 lg:mb-2">Skills Developed</p>
                <p className="font-semibold text-sm sm:text-base lg:text-lg xl:text-xl leading-tight">
                  Negotiation<br />Research<br />Public speaking
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MUN Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-extrabold mb-6 sm:mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC MUN trains delegates to understand global issues, negotiate, and develop leadership skills
          </h1>
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/mun4.webp"
                alt="MUN delegates in a conference setting"
                className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl mb-4 sm:mb-6 lg:mb-8">
                In UESC MUN, members engage in simulations of the United Nations, representing countries and negotiating resolutions. Members develop a deep understanding of international relations, diplomacy, and global issues. Each session emphasizes research, strategy, and collaborative problem-solving, honing critical thinking and negotiation skills.
              </p>
              <p className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl">
                Beyond knowledge, MUN strengthens leadership, communication, and teamwork. Delegates learn to articulate positions clearly, work with diverse teams, and craft resolutions that address complex challenges. These experiences cultivate capable and confident individuals ready to take on real-world leadership roles.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}