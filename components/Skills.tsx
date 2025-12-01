import React from 'react';
import { Award, Trophy, Cpu, Database, Layout, Terminal, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

const getIconForCategory = (category: string) => {
  if (category.includes('Tools')) return <Cpu size={20} />;
  if (category.includes('Languages')) return <Terminal size={20} />;
  return <Database size={20} />;
};

const Skills: React.FC = () => {
  // Stagger animation configuration for skill chips
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="skills" className="py-20 md:py-32 dark:bg-neutral-950 bg-slate-50 relative overflow-hidden">
      
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technical Arsenal Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="p-2 dark:bg-neutral-900 bg-white rounded-lg border dark:border-neutral-800 border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Layout className="dark:text-white text-slate-900 relative z-10" size={24} />
              </div>
              <h2 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight">Technical Arsenal</h2>
            </motion.div>
            
            <div className="space-y-6">
              {RESUME_DATA.skills.map((category, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15 }}
                  className="relative group perspective-1000"
                >
                   {/* Clean Card Design with Holographic Scan Effect */}
                   <div className="relative p-6 rounded-xl border dark:border-neutral-800 border-slate-200 dark:bg-neutral-900 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 overflow-hidden group-hover:transform group-hover:scale-[1.01]">
                      
                      {/* Scanning Light Effect */}
                      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shimmer pointer-events-none" />
                      
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-2 rounded-md dark:bg-neutral-800 bg-slate-100 dark:text-neutral-200 text-slate-700 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors duration-300">
                          {getIconForCategory(category.category)}
                        </div>
                        <h3 className="text-lg font-bold dark:text-white text-slate-800 font-mono tracking-wide uppercase group-hover:text-emerald-500 transition-colors duration-300">{category.category}</h3>
                      </div>
                      
                      {/* Skills Grid with Staggered Animation */}
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2 relative z-10"
                      >
                        {category.skills.map((skill, i) => (
                          <motion.div 
                            key={i} 
                            variants={itemVariants}
                            whileHover={{ 
                              scale: 1.1, 
                              y: -2,
                              backgroundColor: "rgba(16, 185, 129, 0.1)", 
                              borderColor: "#10b981",
                              color: "#10b981",
                              boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)"
                            }}
                            className="px-3 py-1.5 rounded text-xs font-bold font-mono tracking-wider transition-all duration-200 cursor-default border dark:bg-neutral-950/80 bg-slate-50 dark:text-neutral-400 text-slate-600 dark:border-neutral-800 border-slate-200 backdrop-blur-sm"
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </motion.div>
                   </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements & Certifications Column */}
          <div className="flex flex-col h-full">
            {/* Achievements - GOLD */}
            <div className="mb-12">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                  <Trophy className="text-yellow-500" size={24} />
                </div>
                <h2 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight">Achievements</h2>
              </motion.div>

              <div className="space-y-4">
                {RESUME_DATA.achievements.map((ach, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    className="relative p-6 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-xl border border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.05)] overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                       <Trophy size={60} className="text-yellow-500 rotate-12" />
                    </div>
                    {/* Animated Shine for Gold Card */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-yellow-200/20 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />

                    <div className="relative z-10">
                       <h4 className="text-lg font-bold text-yellow-600 dark:text-yellow-400 group-hover:text-yellow-500 transition-colors">{ach.title}</h4>
                       <p className="text-sm font-mono dark:text-neutral-400 text-slate-600 mt-2 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                         {ach.date}
                       </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications - ALL */}
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="p-2 dark:bg-neutral-900 bg-white rounded-lg border dark:border-neutral-800 border-slate-200">
                  <Award className="dark:text-white text-slate-900" size={24} />
                </div>
                <h2 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight">Certifications</h2>
              </motion.div>

              <div className="grid sm:grid-cols-1 gap-3">
                {RESUME_DATA.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                    className="group flex items-center p-4 dark:bg-neutral-900 bg-white rounded-lg border dark:border-neutral-800 border-slate-200 hover:border-emerald-500/30 transition-all duration-200 cursor-default"
                  >
                    <div className="mr-4 min-w-[24px]">
                      <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                         <CheckCircle size={20} className="text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h4 className="dark:text-neutral-200 text-slate-800 font-medium text-sm group-hover:dark:text-emerald-400 group-hover:text-emerald-600 transition-colors">{cert.name}</h4>
                      <p className="text-xs dark:text-neutral-500 text-slate-500 mt-0.5">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono dark:text-neutral-600 text-slate-400 whitespace-nowrap ml-2 group-hover:text-emerald-500/70">{cert.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;