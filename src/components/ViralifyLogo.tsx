export const ViralifyLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <img 
        src="https://res.cloudinary.com/dolij7wjr/image/upload/v1761333298/ChatGPT_Image_Oct_24__2025__03_13_34_PM-removebg-preview_q7vsob.png"
        alt="VIRALIFY"
        className="w-full h-auto max-w-[280px]"
        style={{
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
        }}
      />
    </div>
  );
};
