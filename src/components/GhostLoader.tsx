import React from 'react';

interface GhostLoaderProps {
  progress?: number;
}

export const GhostLoader: React.FC<GhostLoaderProps> = ({ progress = 0 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div style={{ transform: 'scale(0.8)', position: 'relative' }}>
        <div 
          id="ghost"
          style={{
            animation: 'upNDown 0.5s infinite',
            position: 'relative',
            width: '140px',
            height: '140px',
            display: 'grid',
            gridTemplateColumns: 'repeat(14, 1fr)',
            gridTemplateRows: 'repeat(14, 1fr)',
            gridTemplateAreas: `
              "a1  a2  a3  a4  a5  top0  top0  top0  top0  a10 a11 a12 a13 a14"
              "b1  b2  b3  top1 top1 top1 top1 top1 top1 top1 top1 b12 b13 b14"
              "c1 c2 top2 top2 top2 top2 top2 top2 top2 top2 top2 top2 c13 c14"
              "d1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 d14"
              "e1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 e14"
              "f1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 f14"
              "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
              "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
              "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
              "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
              "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
              "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
              "st0 st0 an4 st1 an7 st2 an10 an10 st3 an13 st4 an16 st5 st5"
              "an1 an2 an3 an5 an6 an8 an9 an9 an11 an12 an14 an15 an17 an18"
            `
          }}
        >
          {/* Red body parts */}
          <div style={{ gridArea: 'top0', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'top1', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'top2', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'top3', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'top4', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'st0', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'st1', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'st2', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'st3', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'st4', backgroundColor: '#FF006B' }} />
          <div style={{ gridArea: 'st5', backgroundColor: '#FF006B' }} />
          
          {/* Animated parts */}
          <div style={{ gridArea: 'an1', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 5 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an2', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 10 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an3', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 15 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an4', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 20 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an6', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 30 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an7', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 35 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an8', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 40 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an9', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 45 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an10', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 50 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an11', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 55 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an12', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 60 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an13', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 65 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an15', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 75 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an16', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 80 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an17', animation: 'flicker1 0.5s infinite', backgroundColor: progress > 85 ? '#FF006B' : 'transparent' }} />
          <div style={{ gridArea: 'an18', animation: 'flicker0 0.5s infinite', backgroundColor: progress > 90 ? '#FF006B' : 'transparent' }} />
          
          {/* Eyes */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '10px',
            width: '40px',
            height: '50px'
          }}>
            <div style={{
              backgroundColor: 'white',
              width: '20px',
              height: '50px',
              transform: 'translateX(10px)',
              position: 'absolute'
            }} />
            <div style={{
              backgroundColor: 'white',
              width: '40px',
              height: '30px',
              transform: 'translateY(10px)',
              position: 'absolute'
            }} />
          </div>
          
          <div style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            width: '40px',
            height: '50px'
          }}>
            <div style={{
              backgroundColor: 'white',
              width: '20px',
              height: '50px',
              transform: 'translateX(10px)',
              position: 'absolute'
            }} />
            <div style={{
              backgroundColor: 'white',
              width: '40px',
              height: '30px',
              transform: 'translateY(10px)',
              position: 'absolute'
            }} />
          </div>
          
          {/* Pupils */}
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#7B2FFF',
            position: 'absolute',
            top: '50px',
            left: '10px',
            zIndex: 1,
            animation: 'eyesMovement 3s infinite'
          }} />
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#7B2FFF',
            position: 'absolute',
            top: '50px',
            right: '50px',
            zIndex: 1,
            animation: 'eyesMovement 3s infinite'
          }} />
        </div>
        
        {/* Shadow */}
        <div style={{
          backgroundColor: 'black',
          width: '140px',
          height: '140px',
          position: 'absolute',
          borderRadius: '50%',
          transform: 'rotateX(80deg)',
          filter: 'blur(20px)',
          top: '80%',
          animation: 'shadowMovement 0.5s infinite',
          opacity: 0.3
        }} />
      </div>
      
      {/* Progress text */}
      <div className="text-2xl font-bold text-white"
           style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        {progress}%
      </div>
      
      <style jsx>{`
        @keyframes upNDown {
          0%, 49% { transform: translateY(0px); }
          50%, 100% { transform: translateY(-10px); }
        }
        
        @keyframes flicker0 {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.3; }
        }
        
        @keyframes flicker1 {
          0%, 49% { opacity: 0.3; }
          50%, 100% { opacity: 1; }
        }
        
        @keyframes eyesMovement {
          0%, 49% { transform: translateX(0px); }
          50%, 99% { transform: translateX(10px); }
          100% { transform: translateX(0px); }
        }
        
        @keyframes shadowMovement {
          0%, 49% { opacity: 0.5; }
          50%, 100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};
