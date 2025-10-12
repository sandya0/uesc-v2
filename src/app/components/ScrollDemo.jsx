'use client';

import { useEffect, useRef } from 'react';

export default function HorizontalScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx;

    const loadGSAP = async () => {
      if (!window.gsap) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      if (!window.ScrollTrigger) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
    };

    loadGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        ref={containerRef}
        className="horizontal-container flex flex-wrap lg:flex-nowrap lg:h-screen overflow-y-auto lg:overflow-y-hidden lg:overflow-x-hidden"
      >
        {/* Speech Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl lg:text-8xl font-extrabold mb-8 lg:mb-12">Speech Division</h1>
            <img
              src="/images/speech1.webp"
              alt="speech division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">50+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active members</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">20+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Workshops organized</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">80%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Competition success rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-20 lg:bottom-24 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Public speaking and confident expression</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Workshops, competitions, peer coaching</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Confidence in speaking<br />Storytelling techniques<br />Persuasive communication
            </p>
          </div>
        </section>

        {/* Speech Explanation Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl lg:text-7xl font-extrabold mb-8 lg:mb-12 text-left w-full lg:w-3/4">
            UESC Speech nurtures confident speakers who can inspire, persuade, and express themselves effectively
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/speech2.webp"
                alt="A person giving a passionate speech"
                className="rounded-lg shadow-2xl max-w-md lg:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                Many members initially find public speaking intimidating, often feeling nervous before addressing an audience. At UESC Speech, members are guided through structured exercises and hands-on workshops designed to overcome stage fright, build self-confidence, and refine their communication skills. Members learn how to organize ideas clearly, adapt their delivery to different audiences, and harness their unique voice to make a lasting impression.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                Beyond technical skills, Speech also fosters creativity and critical thinking. Members explore storytelling techniques, persuasive strategies, and the art of emotional engagement. Through competitions and peer coaching, they receive constructive feedback and learn to continuously improve.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl">
                Participation in Speech opens doors to leadership opportunities, helps members articulate their ideas with clarity, and instills a lifelong appreciation for the power of effective communication. Members often find that the confidence and skills they develop here positively impact their academic, social, and professional life.
              </p>
            </div>
          </div>
        </section>

        {/* Debate Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl lg:text-8xl font-extrabold mb-8 lg:mb-12">Debate Division</h1>
            <img
              src="/images/debate1.webp"
              alt="debate division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">60+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active debaters</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">15</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Tournaments participated</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">70%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Average success rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-20 lg:bottom-24 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Logical thinking and persuasive skills</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Debates, strategy sessions, team training</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Critical thinking<br />Persuasive communication<br />Structured argumentation
            </p>
          </div>
        </section>

        {/* Debate Explanation Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl lg:text-7xl font-extrabold mb-8 lg:mb-12 text-left w-full lg:w-3/4">
            UESC Debate develops critical thinkers who can analyze, articulate, and persuade with confidence
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/debate2.webp"
                alt="Two teams engaged in a debate"
                className="rounded-lg shadow-2xl max-w-md lg:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                UESC Debate empowers members to examine complex issues critically, construct coherent arguments, and communicate ideas persuasively. Through training sessions, practice debates, and tournaments, members learn how to research thoroughly, identify logical fallacies, and present arguments in a compelling manner. Each session challenges members to think strategically and respond dynamically to opposing viewpoints.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                Debate at UESC also enhances teamwork and leadership. Members collaborate to prepare arguments, develop strategies, and mentor new participants. This collective experience strengthens their ability to analyze different perspectives, refine their reasoning, and maintain composure under pressure. Over time, members gain confidence not only in public speaking, but in decision-making, problem-solving, and analytical thinking.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl">
                The skills acquired in Debate extend beyond competitions. Members apply critical thinking and persuasive communication to academic projects, community engagement, and professional settings. The division cultivates intellectually agile individuals who can articulate ideas clearly, influence effectively, and approach challenges with strategic insight.
              </p>
            </div>
          </div>
        </section>

        {/* Scrabble Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl lg:text-8xl font-extrabold mb-8 lg:mb-12">Scrabble Division</h1>
            <img
              src="/images/scrabble1.webp"
              alt="scrabble division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">30+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active players</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">50+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Tournaments organized</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">90%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Member retention rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-20 lg:bottom-24 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Vocabulary and strategy development</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Scrabble games, tournaments, training</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Word knowledge<br />Strategic thinking<br />Analytical skills
            </p>
          </div>
        </section>

        {/* Scrabble Explanation Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl lg:text-7xl font-extrabold mb-8 lg:mb-12 text-left w-full lg:w-3/4">
            UESC Scrabble transforms language learning into strategic thinking and problem-solving
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/scrabble2.webp"
                alt="A close-up of a Scrabble board with a high-scoring word"
                className="rounded-lg shadow-2xl max-w-md lg:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                Scrabble at UESC is more than a game; it is a platform for expanding vocabulary, enhancing strategic thinking, and sharpening problem-solving skills. Members learn to recognize patterns, identify high-value plays, and anticipate opponents’ moves. Each game is a mental exercise in creativity, planning, and adaptability, encouraging members to think several steps ahead.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                The division emphasizes both competition and collaboration. Through tournaments, team games, and workshops, members gain exposure to different play styles and strategies. They learn to analyze situations critically, make effective decisions under time constraints, and refine their approach based on experience. Scrabble cultivates patience, focus, and analytical thinking while fostering a sense of camaraderie among participants.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl">
                Beyond improving language skills, members develop transferable skills that support academic success and personal growth. UESC Scrabble empowers participants to think creatively, reason logically, and engage with challenges in a structured yet fun way.
              </p>
            </div>
          </div>
        </section>

        {/* MUN Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-6 lg:px-12 relative">
          <div className="text-center">
            <h1 className="text-5xl lg:text-8xl font-extrabold mb-8 lg:mb-12">MUN Division</h1>
            <img
              src="/images/mun1.webp"
              alt="mun division"
              className="rounded-lg shadow-lg mx-auto mb-8 lg:mb-10 max-w-sm lg:max-w-lg h-auto object-contain"
            />
            <div className="flex justify-center gap-8 lg:gap-20">
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">40+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Active delegates</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">10+</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Conferences attended</p>
              </div>
              <div>
                <h3 className="text-3xl lg:text-5xl font-bold">85%</h3>
                <p className="text-gray-400 text-sm lg:text-base mt-2">Resolution success rate</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:absolute lg:right-20 lg:bottom-24 text-center lg:text-right">
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Focus</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Diplomacy and international understanding</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Activities</p>
            <p className="font-semibold text-lg lg:text-xl mb-4 lg:mb-6">Simulations, trainings, conferences</p>
            <p className="text-gray-400 uppercase text-xs lg:text-sm mb-2">Skills Developed</p>
            <p className="font-semibold text-lg lg:text-xl leading-tight">
              Negotiation<br />Research<br />Public speaking
            </p>
          </div>
        </section>

        {/* MUN Explanation Panel */}
        <section className="horizontal-panel bg-black min-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-6 sm:p-12 lg:pt-24 lg:px-24">
          <h1 className="text-4xl lg:text-7xl font-extrabold mb-8 lg:mb-12 text-left w-full lg:w-3/4">
            UESC MUN equips members with diplomacy, leadership, and global awareness
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap items-center lg:items-end gap-8 lg:gap-20 w-full">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img
                src="/images/mun2.webp"
                alt="Delegates at a Model UN conference"
                className="rounded-lg shadow-2xl max-w-md lg:max-w-2xl h-auto object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                Members of UESC MUN engage in realistic simulations of international diplomacy, where they draft resolutions, negotiate with peers, and debate global policies. Through these activities, participants gain practical insights into international relations, teamwork, and effective communication. The division encourages members to consider multiple perspectives and develop solutions collaboratively.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mb-6 lg:mb-8">
                MUN also strengthens research, analytical, and leadership skills. Members investigate current global issues, formulate policy positions, and defend them in committee settings. By participating in conferences, they experience the dynamics of negotiation and diplomacy firsthand, learning to remain composed and persuasive under pressure.
              </p>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl">
                Beyond the conferences, MUN members develop a global mindset, improved public speaking abilities, and a sense of civic responsibility. The division fosters a generation of informed, articulate, and confident individuals ready to tackle complex challenges in an interconnected world.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}