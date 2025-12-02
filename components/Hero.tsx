import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, MapPin, Mail, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

// Enhanced CSS for Stronger Glows and Orbits
const styles = `
  @keyframes orbit {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes orbit-reverse {
    0% { transform: translate(-50%, -50%) rotate(360deg); }
    100% { transform: translate(-50%, -50%) rotate(0deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .quantum-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  
  /* NEON GLOW RINGS */
  .quantum-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); /* Soft green glow */
  }
  
  .qr-1 { 
    width: 130%; 
    height: 130%; 
    border: 1px solid rgba(244, 63, 94, 0.4); 
    box-shadow: 0 0 20px rgba(244, 63, 94, 0.2); /* Rose Glow */
    animation: orbit 12s linear infinite; 
  }
  
  .qr-2 { 
    width: 170%; 
    height: 170%; 
    border: 1px solid rgba(16, 185, 129, 0.3);
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); /* Emerald Glow */
    animation: orbit-reverse 18s linear infinite; 
  }
  
  .qr-3 { 
    width: 210%; 
    height: 210%; 
    border: 1px dashed rgba(16, 185, 129, 0.2); 
    animation: orbit 30s linear infinite; 
  }
  
  /* BRIGHT NEON PARTICLES */
  .quantum-particle {
    width: 10px;
    height: 10px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 15px 2px #10b981; /* Intense Particle Glow */
  }
  
  .rose-particle {
    background: #f43f5e;
    box-shadow: 0 0 15px 2px #f43f5e;
  }
`;

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    "Java Developer",
    "Full Stack Enthusiast", 
    "Problem Solver", 
    "Spring Boot Expert"
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); 
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "https://drive.google.com/uc?export=download&id=11Jr_4KDbiHsqKl5gyTBx1F2N5_CGswCj";
    link.download = "Sujit_Swain_Resume.pdf";
    link.click();
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <section id="about" className="relative w-full overflow-hidden min-h-screen flex items-center pt-24 pb-12 md:py-0">
        
        {/* Background Radial Glow (Stronger) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[900px] md:h-[900px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
            
            {/* TEXT CONTENT SIDE */}
            <div className="flex-1 space-y-8 text-center md:text-left relative z-20 order-2 md:order-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full dark:bg-neutral-900/80 bg-white/80 backdrop-blur-sm border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wide uppercase shadow-[0_0_15px_rgba(16,185,129,0.3)] mx-auto md:mx-0">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                  System Online
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold dark:text-white text-slate-900 leading-tight tracking-tighter drop-shadow-lg">
                  Hi, I'm <br className="hidden md:block"/>
                  <span 
                    className="glitch inline-block mt-2 md:mt-0 text-slate-900 dark:text-white" 
                    data-text={RESUME_DATA.name}
                  >
                    {RESUME_DATA.name}
                  </span>
                </h1>
                
                {/* Typewriter Effect */}
                <div className="h-10 text-xl md:text-3xl dark:text-neutral-300 text-slate-700 font-mono font-bold flex justify-center md:justify-start items-center gap-2">
                  <Terminal size={24} className="text-rose-500 flex-shrink-0 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                  <span className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">{text}</span>
                  <span className="w-[3px] h-6 bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                </div>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="dark:text-neutral-400 text-slate-600 max-w-2xl text-base md:text-lg leading-relaxed mx-auto md:mx-0 font-light border-l-0 md:border-l-2 dark:border-neutral-800 border-slate-300 md:pl-4"
              >
                {RESUME_DATA.summary}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-4 text-sm dark:text-neutral-400 text-slate-500 justify-center md:justify-start"
              >
                <div className="flex items-center gap-2 px-3 py-1 rounded border border-transparent hover:border-rose-500/30 hover:bg-rose-500/5 transition-all cursor-default">
                  <MapPin size={16} className="text-rose-500" />
                  {RESUME_DATA.contact.location}
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded border border-transparent hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all cursor-default">
                  <Mail size={16} className="text-emerald-500" />
                  {RESUME_DATA.contact.email}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
              >
                <a 
                  href="#contact" 
                  onClick={handleScrollToContact}
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white dark:bg-neutral-900 bg-slate-900 overflow-hidden rounded-sm transition-all hover:bg-neutral-800 border border-rose-600 cursor-pointer w-full sm:w-auto shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)]"
                >
                  <div className="absolute inset-0 w-0 bg-rose-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                  <span className="relative flex items-center gap-2">
                    Initiate Protocol <ArrowRight size={18} />
                  </span>
                </a>
                
                <button
                  onClick={handleDownloadResume}
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold dark:text-neutral-300 text-slate-700 dark:bg-neutral-950 bg-white overflow-hidden rounded-sm transition-all border dark:border-neutral-700 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer w-full sm:w-auto hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <div className="absolute inset-0 w-full h-full bg-emerald-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <span className="relative flex items-center gap-2">
                    Download Data <Download size={18} />
                  </span>
                </button>
              </motion.div>
            </div>

            {/* IMAGE SIDE - GLOW + ZOOM + B/W to COLOR */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center order-1 md:order-2"
            >
              {/* Container for Image + Backgrounds */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                
                {/* Quantum Core Background (Glows & Spins) */}
                <div className="quantum-wrapper">
                  <div className="quantum-ring qr-1">
                    <div className="quantum-particle rose-particle absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                  <div className="quantum-ring qr-2">
                      <div className="quantum-particle absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
                  </div>
                  <div className="quantum-ring qr-3"></div>
                </div>

                {/* Profile Image Container */}
                {/* 'group' class here controls the hover state for the image inside */}
                <motion.div 
                   animate={{ scale: [0.98, 1.02, 0.98] }} // Breathing Animation
                   transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                   className="relative group w-56 h-56 md:w-80 md:h-80 rounded-full dark:bg-neutral-950 bg-slate-100 border-4 border-emerald-500/30 overflow-hidden z-10 shadow-[0_0_50px_rgba(16,185,129,0.25)] hover:shadow-[0_0_70px_rgba(16,185,129,0.5)] transition-shadow duration-500"
                >
                  <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczM3X8RlrZHPIIltHP4cGK5x_xh6b2AS_wUhgQT7_3gSKQC8a1iskPv2u0mw8VrHBFQHRQ_7oTdJGORqKguYST89qFmkvFawda76Jq5Lh7KktKhUrhaL_zOmouMggsKJlTL4X9K486hqYNgSkQv__vVGhg=w863-h972-s-no-gm?authuser=0"
                    alt={RESUME_DATA.name} 
                    className="
                      w-full h-full object-cover object-top 
                      grayscale group-hover:grayscale-0 
                      scale-100 group-hover:scale-110 
                      transition-all duration-700 ease-in-out
                    "
                  />
                  
                  {/* Overlay Scanline Effect (Fades out on hover for clear view) */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-hard-light opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
                </motion.div>

                {/* Status Badge */}
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-6 -left-2 md:bottom-10 md:-left-6 p-3 dark:bg-neutral-900/90 bg-white/90 backdrop-blur-md rounded border-l-2 border-emerald-500 shadow-[0_0_20px_rgba(0,0,0,0.3)] z-20"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono dark:text-neutral-500 text-slate-500 uppercase leading-none mb-1">Status</span>
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold leading-none tracking-wider drop-shadow-sm">ONLINE</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;