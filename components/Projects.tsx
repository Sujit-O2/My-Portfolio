import React from 'react';
import { Github, ExternalLink, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-32 dark:bg-neutral-950 bg-slate-50 relative overflow-hidden">
      {/* 3D Moving Cyber Grid Background - Kept but made monochrome */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0 grayscale opacity-20"></div>
      
      <div className="absolute inset-0 bg-gradient-to-t dark:from-neutral-950 from-slate-50 via-transparent dark:to-neutral-950 to-slate-50 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="dark:text-neutral-400 text-slate-500 font-mono tracking-widest uppercase text-xs mb-2">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-bold dark:text-white text-slate-900">Featured Projects</h3>
            <p className="mt-4 max-w-2xl text-xl dark:text-neutral-400 text-slate-600 mx-auto">
              A selection of my work in Java, Spring Boot, and Full Stack Development.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {RESUME_DATA.projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="dark:bg-neutral-900 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border dark:border-neutral-800 border-slate-200 flex flex-col group relative overflow-hidden"
            >
              {/* Monochrome metallic sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none z-20"></div>

              <div className="p-6 flex-1 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 dark:bg-neutral-800 bg-slate-100 rounded-lg dark:text-white text-slate-900 transition-colors duration-300 border dark:border-neutral-700 border-slate-200">
                    <Layers size={24} />
                  </div>
                  <span className="text-xs font-mono dark:text-neutral-400 text-slate-500 border dark:border-neutral-700 border-slate-200 px-3 py-1 rounded dark:bg-neutral-950 bg-white">
                    {project.period}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold dark:text-white text-slate-900 mb-2 transition-all duration-300 origin-left group-hover:scale-105 group-hover:text-rose-600 dark:group-hover:text-rose-400">{project.title}</h4>
                {project.subtitle && <p className="text-sm dark:text-neutral-400 text-slate-500 font-medium mb-4">{project.subtitle}</p>}
                
                <p className="dark:text-neutral-400 text-slate-600 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 dark:bg-neutral-950 bg-slate-50 dark:text-neutral-300 text-slate-600 text-xs font-mono rounded border dark:border-neutral-800 border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="dark:bg-neutral-950/50 bg-slate-50 px-6 py-4 border-t dark:border-neutral-800 border-slate-200 flex justify-between items-center backdrop-blur-sm relative z-10">
                <a 
                  href={`https://github.com/${RESUME_DATA.contact.github}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium dark:text-neutral-400 text-slate-500 hover:text-black dark:hover:text-white transition-colors gap-2"
                >
                  <Github size={18} />
                  <span>Source</span>
                </a>
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Live demo environment is currently offline for maintenance. Please check back later.");
                  }}
                  className="flex items-center text-sm font-medium dark:text-neutral-400 text-slate-500 hover:text-black dark:hover:text-white transition-colors gap-2 cursor-pointer"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;