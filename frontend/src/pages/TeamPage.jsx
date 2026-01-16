import React, { useEffect, useRef } from "react";
import Aurora from "../components/Aurora";
import ProfileCard from "../components/ProfileCard";
import PageTransition from "../components/PageTransition";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";

import { Users, GraduationCap } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

/* ---------------- REVEAL ON SCROLL ---------------- */

const RevealOnScroll = ({ children, delay = "0ms", direction = "up" }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0,0) opacity-100";
    if (direction === "left") return "-translate-x-20 opacity-0";
    if (direction === "right") return "translate-x-20 opacity-0";
    return "translate-y-10 opacity-0";
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 transform ${getTransform()}`}
    >
      {children}
    </div>
  );
};

/* ---------------- PAGE ---------------- */

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ---------- PAGINATION HELPERS ---------- */

  const resetPagination = () => {
    document
      .querySelectorAll(".custom-pagination .swiper-pagination-bullet")
      .forEach((bullet) => {
        bullet.style.background = "rgba(255,255,255,0.3)";
        const fill = bullet.querySelector(".bullet-progress-fill");
        if (fill) fill.style.width = "0%";
      });
  };

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    const fill = document.querySelector(
      ".swiper-pagination-bullet-active .bullet-progress-fill"
    );
    if (fill) fill.style.width = `${(1 - progress) * 100}%`;
  };

  const getAssetUrl = (folder, name) => {
    if (!name || name.trim() === "" || name.endsWith(".")) {
      return "https://res.cloudinary.com/dzt6v7m3w/image/upload/v1700000000/placeholder_u9vz8q.png";
    }
    try {
      return new URL(`../assets/${folder}/${name}`, import.meta.url).href;
    } catch {
      return "https://res.cloudinary.com/dzt6v7m3w/image/upload/v1700000000/placeholder_u9vz8q.png";
    }
  };

  /* ---------------- DATA ---------------- */

  const coreTeam = [
    { name: "Michael John Paul", role: "Club President", img: "michael.jpg" },
    { name: "Nisarga Kolurmath", role: "Club Vice President", img: "nisarga.jpg" },
    { name: "Mohit Choudhary", role: "Technical Coordinator", img: "mohit.png" },
    { name: "Pramukh Satish", role: "Technical Coordinator", img: "pramukh.png" },
    { name: "Hemang Patti", role: "Event Manager", img: "hemang.png" },
    { name: "Rangashree", role: "Design Head", img: "rangashree.jpg" },
    { name: "Manoj G.M", role: "Marketing Head", img: "manoj.jpg" },
    { name: "S Thanuja", role: "Media Head", img: "thanuja.jpg" },
    { name: "Abhay R S", role: "Technical Coordinator", img: "abhay.jpg" },
    { name: "Prakul P Shetty", role: "Technical Coordinator", img: "prakul.jpg" },
    { name: "Devapriya", role: "Technical Coordinator", img: "devapriya.jpg" },
    { name: "G V Raghuveer", role: "Media Head", img: "gvraghuveer.jpg" },
    { name: "Shreya K", role: "Media Coordinator", img: "shreya.jpg" },
    { name: "Maruthi L", role: "Design Head", img: "maruthi.jpg" },
    { name: "Jyoti Pradeep N", role: "Media Coordinator", img: "jyoti.jpg" },
  ];

  const mentors = [
    { name: "Dr. Ashwin Kumar", role: "Director", img: "ashwin.png" },
    { name: "Dr. Narendra Babu", role: "Club Co-ordinator", img: "narendra.png" },
    { name: "Dr. Sanju", role: "Advisory", img: "sanju.png" },
    { name: "Dr. Neelam Malyadri", role: "Advisory", img: "neelam.png" },
    { name: "Dr. Selvan.C", role: "Advisory", img: "selvan.png" },
    { name: "J Suneetha", role: "Advisory", img: "suneetha.png" },
  ];

  /* ---------------- JSX ---------------- */

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-24 md:pt-32 pb-20 bg-[#050505] overflow-x-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Aurora
            colorStops={["#38035e", "#1a0b33", "#050505"]}
            blend={0.6}
            amplitude={1.1}
            speed={1.8}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* HEADER */}
          <section className="text-center mb-16 md:mb-24">
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-2 mb-4 text-purple-400">
                <Users size={18} className="animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase">
                  Executive Council
                </span>
              </div>
              <h1 className="text-5xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-none">
                CORE <span className="text-purple-600">TEAM</span>
              </h1>
            </RevealOnScroll>
          </section>

          {/* SLIDER */}
          <section className="mb-32 md:mb-48">
            <RevealOnScroll delay="300ms">
              <Swiper
                modules={[Autoplay, Pagination, EffectCoverflow]}
                effect="coverflow"
                grabCursor
                centeredSlides
                loop
                slidesPerView={1.1}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={(swiper) => {
                  if (swiper.realIndex === 0) {
                    resetPagination();
                  }
                }}
                pagination={{
                  clickable: true,
                  el: ".custom-pagination",
                  renderBullet: (index, className) =>
                    `<span class="${className}">
                      <span class="bullet-progress-fill"></span>
                    </span>`,
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 1.5,
                  slideShadows: false,
                }}
                breakpoints={{
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="team-swiper !overflow-visible"
              >
                {coreTeam.map((member, idx) => (
                  <SwiperSlide key={idx} className="pb-12 px-2">
                    {({ isActive }) => (
                      <div
                        className={`transition-all duration-700 transform ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-75 opacity-20 blur-[2px]"
                        }`}
                      >
                        <ProfileCard
                          name={member.name}
                          role={member.role}
                          image={getAssetUrl("team", member.img)}
                        />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="custom-pagination flex justify-center gap-4 mt-12 md:mt-20" />
            </RevealOnScroll>
          </section>

          {/* MENTORS */}
          <section>
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-2 mb-4 text-purple-400">
                <GraduationCap size={20} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                  Faculty Guidance
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic uppercase text-white leading-none">
                CLUB <span className="text-purple-500">MENTORS</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {mentors.map((mentor, idx) => (
                <RevealOnScroll key={idx} delay={`${(idx % 3) * 150}ms`}>
                  <ProfileCard
                    name={mentor.name}
                    role={mentor.role}
                    image={getAssetUrl("members", mentor.img)}
                  />
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* PAGINATION STYLES */}
      <style>{`
        /* MOBILE: hide pagination */
        @media (max-width: 767px) {
          .custom-pagination {
            display: none;
          }
        }

        /* DESKTOP: dots + progress */
        @media (min-width: 768px) {
          .custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: rgba(255,255,255,0.3);
            border-radius: 999px;
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
          }

          .custom-pagination .swiper-pagination-bullet-active {
            width: 60px;
            height: 8px;
            background: rgba(255,255,255,0.12);
          }

          .bullet-progress-fill {
            position: absolute;
            inset: 0;
            width: 0%;
            background: #a855f7;
            border-radius: inherit;
          }
        }
      `}</style>
    </PageTransition>
  );
};

export default TeamPage;
