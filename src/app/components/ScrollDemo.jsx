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
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 mt-5 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-8 lg:mb-12">Speech Division</h1>
            <img
              src="/images/speech1.webp"
              alt="speech division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">50+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active members</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">20+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Workshops organized</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">80%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Competition success rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-10 lg:bottom-12 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Public speaking<br />Confident expression
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Workshops<br />Competitions<br />Peer coaching
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Confidence in speaking<br />Storytelling techniques<br />Persuasive communication
            </p>
          </div>
        </section>

        {/* Speech Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl font-extrabold mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC Speech nurtures confident speakers who can inspire, persuade, and express themselves effectively
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 md:gap-12 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/speech2.webp"
                alt="A person giving a passionate speech"
                className="rounded-lg shadow-2xl max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                Many members initially find public speaking intimidating. At UESC Speech, members are guided through structured exercises and hands-on workshops to overcome stage fright, build self-confidence, and refine their communication skills. Members learn how to organize ideas clearly, adapt their delivery to different audiences, and harness their unique voice to make a lasting impression.
              </p>
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl">
                Beyond technical skills, Speech also fosters creativity and critical thinking. Members explore storytelling techniques, persuasive strategies, and the art of emotional engagement. Through competitions and peer coaching, they receive constructive feedback and learn to continuously improve, which positively impacts their academic, social, and professional life.
              </p>
            </div>
          </div>
        </section>

        {/* Debate Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-8 lg:mb-12">Debate Division</h1>
            <img
              src="/images/debate1.webp"
              alt="debate division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">60+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active debaters</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">15</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Tournaments participated</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">70%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Average success rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-10 lg:bottom-12 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Logical thinking<br />Persuasive skills
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Debates<br />Strategy sessions<br />Team training
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Critical thinking<br />Persuasive communication<br />Structured argumentation
            </p>
          </div>
        </section>

        {/* Debate Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl font-extrabold mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC Debate develops critical thinkers who can analyze, articulate, and persuade with confidence
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 md:gap-12 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/debate2.webp"
                alt="Two teams engaged in a debate"
                className="rounded-lg shadow-2xl max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                UESC Debate empowers members to examine complex issues critically, construct coherent arguments, and communicate ideas persuasively. Through training sessions, practice debates, and tournaments, members learn how to research thoroughly, identify logical fallacies, and present arguments in a compelling manner. Each session challenges members to think strategically and respond dynamically to opposing viewpoints.
              </p>
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl">
                The skills acquired in Debate extend beyond competitions. Members apply critical thinking and persuasive communication to academic projects, community engagement, and professional settings. The division cultivates intellectually agile individuals who can articulate ideas clearly, influence effectively, and approach challenges with strategic insight.
              </p>
            </div>
          </div>
        </section>

        {/* Scrabble Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-8 lg:mb-12">Scrabble Division</h1>
            <img
              src="/images/scrabble1.webp"
              alt="scrabble division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">30+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active players</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">50+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Tournaments organized</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">90%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Member retention rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-10 lg:bottom-12 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Vocabulary<br />Strategy development
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Scrabble games<br />Tournaments<br />Training
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Word knowledge<br />Strategic thinking<br />Analytical skills
            </p>
          </div>
        </section>

        {/* Scrabble Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl font-extrabold mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC Scrabble transforms language learning into strategic thinking and problem-solving
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 md:gap-12 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/scrabble2.webp"
                alt="A close-up of a Scrabble board with a high-scoring word"
                className="rounded-lg shadow-2xl max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                Scrabble at UESC is more than a game; it is a platform for expanding vocabulary, enhancing strategic thinking, and sharpening problem-solving skills. Members learn to recognize patterns, identify high-value plays, and anticipate opponents’ moves. Each game is a mental exercise in creativity, planning, and adaptability, encouraging members to think several steps ahead.
              </p>
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl">
                The division emphasizes both competition and collaboration. Through tournaments, team games, and workshops, members gain exposure to different play styles and strategies. UESC Scrabble empowers participants to think creatively, reason logically, and engage with challenges in a structured yet fun way.
              </p>
            </div>
          </div>
        </section>

        {/* MUN Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold mb-8 lg:mb-12">MUN Division</h1>
            <img
              src="/images/mun1.webp"
              alt="mun division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">40+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active delegates</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">10+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Conferences attended</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">85%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Resolution success rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-10 lg:bottom-12 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Diplomacy<br />International understanding
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight mb-4 lg:mb-6">
              Model UN simulations<br />Workshops<br />Research
            </p>

            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Negotiation<br />Research<br />Public speaking
            </p>
          </div>
        </section>

        {/* MUN Explanation Panel */}
        <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl font-extrabold mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
            UESC MUN trains delegates to understand global issues, negotiate, and develop leadership skills
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 md:gap-12 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/mun2.webp"
                alt="MUN delegates in a conference setting"
                className="rounded-lg shadow-2xl max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                In UESC MUN, members engage in simulations of the United Nations, representing countries and negotiating resolutions. Members develop a deep understanding of international relations, diplomacy, and global issues. Each session emphasizes research, strategy, and collaborative problem-solving, honing critical thinking and negotiation skills.
              </p>
              <p className="text-base 2xl:text-xl text-gray-300 leading-relaxed max-w-3xl">
                Beyond knowledge, MUN strengthens leadership, communication, and teamwork. Delegates learn to articulate positions clearly, work with diverse teams, and craft resolutions that address complex challenges. These experiences cultivate capable and confident individuals ready to take on real-world leadership roles.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
