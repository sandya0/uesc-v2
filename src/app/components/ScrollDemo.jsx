'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DIVISIONS = [
  {
    title: "Speech Division",
    id: "speech",
    imgMain: "/images/speech3.webp",
    imgDetail: "/images/speech5.webp",
    mainStats: [
      { label: "Active members", value: "25+" },
      { label: "Workshops attended", value: "2-3" },
      { label: "Confidence improved", value: "75%" }
    ],
    info: [
      { label: "Focus", value: "Public speaking\nConfident expression" },
      { label: "Activities", value: "Workshops\nCompetitions\nPeer coaching" },
      { label: "Skills Developed", value: "Confidence in speaking\nStorytelling techniques\nPersuasive communication" }
    ],
    desc1: "Many members initially find public speaking intimidating. At UESC Speech, members are guided through structured exercises and hands-on workshops to overcome stage fright, build self-confidence, and refine their communication skills.",
    desc2: "Beyond technical skills, Speech also fosters creativity and critical thinking. Members explore storytelling techniques, persuasive strategies, and the art of emotional engagement. Through competitions and peer coaching, they receive constructive feedback and learn to continuously improve.",
    explanationTitle: "UESC Speech nurtures confident speakers who can inspire, persuade, and express themselves effectively"
  },
  {
    title: "Debate Division",
    id: "debate",
    imgMain: "/images/debate3.webp",
    imgDetail: "/images/debate4.webp",
    mainStats: [
      { label: "Active debaters", value: "15+" },
      { label: "Tournaments participated", value: "3-5" },
      { label: "Motions discussed", value: "15+" }
    ],
    info: [
      { label: "Focus", value: "Logical thinking\nPersuasive skills" },
      { label: "Activities", value: "Debates\nStrategy sessions\nTeam training" },
      { label: "Skills Developed", value: "Critical thinking\nPersuasive communication\nStructured argumentation" }
    ],
    desc1: "UESC Debate empowers members to examine complex issues critically, construct coherent arguments, and communicate ideas persuasively. Through training sessions, practice debates, and tournaments, members learn how to research thoroughly and identify logical fallacies.",
    desc2: "The skills acquired in Debate extend beyond competitions. Members apply critical thinking and persuasive communication to academic projects, community engagement, and professional settings. The division cultivates intellectually agile individuals.",
    explanationTitle: "UESC Debate develops critical thinkers who can analyze, articulate, and persuade with confidence"
  },
  {
    title: "Scrabble Division",
    id: "scrabble",
    imgMain: "/images/scrabble3.webp",
    imgDetail: "/images/scrabble4.webp",
    mainStats: [
      { label: "Active players", value: "30+" },
      { label: "Tournaments participated", value: "5+" },
      { label: "Member retention rate", value: "70%" }
    ],
    info: [
      { label: "Focus", value: "Vocabulary\nStrategy development" },
      { label: "Activities", value: "Scrabble games\nTournaments\nTraining" },
      { label: "Skills Developed", value: "Word knowledge\nStrategic thinking\nAnalytical skills" }
    ],
    desc1: "Scrabble at UESC is more than a game; it is a platform for expanding vocabulary, enhancing strategic thinking, and sharpening problem-solving skills. Members learn to recognize patterns and identify high-value plays.",
    desc2: "The division emphasizes both competition and collaboration. Through tournaments, team games, and workshops, members gain exposure to different play styles and strategies, encouraging members to think several steps ahead.",
    explanationTitle: "UESC Scrabble transforms language learning into strategic thinking and problem-solving"
  },
  {
    title: "MUN Division",
    id: "mun",
    imgMain: "/images/mun3.webp",
    imgDetail: "/images/mun4.webp",
    mainStats: [
      { label: "Active delegates", value: "20+" },
      { label: "Conferences attended", value: "2-4" },
      { label: "Resolution success rate", value: "70%" }
    ],
    info: [
      { label: "Focus", value: "Diplomacy\nInternational understanding" },
      { label: "Activities", value: "Model UN simulations\nWorkshops\nResearch" },
      { label: "Skills Developed", value: "Negotiation\nResearch\nPublic speaking" }
    ],
    desc1: "In UESC MUN, members engage in simulations of the United Nations, representing countries and negotiating resolutions. Members develop a deep understanding of international relations, diplomacy, and global issues.",
    desc2: "Beyond knowledge, MUN strengthens leadership, communication, and teamwork. Delegates learn to articulate positions clearly, work with diverse teams, and craft resolutions that address complex challenges.",
    explanationTitle: "UESC MUN trains delegates to understand global issues, negotiate, and develop leadership skills"
  }
];

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
        {DIVISIONS.map((div) => (
          <div key={div.id} className="flex flex-wrap lg:flex-nowrap">
            
            {/* PANEL 1: Stats & Visual */}
            <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-8 lg:py-0 relative">
              <div className="text-center w-full">
                {/* Title reduced from text-4xl...9xl */}
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold mb-6 sm:mb-8 lg:mb-12">
                  {div.title}
                </h1>
                <img
                  src={div.imgMain}
                  alt={div.title}
                  className="rounded-lg shadow-lg mx-auto mb-6 sm:mb-8 lg:mb-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                />
                <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-20 flex-wrap sm:flex-nowrap">
                  {div.mainStats.map((stat, i) => (
                    <div key={i} className="w-1/3 sm:w-auto">
                      {/* Stat Numbers reduced from text-2xl...6xl */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">{stat.value}</h3>
                      <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus/Activities Side Box (Desktop Absolute) */}
              <div className="mt-6 sm:mt-8 lg:absolute lg:right-6 xl:right-10 lg:bottom-6 xl:bottom-12 text-center lg:text-right w-full lg:w-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-2">
                  {div.info.map((item, i) => (
                    <div key={i} className="lg:mb-4 xl:mb-6">
                      <p className="text-gray-400 uppercase text-[10px] sm:text-xs mb-1 lg:mb-2">{item.label}</p>
                      <p className="font-semibold text-xs sm:text-sm lg:text-base xl:text-lg leading-tight whitespace-pre-line">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PANEL 2: Text Explanation */}
            <section className="horizontal-panel bg-black max-h-screen w-full lg:min-w-screen lg:h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-24">
              {/* Heading reduced from text-2xl...6xl */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-5xl font-extrabold mb-6 sm:mb-8 lg:mb-10 2xl:mb-12 text-left w-full">
                {div.explanationTitle}
              </h1>
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 w-full">
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                  <img
                    src={div.imgDetail}
                    alt={`${div.title} detail`}
                    className="rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start">
                  {/* Paragraphs reduced from text-sm...xl */}
                  <p className="text-xs sm:text-sm md:text-base xl:text-base 2xl:text-2xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl mb-4 sm:mb-6 lg:mb-8">
                    {div.desc1}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base xl:text-base 2xl:text-2xl text-gray-300 leading-relaxed sm:leading-loose max-w-3xl">
                    {div.desc2}
                  </p>
                </div>
              </div>
            </section>

          </div>
        ))}
      </div>
    </div>
  );
}