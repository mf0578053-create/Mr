import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, Instagram, X, MapPin, Briefcase, Award, Code, Monitor } from 'lucide-react';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// --- Custom Icons ---
const Behance = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* B */}
    <path d="M3 7v10h4.5c1.5 0 2.5-1 2.5-2.5S9 12 7.5 12H3" />
    <path d="M3 12h4c1.5 0 2.5-1 2.5-2.5S8.5 7 7 7H3" />
    {/* e */}
    <circle cx="17.5" cy="13.5" r="3.5" />
    <path d="M14 13.5h7" />
    {/* line above e */}
    <path d="M15.5 8h4" />
  </svg>
);

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

// --- Constants ---
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Lumina Health",
    category: "Mobile App • Healthtech",
    image: "https://picsum.photos/seed/lumina/1200/800",
    year: "2024"
  },
  {
    id: 2,
    title: "Orbit Dashboard",
    category: "Web App • SaaS",
    image: "https://picsum.photos/seed/orbit/1200/800",
    year: "2023"
  },
  {
    id: 3,
    title: "Zenith E-commerce",
    category: "Brand Identity • UI/UX",
    image: "https://picsum.photos/seed/zenith/1200/800",
    year: "2023"
  },
  {
    id: 4,
    title: "Krypton Wallet",
    category: "Fintech • Web3",
    image: "https://picsum.photos/seed/krypton/1200/800",
    year: "2022"
  },
  {
    id: 5,
    title: "EcoSphere App",
    category: "Sustainability • Mobile",
    image: "https://picsum.photos/seed/eco/1200/800",
    year: "2024"
  },
  {
    id: 6,
    title: "Nova CRM",
    category: "Enterprise • Web",
    image: "https://picsum.photos/seed/nova/1200/800",
    year: "2023"
  },
  {
    id: 7,
    title: "Pulse Music",
    category: "Streaming • UI/UX",
    image: "https://picsum.photos/seed/pulse/1200/800",
    year: "2024"
  },
  {
    id: 8,
    title: "Aura Real Estate",
    category: "Proptech • Web",
    image: "https://picsum.photos/seed/aura/1200/800",
    year: "2022"
  }
];

// --- Components ---

const Navbar = ({ onOpenCV }: { onOpenCV: () => void }) => (
  <header className="fixed top-8 left-0 w-full z-50 px-6 flex justify-center">
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-primary/80 backdrop-blur-md border border-accent/10 px-8 py-4 rounded-full flex items-center gap-12 shadow-2xl shadow-primary/20"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: [0, 90, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute inset-0 border-2 border-accent rounded-sm opacity-20"
          />
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <span className="text-primary font-display font-black text-xs">F</span>
          </div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
        </div>
        <span className="text-xl font-display font-bold tracking-tighter">Mr.Fazi</span>
      </motion.div>
      
      <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
        {['Work', 'Services', 'About', 'Contact'].map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ y: -2, opacity: 0.6 }}
            className="transition-all duration-300 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
          </motion.a>
        ))}
      </div>

      <div className="h-4 w-px bg-accent/20 hidden md:block" />

      <motion.button
        onClick={onOpenCV}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-[10px] font-bold uppercase tracking-[0.2em] bg-accent text-primary px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        CV
      </motion.button>
    </motion.nav>
  </header>
);

const CVModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-primary/95 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-primary border border-accent/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-8 md:p-12 border-b border-accent/10 flex justify-between items-start bg-accent/5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                  <span className="text-primary font-display font-black text-2xl">F</span>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter">FAIZAN AKRAM</h2>
                  <p className="text-accent/60 font-bold uppercase tracking-widest text-[10px]">UI/UX & Graphic Designer</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-accent" />
                  Faisalabad, Pakistan
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-accent" />
                  mf0578053@gmail.com
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 custom-scrollbar">
            {/* Summary */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent/20" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Professional Summary</h3>
              </div>
              <p className="text-lg opacity-70 leading-relaxed font-medium">
                Creative UI/UX & Graphic Designer with over 2+ years of experience in designing user-centered digital products and visual identities. Skilled in transforming complex ideas into clean, functional, and visually appealing designs. Strong collaborator with developers and stakeholders, focused on usability, consistency, and modern design standards.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Experience */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent/20" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Experience</h3>
                </div>
                
                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold">Senior UI/UX Designer</h4>
                        <p className="text-accent/60 text-xs font-bold uppercase tracking-widest">Creative Solutions Agency</p>
                      </div>
                    </div>
                    <ul className="space-y-3 opacity-60 text-sm">
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Designed end-to-end user journeys for 5+ large-scale e-commerce platforms.</li>
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Created wireframes, high-fidelity UI designs, and interactive prototypes.</li>
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Collaborated closely with developers to deliver pixel-perfect, responsive layouts.</li>
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Improved user experience by applying design systems and usability best practices.</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xl font-bold">Graphic & Product Designer</h4>
                        <p className="text-accent/60 text-xs font-bold uppercase tracking-widest">Design Hub Studio</p>
                      </div>
                    </div>
                    <ul className="space-y-3 opacity-60 text-sm">
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Developed complete brand identity packages for 10+ startups.</li>
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Designed logos, social media creatives, marketing materials, and product visuals.</li>
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Managed tight deadlines while maintaining high design quality.</li>
                      <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" /> Worked directly with clients to understand requirements and deliver creative solutions.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills & Tools */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-accent/20" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Core Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['UI/UX Design', 'Graphic Design', 'Wireframing', 'Prototyping', 'User Research', 'Branding', 'Responsive Design'].map(skill => (
                      <span key={skill} className="px-4 py-2 bg-accent/5 border border-accent/10 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-accent/20" />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Tools & Software</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'Figma', icon: <Monitor size={16} /> },
                      { name: 'Photoshop', icon: <Award size={16} /> },
                      { name: 'Illustrator', icon: <Award size={16} /> },
                      { name: 'Adobe XD', icon: <Monitor size={16} /> }
                    ].map(tool => (
                      <div key={tool.name} className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/10 rounded-2xl">
                        <div className="text-accent">{tool.icon}</div>
                        <span className="text-xs font-bold uppercase tracking-widest">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-8 border-t border-accent/10 bg-accent/5 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://res.cloudinary.com/dsacnpxmq/image/upload/fl_attachment/v1769061231/FAizanAkramCV_qe9qzy.jpg';
                link.download = 'Faizan_Akram_CV.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-12 py-4 bg-accent text-primary rounded-full font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-accent/10"
            >
              Download CV
            </motion.button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Hero = ({ data }: { data: any }) => (
  <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden">
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
      
      {/* Left Column: Main Headline */}
      <div className="lg:col-span-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-accent/30" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">
              {data.subHeadline || 'BASED IN PAKISTAN • REMOTE WORLDWIDE'}
            </span>
          </div>
          
          <h1 className="text-[14vw] lg:text-[10vw] font-display font-bold leading-[0.75] tracking-tighter whitespace-pre-line">
            {data.headline || 'DESIGNING\nFUTURE\nINTERFACES'}
          </h1>
        </motion.div>
      </div>

      {/* Right Column: Meta Info & Badge */}
      <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-32 h-32 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-accent/20 rounded-full"
          />
          <div className="text-[8px] font-bold uppercase tracking-widest text-center leading-tight">
            AVAILABLE <br /> FOR HIRE <br /> 2024
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-xs text-right hidden lg:block"
        >
          <p className="text-sm opacity-60 leading-relaxed uppercase tracking-wider">
            {data.description || 'Mr.Fazi is a multi-disciplinary designer specializing in digital products and visual identities that stand out.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to explore</span>
          <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500">
            <ArrowUpRight size={16} className="rotate-90" />
          </div>
        </motion.div>
      </div>
    </div>

    {/* Bottom Marquee / Ticker */}
    <div className="absolute bottom-0 left-0 w-full py-6 border-t border-accent/5 overflow-hidden whitespace-nowrap opacity-20 pointer-events-none">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="inline-block text-[10vh] font-display font-black uppercase tracking-tighter"
      >
        {data.tickerText || 'UI/UX DESIGN • PRODUCT STRATEGY • BRAND IDENTITY • INTERACTION DESIGN • UI/UX DESIGN • PRODUCT STRATEGY • BRAND IDENTITY • INTERACTION DESIGN • '}
      </motion.div>
    </div>
  </section>
);

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative mb-32 md:mb-64 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
    >
      {/* Project Number Background */}
      <div className={`absolute -top-20 ${isEven ? '-left-10' : '-right-10'} text-[20vw] font-display font-black opacity-[0.03] pointer-events-none select-none`}>
        0{index + 1}
      </div>

      {/* Image Container */}
      <div className="w-full lg:w-3/5 group cursor-pointer relative">
        <div className="overflow-hidden rounded-2xl bg-accent/5 aspect-[4/3] lg:aspect-[16/10]">
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Floating Tag */}
        <div className={`absolute top-6 ${isEven ? 'right-6' : 'left-6'} bg-accent text-primary px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl`}>
          {project.category.split(' • ')[0]}
        </div>
      </div>

      {/* Content Container */}
      <div className={`w-full lg:w-2/5 ${isEven ? 'text-left' : 'text-left lg:text-right'} space-y-6`}>
        <div className={`flex items-center gap-4 ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}`}>
          <span className="text-[10px] font-mono opacity-40">0{index + 1}</span>
          <div className="w-8 h-px bg-accent/20" />
          <span className="text-[10px] font-mono opacity-40">{project.year}</span>
        </div>
        
        <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-none">
          {project.title}
        </h3>
        
        <p className="text-lg opacity-60 leading-relaxed max-w-sm ml-0 mr-auto lg:ml-auto lg:mr-0">
          A deep dive into the intersection of user needs and business goals for {project.title.toLowerCase()}.
        </p>

        <motion.div 
          whileHover={{ x: isEven ? 10 : -10 }}
          className={`flex items-center gap-4 group cursor-pointer ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest border-b border-accent/20 pb-1 group-hover:border-accent transition-colors">View Case Study</span>
          <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300">
            <ArrowUpRight size={14} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Work = ({ projects, onViewAll }: { projects: Project[]; onViewAll: () => void }) => (
  <section id="work" className="px-6 py-40 overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="mb-32 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-accent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Portfolio</span>
        </div>
        <h2 className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-none">
          SELECTED <br /> <span className="text-stroke">WORKS</span>
        </h2>
      </div>

      <div className="space-y-20">
        {projects.slice(0, 4).map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
      
      <div className="mt-20 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewAll}
          className="group flex items-center gap-4 px-10 py-5 rounded-full border border-accent/20 hover:bg-accent hover:text-primary transition-all duration-500"
        >
          <span className="text-xs font-bold uppercase tracking-widest">View All Projects</span>
          <div className="w-2 h-2 rounded-full bg-accent group-hover:bg-primary transition-colors" />
        </motion.button>
      </div>
    </div>
  </section>
);

const AllProjects = ({ projects, onClose }: { projects: Project[]; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[110] bg-primary overflow-y-auto custom-scrollbar"
  >
    {/* Background Decorative Elements */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/3 rounded-full blur-[100px]" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 py-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-px bg-accent/30" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent/60">Archive • {projects.length} Projects</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[10rem] font-display font-bold tracking-tighter leading-[0.85]"
          >
            THE <br /> <span className="text-stroke opacity-30">ARCHIVE</span>
          </motion.h2>
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="group relative p-8 bg-accent/5 hover:bg-accent text-accent hover:text-primary rounded-full transition-all duration-500 border border-accent/10"
        >
          <X size={32} className="relative z-10" />
          <div className="absolute inset-0 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-500" />
        </motion.button>
      </div>

      {/* Projects Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {projects.map((project, i) => {
          const isLarge = i % 5 === 0;
          const isMedium = i % 5 === 2 || i % 5 === 3;
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.05), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative cursor-none ${
                isLarge ? 'md:col-span-12 lg:col-span-8' : 
                isMedium ? 'md:col-span-6 lg:col-span-6' : 
                'md:col-span-6 lg:col-span-4'
              }`}
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-accent/5 aspect-[16/10] md:aspect-auto md:h-[400px] lg:h-[500px]">
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent/60">{project.category}</span>
                        <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-accent">{project.title}</h3>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                        <ArrowUpRight size={28} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-white/10 text-[10px] font-mono text-accent/60">
                  {project.year}
                </div>
              </div>

              {/* Mobile Info (Visible when not hovered on mobile) */}
              <div className="mt-6 md:hidden flex justify-between items-start px-2">
                <div>
                  <h3 className="text-2xl font-display font-bold">{project.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{project.category}</p>
                </div>
                <span className="text-xs font-mono opacity-40">{project.year}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Decoration */}
      <div className="mt-40 pt-20 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-widest">© 2024 Faizan Akram • All Rights Reserved</p>
        <div className="flex gap-8">
          <span className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:opacity-100 transition-opacity">Instagram</span>
          <span className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:opacity-100 transition-opacity">Behance</span>
          <span className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:opacity-100 transition-opacity">LinkedIn</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Services = ({ data }: { data: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const defaultServices = [
    {
      id: "01",
      title: "User Research & Strategy",
      description: "Understanding user behavior, pain points, and business goals to define a clear product roadmap.",
      image: "https://picsum.photos/seed/research/600/400"
    },
    {
      id: "02",
      title: "Wireframing & Prototyping",
      description: "Building the structural foundation and interactive flows to validate ideas early in the process.",
      image: "https://picsum.photos/seed/wireframe/600/400"
    },
    {
      id: "03",
      title: "Visual Interface Design",
      description: "Creating high-fidelity, pixel-perfect interfaces that are both aesthetically pleasing and functional.",
      image: "https://picsum.photos/seed/visual/600/400"
    },
    {
      id: "04",
      title: "Interaction Design",
      description: "Defining how users interact with the product through micro-interactions and smooth transitions.",
      image: "https://picsum.photos/seed/interaction/600/400"
    },
    {
      id: "05",
      title: "Design Systems",
      description: "Scaling design across platforms with a consistent library of reusable components and guidelines.",
      image: "https://picsum.photos/seed/systems/600/400"
    }
  ];

  const displayServices = data && data.length > 0 ? data.map((s, i) => ({
    ...s,
    id: (i + 1).toString().padStart(2, '0'),
    image: s.image || `https://picsum.photos/seed/service${i}/600/400`
  })) : defaultServices;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <section 
      id="services" 
      className="px-6 py-40 border-t border-accent/5 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Huge Background Text Reveal */}
      <AnimatePresence>
        {hoveredIndex && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <span className="text-[30vw] font-display font-black uppercase tracking-tighter whitespace-nowrap">
              {displayServices.find(s => s.id === hoveredIndex)?.title.split(' ')[0]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Image Follower */}
      <motion.div
        className="fixed w-80 h-52 pointer-events-none z-[60] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
        animate={{
          x: mousePos.x + 40,
          y: mousePos.y - 100,
          opacity: hoveredIndex ? 1 : 0,
          scale: hoveredIndex ? 1 : 0.5,
          rotate: (mousePos.x / 100) - 5 // Subtle dynamic rotation
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={hoveredIndex}
            src={displayServices.find(s => s.id === hoveredIndex)?.image}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Title */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-px bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Capabilities</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-7xl font-display font-bold tracking-tighter leading-none"
              >
                MY <br /> <span className="text-stroke">SERVICES</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sm opacity-50 max-w-xs leading-relaxed"
              >
                I provide a full range of design services to help startups and brands build products that people love to use.
              </motion.p>
            </div>
          </div>

          {/* Right Column: Services List */}
          <div className="lg:col-span-8 space-y-px">
            {displayServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(service.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative py-12 border-b border-accent/10 flex flex-col md:flex-row gap-8 md:items-center transition-all duration-700 px-4 -mx-4 rounded-xl cursor-none ${
                  hoveredIndex && hoveredIndex !== service.id ? 'opacity-20 blur-[2px]' : 'opacity-100 blur-0'
                }`}
              >
                <div className="flex items-center gap-6 flex-1">
                  <span className="text-xs font-mono opacity-30 group-hover:opacity-100 transition-opacity group-hover:text-accent">
                    {service.id}
                  </span>
                  <h3 className="text-3xl md:text-6xl font-display font-bold group-hover:translate-x-8 transition-transform duration-700 group-hover:text-accent">
                    {service.title}
                  </h3>
                </div>

                <div className="md:w-1/3">
                  <p className="text-sm opacity-50 leading-relaxed group-hover:opacity-100 transition-opacity group-hover:text-accent/80">
                    {service.description}
                  </p>
                </div>

                {/* Arrow Reveal */}
                <motion.div 
                  animate={{ 
                    rotate: hoveredIndex === service.id ? 45 : 0,
                    scale: hoveredIndex === service.id ? 1.5 : 1,
                    opacity: hoveredIndex === service.id ? 1 : 0.2
                  }}
                  className="hidden md:block text-accent transition-all duration-500"
                >
                  <ArrowUpRight size={32} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ data }: { data: any }) => {
  const socialLinks = {
    instagram: data.instagram || 'https://www.instagram.com/mr.fazi.uiux.x/',
    linkedin: data.linkedin || '#',
    behance: data.behance || 'https://www.behance.net/faizanakram12'
  };

  return (
    <section id="about" className="px-6 py-40 bg-accent text-primary">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none"
        >
          {data.title || 'DESIGN WITH PURPOSE.'}
        </motion.h2>
        <div className="space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl leading-tight font-medium"
          >
            {data.highlight || 'I believe that great design is invisible. It should feel natural, intuitive, and solve real problems without being loud.'}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg opacity-70 leading-relaxed"
          >
            {data.description || "With over 5 years of experience in the digital space, I've helped startups and established brands define their visual language and user experience. My approach is rooted in research, empathy, and a relentless pursuit of simplicity."}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8 flex flex-col gap-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Follow My Work</p>
            <div className="flex gap-8">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <Instagram size={28} className="group-hover:text-primary/50 transition-all duration-300 group-hover:-translate-y-1" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">Instagram</span>
              </a>
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <Linkedin size={28} className="group-hover:text-primary/50 transition-all duration-300 group-hover:-translate-y-1" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">LinkedIn</span>
              </a>
              <a 
                href={socialLinks.behance} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
              >
                <Behance size={28} className="group-hover:text-primary/50 transition-all duration-300 group-hover:-translate-y-1" />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">Behance</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ data }: { data: any }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      const newMessage = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleString(),
        status: 'unread'
      };
      localStorage.setItem('portfolio_messages', JSON.stringify([newMessage, ...messages]));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="px-6 py-40 border-t border-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-accent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Get in touch</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none">
                LET'S <br /> <span className="text-stroke">CONNECT</span>
              </h2>
              <p className="text-lg opacity-60 max-w-sm leading-relaxed">
                Have a project in mind? Or just want to say hi? Feel free to reach out. I'm always open to new opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">Email Me</p>
                <a href={`mailto:${data.email || 'mf0578053@gmail.com'}`} className="text-2xl md:text-3xl font-display font-bold hover:text-stroke transition-all duration-300">
                  {data.email || 'mf0578053@gmail.com'}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">WhatsApp Me</p>
                <a 
                  href={`https://wa.me/${data.whatsapp || '923056531604'}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl font-display font-bold hover:text-stroke transition-all duration-300"
                >
                  {data.phone || '+92 3056531604'}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8 bg-accent/5 p-8 md:p-12 rounded-3xl border border-accent/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-accent/20 py-4 focus:border-accent outline-none transition-colors placeholder:opacity-20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b border-accent/20 py-4 focus:border-accent outline-none transition-colors placeholder:opacity-20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry"
                  className="w-full bg-transparent border-b border-accent/20 py-4 focus:border-accent outline-none transition-colors placeholder:opacity-20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Message</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b border-accent/20 py-4 focus:border-accent outline-none transition-colors placeholder:opacity-20 resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-6 bg-accent text-primary rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent/90 transition-colors shadow-xl shadow-accent/10 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : 'Send Message'}
              </motion.button>
              {isSuccess && (
                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                  Thank you! Your message has been received.
                </p>
              )}
            </form>
          </div>
        </div>

      {/* Footer Bottom */}
      <div className="mt-40 pt-12 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm opacity-50 uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
            <span className="text-accent font-display font-black text-[8px]">F</span>
          </div>
          <p>© 2024 MR.FAZI DESIGN STUDIO</p>
        </div>
        <div className="flex gap-12">
          <span className="opacity-40">Pakistan • Remote</span>
        </div>
      </div>
    </div>
  </section>
  );
};

const Home = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [hero, setHero] = useState({});
  const [services, setServices] = useState([]);
  const [about, setAbout] = useState({});
  const [contact, setContact] = useState({});

  useEffect(() => {
    const load = (key: string, setter: Function, defaultValue: any) => {
      const saved = localStorage.getItem(key);
      if (saved) {
        setter(JSON.parse(saved));
      } else if (defaultValue) {
        setter(defaultValue);
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
    };

    load('portfolio_projects', setProjects, DEFAULT_PROJECTS);
    load('portfolio_hero', setHero, null);
    load('portfolio_services', setServices, null);
    load('portfolio_about', setAbout, null);
    load('portfolio_contact', setContact, null);
  }, []);

  return (
    <div className="bg-primary text-accent selection:bg-accent selection:text-primary">
      <Navbar onOpenCV={() => setIsCVOpen(true)} />
      <main>
        <Hero data={hero} />
        <Work projects={projects} onViewAll={() => setIsAllProjectsOpen(true)} />
        <Services data={services} />
        <About data={about} />
        <Contact data={contact} />
      </main>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
      
      <AnimatePresence>
        {isAllProjectsOpen && (
          <AllProjects projects={projects} onClose={() => setIsAllProjectsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
