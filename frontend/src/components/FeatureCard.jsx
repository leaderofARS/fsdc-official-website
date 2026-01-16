import React from 'react';

const FeatureCard = ({ title, desc, icon: Icon, isSmall = false }) => {
  return (
    <div className={`group relative bg-[#0a0a0c] border border-white/5 rounded-2xl p-8 transition-all duration-300 cursor-default hover:border-purple-500/30 hover:bg-[#0d0d11] ${isSmall ? 'min-h-[200px]' : 'min-h-[250px]'}`}>
      {/* Icon with Purple Glow */}
      <div className="w-12 h-12 mb-6 rounded-xl bg-purple-900/20 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
        <Icon className="text-purple-400" size={24} />
      </div>
      
      <h3 className="text-white font-bold text-lg mb-3 tracking-tight uppercase">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      
      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 transition-all duration-500 group-hover:w-full rounded-full" />
    </div>
  );
};

export default FeatureCard;