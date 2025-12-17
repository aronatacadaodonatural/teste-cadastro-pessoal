import React from 'react';
import { Leaf } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex flex-col items-center">
        <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#155e37] uppercase mb-[-4px]">
          Atacadão do
        </span>
        <div className="relative flex items-center">
          {/* Stylized N with Leaf */}
          <div className="relative mr-[1px]">
            <span className="text-4xl sm:text-5xl font-bold text-[#155e37] tracking-tighter">N</span>
            <Leaf 
              className="absolute -left-3 top-0 w-8 h-8 sm:w-10 sm:h-10 text-[#be9d63] -rotate-12 z-[-1]" 
              fill="#be9d63" 
              fillOpacity={0.3}
            />
          </div>
          <span className="text-4xl sm:text-5xl font-bold text-[#155e37] tracking-tighter">
            ATURAL
          </span>
        </div>
      </div>
    </div>
  );
};