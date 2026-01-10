import React, { useEffect, useState, useRef } from "react";
import Aurora from "../components/Aurora";
import PageTransition from "../components/PageTransition";
import { Mail, MessageSquare, Send, MapPin, Github, Instagram } from "lucide-react";

// Helper component for scroll-triggered reveal
const RevealOnScroll = ({ children, delay = "0ms", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
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
    <div
      ref={domRef}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 transform ${getTransform()}`}
    >
      {children}
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message Sent:", formData);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-20 bg-[#050505] overflow-hidden">
        <div className="fixed inset-0 z-0">
          <Aurora colorStops={["#38035e", "#1a0b33", "#050505"]} blend={0.6} amplitude={1.1} speed={1.8} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Section */}
          <section className="text-center mb-16">
            <RevealOnScroll>
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white">
                GET IN <span className="text-purple-500">TOUCH</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay="200ms">
              <p className="text-gray-500 mt-4 uppercase tracking-[0.3em] font-bold text-xs">
                Have a project or a query? Drop us a line.
              </p>
            </RevealOnScroll>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT: CONTACT FORM (Prioritized) */}
            <RevealOnScroll direction="left" delay="400ms">
              <form 
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-2xl"
              >
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-purple-500 font-bold mb-3 block">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500 transition-all placeholder:text-gray-700"
                      placeholder="John Doe"
                      autoComplete="name"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-purple-500 font-bold mb-3 block">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500 transition-all placeholder:text-gray-700"
                      placeholder="john@example.com"
                      autoComplete="email"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-purple-500 font-bold mb-3 block">Message</label>
                    <textarea 
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500 transition-all placeholder:text-gray-700 resize-none"
                      placeholder="What's on your mind?"
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] active:scale-[0.98]"
                  >
                    Send Message <Send size={16} />
                  </button>
                </div>
              </form>
            </RevealOnScroll>

            {/* RIGHT: CONTACT INFO CARDS */}
            <div className="space-y-6">
              <RevealOnScroll direction="right" delay="300ms">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl group hover:border-purple-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Email Us</h4>
                      <p className="text-gray-400 text-sm">
                        <a href="mailto:fsdc.reva@gmail.com" className="hover:text-purple-400 transition-colors">fsdc.reva@gmail.com</a>
                      </p>
                      <p className="text-gray-500 text-xs mt-1">Official Club Correspondence</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="right" delay="500ms">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl group hover:border-purple-500/50 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-purple-500/20 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Our Base</h4>
                      <p className="text-gray-400 text-sm">REVA University, Kattigenahalli</p>
                      <p className="text-gray-500 text-xs mt-1">School of CSE, Bengaluru</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll direction="right" delay="700ms">
                <div className="p-8">
                  <h4 className="text-white font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Quick Links</h4>
                  <div className="flex gap-6">
                    <a href="https://instagram.com/fsdc_reva/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                      <Instagram size={20}/> Instagram
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;