import { ReactNode } from "react";

interface AnalysisCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: "hook" | "loop" | "audio" | "sop";
  className?: string;
}

export const AnalysisCard = ({
  icon,
  title,
  description,
  gradient,
  className = "",
}: AnalysisCardProps) => {
  // Define gradient backgrounds matching the reference image
  const gradients = {
    hook: "bg-gradient-to-r from-[#FF006B] via-[#FF4B6B] to-[#FFAA00]",
    loop: "bg-gradient-to-r from-[#7B2FFF] via-[#9B4AFF] to-[#B24AFF]",
    audio: "bg-gradient-to-r from-[#FFAA00] via-[#FF8800] to-[#FF6B00]",
    sop: "bg-gradient-to-r from-[#6B2FFF] via-[#8B3FFF] to-[#9B4AFF]",
  };

  return (
    <div
      className={`relative overflow-visible ${gradients[gradient]} rounded-[2rem] p-5 transition-all duration-300 hover:scale-[1.02] ${className}`}
      style={{
        border: "4px solid black",
        boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Decorative splatters */}
      <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full opacity-70" 
           style={{ clipPath: 'polygon(40% 0%, 100% 30%, 80% 100%, 0% 70%, 20% 20%)' }} />
      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-cyan-400 rounded-full opacity-70" 
           style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
      <div className="absolute top-1/2 -right-2 w-6 h-6 bg-pink-400 rounded-full opacity-70" />
      
      <div className="relative z-10 flex items-start gap-3">
        {/* Icon container */}
        <div className="flex-shrink-0 bg-white/20 backdrop-blur-sm p-2.5 rounded-full"
             style={{ border: "3px solid black" }}>
          {icon}
        </div>
        
        {/* Text content */}
        <div className="flex-1">
          <h3 className="text-2xl font-black text-white mb-1 tracking-wide"
              style={{
                fontFamily: "'Rubik', sans-serif",
                fontWeight: "900",
                textTransform: "uppercase",
                WebkitTextStroke: "2px black",
                textStroke: "2px black",
                paintOrder: "stroke fill",
              }}>
            {title}
          </h3>
          <p className="text-black font-bold text-sm leading-tight"
             style={{
               fontFamily: "'Rubik', sans-serif",
               fontWeight: "700",
             }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
