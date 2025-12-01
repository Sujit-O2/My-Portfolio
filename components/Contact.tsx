import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Copy, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';

const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Capture form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Use FormSubmit.co AJAX endpoint
      const response = await fetch(`https://formsubmit.co/ajax/sujitswain077@gmail.com`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `New Portfolio Contact from ${data.name}`,
          _template: "table" // Makes the email look nicer
        })
      });

      if (response.ok) {
        setFormStatus('sent');
        (e.target as HTMLFormElement).reset();
        
        // Reset status after a few seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Form Error:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <footer id="contact" className="dark:bg-neutral-950 bg-slate-50 dark:text-white text-slate-900 py-20 relative overflow-hidden border-t dark:border-neutral-900 border-slate-200">
      {/* Abstract background shapes - Red & Green */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Cyber Grid Overlay for cool effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          
          <div>
            <div className="inline-block p-3 dark:bg-neutral-900 bg-white rounded-xl mb-6 border dark:border-neutral-800 border-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Mail className="dark:text-white text-slate-900" size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Let's Connect</h2>
            <p className="dark:text-neutral-400 text-slate-600 mb-8 max-w-md leading-relaxed text-lg">
              I am currently looking for full-stack software development opportunities. 
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            
            <div className="space-y-6">
              {/* Email Card */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 dark:bg-neutral-900 bg-white rounded-lg group-hover:bg-rose-600 transition-all duration-300 border dark:border-neutral-800 border-slate-200 group-hover:border-rose-500 shadow-lg shadow-transparent group-hover:shadow-rose-900/20">
                  <Mail size={20} className="dark:text-neutral-400 text-slate-500 group-hover:text-white" />
                </div>
                <div className="flex-1">
                   <p className="text-xs text-neutral-500 mb-1">Email</p>
                   <div className="flex items-center gap-3">
                     <a href={`mailto:${RESUME_DATA.contact.email}`} className="dark:text-neutral-300 text-slate-700 group-hover:text-rose-600 dark:group-hover:text-white transition-colors text-lg font-medium">
                        {RESUME_DATA.contact.email}
                     </a>
                     <button 
                        onClick={() => copyToClipboard(RESUME_DATA.contact.email, 'email')}
                        className="p-1 hover:bg-neutral-800 rounded transition-colors text-neutral-500 hover:text-white relative"
                        title="Copy Email"
                     >
                       <AnimatePresence mode='wait'>
                         {copiedEmail ? <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Check size={16} className="text-emerald-500"/></motion.div> : <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Copy size={16}/></motion.div>}
                       </AnimatePresence>
                     </button>
                   </div>
                </div>
              </motion.div>
              
              {/* Phone Card */}
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 dark:bg-neutral-900 bg-white rounded-lg group-hover:bg-emerald-600 transition-all duration-300 border dark:border-neutral-800 border-slate-200 group-hover:border-emerald-500 shadow-lg shadow-transparent group-hover:shadow-emerald-900/20">
                  <Phone size={20} className="dark:text-neutral-400 text-slate-500 group-hover:text-white" />
                </div>
                <div className="flex-1">
                   <p className="text-xs text-neutral-500 mb-1">Phone</p>
                   <div className="flex items-center gap-3">
                     <a href={`tel:${RESUME_DATA.contact.phone}`} className="dark:text-neutral-300 text-slate-700 group-hover:text-emerald-600 dark:group-hover:text-white transition-colors text-lg font-medium">
                        {RESUME_DATA.contact.phone}
                     </a>
                     <button 
                        onClick={() => copyToClipboard(RESUME_DATA.contact.phone, 'phone')}
                        className="p-1 hover:bg-neutral-800 rounded transition-colors text-neutral-500 hover:text-white relative"
                        title="Copy Phone"
                     >
                       <AnimatePresence mode='wait'>
                         {copiedPhone ? <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Check size={16} className="text-emerald-500"/></motion.div> : <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Copy size={16}/></motion.div>}
                       </AnimatePresence>
                     </button>
                   </div>
                </div>
              </motion.div>

              <div className="flex items-center gap-4 group pt-2">
                <div className="p-3 dark:bg-neutral-900 bg-white rounded-lg border dark:border-neutral-800 border-slate-200">
                  <MapPin size={20} className="dark:text-neutral-500 text-slate-500" />
                </div>
                <span className="dark:text-neutral-400 text-slate-600 text-lg">
                  {RESUME_DATA.contact.location}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <motion.a 
                whileHover={{ y: -3, backgroundColor: '#fff', color: '#000' }} 
                href={`https://github.com/${RESUME_DATA.contact.github}`} 
                target="_blank"
                className="p-3 dark:bg-neutral-900 bg-white rounded-lg dark:text-neutral-400 text-slate-600 transition-all border dark:border-neutral-800 border-slate-200"
              >
                <Github size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, backgroundColor: '#0077b5', color: '#fff' }} 
                href="https://linkedin.com" 
                target="_blank"
                className="p-3 dark:bg-neutral-900 bg-white rounded-lg dark:text-neutral-400 text-slate-600 transition-all border dark:border-neutral-800 border-slate-200"
              >
                <Linkedin size={24} />
              </motion.a>
            </div>
          </div>

          {/* Holographic Contact Form */}
          <div className="dark:bg-neutral-900/40 bg-white/50 backdrop-blur-xl p-8 rounded-3xl border dark:border-neutral-800 border-slate-200 shadow-2xl relative group overflow-hidden">
            {/* Neon Border Effects */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

            <h3 className="text-2xl font-bold mb-6 dark:text-white text-slate-900 relative z-10 flex items-center gap-2">
              Send a Message
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </h3>
            
            <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium dark:text-neutral-400 text-slate-600 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required
                  className="w-full dark:bg-neutral-950/60 bg-white border dark:border-neutral-700 border-slate-300 rounded-xl px-4 py-3 dark:text-white text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all placeholder:text-neutral-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium dark:text-neutral-400 text-slate-600 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  className="w-full dark:bg-neutral-950/60 bg-white border dark:border-neutral-700 border-slate-300 rounded-xl px-4 py-3 dark:text-white text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-neutral-600"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium dark:text-neutral-400 text-slate-600 mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4}
                  required
                  className="w-full dark:bg-neutral-950/60 bg-white border dark:border-neutral-700 border-slate-300 rounded-xl px-4 py-3 dark:text-white text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all resize-none placeholder:text-neutral-600"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={formStatus === 'sending' || formStatus === 'sent'}
                className="w-full font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] flex items-center justify-center gap-2 border border-rose-500/20 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === 'idle' && (
                  <>Send Protocol <Send size={18} /></>
                )}
                {formStatus === 'sending' && (
                  <>Sending... <Loader2 size={18} className="animate-spin" /></>
                )}
                {formStatus === 'sent' && (
                  <>Sent Successfully! <Check size={18} /></>
                )}
                {formStatus === 'error' && (
                   <>Failed. Try Again.</>
                )}
              </motion.button>
              
              <p className="text-center text-xs dark:text-neutral-500 text-slate-400 mt-2">
                 *First time submissions may require verification via email.
              </p>
            </form>
          </div>

        </motion.div>
        
        <div className="mt-20 pt-8 border-t dark:border-neutral-900 border-slate-200 text-center dark:text-neutral-600 text-slate-400 text-sm flex justify-center gap-8">
          <p>&copy; {new Date().getFullYear()} {RESUME_DATA.name}. All rights reserved.</p>
          <div className="flex gap-2 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-75"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;