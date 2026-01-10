import React from "react";
import { Link } from "react-router-dom";
import { 
  Linkedin, 
  Mail, 
  MapPin, 
  Globe, 
  ChevronRight, 
  Github, 
  Instagram, 
  X 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 pt-16 pb-8 px-6 md:px-24 border-t border-white/5 bg-[#050505] overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-12 mb-16">
          {/* COLUMN 1: BRAND */}
          <div className="md:col-span-4 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4">
              <img
                src="/fsdc.jpeg"
                alt="FSDC"
                className="h-12 w-12 rounded-xl border border-white/10 shadow-lg"
              />
              <div className="flex flex-col text-left">
                <span className="font-black text-2xl tracking-tighter uppercase text-white leading-none">
                  FSDC
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-purple-500 font-bold mt-1">
                  Reva University
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The premier hub for full-stack innovation. We build, break, and
              deploy the future of the web at REVA.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-5 text-gray-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.instagram.com/fsdc_reva/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition-all hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-all hover:-translate-y-1"
                aria-label="X (formerly Twitter)"
              >
                <X size={18} />
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-all hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: SITEMAP */}
          <div className="md:col-span-3">
            <h4 className="font-bold mb-6 text-[10px] uppercase tracking-[0.3em] text-white/50 text-center md:text-left border-b border-white/5 pb-2 md:border-none md:pb-0">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 md:flex md:flex-col gap-y-4 gap-x-4 text-gray-400 text-sm">
              <li className="flex justify-center md:justify-start group">
                <Link
                  to="/"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300"
                >
                  <ChevronRight
                    size={12}
                    className="text-purple-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300 hidden md:block"
                  />
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li className="flex justify-center md:justify-start group">
                <Link
                  to="/team"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300"
                >
                  <ChevronRight
                    size={12}
                    className="text-purple-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300 hidden md:block"
                  />
                  <span className="group-hover:translate-x-1 transition-transform">Team</span>
                </Link>
              </li>
              <li className="flex justify-center md:justify-start group">
                <Link
                  to="/projects"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300"
                >
                  <ChevronRight
                    size={12}
                    className="text-purple-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300 hidden md:block"
                  />
                  <span className="group-hover:translate-x-1 transition-transform">Projects</span>
                </Link>
              </li>
              <li className="flex justify-center md:justify-start group">
                <Link
                  to="/events"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300"
                >
                  <ChevronRight
                    size={12}
                    className="text-purple-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300 hidden md:block"
                  />
                  <span className="group-hover:translate-x-1 transition-transform">Events</span>
                </Link>
              </li>
              <li className="flex justify-center md:justify-start group">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 hover:text-white transition-all duration-300"
                >
                  <ChevronRight
                    size={12}
                    className="text-purple-500 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300 hidden md:block"
                  />
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: MAP */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <h4 className="font-bold mb-6 text-[10px] uppercase tracking-[0.3em] text-white/50 flex items-center gap-2">
              <MapPin size={12} className="text-purple-500" /> Locate Us
            </h4>
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 relative group bg-[#0a0a0a]">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3885.7556364916604!2d77.634802!3d13.114661!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19726bef4a23%3A0x7aad558a739c4c68!2sSwami%20Vivekananda%20Block!5e0!3m2!1sen!2sin!4v1768002423624!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-60 group-hover:opacity-75 transition-opacity duration-700"
              ></iframe>
            </div>
            <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest font-semibold text-center md:text-left leading-relaxed max-w-[280px] md:max-w-none">
              Rukmini Knowledge Park, Kattigenahalli, Yelahanka, Bengaluru
            </p>
          </div>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[9px] uppercase tracking-[0.4em] font-bold text-center">
            &copy; {currentYear} FSDC REVA UNIVERSITY • ALL RIGHTS RESERVED
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <a
              href="mailto:fsdc.reva@gmail.com"
              className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
            >
              <Mail size={12} /> Email Us
            </a>
            <span className="text-gray-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Globe size={12} /> v1.1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;