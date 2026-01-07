import React, { useRef, useState } from "react";
import { Github, Linkedin } from "lucide-react";

const ProfileCard = ({ name, role, image }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({ x: (y - centerY) / 15, y: (centerX - x) / 15 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      className="group relative perspective-1000 h-full"
    >
      <div
        className="relative h-full bg-white/[0.03] border border-white/10 p-6 rounded-[2.5rem] transition-all duration-300 ease-out preserve-3d group-hover:bg-white/[0.08] group-hover:border-purple-500/50"
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d" 
        }}
      >
        <div className="relative w-32 h-32 mx-auto mb-6 transform translate-z-20">
          <div className="absolute inset-0 bg-purple-600 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" />
          <img 
            src={image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
            alt={name} 
            className="relative w-full h-full rounded-full object-cover border-2 border-white/10 shadow-lg" 
          />
        </div>
        <div className="text-center translate-z-30">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4">{role}</p>
          <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            <Github size={18} className="text-gray-400 hover:text-white cursor-pointer" />
            <Linkedin size={18} className="text-gray-400 hover:text-blue-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;