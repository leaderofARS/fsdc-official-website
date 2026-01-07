import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div className={`bg-white/5 animate-pulse rounded-2xl ${className}`}>
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
};

export default Skeleton;