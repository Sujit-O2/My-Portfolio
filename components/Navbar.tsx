import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';
// Make sure this path is correct based on your folder structure
import { HackerRankIcon, LeetCodeIcon } from "./Icons"; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80; // Navbar height approx
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      // FIXED: Added closing bracket > and ensured w-full is working
      className="fixed w-full z-50 dark:bg-neutral-950/80 bg-white/80 backdrop-blur-xl border-b dark:border-neutral-800 border-slate-200 shadow-sm top-0 left-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Name */}
          <div className="flex-shrink-0 cursor-pointer group">
            <a
              href="#about"
              onClick={(e) => handleScrollTo(e, '#about')}
              className="relative text-xl font-bold tracking-tight overflow-hidden block"
            >
              <span className="relative z-10 dark:text-white text-slate-900 group-hover:dark:text-neutral-300 group-hover:text-slate-600 transition-colors font-mono">
                {RESUME_DATA.name}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-900 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-all group relative overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 dark:text-neutral-400 text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-300 dark:bg-neutral-800"></div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={toggleTheme} 
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-600 dark:text-neutral-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <motion.a
                whileHover={{ y: -2 }}
                href={RESUME_DATA.leetcode}
                target="_blank"
                className="flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors">
                <LeetCodeIcon />
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                href={RESUME_DATA.hackerrank}
                target="_blank"
                className="flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors">
                <HackerRankIcon />
              </motion.a>

              <motion.a whileHover={{ y: -2 }} href={`https://github.com/${RESUME_DATA.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -2 }} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-neutral-800 text-slate-600 dark:text-neutral-400"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            // FIXED: Removed absolute to prevent alignment issues, or used absolute with top-16
            // Here we use absolute left-0 w-full top-16 to sit exactly below the navbar
            className="md:hidden absolute top-16 left-0 w-full dark:bg-neutral-950 bg-white border-b dark:border-neutral-800 border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="dark:text-neutral-300 text-slate-700 block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;