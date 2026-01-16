import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Aurora from "../components/Aurora";
import PageTransition from "../components/PageTransition";
import RevealOnScroll from "../components/RevealOnScroll";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Timer,
  Rocket,
  History,
} from "lucide-react";
import { UPCOMING_EVENT } from "../data/events";

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab")?.toUpperCase() || "UPCOMING";
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  const handleTabChange = (tabName) => setSearchParams({ tab: tabName.toLowerCase() });

  useEffect(() => {
    window.scrollTo(0, 0);
    const targetDate = new Date(`${UPCOMING_EVENT.date} ${UPCOMING_EVENT.time}`).getTime();
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
      <div className="relative min-h-screen pt-32 pb-20 bg-[#050505] text-white">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Aurora colorStops={["#38035e", "#1a0b33", "#050505"]} blend={0.6} amplitude={1.1} speed={1.8} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* HEADER & TABS: Centered for Mobile, Split for PC */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 border-b border-white/5 pb-10 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              EVEN<span className="text-purple-600">TS</span>
            </h1>
            
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl">
              {["UPCOMING", "PREVIOUS"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 md:px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    activeTab === tab
                      ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "UPCOMING" ? (
            <UpcomingSection timeLeft={timeLeft} />
          ) : (
            <PreviousSection cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME} />
          )}
        </div>
      </div>
    </PageTransition>
  );
};

const UpcomingSection = ({ timeLeft }) => (
  <RevealOnScroll>
    {/* GRID LAYOUT: Proper spacing for PC and natural stacking for mobile */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* 1. STATUS & TIMER: Top on mobile, Left column on PC */}
      <div className="lg:col-span-5 flex flex-col gap-6 order-1">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl text-center shadow-2xl">
          <span className="text-[9px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-8 flex justify-center items-center gap-2">
            <Timer size={14} className="text-purple-500" /> EVENT STARTING IN
          </span>
          <div className="flex justify-center gap-5">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hrs} label="Hrs" />
            <CountdownUnit value={timeLeft.mins} label="Min" />
            <CountdownUnit value={timeLeft.secs} label="Sec" isHighlight />
          </div>
        </div>

        {/* Action Details Card */}
        <div className="bg-[#080808]/80 border border-white/5 rounded-[2.5rem] p-8 space-y-4 flex-grow flex flex-col justify-center backdrop-blur-md">
          <InfoRow icon={<Calendar />} label="Date" value={UPCOMING_EVENT.date} />
          <InfoRow icon={<Clock />} label="Time" value={UPCOMING_EVENT.time} />
          <InfoRow icon={<MapPin />} label="Location" value={UPCOMING_EVENT.location} />
          
          <Link to={`/register/${UPCOMING_EVENT.id}`} state={{ event: UPCOMING_EVENT }} className="mt-4 block">
            <button className="w-full py-6 bg-purple-600 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] text-white hover:bg-purple-500 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)] flex items-center justify-center gap-3 group">
              Register Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
            </button>
          </Link>
        </div>
      </div>

      {/* 2. EVENT POSTER: Second on mobile, Right column on PC */}
      <div className="lg:col-span-7 relative group overflow-hidden rounded-[2.5rem] border border-white/10 min-h-[450px] lg:min-h-full order-2">
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.2)]">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-[9px] font-black uppercase text-green-500 tracking-[0.2em]">Registrations Active</span>
        </div>

        <img src={UPCOMING_EVENT.poster} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" alt="Event" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-10 left-10">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Rocket size={18} className="animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.4em] uppercase">Upcoming Event</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
            {UPCOMING_EVENT.name} <br />
            <span className="text-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">{UPCOMING_EVENT.subName}</span>
          </h2>
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

const PreviousSection = ({ cloudName }) => {
  const pastMissions = [
    {
      id: "flutter-workshop-24",
      name: "Flutter Workshop",
      date: "MAR 2024",
      description: "Mastering cross-platform development with Google's UI toolkit.",
      img: `https://res.cloudinary.com/${cloudName}/image/upload/v1768131228/flutter-poster_awj7m9.jpg`,
    },
    {
      id: "stack-fusion-fest-24",
      name: "Stack Fusion Fest",
      date: "MAR 2024",
      description: "A deep dive into MERN stack architecture and full-stack deployment.",
      img: `https://res.cloudinary.com/${cloudName}/image/upload/v1768132266/sff-hackathon-poster_zj2ycs.jpg`,
    },
    {
      id: "spring-boot-workshop-25",
      name: "Spring Boot Workshop",
      date: "OCT 2025",
      description: "Building enterprise-grade microservices with Java Spring Boot.",
      img: `https://res.cloudinary.com/${cloudName}/image/upload/v1768131228/spring-boot-poster_zg2hc0.jpg`,
    },
  ];

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
      {pastMissions.map((event) => (
        <RevealOnScroll key={event.id}>
          <Link to={`/gallery/${event.id}`} className="block break-inside-avoid group">
            <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-5 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] overflow-hidden">
              <div className="flex items-center gap-2 mb-4 opacity-40">
                <History size={12} />
                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Archived Event</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden mb-6 border border-white/10 bg-[#050505]">
                <img src={event.img} className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.05]" alt={event.name} loading="lazy" />
              </div>

              <div className="px-2 pb-2">
                <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] block mb-2 italic opacity-70">{event.date}</span>
                <h3 className="text-3xl font-black uppercase text-white tracking-tighter leading-tight group-hover:text-purple-400 transition-colors">{event.name}</h3>
              </div>
            </div>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
};

/* --- SHARED COMPONENTS --- */
const CountdownUnit = ({ value, label, isHighlight }) => (
  <div className="flex flex-col">
    <div className={`text-4xl md:text-6xl font-black italic tracking-tighter leading-none mb-1 ${isHighlight ? "text-purple-500" : "text-white"}`}>
      {String(value).padStart(2, "0")}
    </div>
    <span className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">{label}</span>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 transition-colors hover:border-purple-500/20">
    <div className="text-purple-500">{React.cloneElement(icon, { size: 18 })}</div>
    <div>
      <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold mb-1">{label}</p>
      <p className="text-[11px] font-black uppercase text-white tracking-wider leading-none">{value}</p>
    </div>
  </div>
);

export default EventsPage;