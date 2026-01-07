import React from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';

const Footer = ({ scrollToSection, refs }) => {
  // This variable will always get the current year from the user's system
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 md:px-24 border-t border-white/5 bg-black/60 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo & Intro */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold">F</div>
            <span className="font-bold text-xl tracking-tighter uppercase italic">FSDC</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Empowering students to build scalable, robust, and beautiful digital solutions. 
            We speak full stack fluently.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-purple-400">Explore</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li onClick={() => scrollToSection(refs.homeRef)} className="hover:text-white cursor-pointer transition-colors">Home</li>
            <li onClick={() => scrollToSection(refs.aboutRef)} className="hover:text-white cursor-pointer transition-colors">About Us</li>
            <li onClick={() => scrollToSection(refs.whatWeDoRef)} className="hover:text-white cursor-pointer transition-colors">What We Do</li>
            <li onClick={() => scrollToSection(refs.teamRef)} className="hover:text-white cursor-pointer transition-colors">Our Team</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-purple-400">Connect</h4>
          <div className="flex gap-4 text-gray-500">
            <Github size={20} className="hover:text-white cursor-pointer transition-colors" />
            <Instagram size={20} className="hover:text-purple-400 cursor-pointer transition-colors" />
            <Linkedin size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-[10px] uppercase tracking-widest">
        © {currentYear} Full Stack Development Club • Reva University
      </div>
    </footer>
  );
};

export default Footer;