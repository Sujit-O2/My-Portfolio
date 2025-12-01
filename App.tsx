import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen dark:bg-neutral-950 bg-slate-50 relative transition-colors duration-300">
      {/* Global Animated Flow Background (Dark Mode) */}
      <div className="fixed inset-0 z-0 animate-flow-dark bg-[linear-gradient(-45deg,#0a0a0a,#1a0505,#0a0a0a,#051a05,#0a0a0a)] pointer-events-none opacity-60 hidden dark:block"></div>
      
      {/* Global Animated Flow Background (Light Mode) */}
      <div className="fixed inset-0 z-0 animate-flow-light bg-[linear-gradient(-45deg,#f8fafc,#fef2f2,#f8fafc,#f0fdf4,#f8fafc)] pointer-events-none opacity-60 block dark:hidden"></div>
      
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
        </main>
        <Contact />
      </div>
      
      <AiAssistant />
    </div>
  );
};

export default App;