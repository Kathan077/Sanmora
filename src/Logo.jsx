import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
      <div className="relative">
        <span className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 via-primary to-secondary filter drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
          SANMORA
        </span>
        <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-500 group-hover:w-full opacity-70" />
      </div>
    </div>
  );
};

export default Logo;
