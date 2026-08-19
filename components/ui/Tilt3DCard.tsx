'use client';

import React, { useRef, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export function Tilt3DCard({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
  glare = true,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
          tilt.x !== 0 || tilt.y !== 0 ? scale : 1
        }, ${tilt.x !== 0 || tilt.y !== 0 ? scale : 1}, 1)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {/* Specular 3D light reflection */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit z-20 transition-opacity duration-300 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, rgba(255,255,255,0) 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
