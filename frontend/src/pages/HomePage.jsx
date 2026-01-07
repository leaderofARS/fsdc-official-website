import React, {useState, useEffect} from "react";
import Aurora from "../components/Aurora";
import FeatureCard from "../components/FeatureCard";
import ProfileCard from "../components/ProfileCard";
import { Cpu, Code, Eye, Rocket, Terminal, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = ({}) => {
  
  // Helper to get images from 'team' or 'members' folders
  const getAssetUrl = (folder, name) => {
    if (!name) return null;
    return new URL(`../assets/${folder}/${name}`, import.meta.url).href;
  };

  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background stays local to the page */}
      <div className="fixed inset-0 z-0 bg-[#050505]">
        <Aurora
          colorStops={["#38035e", "#1a0b33", "#050505"]}
          blend={0.6}
          amplitude={1.1}
          speed={1.8}
        />
      </div>

      <div className="relative">
        {/* --- HERO SECTION --- */}
        <section
          className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-10"
        >
          <div className="mb-4 px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold">
            Learn • Create • Explore
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            FULL STACK <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-500 bg-clip-text text-transparent">
              DEVELOPMENT CLUB
            </span>
          </h1>
          <p className="max-w-xl text-gray-400 text-sm md:text-base mb-10 leading-relaxed">
            We speak Full Stack fluently. Join a community of passionate developers building the digital future one line of code at a time.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="px-10 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all uppercase text-xs font-bold tracking-widest">Our Team →</button>
            <button className="px-14 py-3 rounded-full bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:bg-purple-500 transition-all uppercase text-xs font-bold tracking-widest">Events</button>
          </div>
        </section>

        {/* --- ABOUT US SECTION --- */}
        <section className="py-16 px-6 md:px-24">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2 italic">ABOUT US</h2>
            <div className="h-1 w-12 bg-purple-500 mx-auto rounded-full shadow-[0_0_10px_#a855f7]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard title="Our Purpose" icon={Cpu} desc="University club dedicated to building complete digital solutions." />
            <FeatureCard title="Learning Focus" icon={Code} desc="Hands-on with Frontend & Backend technologies." />
            <FeatureCard title="Our Vision" icon={Eye} desc="A collaborative space for aspiring developers." />
          </div>
        </section>

        {/* --- WHAT WE DO SECTION --- */}
        <section className="py-24 px-6 md:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-10 w-1 bg-purple-600 rounded-full" />
              <h2 className="text-3xl font-black uppercase tracking-widest italic">What We Do</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard title="Hackathons" icon={Rocket} desc="Intense coding, fast innovation." isSmall />
              <FeatureCard title="Workshops" icon={Terminal} desc="Learn, Practice, Master." isSmall />
              <FeatureCard title="Projects" icon={Globe} desc="From ideas to deployment." isSmall />
            </div>
          </div>
        </section>
        
        {/* --- CALL TO ACTION --- */}
        {/* CRITICAL FIX: Lower z-index so it stays behind modals from the section above */}
        <section className="relative z-10 py-24 px-6 md:px-24">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-purple-900/20 via-black to-black border border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
            <div className="relative z-10 max-w-md">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-none italic uppercase">Ready to Build the Future?</h2>
              <button className="px-10 py-4 bg-purple-600 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-purple-500 transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)]">Contact Us</button>
            </div>
            <div className="relative z-10 w-full md:w-1/2">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team Work" className="rounded-3xl border border-white/10 shadow-2xl" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;