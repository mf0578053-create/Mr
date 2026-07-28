import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, Instagram, X, MapPin, Briefcase, Award, Code, Monitor, ArrowLeft, Menu, Clock, Globe, Smartphone, ShoppingBag, Layers, Layout, Sparkles, ArrowRight, Palette, Image, Printer, Share2, PenTool, Eye, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
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
  images?: string[];
  year: string;
}

// --- Components ---

const Navbar = ({ onOpenCV }: { onOpenCV: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Faisalabad, Pakistan Timezone
  useEffect(() => {
    const updateTime = () => {
      try {
        const options = {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        } as const;
        setTimeStr(new Intl.DateTimeFormat('en-US', options).format(new Date()));
      } catch (e) {
        // Fallback
        const d = new Date();
        setTimeStr(d.toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['about', 'services', 'working', 'contact'];
      let currentSection = 'home';
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section;
            break;
          }
        }
      }

      if (window.scrollY < 80) {
        currentSection = 'home';
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Services', id: 'services', href: '#services' },
    { name: 'Work', id: 'working', href: '#working' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-20">
        {/* Dynamic Flying Container */}
        <motion.div
          animate={{
            paddingLeft: isScrolled ? '1.5rem' : '0rem',
            paddingRight: isScrolled ? '1.5rem' : '0rem',
            paddingTop: isScrolled ? '0.75rem' : '0rem',
            paddingBottom: isScrolled ? '0.75rem' : '0rem',
            scale: isScrolled ? 0.98 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full flex justify-between items-center rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'bg-primary/80 backdrop-blur-xl border border-accent/10 shadow-[0_24px_80px_rgba(0,0,0,0.4)]' 
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Logo Brand */}
          <motion.div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer group py-2"
          >
            <div className="relative w-9 h-9 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                className="absolute inset-0 border border-dashed border-accent rounded-xl opacity-30 group-hover:opacity-100 transition-opacity"
              />
              <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center shadow-lg shadow-accent/10 group-hover:bg-accent/90 transition-colors">
                <span className="text-primary font-display font-black text-sm">F</span>
              </div>
            </div>
            <div className="flex flex-col select-none leading-none">
              <span className="text-base font-display font-black tracking-tight group-hover:text-stroke transition-transform group-hover:translate-x-0.5 duration-300">Mr.Fazi</span>
              <span className="text-[7px] font-mono tracking-[0.2em] opacity-40 mt-0.5 uppercase">Design Studio</span>
            </div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-accent/5 p-1 rounded-full border border-accent/5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-500 select-none ${
                    isActive ? 'text-primary' : 'text-accent opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-accent rounded-full -z-10"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Meta Badges */}
          <div className="flex items-center gap-6">
            {/* Resume CV Button - Desktops */}
            <motion.button
              onClick={onOpenCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex text-[10px] items-center gap-2 font-bold uppercase tracking-widest bg-accent text-primary px-6 py-2.5 rounded-full shadow-lg shadow-accent/5 hover:opacity-90 transition-opacity"
            >
              <SparklesIcon />
              <span>Resume</span>
            </motion.button>

            {/* Mobile Navigation Trigger Burger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-accent/10 flex items-center justify-center bg-accent/2 hover:bg-accent/10 transition-colors z-50 text-accent"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Immersive Responsive Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary/95 backdrop-blur-2xl z-40 md:hidden"
            />

            {/* Drawer layout */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-primary border-l border-accent/10 z-50 md:hidden p-8 flex flex-col justify-between"
            >
              {/* Header inside drawer */}
              <div className="space-y-6 pt-16">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">Navigation</p>
                
                <div className="flex flex-col gap-4">
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-4xl font-display font-light flex items-center justify-between group hover:text-accent transition-colors"
                    >
                      <span className="tracking-tighter py-2 block">{item.name}</span>
                      <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer info inside drawer */}
              <div className="space-y-8 border-t border-accent/10 pt-8">
                <div className="space-y-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">Socials</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/mr.fazi.uiux.x/" target="_blank" rel="noopener noreferrer" className="p-2 border border-accent/10 rounded-full hover:bg-accent hover:text-primary transition-all">
                      <Instagram size={14} />
                    </a>
                    <a href="https://www.behance.net/faizanakram12" target="_blank" rel="noopener noreferrer" className="p-2 border border-accent/10 rounded-full hover:bg-accent hover:text-primary transition-all">
                      <Behance size={14} />
                    </a>
                    <a href="mailto:mf0578053@gmail.com" className="p-2 border border-accent/10 rounded-full hover:bg-accent hover:text-primary transition-all">
                      <Mail size={14} />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCV();
                  }}
                  className="w-full bg-accent text-primary text-[10px] font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors shadow-xl shadow-accent/5"
                >
                  <SparklesIcon />
                  <span>Resume</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

// Simple visual spark icon
const SparklesIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 0C8.5 2.5 12.5 6.5 15 7.5C12.5 8.5 8.5 12.5 7.5 15C6.5 12.5 2.5 8.5 0 7.5C2.5 6.5 6.5 2.5 7.5 0Z" fill="currentColor" />
  </svg>
);


const CVModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-primary/95 backdrop-blur-2xl"
        />
        
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-primary border border-accent/15 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl shadow-black/80"
        >
          {/* Top Banner & Header */}
          <div className="relative p-6 sm:p-10 border-b border-accent/10 bg-accent/5 overflow-hidden">
            {/* Background ambient mesh */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="relative group">
                  <div className="w-20 h-20 bg-accent text-primary rounded-2xl flex items-center justify-center font-syncopate font-black text-3xl shadow-xl shadow-accent/10">
                    FA
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-primary rounded-full" title="Available for work" />
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/15 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-accent/80">Available for Hire & Freelance</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-syncopate font-black tracking-tight text-accent">
                    FAIZAN AKRAM
                  </h2>
                  <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-accent/60">
                    UI/UX & Graphic Designer
                  </p>
                </div>
              </div>



              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-full transition-all duration-300 hover:rotate-90 cursor-pointer"
                aria-label="Close CV"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-10 custom-scrollbar">
            
            {/* Executive Summary */}
            <div className="p-6 sm:p-8 bg-accent/5 border border-accent/10 rounded-3xl relative overflow-hidden group hover:border-accent/20 transition-all">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-accent" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent">About Me</h3>
                </div>
                <p className="text-sm sm:text-base opacity-85 leading-relaxed font-sans">
                  Passionate <strong className="text-accent font-semibold">UI/UX & Graphic Designer</strong> with over 2+ years of expertise in building intuitive digital products, responsive web interfaces, and high-impact brand identities. Specialized in bridging the gap between user needs and modern aesthetics—creating wireframes, interactive prototypes, logos, social media assets, and print collateral.
                </p>
              </div>
            </div>

            {/* Grid layout for Experience & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Work Experience */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-accent" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent">Work Experience</h3>
                </div>

                <div className="space-y-6">
                  {/* Job 1 */}
                  <div className="p-6 bg-accent/5 border border-accent/10 rounded-3xl space-y-4 hover:border-accent/25 transition-all">
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-accent/10 pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-accent">Senior UI/UX Designer</h4>
                        <p className="text-xs font-mono text-accent/60 uppercase tracking-wider font-semibold">Creative Solutions Agency</p>
                      </div>
                      <span className="px-3 py-1 bg-accent/10 border border-accent/15 rounded-full text-[10px] font-mono font-bold text-accent">
                        2023 - PRESENT
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm opacity-80 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>Designed end-to-end user journeys for 5+ large-scale e-commerce platforms and Web apps.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>Constructed wireframes, high-fidelity UI screens, and interactive prototypes in Figma.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>Collaborated directly with front-end developers for pixel-perfect implementation.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>Established design systems and UI component libraries for brand consistency.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="p-6 bg-accent/5 border border-accent/10 rounded-3xl space-y-4 hover:border-accent/25 transition-all">
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-accent/10 pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-accent">Graphic & Product Designer</h4>
                        <p className="text-xs font-mono text-accent/60 uppercase tracking-wider font-semibold">Design Hub Studio</p>
                      </div>
                      <span className="px-3 py-1 bg-accent/10 border border-accent/15 rounded-full text-[10px] font-mono font-bold text-accent">
                        2022 - 2023
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm opacity-80 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>Developed complete brand identity packages and logo design systems for 10+ startups.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>Created social media creatives, ad banners, brochures, and product packaging layouts.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>Managed multiple client pipelines with strict turnarounds and high client satisfaction.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Skills & Tools */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Core Expertise Badges */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-accent" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent">Core Expertise</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      'UI/UX Design', 
                      'Graphic Design', 
                      'Logo Identity', 
                      'Brand Strategy', 
                      'Wireframing', 
                      'Interactive Prototyping', 
                      'Social Media Assets', 
                      'Print & Packaging', 
                      'Design Systems',
                      'Responsive Web'
                    ].map(skill => (
                      <span 
                        key={skill} 
                        className="px-3.5 py-2 bg-accent/5 border border-accent/15 rounded-xl text-xs font-mono font-medium text-accent/90 hover:bg-accent hover:text-primary transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Software & Tools Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Monitor size={18} className="text-accent" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-accent">Design Stack</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Figma', category: 'UI/UX & Proto', icon: <Monitor size={16} /> },
                      { name: 'Photoshop', category: 'Graphics & Editing', icon: <Palette size={16} /> },
                      { name: 'Illustrator', category: 'Vectors & Logos', icon: <PenTool size={16} /> },
                      { name: 'InDesign', category: 'Print & Layout', icon: <Printer size={16} /> },
                      { name: 'Adobe XD', category: 'Prototyping', icon: <Monitor size={16} /> },
                      { name: 'Canva Pro', category: 'Quick Creatives', icon: <Image size={16} /> }
                    ].map(tool => (
                      <div 
                        key={tool.name} 
                        className="p-3.5 bg-accent/5 border border-accent/10 hover:border-accent/25 rounded-2xl flex items-center gap-3 transition-all group"
                      >
                        <div className="p-2 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                          {tool.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-accent uppercase tracking-wider">{tool.name}</p>
                          <p className="text-[9px] font-mono text-accent/50">{tool.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language & Education Quick Info */}
                <div className="p-5 bg-accent/5 border border-accent/10 rounded-2xl flex justify-between items-center text-xs font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-accent/50 block font-bold">Languages</span>
                    <span className="font-bold text-accent">English, Urdu, Punjabi</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-accent/50 block font-bold">Location</span>
                    <span className="font-bold text-accent">Pakistan (Remote)</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Fixed Sticky Footer Actions */}
          <div className="p-6 border-t border-accent/15 bg-accent/10 backdrop-blur-md flex justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://res.cloudinary.com/dsacnpxmq/image/upload/fl_attachment/v1769061231/FAizanAkramCV_qe9qzy.jpg';
                link.download = 'Faizan_Akram_CV.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="w-full sm:w-auto px-10 py-4 bg-accent text-primary rounded-full font-mono font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-accent/10 flex items-center justify-center gap-3 cursor-pointer"
            >
              <ArrowUpRight size={16} className="rotate-180" />
              <span>DOWNLOAD OFFICIAL CV</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Hero = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'canvas' | 'code'>('canvas');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const words = ["UI/UX ARCHITECTURE", "BRAND IDENTITY & LOGOS", "GRAPHIC & PRINT DESIGN", "SOCIAL MEDIA CREATIVES", "HIGH-FIDELITY SAAS"];

  // Sandbox parameters for design customizer
  const [orbMorph, setOrbMorph] = useState(30);
  const [glowPower, setGlowPower] = useState(70);
  const [activeGradient, setActiveGradient] = useState<'cyber' | 'aurora' | 'sunset'>('cyber');

  // Interactive mouse tracking variables
  const [coords, setCoords] = useState({ x: 52, y: 48 });
  const workspaceRef = React.useRef<HTMLDivElement>(null);

  const handleWorkspacePointerStr = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!workspaceRef.current) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setCoords({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  useEffect(() => {
    const period = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(period);
  }, []);

  const getGradientStyleDetails = () => {
    switch (activeGradient) {
      case 'aurora':
        return {
          cssClass: 'from-[#05f3a2] via-[#00ccff] to-[#bdff00]',
          label: 'AURORA GLIDE',
          hex: '#05F3A2, #00CCFF, #BDFF00',
        };
      case 'sunset':
        return {
          cssClass: 'from-[#ff0076] via-[#ff6c00] to-[#ffd200]',
          label: 'SOLAR CRUSH',
          hex: '#FF0076, #FF6C00, #FFD200',
        };
      case 'cyber':
      default:
        return {
          cssClass: 'from-[#be00ff] via-[#7000ff] to-[#00f3ff]',
          label: 'NEON CYBER',
          hex: '#BE00FF, #7000FF, #00F3FF',
        };
    }
  };

  const selectedGradient = getGradientStyleDetails();

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-36 pb-20 relative overflow-hidden bg-primary text-accent">
      
      {/* Background ambient noise grid & lighting meshes */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] mix-blend-color-dodge animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-accent/3 rounded-full blur-[130px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Bold Asymmetric Typography & Introduction */}
        <div className="lg:col-span-6 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Elegant Micro-pill badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/5 border border-accent/10 rounded-full cursor-pointer hover:bg-accent/10 transition-colors duration-300">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono font-bold text-accent/80">
                {data.subHeadline || 'UI/UX & GRAPHIC DESIGN SPECIALIST'}
              </span>
            </div>

            {/* Headline utilizing custom high-contrast paired font sizes */}
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black leading-[0.88] tracking-tighter uppercase">
              CRAFTING <br />
              <span className="text-stroke relative block my-2.5">
                MAGICAL
              </span>
              EXPERIENCES.
            </h1>

            {/* Adaptive Sliding Topic Line */}
            <div className="flex items-center gap-4 py-2 border-y border-accent/10 max-w-lg">
              <span className="text-[10px] font-mono opacity-40 uppercase tracking-[0.25em] whitespace-nowrap">Interactive Mode :</span>
              <div className="relative overflow-hidden h-6 flex-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWordIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs font-bold uppercase tracking-widest text-accent font-mono block"
                  >
                    {words[activeWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Core Descriptive Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
            className="text-sm md:text-base opacity-60 max-w-xl leading-relaxed uppercase tracking-wider text-left font-sans"
          >
            {data.description || 'Hi, I’m Mr.Fazi. I am a UI/UX & Graphic Designer dedicated to crafting intuitive digital products, iconic logo identities, and impactful print visuals. Explore my creative work and interactive sandbox below.'}
          </motion.p>

          {/* Modern CTA Grid */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex flex-wrap gap-5 items-center"
          >
            <a
              href="#working"
              className="group flex items-center gap-4 bg-accent text-primary px-8 py-4.5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-accent/90 transition-all shadow-2xl shadow-accent/15"
            >
              <span>Explore Studio Work</span>
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight size={13} />
              </div>
            </a>

            <a
              href="#contact"
              className="px-8 py-4.5 border border-accent/15 hover:border-accent hover:bg-accent/5 text-accent rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300"
            >
              Let's Collaborate
            </a>
          </motion.div>

          {/* Studio Real-time Quantities */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-accent/10 max-w-md select-none"
          >
            <div className="group cursor-pointer">
              <span className="block text-3xl font-display font-black leading-none text-accent group-hover:-translate-y-1 transition-transform duration-300">02+</span>
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40 mt-2 block">Years Spent</span>
            </div>
            <div className="group cursor-pointer">
              <span className="block text-3xl font-display font-black leading-none text-accent group-hover:-translate-y-1 transition-transform duration-300">50+</span>
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40 mt-2 block">Premium Layouts</span>
            </div>
            <div className="group cursor-pointer">
              <span className="block text-3xl font-display font-black leading-none text-accent group-hover:-translate-y-1 transition-transform duration-300">100%</span>
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40 mt-2 block">Pixel Perfect</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Premium Multi-Mode Interactive Creative Console */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl lg:max-w-2xl xl:max-w-[42rem] relative"
          >
            {/* Outer Frame styled perfectly with glass borders */}
            <div className="relative aspect-[4/3] w-full rounded-[2.5rem] bg-[#14211a]/40 border border-accent/10 overflow-hidden flex items-center justify-center shadow-[0_45px_100px_rgba(0,0,0,0.6)] group">
              
              {/* Background elegant abstract representation of a design grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,225,216,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,225,216,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              
              {/* High-quality Unsplash Abstract Background Image (Slow floating zoom) */}
              <motion.img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
                alt="UI UX Background"
                referrerPolicy="no-referrer"
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none select-none"
              />

              {/* Glowing soft ambient mesh circles */}
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[90px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/3 rounded-full blur-[70px] pointer-events-none" />

              {/* Design Guides / Construction Overlay Lines */}
              <div className="absolute top-10 left-0 w-full h-px bg-accent/5 border-t border-dashed border-accent/5 pointer-events-none" />
              <div className="absolute bottom-20 left-0 w-full h-px bg-accent/5 border-t border-dashed border-accent/5 pointer-events-none" />
              <div className="absolute top-0 left-16 h-full w-px bg-accent/5 border-l border-dashed border-accent/5 pointer-events-none" />
              <div className="absolute top-0 right-20 h-full w-px bg-accent/5 border-l border-dashed border-accent/5 pointer-events-none" />

              {/* Interactive Vector Node Points (Pulsing design anchors) */}
              <div className="absolute top-1/4 left-[15%] w-2 h-2 bg-accent/30 rounded-full border border-accent/80 animate-ping pointer-events-none" />
              <div className="absolute top-[65%] right-[20%] w-2 h-2 bg-accent/30 rounded-full border border-accent/80 animate-ping pointer-events-none" style={{ animationDelay: '1s' }} />

              {/* Layer 1: The Browser UI Design Canvas (Floats smoothly) */}
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                  x: [-3, 3, -3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-8 lg:left-12 top-12 lg:top-16 w-[70%] lg:w-[68%] bg-[#0e1712]/95 border border-accent/15 rounded-2xl shadow-2xl p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-5 z-10 backdrop-blur-md select-none"
              >
                {/* Window header */}
                <div className="flex justify-between items-center pb-2 border-b border-accent/5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1d8]/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1d8]/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e5e1d8]/20" />
                  </div>
                  <div className="bg-accent/5 px-4 py-0.5 rounded text-[8px] sm:text-[9px] lg:text-[10px] font-mono tracking-widest text-accent/40">
                    FAZI_DESIGNS.STUDIO
                  </div>
                  <Layout size={12} className="text-accent/30" />
                </div>

                {/* Simulated Web wireframe page body */}
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center">
                    <div className="h-2 sm:h-2.5 w-14 sm:w-18 bg-accent/30 rounded" />
                    <div className="flex gap-2">
                      <div className="h-1.5 sm:h-2 w-6 sm:w-8 bg-accent/15 rounded" />
                      <div className="h-1.5 sm:h-2 w-6 sm:w-8 bg-accent/15 rounded" />
                    </div>
                  </div>

                  <div className="space-y-1.5 py-2">
                    <div className="h-3 sm:h-4 lg:h-5 w-3/4 bg-accent/60 rounded" />
                    <div className="h-1.5 sm:h-2 lg:h-2.5 w-1/2 bg-accent/30 rounded" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-accent/5 border border-accent/10 rounded-lg p-2 sm:p-3 h-14 sm:h-16 lg:h-20 flex flex-col justify-between">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-accent/20 flex items-center justify-center">
                        <Monitor size={10} className="text-accent/70" />
                      </div>
                      <div className="h-1 sm:h-1.5 w-8 sm:w-10 bg-accent/20 rounded" />
                    </div>
                    <div className="bg-accent/5 border border-accent/10 rounded-lg p-2 sm:p-3 h-14 sm:h-16 lg:h-20 flex flex-col justify-between">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-accent/20 flex items-center justify-center">
                        <Smartphone size={10} className="text-accent/70" />
                      </div>
                      <div className="h-1 sm:h-1.5 w-8 sm:w-10 bg-accent/20 rounded" />
                    </div>
                    <div className="bg-accent/5 border border-accent/10 rounded-lg p-2 sm:p-3 h-14 sm:h-16 lg:h-20 flex flex-col justify-between">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-accent/20 flex items-center justify-center">
                        <Layers size={10} className="text-accent/70" />
                      </div>
                      <div className="h-1 sm:h-1.5 w-8 sm:w-10 bg-accent/20 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Layer 2: Mobile App Interface Mockup (Overlaps the browser and floats on different frequency) */}
              <motion.div
                animate={{
                  y: [12, -12, 12],
                  x: [4, -4, 4],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-8 lg:right-12 bottom-8 lg:bottom-12 w-[42%] bg-accent text-primary border border-primary/10 rounded-[2rem] shadow-2xl p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-5 z-20 select-none cursor-default"
              >
                {/* Phone Notch/Speaker */}
                <div className="flex justify-center -mt-2">
                  <div className="w-16 sm:w-20 h-3 sm:h-4 bg-primary/10 rounded-full flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    <span className="w-6 sm:w-8 h-1 bg-primary/20 rounded-full" />
                  </div>
                </div>

                {/* Simulated Beautiful UI Card */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] lg:text-[10px] font-mono font-bold tracking-wider text-primary/40 uppercase">
                    <span>Active Screen</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14211a] animate-pulse" />
                  </div>

                  {/* App Hero Card */}
                  <div className="relative h-20 sm:h-24 lg:h-28 rounded-xl bg-[#14211a] text-accent p-2.5 sm:p-3.5 flex flex-col justify-between overflow-hidden shadow-lg">
                    {/* Glowing effect inside card */}
                    <div className="absolute -right-4 -bottom-4 w-16 sm:w-20 h-16 sm:h-20 bg-accent/10 rounded-full blur-xl pointer-events-none" />
                    <ShoppingBag size={12} className="text-accent/70 sm:size-14 lg:size-16" />
                    <div className="space-y-1">
                      <span className="text-[6px] sm:text-[7px] lg:text-[8px] font-mono tracking-widest text-accent/50 block">PROTOTYPE</span>
                      <span className="text-[10px] sm:text-[11px] lg:text-[13px] font-display font-bold leading-none block uppercase">Checkout Flow</span>
                    </div>
                  </div>

                  {/* Settings Item */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-primary/5 p-2 sm:p-2.5 lg:p-3 rounded-xl border border-primary/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary/30" />
                        <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold tracking-wide uppercase">Dark Mode Layout</span>
                      </div>
                      <div className="w-6 sm:w-8 lg:w-10 h-3.5 sm:h-4.5 lg:h-5 bg-[#14211a] rounded-full p-0.5 flex justify-end">
                        <span className="w-2.5 sm:w-3.5 lg:w-4 h-2.5 sm:h-3.5 lg:h-4 rounded-full bg-accent shadow" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-primary/5 p-2 sm:p-2.5 lg:p-3 rounded-xl border border-primary/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary/30" />
                        <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold tracking-wide uppercase">Sensory Mesh</span>
                      </div>
                      <div className="w-6 sm:w-8 lg:w-10 h-3.5 sm:h-4.5 lg:h-5 bg-primary/20 rounded-full p-0.5 flex justify-start">
                        <span className="w-2.5 sm:w-3.5 lg:w-4 h-2.5 sm:h-3.5 lg:h-4 rounded-full bg-white shadow" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: Floating Design Anchor Badge / Palette Block */}
              <motion.div
                animate={{
                  y: [-15, 15, -15],
                  rotate: [-3, 3, -3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-[8%] lg:left-[10%] bottom-8 lg:bottom-12 bg-[#0e1712]/90 border border-accent/15 rounded-xl p-3 sm:p-4 z-30 flex items-center gap-3 backdrop-blur-md shadow-lg select-none"
              >
                <div className="flex gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#14211a] border border-accent/20" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#e5e1d8] border border-primary/20" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                </div>
                <div className="border-l border-accent/10 pl-2.5">
                  <span className="block text-[6px] font-mono tracking-widest text-accent/40 leading-none">COLOR PROFILE</span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-accent">#E5E1D8 // HEX</span>
                </div>
              </motion.div>

              {/* Simulated Floating Cursor tool representing interactive crafting */}
              <motion.div
                animate={{
                  x: [40, 160, 220, 120, 40],
                  y: [120, 80, 240, 190, 120],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute pointer-events-none z-40"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4L11 20L14.5 13.5L21 11L4 4Z" fill="#e5e1d8" stroke="#14211a" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <div className="ml-4 mt-2 px-2 py-1 bg-accent text-primary text-[7px] sm:text-[8px] font-mono font-black rounded uppercase shadow-md border border-primary/10 tracking-widest">
                  MR.FAZI
                </div>
              </motion.div>

              {/* Status / Bezel footer for absolute realism */}
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-[7px] font-mono opacity-30 uppercase tracking-widest border-t border-accent/5 pt-3">
                <span>UI/UX PROTOTYPING ENGINE</span>
                <span>SYS_ACTIVE // 60 FPS</span>
              </div>

            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Tilted Marquee Layout */}
      <div className="absolute bottom-0 left-0 w-full py-6 border-t border-accent/5 overflow-hidden whitespace-nowrap opacity-15 pointer-events-none">
        <motion.div 
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="inline-block text-[8vh] font-display font-black uppercase tracking-tighter"
        >
          {data.tickerText || 'UI/UX DESIGN • GRAPHIC DESIGN • BRAND IDENTITY • LOGO CREATION • SOCIAL MEDIA ASSETS • PRINT & PACKAGING • INTERACTION DESIGN • PROTOTYPING SYSTEMS • '}
        </motion.div>
      </div>

    </section>
  );
};

const Services = ({ data }: { data: any[] }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const defaultServices = [
    {
      id: "01",
      title: "Website Design & Layout",
      description: "Creating modern, responsive, and visually engaging website designs that perfectly align with your brand identity and user needs.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "02",
      title: "E-commerce Store design",
      description: "Creating high-converting online shopping experiences with intuitive product discovery and seamless checkout flows.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "03",
      title: "Landing Pages design",
      description: "Crafting high-converting landing pages that effectively communicate your value proposition and drive user action.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "04",
      title: "Mobile App Screens design",
      description: "Designing intuitive and engaging mobile interfaces that provide seamless user experiences and drive higher user retention across platforms.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "05",
      title: "Dashboard / Admin Panel design",
      description: "Designing comprehensive and user-friendly dashboards that simplify complex data visualization and empower administrative efficiency and control.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "06",
      title: "Brand Identity & Logo Design",
      description: "Crafting distinctive logos, visual styleguides, custom typography, and cohesive brand systems for memorable business identity.",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "07",
      title: "Graphic & Print Design",
      description: "Creating high-impact brochures, posters, flyers, business cards, and print collateral tailored for offline brand presence.",
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "08",
      title: "Social Media & Visual Creatives",
      description: "Designing high-engagement Instagram posts, ad banners, promotional assets, and social media templates.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "09",
      title: "Packaging & Product Branding",
      description: "Designing eye-catching product packaging, labels, unboxing experiences, and realistic 3D brand presentation mockups.",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const displayServices = data && data.length > 0 ? data.map((s, i) => ({
    ...s,
    id: (i + 1).toString().padStart(2, '0'),
    image: s.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800`
  })) : defaultServices;

  const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('web') || t.includes('layout')) return <Monitor className="w-6 h-6" />;
    if (t.includes('shop') || t.includes('commerce') || t.includes('e-commerce') || t.includes('store')) return <ShoppingBag className="w-6 h-6" />;
    if (t.includes('landing') || t.includes('page')) return <Layers className="w-6 h-6" />;
    if (t.includes('mobile') || t.includes('app') || t.includes('screen')) return <Smartphone className="w-6 h-6" />;
    if (t.includes('dash') || t.includes('board') || t.includes('admin') || t.includes('panel')) return <Layout className="w-6 h-6" />;
    if (t.includes('brand') || t.includes('logo') || t.includes('identity')) return <Palette className="w-6 h-6" />;
    if (t.includes('graphic') || t.includes('print')) return <Printer className="w-6 h-6" />;
    if (t.includes('social') || t.includes('creative') || t.includes('banner')) return <Share2 className="w-6 h-6" />;
    if (t.includes('packag') || t.includes('product')) return <Image className="w-6 h-6" />;
    return <Sparkles className="w-6 h-6" />;
  };

  const getColSpan = (index: number) => {
    const mod = index % 5;
    switch (mod) {
      case 0: return "md:col-span-3 lg:col-span-2";
      case 1: return "md:col-span-3 lg:col-span-2";
      case 2: return "md:col-span-6 lg:col-span-2";
      case 3: return "md:col-span-3 lg:col-span-3";
      case 4: return "md:col-span-3 lg:col-span-3";
      default: return "md:col-span-3 lg:col-span-2";
    }
  };

  return (
    <section 
      id="services" 
      className="px-6 py-40 bg-[#0e1712] border-t border-accent/5 relative overflow-hidden"
    >
      {/* Background Decorative Tech Dots */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e1d803_1px,transparent_1px),linear-gradient(to_bottom,#e5e1d803_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Background light gradient highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        
        {/* Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-accent/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent/60 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                PROFESSIONAL CAPABILITIES
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-none text-accent">
              MY <span className="text-stroke">SERVICES</span>
            </h2>
          </div>
          
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-sm opacity-60 leading-relaxed max-w-md text-accent/70">
              Combining research, layout precision, and aesthetic curation to build interfaces that feel effortless to navigate and digital experiences that leave a lasting memory.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {displayServices.map((service, i) => {
            const colSpan = getColSpan(i);
            const isHovered = hoveredIndex === service.id;
            
             return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(service.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative ${colSpan} flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-[#14211a]/40 border border-accent/10 hover:border-accent/25 transition-all duration-500 select-none cursor-default overflow-hidden min-h-[340px]`}
              >
                {/* Image Backdrop Blend */}
                <div 
                  className="absolute inset-0 grayscale transition-all duration-1000 bg-cover bg-center pointer-events-none"
                  style={{ 
                    backgroundImage: `url(${service.image})`,
                    opacity: isHovered ? 0.08 : 0,
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                  }}
                />

                {/* Card Glow Highlight */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* Top Anchor: System tags & ID */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono tracking-[0.2em] text-accent/40 uppercase">CAPABILITY RECORD</span>
                    <span className="text-[7px] font-mono tracking-[0.2em] text-accent/35 uppercase flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      SYS_SEC // {service.id}
                    </span>
                  </div>
                  <span className="text-xl font-mono text-accent/30 group-hover:text-accent/60 transition-colors">
                    [{service.id}]
                  </span>
                </div>

                {/* Mid section: Icon & Title */}
                <div className="space-y-6 pt-12 relative z-10">
                  {/* Icon bracket container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0e1712] border border-accent/15 flex items-center justify-center text-accent/70 group-hover:text-accent group-hover:border-accent/30 group-hover:scale-103 transition-all duration-500 shadow-inner">
                    {getIconForTitle(service.title)}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-accent group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-accent/50 group-hover:text-accent/70 leading-relaxed transition-colors max-w-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom section: Info Tag */}
                <div className="pt-8 flex justify-between items-center border-t border-accent/5 relative z-10 mt-auto">
                  <span className="text-[10px] font-mono tracking-widest text-accent/30 group-hover:text-accent/50 transition-colors">
                    SERVICE OVERVIEW //
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#0e1712] border border-accent/5 flex items-center justify-center text-accent/30 transition-all duration-500">
                    <Sparkles size={14} className="text-accent/30 group-hover:text-accent/50 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
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

  const imageUrl = data.image || 
    'https://res.cloudinary.com/dsacnpxmq/image/upload/v1780908440/56aae7d7-8201-4e47-b99a-7fc5f86358d6_fovco4.png';

  return (
    <section id="about" className="px-6 py-40 bg-accent text-primary relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
        
        {/* Left Column: Combined Typography & Premium Clean Frame Spot */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none"
          >
            {data.title || 'DESIGN WITH PURPOSE.'}
          </motion.h2>

          {/* Clean, high-fashion architectural image portal without overlays or clicks */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-sm group select-none"
          >
            {/* Ambient shadow / grid board behind portrait */}
            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] border border-dashed border-primary/20 translate-x-4 translate-y-4 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6" />
            
            {/* The main picture clip box */}
            <div className="relative aspect-[3/4] rounded-tl-[6.5rem] rounded-br-[6.5rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] overflow-hidden border-2 border-primary/20 bg-primary/2 group-hover:border-primary/50 transition-all duration-500 shadow-xl shadow-primary/10">
              <img 
                src={imageUrl} 
                alt="Faizan Akram Portrait" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Dynamic descriptions & links */}
        <div className="lg:col-span-7 space-y-8">
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
            {data.description || "With over 2 years of experience in the digital space, I've helped startups and established brands define their visual language and user experience. My approach is rooted in research, empathy, and a relentless pursuit of simplicity."}
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

const Working = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const defaultProjects: Project[] = [
      {
        id: 1,
        title: "WeVersity Courses & Hiring Campaign Series",
        category: "Mobile & Graphic Design Series",
        image: "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163611/3c4249c5-78ca-4d5a-839e-21942bdc0ca1_vwrnnr.png",
        images: [
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163611/3c4249c5-78ca-4d5a-839e-21942bdc0ca1_vwrnnr.png",
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163590/App_2_ct0lti.png",
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163586/App_3_offks3.png"
        ],
        year: "2024"
      },
      {
        id: 2,
        title: "Creative Brand & Social Media Campaign Series",
        category: "Graphic Design & Branding",
        image: "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166153/105_nfkffv.jpg",
        images: [
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166153/105_nfkffv.jpg",
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166157/106_npocgv.jpg",
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166156/107_xq09gc.jpg",
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166166/108_co71vu.jpg",
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166166/109_eh4mts.jpg",
          "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166159/110_yu8gt1.jpg"
        ],
        year: "2024"
      },
      {
        id: 3,
        title: "Nova Social Media Campaign Assets",
        category: "Social Media & Visual Creatives",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
        year: "2024"
      },
      {
        id: 4,
        title: "Velvet Luxury Packaging & Print",
        category: "Packaging & Product Branding",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200",
        year: "2024"
      }
    ];

    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        // Check if Box 2 has the new 6-image series
        const hasNewBox2Series = parsed && parsed.length >= 2 && parsed[1]?.images && parsed[1]?.images?.some((img: string) => img.includes('105_nfkffv'));
        if (hasNewBox2Series) {
          setProjects(parsed);
        } else {
          setProjects(defaultProjects);
          localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
        }
      } catch (e) {
        setProjects(defaultProjects);
        localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 2);

  const handlePrev = () => {
    if (projects.length === 0) return;
    const prevIdx = (selectedIndex - 1 + projects.length) % projects.length;
    setSelectedIndex(prevIdx);
    setSelectedProject(projects[prevIdx]);
  };

  const handleNext = () => {
    if (projects.length === 0) return;
    const nextIdx = (selectedIndex + 1) % projects.length;
    setSelectedIndex(nextIdx);
    setSelectedProject(projects[nextIdx]);
  };

  return (
    <section id="working" className="px-6 py-40 bg-accent text-primary border-t border-primary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* SELECTED PROJECTS SHOWCASE */}
        <div className="space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-primary/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">PORTFOLIO</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none">
                WORKING <br /> <span className="text-stroke">GALLERY</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-lg opacity-60 leading-relaxed max-w-xl">
                Explore a curation of high-end interfaces, brand identities, and modern visual design built with strategic intent and flawless layout standards. Click any design box to scroll through all post screens.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {displayedProjects.map((project, idx) => {
              const imageCount = project.images && project.images.length > 0 ? project.images.length : 1;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setSelectedProject(project);
                    setSelectedIndex(idx);
                  }}
                  className="group cursor-pointer space-y-6"
                >
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 aspect-[16/11]">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Multiple Posts Badge */}
                    {imageCount > 1 && (
                      <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 bg-primary/90 text-accent rounded-full text-[10px] font-mono font-bold uppercase tracking-widest backdrop-blur-md border border-accent/20 flex items-center gap-1.5 shadow-xl">
                        <Layers size={13} className="text-accent" />
                        <span>{imageCount} POSTS</span>
                      </div>
                    )}

                    {/* Hover Overlay with Eye Badge */}
                    <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                      <span className="px-6 py-3 bg-accent text-primary rounded-full text-xs font-mono font-bold uppercase tracking-widest shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Eye size={16} /> {imageCount > 1 ? `VIEW ALL ${imageCount} POSTS` : 'VIEW FULL POST'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50">{project.category}</span>
                      <h3 className="text-2xl font-display font-bold text-primary/90 group-hover:text-primary transition-colors">{project.title}</h3>
                    </div>
                    <span className="text-xs font-mono opacity-40">{project.year}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {projects.length > 2 && (
            <div className="flex justify-center pt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-4 px-8 py-4 bg-primary text-accent rounded-full text-xs font-mono font-bold tracking-[0.25em] uppercase hover:bg-primary/90 transition-all duration-300 shadow-xl group cursor-pointer"
              >
                <span>{showAll ? "SHOW LESS" : "SEE ALL PROJECTS"}</span>
                <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
              </motion.button>
            </div>
          )}
        </div>

      </div>

      {/* FULL POST LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (() => {
          const postImages = selectedProject.images && selectedProject.images.length > 0
            ? selectedProject.images
            : [selectedProject.image];

          return (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-primary/95 backdrop-blur-2xl"
              />

              {/* Content Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl max-h-[94vh] bg-accent text-primary rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl z-10 border border-primary/10"
              >
                {/* Modal Top Bar */}
                <div className="p-5 sm:p-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                    <span className="px-3 py-1 bg-primary text-accent rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                      {selectedProject.category}
                    </span>
                    {postImages.length > 1 && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border border-primary/10 flex items-center gap-1.5">
                        <Layers size={12} /> {postImages.length} POSTS IN SERIES
                      </span>
                    )}
                    <span className="text-xs font-mono opacity-50">{selectedProject.year}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2.5 bg-primary/10 hover:bg-primary/20 rounded-full text-primary transition-colors cursor-pointer"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Modal Body with Vertical Scrollable Posts */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-10 custom-scrollbar bg-accent/50">
                  <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-primary">
                        {selectedProject.title}
                      </h2>
                      {postImages.length > 1 && (
                        <p className="text-xs font-mono opacity-60 uppercase tracking-widest">
                          Scroll down to view all {postImages.length} posts in high resolution
                        </p>
                      )}
                    </div>

                    {/* Stacked Images for Vertical Scrolling */}
                    <div className="w-full space-y-12 sm:space-y-16">
                      {postImages.map((imgUrl, pIdx) => (
                        <div key={pIdx} id={`post-img-${pIdx}`} className="space-y-4">
                          {postImages.length > 1 && (
                            <div className="flex justify-between items-center px-2">
                              <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-60 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                POST {pIdx + 1} OF {postImages.length}
                              </span>
                              <a
                                href={imgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-mono font-bold text-primary/80 hover:text-primary underline flex items-center gap-1"
                              >
                                OPEN FULL RES <ArrowUpRight size={14} />
                              </a>
                            </div>
                          )}

                          <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-primary/10 bg-primary/5 transition-all">
                            <img
                              src={imgUrl}
                              alt={`${selectedProject.title} - Post ${pIdx + 1}`}
                              className="w-full h-auto object-contain mx-auto"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Bottom Bar with Navigation */}
                <div className="p-4 sm:p-6 border-t border-primary/10 bg-primary/5 flex justify-between items-center">
                  <button
                    onClick={handlePrev}
                    className="px-5 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-accent rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft size={16} /> PREVIOUS PROJECT
                  </button>

                  <span className="text-xs font-mono font-bold opacity-60">
                    PROJECT {selectedIndex + 1} OF {projects.length}
                  </span>

                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-accent rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    NEXT PROJECT <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
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
        <div className="flex gap-8 items-center">
          <span className="opacity-40">Pakistan • Remote</span>
          <Link to="/admin" className="opacity-50 hover:opacity-100 transition-opacity text-xs font-mono uppercase tracking-widest flex items-center gap-1.5 text-accent">
            <Lock size={12} /> Admin
          </Link>
        </div>
      </div>
    </div>
  </section>
  );
};

const CategoryGallery = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const decodedCategory = decodeURIComponent(categoryName || '');

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      const allProjects: Project[] = JSON.parse(savedProjects);
      // Filter projects by category. We check if the project category matches or contains the service title
      const filtered = allProjects.filter(p => 
        p.category.toLowerCase().includes(decodedCategory.toLowerCase()) ||
        decodedCategory.toLowerCase().includes(p.category.toLowerCase())
      );
      setProjects(filtered);
    }
    window.scrollTo(0, 0);
  }, [decodedCategory]);

  return (
    <div className="min-h-screen bg-primary text-accent selection:bg-accent selection:text-primary p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
          <div className="space-y-6">
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                <ArrowLeft size={16} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to home</span>
            </motion.button>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-px bg-accent/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent/60">Category • {projects.length} Designs</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none uppercase"
            >
              {decodedCategory}
            </motion.h2>
          </div>
        </div>

        {/* Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-3xl bg-accent/5 aspect-[4/5]">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-display font-bold">{project.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{project.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-dashed border-accent/10 rounded-[3rem]">
            <p className="text-lg opacity-40">No designs found for this category yet.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
              className="mt-8 px-8 py-4 bg-accent text-primary rounded-full font-bold uppercase tracking-widest text-[10px]"
            >
              Explore Other Services
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void; key?: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: any;
    const start = Date.now();
    const duration = 2400; // 2.4 seconds

    const update = () => {
      const elapsed = Date.now() - start;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Snappy progress increase curve
      const easedProgress = Math.round((1 - Math.pow(1 - progressRatio, 3)) * 100);
      setProgress(easedProgress);

      if (progressRatio < 1) {
        timer = setTimeout(update, 16);
      } else {
        setTimeout(onComplete, 400); // Small pause at 100% for impact
      }
    };

    timer = setTimeout(update, 16);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Dynamic phase title based on progress to show professional workflow
  const getPhaseText = () => {
    if (progress < 25) return "PHASE 01 // COGNITIVE DISCOVERY & AUDIT";
    if (progress < 50) return "PHASE 02 // BLUEPRINTING & IA MAPPING";
    if (progress < 75) return "PHASE 03 // SENSORY INTERACTION & WIREFRAMES";
    return "PHASE 04 // POLISHING ASSETS & HANDOFF";
  };

  const words = ["MR.", "FAZI"];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 bg-accent z-[9999] flex flex-col justify-between p-8 md:p-16 text-primary overflow-hidden select-none"
    >
      {/* Absolute Technical Margins - Left Edge */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 hidden xl:flex items-center gap-4 text-[8px] font-mono tracking-[0.3em] text-primary/30 uppercase whitespace-nowrap origin-left pl-8">
        <span>CORE // ENGINE: RENDER_V5.1</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span>GLOW_MESH: LOCKED</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span>FPS: 60_MAX</span>
      </div>

      {/* Absolute Technical Margins - Right Edge */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 hidden xl:flex items-center gap-4 text-[8px] font-mono tracking-[0.3em] text-primary/30 uppercase whitespace-nowrap origin-right pr-8">
        <span>PORTFOLIO // CREATOR: MR. FAZI</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span>ROLE: LEAD UI_UX DESIGNER</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span>YEAR: ©2026</span>
      </div>

      {/* Decorative ultra-subtle drafting coordinate lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14211a03_1px,transparent_1px),linear-gradient(to_bottom,#14211a03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Precision grid axis lines */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/3 border-t border-dashed border-primary/5 pointer-events-none" />
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-primary/3 border-l border-dashed border-primary/5 pointer-events-none" />

      {/* Soft dynamic ambient glowing radial mesh */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" 
      />

      {/* Top Meta Details Row */}
      <div className="flex justify-between items-start w-full relative z-10 text-[9px] font-mono tracking-[0.25em] text-primary/45 uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>PORTFOLIO INITIALIZATION // SYS_01</span>
        </div>
        <div className="flex items-center gap-4">
          <span>LOC // PK</span>
          <span className="opacity-30">|</span>
          <span>EST_TME // GMT+5</span>
        </div>
      </div>

      {/* Centerpiece: Highly Creative Interactive Prototyping & Design Canvas */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-4xl mx-auto my-auto space-y-10">
        
        {/* Designer Prototyping Vector Canvas (Shows wireframe construction) */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          
          {/* Circular drafting guide line spinning slowly */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-primary/15"
          />

          {/* Secondary rotating compass ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-dotted border-primary/20"
          />

          {/* Corner anchor point indicators */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-primary/30 border border-primary/60 rounded-sm" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary/30 border border-primary/60 rounded-sm" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-primary/30 border border-primary/60 rounded-sm" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-primary/30 border border-primary/60 rounded-sm" />

          {/* Interactive animated vector pen path rendering a dynamic geometric heart or diamond node */}
          <svg className="w-24 h-24 text-primary" viewBox="0 0 100 100" fill="none">
            {/* Horizontal and Vertical crosshair lines within viewport */}
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-20" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-20" />
            
            {/* Vector bounding circle */}
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.75" className="opacity-30" />
            
            {/* Animated Bezier path drawing a stylized minimalist design loop */}
            <motion.path
              d="M 50 15 C 65 15, 80 30, 50 85 C 20 30, 35 15, 50 15 Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="currentColor"
              fillOpacity={0.03 + (progress / 100) * 0.12} // Generates a professional hi-fi "fill" as loading finishes
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-primary/70"
            />

            {/* Pulsing Active Node handles */}
            <motion.circle
              cx="50"
              cy="15"
              r="2.5"
              fill="#14211a"
              stroke="#e5e1d8"
              strokeWidth="1"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
              cx="50"
              cy="85"
              r="2.5"
              fill="#14211a"
              stroke="#e5e1d8"
              strokeWidth="1"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </svg>

          {/* Precise coordinate coordinate overlay label */}
          <span className="absolute bottom-2 font-mono text-[7px] tracking-widest opacity-40">
            X_POS: 50.00 // Y_POS: 50.00
          </span>
        </div>

        {/* Cinematic Header Text with Precise Staggered Kinetic Masks */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-3 select-none justify-center">
            {words.map((word, wordIndex) => (
              <div key={wordIndex} className="overflow-hidden flex gap-[0.05em] py-1">
                {word.split("").map((char, charIndex) => {
                  const globalIndex = wordIndex * 3 + charIndex;
                  return (
                    <motion.span
                      key={charIndex}
                      initial={{ y: "110%", rotate: wordIndex % 2 === 0 ? 3 : -3, scale: 0.95 }}
                      animate={{ y: 0, rotate: 0, scale: 1 }}
                      transition={{
                        delay: globalIndex * 0.05,
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="text-4xl sm:text-5xl md:text-7xl font-syncopate font-bold uppercase tracking-[0.15em] leading-none text-primary"
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Elegant expanding designer subtitle */}
          <div className="overflow-hidden py-0.5">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em", y: "100%" }}
              animate={{ opacity: 1, letterSpacing: "0.4em", y: 0 }}
              transition={{
                delay: 0.5,
                duration: 1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-[9px] sm:text-10px md:text-xs font-jakarta font-bold text-primary/60 uppercase whitespace-nowrap pl-[0.4em] select-none"
            >
              CREATIVE UIUX PORTFOLIO
            </motion.p>
          </div>
        </div>

        {/* Framing design viewport accents */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute inset-x-0 -inset-y-12 border border-primary/5 rounded-[3rem] pointer-events-none"
        />
      </div>

      {/* Footer Area with Numerical Counter & Active Stage Tracking */}
      <div className="w-full relative z-10 space-y-6">
        
        {/* Progress Metrics & Stage Label */}
        <div className="flex justify-between items-end">
          <div className="space-y-1.5 text-left">
            <span className="text-[7px] font-mono tracking-[0.2em] text-primary/35 uppercase block">ACTIVE CREATIVE WORKFLOW</span>
            <motion.span 
              key={getPhaseText()}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] sm:text-[10px] font-mono tracking-[0.15em] text-primary/70 uppercase block font-bold"
            >
              {getPhaseText()}
            </motion.span>
          </div>
          
          <div className="text-3xl sm:text-5xl md:text-6xl font-syncopate font-bold tracking-tight tabular-nums text-primary/95 flex items-baseline">
            <span>{progress.toString().padStart(3, '0')}</span>
            <span className="text-[10px] sm:text-xs font-mono tracking-normal text-primary/30 ml-1.5">%</span>
          </div>
        </div>

        {/* Sleek ultra-thin linear loading line */}
        <div className="h-[2px] w-full bg-primary/10 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

    load('portfolio_hero', setHero, null);
    load('portfolio_services', setServices, null);
    load('portfolio_about', setAbout, null);
    load('portfolio_contact', setContact, null);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="bg-primary text-accent selection:bg-accent selection:text-primary">
        <Navbar onOpenCV={() => setIsCVOpen(true)} />
        <main>
          <Hero data={hero} />
          <About data={about} />
          <Services data={services} />
          <Working />
          <Contact data={contact} />
        </main>

        <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
      </div>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryGallery />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
