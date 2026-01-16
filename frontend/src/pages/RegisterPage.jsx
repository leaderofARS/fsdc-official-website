import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Aurora from "../components/Aurora";
import PageTransition from "../components/PageTransition";
import RevealOnScroll from "../components/RevealOnScroll";
import {
  ArrowLeft,
  ShieldCheck,
  User,
  Mail,
  Phone,
  GraduationCap,
  School,
  Fingerprint,
  Send,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
} from "lucide-react";
import { UPCOMING_EVENT, SCHOOL_DEPT_MAP } from "../data/events";

const RegisterPage = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const event = location.state?.event || UPCOMING_EVENT;

  const [status, setStatus] = useState("IDLE");
  const [srn, setSrn] = useState("");
  const [srnError, setSrnError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [formData, setFormData] = useState({ sem: "", school: "", dept: "" });

  const schools = Object.keys(SCHOOL_DEPT_MAP);
  const semesters = ["1st Sem", "2nd Sem", "3rd Sem", "4th Sem", "5th Sem", "6th Sem", "7th Sem", "8th Sem"];
  const srnRegex = /^[A-Z]{1}\d{2}[A-Z]{2}\d{3}$/i;

  const handleSrnChange = (e) => {
    const value = e.target.value.toUpperCase();
    setSrn(value);
    setSrnError(value !== "" && !srnRegex.test(value));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
      setPhoneError(value.length > 0 && value.length !== 10);
    }
  };

  const handleSchoolChange = (val) => {
    setFormData({ ...formData, school: val, dept: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!srnRegex.test(srn) || phone.length !== 10 || !formData.sem || !formData.school || !formData.dept) return;
    setStatus("SUBMITTING");
    setTimeout(() => {
      setStatus("SUCCESS");
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (status === "SUCCESS") {
    return (
      <PageTransition>
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Aurora colorStops={["#38035e", "#1a0b33", "#050505"]} blend={0.6} amplitude={1.1} speed={1.8} />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-10 px-6 max-w-lg">
            <RevealOnScroll direction="up">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-pulse">
                <ShieldCheck size={56} className="text-green-500" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay="200ms">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-white">
                  Registered <br />
                  <span className="text-green-500 uppercase drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">Successfully</span>
                </h1>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.5em] font-bold leading-relaxed">
                  Entry Confirmed For <br />
                  <span className="text-purple-500">{event.name} {event.subName}</span>
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay="400ms">
              <Link to="/events" className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-white hover:bg-white/10 hover:border-green-500/50 transition-all duration-500">
                <span className="relative z-10">Return to Events</span>
                <div className="absolute inset-0 bg-green-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen md:h-screen flex flex-col md:flex-row bg-[#050505] text-white md:overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Aurora colorStops={["#1a0b33", "#050505"]} blend={0.8} speed={1.2} />
        </div>

        {/* LEFT SIDE: EVENT DATA */}
        {/* FIXED: pt-28 (Mobile) and pt-32 (PC) to ensure button sits behind Navbar logo */}
        <div className="relative z-10 w-full md:w-5/12 flex flex-col justify-start md:justify-center px-8 md:px-20 pt-28 pb-12 md:py-0 border-b md:border-b-0 md:border-r border-white/5 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-0">
          <RevealOnScroll direction="left">
            <Link 
              to="/events" 
              className="inline-flex items-center gap-2 text-purple-500 mb-12 uppercase text-[10px] font-black tracking-[0.3em] hover:text-white transition-all group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
              <span>Back to Events</span>
            </Link>

            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
              {event.name} <br /> <span className="text-purple-600">{event.subName}</span>
            </h1>

            <div className="space-y-6 border-l-2 border-purple-500/20 pl-8">
              <DetailItem icon={<Calendar />} label="Event Date" value={event.date} />
              <DetailItem icon={<Clock />} label="Event Time" value={event.time} />
              <DetailItem icon={<MapPin />} label="Event Location" value={event.location} />
            </div>
          </RevealOnScroll>
        </div>

        {/* RIGHT SIDE: THE FORM */}
        <div className="relative z-10 w-full md:w-7/12 flex items-center justify-center p-4 md:p-12">
          <div className="relative w-full max-w-2xl bg-[#080808]/90 border border-purple-500/30 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl shadow-2xl flex flex-col md:max-h-[85vh]">
            
            <div className="p-8 md:p-12 pb-4 flex justify-between items-center shrink-0">
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white flex items-center gap-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Registration Form
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="px-8 md:px-12 pb-10 md:overflow-y-auto custom-scrollbar space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeonInput label="Full Name" placeholder="John Doe" icon={<User />} required />
                <NeonInput label="E-mail" placeholder="Mail-ID" type="email" icon={<Mail />} required />
                <NeonInput label="SRN" placeholder="RXXXXXXX" value={srn} onChange={handleSrnChange} icon={<Fingerprint />} isError={srnError} required />
                <NeonInput label="Phone" placeholder="10 Digits" value={phone} onChange={handlePhoneChange} icon={<Phone />} isError={phoneError} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeonSelect label="School" options={schools} value={formData.school} onChange={handleSchoolChange} icon={<School />} />
                <NeonSelect label="Department" options={formData.school ? SCHOOL_DEPT_MAP[formData.school] : []} value={formData.dept} onChange={(val) => setFormData({ ...formData, dept: val })} icon={<Briefcase />} disabled={!formData.school} />
              </div>

              <NeonSelect label="Semester" options={semesters} value={formData.sem} onChange={(val) => setFormData({ ...formData, sem: val })} icon={<GraduationCap />} />

              <button disabled={status === "SUBMITTING" || srnError || phoneError || !formData.sem || !formData.school || !formData.dept} className="w-full py-5 md:py-6 bg-purple-600 rounded-2xl font-black uppercase text-[11px] tracking-[0.5em] text-white shadow-xl hover:bg-purple-500 transition-all disabled:opacity-30 flex items-center justify-center gap-4">
                {status === "SUBMITTING" ? "Encrypting..." : <>Confirm Registration <Send size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

/* --- MINI COMPONENTS --- */
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-5">
    <div className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center text-purple-500 shadow-inner">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <p className="text-[8px] uppercase tracking-widest text-gray-500 font-bold mb-1">{label}</p>
      <p className="text-xs md:text-sm font-black text-white uppercase tracking-wider leading-none">{value}</p>
    </div>
  </div>
);

const NeonInput = ({ label, icon, isError, ...props }) => (
  <div className="space-y-2">
    <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-black ml-1">{label}</label>
    <div className="relative group">
      <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isError ? "text-red-500" : "text-purple-500 group-focus-within:text-white"}`}>
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <input {...props} className={`w-full bg-white/5 border ${isError ? "border-red-500/50" : "border-white/10 focus:border-purple-600"} rounded-xl py-3.5 pl-14 pr-4 text-[11px] text-white focus:outline-none transition-all font-bold placeholder:text-gray-800 uppercase`} />
    </div>
  </div>
);

const NeonSelect = ({ label, options, value, onChange, icon, disabled }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => { if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={`space-y-2 relative ${disabled ? "opacity-30 grayscale cursor-not-allowed" : ""}`} ref={containerRef}>
      <label className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-black ml-1">{label}</label>
      <button type="button" onClick={() => !disabled && setOpen(!open)} className={`w-full bg-white/5 border ${open ? "border-purple-600" : "border-white/10"} rounded-xl py-3.5 pl-14 pr-4 text-[11px] text-left font-bold transition-all flex justify-between items-center ${value ? "text-white" : "text-gray-600"}`}>
        <div className="absolute left-5 text-purple-500">{React.cloneElement(icon, { size: 14 })}</div>
        <span className="truncate">{value || "Select"}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 w-full mb-2 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden z-[100] shadow-2xl backdrop-blur-xl">
          <div className="max-h-40 overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <div key={opt} onClick={() => { onChange(opt); setOpen(false); }} className={`px-5 py-4 text-[10px] uppercase font-black cursor-pointer transition-colors ${value === opt ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-white/5"}`}>
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;