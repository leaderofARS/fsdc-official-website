import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Instagram } from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 pt-0">
      <nav
        className={`
          flex items-center justify-between transition-all duration-500 ease-in-out
          ${isScrolled
            ? "mt-4 w-[90%] md:w-[70%] py-3 px-8 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            : "w-full py-6 px-12 bg-[#050505] border-b border-white/5"
          }
        `}
      >
        {/* Logo - Always links to Home */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center font-black shadow-lg group-hover:rotate-12 transition-transform">
            F
          </div>
          <span className={`font-bold tracking-tighter uppercase italic transition-all ${isScrolled ? 'text-sm' : 'text-xl'}`}>
            FSDC
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-10 items-center">
          <Link
            to="/"
            className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
              isActive("/") ? "text-purple-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/team"
            className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
              isActive("/team") ? "text-purple-400" : "text-gray-400 hover:text-white"
            }`}
          >
            Team
          </Link>
        </div>

        {/* Socials */}
        <div className="hidden md:flex items-center gap-5 text-gray-400">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={18} className="hover:text-purple-400 cursor-pointer transition-colors" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;