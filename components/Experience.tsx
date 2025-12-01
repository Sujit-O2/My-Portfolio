import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-32 dark:bg-neutral-950 bg-slate-50 relative">
       {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] dark:opacity-20 opacity-5 bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="p-3 dark:bg-neutral-900 bg-white rounded-lg text-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.15)] border dark:border-rose-900/50 border-rose-100">
                <Briefcase size={24} />
              </div>
              <h2 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight">Experience</h2>
            </motion.div>

            {/* LASER BEAM TIMELINE CONTAINER */}
            <div className="relative ml-4 space-y-12">
              <div className="absolute left-0 top-2 bottom-0 laser-beam rounded-full"></div>

              {RESUME_DATA.experience.map((exp, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-10 group"
                >
                  <span className="absolute -left-[5px] top-2 w-3 h-3 rounded-full dark:bg-neutral-950 bg-slate-50 border-2 border-rose-500 group-hover:scale-125 group-hover:bg-rose-500 transition-all duration-300 shadow-[0_0_10px_rgba(225,29,72,0.8)] z-10"></span>
                  
                  <div className="dark:bg-neutral-900/30 bg-white/60 backdrop-blur-sm p-6 rounded-xl hover:bg-white dark:hover:bg-neutral-900 hover:shadow-2xl hover:shadow-rose-900/10 transition-all border dark:border-neutral-800 border-slate-200 hover:border-rose-500/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-bold dark:text-white text-slate-800 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">{exp.role}</h3>
                      <div className="flex items-center text-xs font-mono text-rose-500 dark:text-rose-400 dark:bg-rose-950/20 bg-rose-50 px-2 py-1 rounded border dark:border-rose-900/30 border-rose-200 mt-2 sm:mt-0 w-fit">
                        <Calendar size={12} className="mr-1" />
                        {exp.period}
                      </div>
                    </div>
                    
                    <h4 className="text-lg dark:text-neutral-300 text-slate-600 font-medium mb-1">{exp.company}</h4>
                    <p className="text-sm dark:text-neutral-500 text-slate-500 mb-3 italic flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full dark:bg-neutral-600 bg-slate-400"></span>
                        {exp.location}
                    </p>
                    
                    <ul className="list-disc list-outside ml-4 space-y-2 dark:text-neutral-400 text-slate-600 text-sm leading-relaxed marker:text-rose-500">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="p-3 dark:bg-neutral-900 bg-white rounded-lg text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] border dark:border-emerald-900/50 border-emerald-100">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-3xl font-bold dark:text-white text-slate-900 tracking-tight">Education</h2>
            </motion.div>

            {/* LASER BEAM TIMELINE CONTAINER */}
            <div className="relative ml-4 space-y-12">
              <div className="absolute left-0 top-2 bottom-0 laser-beam rounded-full"></div>

              {RESUME_DATA.education.map((edu, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-10 group"
                >
                  <span className="absolute -left-[5px] top-2 w-3 h-3 rounded-full dark:bg-neutral-950 bg-slate-50 border-2 border-emerald-500 group-hover:scale-125 group-hover:bg-emerald-500 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-10"></span>
                  
                  <div className="dark:bg-neutral-900/30 bg-white/60 backdrop-blur-sm p-6 rounded-xl hover:bg-white dark:hover:bg-neutral-900 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all border dark:border-neutral-800 border-slate-200 hover:border-emerald-500/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-lg font-bold dark:text-white text-slate-800 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">{edu.degree}</h3>
                      <div className="flex items-center text-xs font-mono text-emerald-500 dark:text-emerald-400 dark:bg-emerald-950/20 bg-emerald-50 px-2 py-1 rounded border dark:border-emerald-900/30 border-emerald-200 mt-2 sm:mt-0 w-fit">
                        <Calendar size={12} className="mr-1" />
                        {edu.period}
                      </div>
                    </div>
                    
                    <h4 className="text-base dark:text-neutral-300 text-slate-600 font-medium mb-3">{edu.institution}</h4>
                    
                    <ul className="list-none space-y-2 dark:text-neutral-400 text-slate-600 text-sm leading-relaxed dark:bg-black/40 bg-slate-50 p-4 rounded-lg border dark:border-neutral-800 border-slate-200">
                      {edu.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-emerald-500 mt-1">▹</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;