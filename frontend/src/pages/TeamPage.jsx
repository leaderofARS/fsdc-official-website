import React, { useEffect, useState, useRef } from "react";
import Aurora from "../components/Aurora";
import ProfileCard from "../components/ProfileCard";
import PageTransition from "../components/PageTransition";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Users, GraduationCap } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RevealOnScroll = ({ children, delay = "0ms", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) opacity-100";
    switch (direction) {
      case "left": return "-translate-x-20 opacity-0";
      case "right": return "translate-x-20 opacity-0";
      default: return "translate-y-10 opacity-0";
    }
  };

  return (
    <div ref={domRef} style={{ transitionDelay: delay }} className={`transition-all duration-1000 transform ${getTransform()}`}>
      {children}
    </div>
  );
};

const TeamPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const getAssetUrl = (folder, name) => name ? new URL(`../assets/${folder}/${name}`, import.meta.url).href : null;

  const coreTeam = [
    { name: "Michael John Paul", role: "Club President", img: "michael.jpg" },
    { name: "Nisarga Kolurmath", role: "Club Vice President", img: "nisarga.jpg" },
    { name: "Mohit Choudhary", role: "Technical Coordinator", img: "mohit.png" },
    { name: "Pramukh Satish", role: "Technical Coordinator", img: "pramukh.png" },
    { name: "Hemang Patti", role: "Event Manager", img: "hemang.png" },
    { name: "Rangashree", role: "Design Head", img: "rangashree.jpg" },
    { name: "Manoj G.M", role: "Marketing Head", img: "manoj.jpg" },
    { name: "S Thanuja", role: "Media Head", img: "thanuja.jpg" },
  ];

  const mentors = [
    { name: "Dr. Ashwin Kumar", role: "Director", img: "ashwin.png" },
    { name: "Dr. Narendra Babu", role: "Club Co-ordinator", img: "narendra.png" },
    { name: "Dr. Sanju", role: "Advisory", img: "sanju.png" },
    { name: "Dr. Neelam Malyadri", role: "Advisory", img: "neelam.png" },
    { name: "Dr. Selvan.C", role: "Advisory", img: "selvan.png" },
    { name: "J Suneetha", role: "Advisory", img: "suneetha.png" },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-20 bg-[#050505] overflow-x-hidden">
        <div className="fixed inset-0 z-0"><Aurora colorStops={["#38035e", "#1a0b33", "#050505"]} blend={0.6} amplitude={1.1} speed={1.8} /></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* --- CORE TEAM HEADER --- */}
          <section className="text-center mb-16">
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-2 mb-4 text-purple-400">
                <Users size={18} />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Executive Council</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white">CORE <span className="text-purple-500">TEAM</span></h1>
              <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full mt-4 shadow-[0_0_20px_#a855f7]" />
            </RevealOnScroll>
          </section>

          {/* --- CORE TEAM CAROUSEL --- */}
          <section className="mb-48 relative group/swiper">
            <RevealOnScroll delay="300ms">
              <button className="swiper-prev-btn absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white opacity-0 group-hover/swiper:opacity-100 hover:bg-purple-600 transition-all hidden lg:flex items-center justify-center"><ChevronLeft size={24} /></button>
              <button className="swiper-next-btn absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 z-20 p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white opacity-0 group-hover/swiper:opacity-100 hover:bg-purple-600 transition-all hidden lg:flex items-center justify-center"><ChevronRight size={24} /></button>
              
              <Swiper 
                modules={[Autoplay, Navigation, Pagination]} 
                spaceBetween={30} 
                slidesPerView={1} 
                navigation={{ nextEl: ".swiper-next-btn", prevEl: ".swiper-prev-btn" }} 
                pagination={{ clickable: true, el: '.custom-pagination' }} 
                autoplay={{ delay: 3500 }} 
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }} 
                className="team-swiper"
              >
                {coreTeam.map((member, idx) => (
                  <SwiperSlide key={idx}><ProfileCard name={member.name} role={member.role} image={getAssetUrl("team", member.img)} /></SwiperSlide>
                ))}
              </Swiper>
              <div className="custom-pagination flex justify-center gap-2 mt-10" />
            </RevealOnScroll>
          </section>

          {/* --- MENTORS SECTION --- */}
          <section>
            <RevealOnScroll>
              <div className="text-center mb-20">
                <div className="flex items-center justify-center gap-2 mb-4 text-purple-400">
                  <GraduationCap size={20} />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Faculty Guidance</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white">Club <span className="text-purple-500">Mentors</span></h2>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {mentors.map((mentor, idx) => (
                <RevealOnScroll key={idx} delay={`${(idx % 3) * 150}ms`}><ProfileCard name={mentor.name} role={mentor.role} image={getAssetUrl("members", mentor.img)} /></RevealOnScroll>
              ))}
            </div>
          </section>
        </div>
      </div>
      <style>{`
        .swiper-button-next, .swiper-button-prev { display: none !important; } 
        .custom-pagination .swiper-pagination-bullet { width: 8px; height: 8px; background: rgba(255, 255, 255, 0.2); transition: all 0.4s; cursor: pointer; } 
        .custom-pagination .swiper-pagination-bullet-active { width: 32px; border-radius: 4px; background: #a855f7; box-shadow: 0 0 15px rgba(168, 85, 247, 0.5); }
      `}</style>
    </PageTransition>
  );
};
export default TeamPage;