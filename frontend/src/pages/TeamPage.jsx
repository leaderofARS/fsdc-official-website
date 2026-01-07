import React, { useEffect, useState } from "react";
import Aurora from "../components/Aurora";
import ProfileCard from "../components/ProfileCard";
import PageTransition from "../components/PageTransition";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TeamPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate a brief loading period to allow PageTransition to settle
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getAssetUrl = (folder, name) => {
    if (!name) return null;
    return new URL(`../assets/${folder}/${name}`, import.meta.url).href;
  };

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

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-20 bg-[#050505] overflow-x-hidden">
        {/* BACKGROUND */}
        <div className="fixed inset-0 z-0">
          <Aurora
            colorStops={["#38035e", "#1a0b33", "#050505"]}
            blend={0.6}
            amplitude={1.1}
            speed={1.8}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 text-white">
              CORE <span className="text-purple-500">TEAM</span>
            </h1>
            <div className="h-1 w-24 bg-purple-600 mx-auto rounded-full shadow-[0_0_20px_#a855f7]" />
          </div>

          {/* CORE TEAM SECTION */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 w-full bg-white/5 animate-pulse rounded-[2rem] border border-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="mb-32">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={25}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                className="pb-16 team-swiper cursor-grab active:cursor-grabbing"
              >
                {coreTeam.map((member, idx) => (
                  <SwiperSlide key={idx}>
                    <ProfileCard
                      name={member.name}
                      role={member.role}
                      image={getAssetUrl("team", member.img)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* MENTORS SECTION */}
          <div className="text-center mb-16 pt-10 border-t border-white/5">
            <h2 className="text-4xl font-bold italic uppercase opacity-40 tracking-widest text-white">
              Club Mentors
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <ProfileCard
              name="Dr. Ashwin Kumar"
              role="Director"
              image={getAssetUrl("members", "ashwin.png")}
            />
            <ProfileCard
              name="Dr. Narendra Babu"
              role="Club Co-ordinator"
              image={getAssetUrl("members", "narendra.png")}
            />
            <ProfileCard
              name="Dr. Sanju"
              role="Advisory"
              image={getAssetUrl("members", "sanju.png")}
            />
            <ProfileCard
              name="Dr. Neelam Malyadri"
              role="Advisory"
              image={getAssetUrl("members", "neelam.png")}
            />
            <ProfileCard
              name="Dr. Selvan.C"
              role="Advisory"
              image={getAssetUrl("members", "selvan.png")}
            />
            <ProfileCard
              name="J Suneetha"
              role="Advisory"
              image={getAssetUrl("members", "suneetha.png")}
            />
          </div>
        </div>
      </div>

      {/* CUSTOM STYLES */}
      <style>{`
        .team-swiper .swiper-button-next, 
        .team-swiper .swiper-button-prev {
          color: #a855f7;
          transform: scale(0.7);
        }
        .team-swiper .swiper-pagination-bullet {
          background: #333;
        }
        .team-swiper .swiper-pagination-bullet-active {
          background: #a855f7;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #121212 25%, #1a1a1a 50%, #121212 75%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </PageTransition>
  );
};

export default TeamPage;