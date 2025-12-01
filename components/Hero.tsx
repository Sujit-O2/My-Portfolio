import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, MapPin, Mail, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

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
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
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
  link.href = "/flowcv.pdf"; // <-- file inside public/
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
    <section id="about" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 max-w-7xl mx-auto overflow-hidden min-h-[90vh] flex items-center">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Dynamic Background Particles */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-rose-500 rounded-full animate-ping delay-700"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full">
        <div className="flex-1 space-y-8 text-center md:text-left relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full dark:bg-neutral-900/80 bg-white/80 backdrop-blur-sm border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wide uppercase shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              System Online
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold dark:text-white text-slate-900 leading-tight tracking-tighter">
              Hi, I'm <br className="md:hidden"/>
              <span 
                className="glitch inline-block mt-2 md:mt-0 text-slate-900 dark:text-white" 
                data-text={RESUME_DATA.name}
              >
                {RESUME_DATA.name}
              </span>
            </h1>
            
            {/* Typewriter Effect */}
            <div className="h-10 text-xl md:text-3xl dark:text-neutral-300 text-slate-700 font-mono font-bold flex justify-center md:justify-start items-center gap-2">
              <Terminal size={24} className="text-rose-500" />
              <span className="text-emerald-500">{text}</span>
              <span className="cursor-blink"></span>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="dark:text-neutral-400 text-slate-600 max-w-2xl text-lg leading-relaxed mx-auto md:mx-0 font-light border-l-2 dark:border-neutral-800 border-slate-300 pl-4"
          >
            {RESUME_DATA.summary}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-6 text-sm dark:text-neutral-400 text-slate-500 justify-center md:justify-start"
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
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white dark:bg-neutral-900 bg-slate-900 overflow-hidden rounded-sm transition-all hover:bg-neutral-800 border border-rose-600 cursor-pointer"
            >
              <div className="absolute inset-0 w-0 bg-rose-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
              <span className="relative flex items-center gap-2">
                Initiate Protocol <ArrowRight size={18} />
              </span>
            </a>
            
            <button
              onClick={handleDownloadResume}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold dark:text-neutral-300 text-slate-700 dark:bg-neutral-950 bg-white overflow-hidden rounded-sm transition-all border dark:border-neutral-700 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-emerald-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              <span className="relative flex items-center gap-2">
                Download Data <Download size={18} />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Enhanced Profile Picture with Quantum Core Background */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 relative group mt-10 md:mt-0 z-10"
        >
          {/* New Cool Quantum Core Model */}
          <div className="quantum-wrapper opacity-80 scale-150">
             <div className="quantum-core"></div>
             <div className="quantum-ring qr-1">
               <div className="quantum-particle absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
             </div>
             <div className="quantum-ring qr-2">
                <div className="quantum-particle absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-rose-500 shadow-rose-500"></div>
             </div>
             <div className="quantum-ring qr-3"></div>
          </div>

          {/* Main Image Container with Custom Pulse Animation */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full dark:bg-neutral-950 bg-slate-100 border-4 overflow-hidden animate-neon transition-all duration-300 z-10">
             <img 
              src="/sujit.png" 
              alt={RESUME_DATA.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
            />
             {/* Overlay Scanline Effect */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-hard-light"></div>
          </div>
          
          <motion.div 
             animate={{ y: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
             className="absolute bottom-4 -left-4 p-3 dark:bg-black/80 bg-white/90 backdrop-blur-md rounded border-l-2 border-emerald-500 shadow-lg z-20"
          >
             <div className="flex items-center gap-3">
               <div className="relative">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute"></div>
                 <div className="w-2 h-2 bg-emerald-500 rounded-full relative"></div>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-mono dark:text-neutral-500 text-slate-500 uppercase leading-none mb-1">Status</span>
                 <span className="text-xs font-mono text-emerald-500 font-bold leading-none tracking-wider">ONLINE</span>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;