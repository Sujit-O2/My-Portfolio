import React, { useState } from 'react';
import { Layers, Github, ExternalLink, Download, Terminal, Database, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';

// --- Types ---
interface Project {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  link?: string;
  period?: string;
}

// --- Helper: Map Static Projects to Real Links ---
const getStaticLink = (title: string) => {
  const repoName = title.replace(/\s+/g, '-');
  return `https://github.com/${RESUME_DATA.contact.github}/${repoName}`;
};

// Initialize state
const INITIAL_PROJECTS: Project[] = RESUME_DATA.projects.map((p) => ({
  ...p,
  link: getStaticLink(""),
}));

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  // --- Logic: Fetch Real GitHub Data ---
  const handleLoadGitHub = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${RESUME_DATA.contact.github}/repos?sort=updated&per_page=100`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const existingTitles = new Set(projects.map((p) => p.title.toLowerCase()));

        const newProjects: Project[] = data
          .filter((repo: any) => !repo.fork && !existingTitles.has(repo.name.replace(/-/g, ' ').toLowerCase()))
          .map((repo: any) => ({
            title: repo.name.replace(/-/g, ' '),
            subtitle: repo.language || 'Development',
            description: repo.description || 'A GitHub repository project.',
            tags: [repo.language, 'GitHub'].filter(Boolean),
            link: repo.html_url,
            period: new Date(repo.updated_at).getFullYear().toString(),
          }));

        setProjects((prev) => [...prev, ...newProjects]);
        setIsFetched(true);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 dark:bg-neutral-950 bg-slate-50 relative overflow-hidden">
      
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] dark:opacity-20 opacity-5 bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-3 dark:bg-neutral-900 bg-white rounded-lg text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] border dark:border-cyan-900/50 border-cyan-100">
              <Layers size={24} />
            </div>
            <h2 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight">Featured Projects</h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg dark:text-neutral-400 text-slate-600 max-w-2xl ml-1"
          >
             A selection of my work in Java, Spring Boot, and Full Stack Development.
          </motion.p>
        </div>

        {/* --- Projects Grid --- */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div 
                key={project.title + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.05 }}
                
                // --- WINDOW HOVER EFFECT ---
                whileHover={{ 
                  y: -12,      // Lifts up
                  scale: 1.02, // Slight growth
                  transition: { duration: 0.3 }
                }}
                
                className="group relative"
              >
                {/* Decorative Dot */}
                <span className="absolute -left-[5px] -top-[5px] w-3 h-3 rounded-full dark:bg-neutral-950 bg-slate-50 border-2 border-cyan-500 group-hover:scale-125 group-hover:bg-cyan-500 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.8)] z-20"></span>

                {/* Card Container */}
                <div className="h-full flex flex-col dark:bg-neutral-900/30 bg-white/60 backdrop-blur-sm p-6 rounded-xl 
                                transition-all duration-300 border dark:border-neutral-800 border-slate-200 relative overflow-hidden
                                group-hover:bg-white dark:group-hover:bg-neutral-900 
                                group-hover:border-cyan-500/50
                                group-hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)]">
                  
                  {/* Top Row: Icon & Year */}
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-2 dark:bg-neutral-800 bg-slate-100 rounded-md text-cyan-500 group-hover:text-cyan-400 group-hover:bg-cyan-950/30 transition-colors">
                        {project.tags.some(t => t.includes('Java')) ? <Terminal size={20} /> : 
                         project.tags.includes('Spring Boot') ? <Database size={20} /> : 
                         <Code2 size={20} />}
                     </div>
                     <div className="flex items-center text-xs font-mono text-cyan-500 dark:text-cyan-400 dark:bg-cyan-950/20 bg-cyan-50 px-2 py-1 rounded border dark:border-cyan-900/30 border-cyan-200">
                        {project.period || '2025'}
                     </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold dark:text-white text-slate-800 group-hover:text-cyan-400 transition-colors mb-1">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                     <p className="text-xs font-semibold uppercase tracking-wider dark:text-neutral-500 text-slate-400 mb-3 group-hover:text-neutral-400">
                       {project.subtitle}
                     </p>
                  )}

                  {/* Description */}
                  <p className="text-sm dark:text-neutral-400 text-slate-600 leading-relaxed mb-6 line-clamp-4 flex-grow group-hover:text-neutral-300">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-[10px] uppercase font-bold tracking-wide dark:bg-neutral-950 bg-slate-50 dark:text-neutral-400 text-slate-600 rounded border dark:border-neutral-800 border-slate-200 group-hover:border-cyan-500/20 group-hover:text-cyan-100/70 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links Footer */}
                  <div className="pt-4 border-t dark:border-neutral-800 border-slate-200 flex justify-between items-center mt-auto group-hover:border-neutral-700">
                    <a 
                      href={project.link || `https://github.com/${RESUME_DATA.contact.github}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-xs font-bold dark:text-neutral-500 text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors gap-2"
                    >
                      <Github size={16} />
                      <span>SOURCE</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- Load More Button --- */}
        {!isFetched && (
          <div className="flex justify-center">
             <button 
                onClick={handleLoadGitHub}
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-neutral-900 border border-neutral-800 rounded-full hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300"
             >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                         <div className="animate-spin rounded-full h-4 w-4 border-2 border-cyan-500 border-t-transparent"></div>
                        <span className="text-cyan-500">Scanning...</span>
                    </span>
                ) : (
                    <span className="flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                        <Download size={18} />
                        Load Repositories
                    </span>
                )}
             </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;