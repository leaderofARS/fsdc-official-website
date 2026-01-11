import React, { useState, useEffect } from "react";
import Aurora from "../components/Aurora";
import PageTransition from "../components/PageTransition";
import RevealOnScroll from "../components/RevealOnScroll";
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [filter, setFilter] = useState("UPCOMING");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hrs: 0,
    mins: 0,
    secs: 0,
  });

  // Fetch Cloud Name from environment variables
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    // Target date set to March 12, 2026 [cite: 2026-01-07]
    const targetDate = new Date("March 12, 2026 10:30:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-24 pb-20 bg-[#050505] overflow-x-hidden text-white">
        <div className="fixed inset-0 z-0">
          <Aurora
            colorStops={["#38035e", "#1a0b33", "#050505"]}
            blend={0.6}
            amplitude={1.1}
            speed={1.8}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* --- HEADER & GLOWING TIMER SECTION --- */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-10">
            <RevealOnScroll direction="left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-[9px] uppercase tracking-[0.5em] text-purple-400 font-black backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
                  Mission Registry
                </div>
                <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">
                  EVEN
                  <span className="text-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                    TS
                  </span>
                </h1>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="group relative p-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent">
                <div className="absolute inset-0 bg-purple-600/20 rounded-[2.5rem] blur-2xl group-hover:bg-purple-600/40 transition-all duration-700" />
                <div className="relative bg-[#080808]/90 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-3xl flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-6">
                    Extraction Window Closes In
                  </span>
                  <div className="flex gap-6 md:gap-10">
                    <CountdownUnit value={timeLeft.days} label="Days" />
                    <CountdownUnit value={timeLeft.hrs} label="Hours" />
                    <CountdownUnit value={timeLeft.mins} label="Mins" />
                    <CountdownUnit value={timeLeft.secs} label="Secs" isHighlight />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* --- CATEGORY TOGGLE --- */}
          <div className="relative max-w-2xl mx-auto mb-20">
            <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl md:rounded-full backdrop-blur-md">
              {["UPCOMING", "PREVIOUS"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex-1 relative py-4 rounded-xl md:rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                    filter === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {filter === tab && (
                    <div className="absolute inset-0 bg-purple-600 rounded-xl md:rounded-full shadow-[0_0_25px_rgba(168,85,247,0.5)] z-0" />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* --- CONTENT RENDERER --- */}
          <div className="min-h-[600px]">
            {filter === "UPCOMING" ? <UpcomingSection /> : <PreviousSection cloudName={CLOUD_NAME} />}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

/* --- UI COMPONENTS --- */

const CountdownUnit = ({ value, label, isHighlight }) => (
  <div className="text-center min-w-[55px] md:min-w-[70px]">
    <div className={`text-4xl md:text-6xl font-black italic tracking-tighter leading-none ${isHighlight ? "text-purple-500" : "text-white"}`}>
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-[8px] uppercase tracking-[0.3em] text-gray-600 font-bold mt-3">
      {label}
    </div>
  </div>
);

const UpcomingSection = () => (
  <RevealOnScroll>
    <div className="group relative overflow-hidden rounded-[4rem] border border-white/10 bg-black/40 backdrop-blur-xl min-h-[600px] flex items-end p-8 md:p-20 transition-all duration-700 hover:border-purple-500/40">
      <img
        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600"
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-30"
        alt="Upcoming Mission"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

      <div className="relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[9px] font-black tracking-widest uppercase">
                Active Ops
              </div>
              <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold border-l border-white/20 pl-3">
                Phase 01
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] text-white">
              TECH <br />
              <span className="text-purple-600">SYNTHESIS</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl">
          <InfoBox icon={<Calendar />} label="Extraction Date" value="MARCH 12, 2026" />
          <InfoBox icon={<Clock />} label="Mission Time" value="10:30 AM" />
          <InfoBox icon={<MapPin />} label="Target Location" value="TECH HUB - LVL 4" />
        </div>

        <button className="relative px-16 py-7 bg-purple-600 rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] text-white shadow-[0_15px_40px_rgba(168,85,247,0.4)] hover:bg-purple-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-4">
          Initiate Registration <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </RevealOnScroll>
);

const InfoBox = ({ icon, label, value }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-[2.5rem] backdrop-blur-md hover:bg-white/10 transition-colors">
    <div className="flex items-center gap-3 text-purple-500 mb-2">
      {React.cloneElement(icon, { size: 16 })}
      <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-gray-500">
        {label}
      </span>
    </div>
    <div className="text-[10px] font-black uppercase tracking-widest text-white">
      {value}
    </div>
  </div>
);

const PreviousSection = ({ cloudName }) => {
  const pastMissions = [
    {
      id: "flutter-workshop-24",
      name: "Flutter Workshop",
      date: "MAR 2024",
      img: `https://res.cloudinary.com/${cloudName}/image/upload/v1768131228/flutter-poster_awj7m9.jpg`,
    },
    {
      id: "stack-fusion-fest-24",
      name: "Stack Fusion Fest",
      date: "MAR 2024",
      img: `https://res.cloudinary.com/${cloudName}/image/upload/v1768132266/sff-hackathon-poster_zj2ycs.jpg`,
    },
    {
      id: "spring-boot-workshop-25",
      name: "Spring Boot Workshop",
      date: "OCT 2025",
      img: `https://res.cloudinary.com/${cloudName}/image/upload/v1768131228/spring-boot-poster_zg2hc0.jpg`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {pastMissions.map((mission) => (
        <RevealOnScroll key={mission.id}>
          <Link to={`/gallery/${mission.id}`} className="block group">
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-8 md:p-10 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/30 overflow-hidden hover:shadow-[0_0_50px_rgba(168,85,247,0.1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl pointer-events-none group-hover:bg-purple-600/10 transition-colors" />

              <div className="relative rounded-[2.5rem] overflow-hidden mb-8 aspect-video border border-white/5 bg-white/5">
                <img
                  src={mission.img}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  alt={mission.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="bg-purple-600/80 p-4 rounded-full backdrop-blur-sm">
                      <Camera size={24} className="text-white" />
                   </div>
                </div>
              </div>

              <div className="flex justify-between items-center relative z-10">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.4em]">
                    {mission.date}
                  </span>
                  <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none group-hover:text-purple-400 transition-colors">
                    {mission.name}
                  </h3>
                </div>
                
                <div className="p-5 bg-white/5 border border-white/5 rounded-[1.5rem] group-hover:bg-purple-600 group-hover:border-purple-500 transition-all text-white">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
};

export default EventsPage;