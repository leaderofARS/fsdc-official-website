import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Aurora from "../components/Aurora";
import PageTransition from "../components/PageTransition";
import RevealOnScroll from "../components/RevealOnScroll";
import { ArrowLeft, Camera, AlertCircle, ArrowUp, Plus } from "lucide-react";

const GalleryPage = () => {
  const { missionId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Pagination State: Start with 6, load 10 more
  const [displayLimit, setDisplayLimit] = useState(6); 

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // Monitor Scroll for Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGallery = async () => {
      if (!CLOUD_NAME) {
        setError("Configuration Error: Cloud Name missing in .env");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        /**
         * API FETCH LOGIC
         * We use the ?cb query to bypass CDN caching so new tags show up immediately.
         */
        const response = await fetch(
          `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${missionId}.json?cb=${Date.now()}`
        );
        
        if (response.status === 401) {
          throw new Error(`For Admins Only, "401 Unauthorized: Go to Cloudinary Settings > Security and UNCHECK 'Resource List'."`);
        }
        if (!response.ok) {
          throw new Error(`For Admins Only, "Intel not found. Ensure images are tagged with: ${missionId}"`);
        }
        
        const data = await response.json();
        const formattedImages = data.resources.map(res => ({
          url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v${res.version}/${res.public_id}.${res.format}`,
          id: res.public_id,
        }));
        
        setImages(formattedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (missionId) fetchGallery();
  }, [missionId, CLOUD_NAME]);

  const handleLoadMore = () => {
    setDisplayLimit(prev => prev + 10);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-24 md:pt-32 pb-20 bg-[#050505] overflow-x-hidden text-white">
        {/* BACKGROUND LAYER */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Aurora colorStops={["#38035e", "#1a0b33", "#050505"]} blend={0.6} amplitude={1.1} speed={1.8} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
          
          {/* HEADER NAV */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-20 gap-8">
            <RevealOnScroll direction="left">
              {/* Updated Link with Query Parameter to go back to PREVIOUS section */}
              <Link 
                to="/events?tab=previous" 
                className="group flex items-center gap-4 text-gray-400 hover:text-white transition-all"
              >
                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 bg-white/5 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
                  <ArrowLeft size={18} className="md:size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-bold text-white uppercase italic tracking-tighter leading-none mt-1">Registry</span>
                </div>
              </Link>
            </RevealOnScroll>

            <RevealOnScroll direction="right">
              <div className="text-center md:text-right">
                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none mb-3">
                  {missionId?.replace(/-/g, ' ')} <span className="text-purple-600 font-black">Archive</span>
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                    {images.length} Captures Retreived
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* GALLERY RENDERING */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-6">
              <div className="w-12 h-12 border-4 border-purple-500/10 border-t-purple-600 rounded-full animate-spin shadow-[0_0_20px_#a855f7]" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-purple-400 font-black animate-pulse">Establishing Uplink...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20 border border-dashed border-red-500/20 rounded-[2.5rem] bg-red-500/5 max-w-xl mx-auto px-6">
               <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
               <h3 className="text-white font-bold uppercase tracking-widest mb-2">Sync Error</h3>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">{error}</p>
            </div>
          ) : images.length > 0 ? (
            <>
              {/* Masonry Layout: Responsive Columns */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
                {images.slice(0, displayLimit).map((img, index) => (
                  <RevealOnScroll key={img.id} delay={`${(index % 3) * 100}ms`}>
                    <div className="group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0a0a0a] hover:border-purple-500/40 transition-all duration-500 break-inside-avoid shadow-2xl">
                      <img 
                        src={img.url} 
                        className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105" 
                        alt="Mission Capture" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              {/* Load More Control */}
              {displayLimit < images.length && (
                <RevealOnScroll>
                  <div className="flex justify-center mt-12 md:mt-24">
                    <button 
                      onClick={handleLoadMore}
                      className="group flex items-center gap-3 px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:border-purple-500 transition-all text-white shadow-xl"
                    >
                      Retrieve More Images <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                    </button>
                  </div>
                </RevealOnScroll>
              )}
            </>
          ) : (
            <div className="text-center py-40 border border-dashed border-white/10 rounded-[3rem] bg-white/5">
               <Camera size={48} className="mx-auto text-gray-800 mb-6" />
               <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gray-500 leading-none">Zero Captures</h3>
               <p className="text-[9px] text-gray-700 mt-4 uppercase tracking-[0.4em] font-bold">Verification Failed for: {missionId}</p>
            </div>
          )}
        </div>

        {/* FLOATING ACTION: BACK TO TOP */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] p-4 bg-purple-600 border border-white/10 rounded-xl md:rounded-2xl text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 ${
            showBackToTop ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50"
          } hover:bg-purple-500 hover:scale-110 active:scale-95`}
        >
          <ArrowUp size={20} className="md:size-6" />
        </button>
      </div>
    </PageTransition>
  );
};

export default GalleryPage;