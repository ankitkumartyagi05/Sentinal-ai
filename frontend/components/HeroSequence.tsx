'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from '../lib/motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls, Environment, Text, Trail } from '@react-three/drei';

const AICoreModel = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef(null);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="night" />
      
      {/* Central Core */}
      <group
         rotation-y={scrollProgress * Math.PI * 2}
      >
        <Sphere args={[1, 64, 64]} ref={meshRef}>
          <MeshDistortMaterial
            color="#0050FF"
            attach="material"
            distort={0.4 + scrollProgress * 0.2}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </group>
      
      {/* NLP Layer */}
      {scrollProgress > 0.4 && scrollProgress < 0.85 && (
        <group position={[-2, 1, 0]}>
          <Sphere args={[0.5, 32, 32]}>
            <MeshDistortMaterial color="#00D6FF" distort={0.2} speed={1} />
          </Sphere>
          <Text position={[0, -0.8, 0]} fontSize={0.2} color="white">
            NLP (Transformers)
          </Text>
        </group>
      )}

      {/* Vision Layer */}
      {scrollProgress > 0.4 && scrollProgress < 0.85 && (
        <group position={[2, 1, 0]}>
          <Sphere args={[0.5, 32, 32]}>
            <MeshDistortMaterial color="#FF3366" distort={0.2} speed={1} />
          </Sphere>
          <Text position={[0, -0.8, 0]} fontSize={0.2} color="white">
            Vision (CV + TF)
          </Text>
        </group>
      )}
      
      {/* Decision Engine */}
      {scrollProgress > 0.65 && scrollProgress < 0.85 && (
        <group position={[0, -2, 0]}>
          <Sphere args={[0.6, 32, 32]}>
            <meshStandardMaterial color={scrollProgress > 0.75 ? "#00FF66" : "#A0A0A0"} emissive={scrollProgress > 0.75 ? "#00FF66" : "#A0A0A0"} emissiveIntensity={0.5} />
          </Sphere>
          <Text position={[0, -1, 0]} fontSize={0.2} color="white">
            Decision Engine
          </Text>
        </group>
      )}

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
    </>
  );
};

export default function HeroSequence() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = typeof scrollYProgress === 'number' ? scrollYProgress : 0;
  
  let phaseText = "AI Engine Initialized";
  let phaseDesc = "The unified core is ready.";
  
  if (progress > 0.85) {
     phaseText = "System Secured";
     phaseDesc = "Ready to start moderating in real-time.";
  } else if (progress > 0.65) {
     phaseText = "Decision Matrix";
     phaseDesc = "Classifying content as Safe or Toxic instantly.";
  } else if (progress > 0.40) {
     phaseText = "Deep Execution";
     phaseDesc = "Exploding into specialized NLP and Vision modules.";
  } else if (progress > 0.15) {
     phaseText = "Data Ingestion";
     phaseDesc = "Streaming massive text and image pipelines.";
  }

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#050505] w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0050FF]/20 via-[#050505] to-[#050505] z-0 pointer-events-none" />

        <div className="absolute top-[20%] z-10 flex flex-col items-center text-center px-4 w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white glow-text font-['Outfit']"
          >
            {phaseText}
          </motion.h1>
          <motion.p 
            key={phaseDesc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xl md:text-2xl text-gray-400 max-w-2xl font-['Inter']"
          >
            {phaseDesc}
          </motion.p>
        </div>

        <div className="absolute inset-0 z-0 h-[120vh] top-[10%]">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <AICoreModel scrollProgress={progress} />
          </Canvas>
        </div>

        {progress > 0.85 && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="absolute bottom-[20%] z-20"
           >
             <button onClick={() => window.location.href='/dashboard'} className="bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_20px_rgba(0,80,255,0.4)] hover:scale-105 transition-transform">
               Enter Dashboard
             </button>
           </motion.div>
        )}
        
        <div className="absolute bottom-10 z-10 flex flex-col items-center">
            <p className="text-gray-500 text-sm mb-2 font-mono uppercase tracking-widest">Scroll to Analyze</p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-10 bg-gradient-to-b from-[#0050FF] to-transparent rounded-full"
            />
        </div>

      </div>
    </div>
  );
}
