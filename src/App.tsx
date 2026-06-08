import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, Instagram, X, MapPin, Briefcase, Award, Code, Monitor, ArrowLeft, Menu, Clock, Globe, Smartphone, ShoppingBag, Layers, Layout, Sparkles, ArrowRight } from 'lucide-react';
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
            {/* Live Clock / Location - Desktop Only */}
            <div className="hidden lg:flex items-center gap-4 text-right select-none border-r border-accent/10 pr-6">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 justify-end text-[9px] font-bold uppercase tracking-wider text-accent/50">
                  <Globe size={10} className="animate-spin-slow text-accent/50" />
                  <span>PK • {timeStr || 'Faisalabad'}</span>
                </div>
                <span className="text-[8px] font-mono opacity-30 mt-0.5">EST. TIMEZONE</span>
              </div>
            </div>

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
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">Local Time</p>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="opacity-40 animate-pulse" />
                    <span className="text-sm font-mono tracking-widest">{timeStr || 'Faisalabad, PK'}</span>
                  </div>
                </div>

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

const Hero = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'canvas' | 'code'>('canvas');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const words = ["UI/UX ARCHITECTURE", "MOTION PLAYGROUNDS", "HIGH-FIDELITY SAAS", "IMMERSIVE BRANDING"];

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
                {data.subHeadline || 'CREATIVE INTERACTION SPECIALIST'}
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
            {data.description || 'Hi, I’m Mr.Fazi. I engineer highly interactive digital models that merge bold visual art with pristine structural engineering. Feel free to play with the interactive sandbox to the right.'}
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
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            {/* Frame Box */}
            <div className="bg-primary/50 border border-accent/15 rounded-[2rem] p-6 space-y-6 shadow-[0_45px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden group">
              
              {/* Floating micro indicators of live connection */}
              <div className="absolute top-4 right-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[7px] font-mono opacity-30 uppercase tracking-widest">Interactive Sandbox • Active</span>
              </div>

              {/* Console Tabs Row */}
              <div className="flex bg-accent/5 p-1 rounded-xl border border-accent/5 gap-1">
                {[
                  { key: 'blueprint', label: 'UX Blueprint', desc: 'Wireframe Logic' },
                  { key: 'canvas', label: 'UI Artistry', desc: 'Sensation Mesh' },
                  { key: 'code', label: 'Token Code', desc: 'Linked React output' }
                ].map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex-1 py-3 px-2 rounded-lg text-center transition-all duration-300 select-none ${
                        isActive 
                          ? 'bg-accent text-primary shadow-lg shadow-accent/10' 
                          : 'hover:bg-accent/8 text-accent/50 hover:text-accent'
                      }`}
                    >
                      <span className="block text-[9px] font-bold uppercase tracking-wider leading-none">{tab.label}</span>
                      <span className={`text-[7px] font-mono tracking-wide mt-0.5 block leading-none ${
                        isActive ? 'text-primary/60' : 'opacity-40'
                      }`}>
                        {tab.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sandbox Interactive Stage screen */}
              <div 
                ref={workspaceRef}
                onMouseMove={handleWorkspacePointerStr}
                className="aspect-[4/3] rounded-2xl bg-primary/80 border border-accent/10 relative overflow-hidden flex flex-col justify-between p-5 shadow-[inset_0_15px_40px_rgba(0,0,0,0.7)] cursor-crosshair group-hover:border-accent/25 transition-colors duration-500"
              >
                {/* Visual coordinate lines tracking current custom pointer */}
                <div 
                  className="absolute pointer-events-none border-t border-dashed border-accent/10 left-0 w-full" 
                  style={{ top: `${coords.y}%` }} 
                />
                <div 
                  className="absolute pointer-events-none border-l border-dashed border-accent/10 top-0 h-full" 
                  style={{ left: `${coords.x}%` }} 
                />

                {/* Tab Component State 1: Blueprint */}
                {activeTab === 'blueprint' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-full flex flex-col justify-between relative z-10"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono bg-accent/10 text-accent/80 px-2 py-0.5 rounded uppercase tracking-widest">ARCHITECTURE BLUEPRINT</span>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent/90">Grid & Proportions Grid</h4>
                      </div>
                      <span className="text-[9px] font-mono text-accent/40">SCALE: 1:1.4</span>
                    </div>

                    {/* Interactive Dotted Visualizer Boxes */}
                    <div className="grid grid-cols-12 gap-3 my-2">
                      <div className="col-span-3 border border-dotted border-accent/30 rounded-lg p-2.5 h-16 flex flex-col justify-between hover:bg-accent/5 transition-colors">
                        <div className="h-2 w-8 bg-accent/20 rounded" />
                        <span className="text-[7px] font-mono text-accent/45">FLEXBAR_W: 24%</span>
                      </div>
                      <div className="col-span-6 border border-dashed border-accent/50 rounded-lg p-2.5 h-16 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[size:10px_10px]" />
                        <div className="h-2 w-16 bg-accent/40 rounded z-10" />
                        <span className="text-[7px] font-mono text-accent z-10">CANVAS_MODEL_ZONE</span>
                      </div>
                      <div className="col-span-3 border border-dotted border-accent/30 rounded-lg p-2.5 h-16 flex flex-col justify-between hover:bg-accent/5 transition-colors">
                        <div className="h-2 w-6 bg-accent/20 rounded" />
                        <span className="text-[7px] font-mono text-accent/45">TOKENS_C1</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-accent/5 rounded-lg p-3 border border-accent/10">
                      <div className="space-y-0.5">
                        <span className="text-[7px] font-mono opacity-40 uppercase block">Pointer Position Locator</span>
                        <span className="text-xs font-mono font-bold tracking-widest text-accent">X: {coords.x}px • Y: {coords.y}px</span>
                      </div>
                      <div className="text-right text-[8px] font-mono text-accent/50">
                        STATUS: CALIBRATED <br />
                        BOUNDS: 480 x 360
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab Component State 2: UI Artistry */}
                {activeTab === 'canvas' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-full flex flex-col justify-between relative z-10"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="text-[8px] font-mono bg-accent/10 text-accent/80 px-2 py-0.5 rounded uppercase tracking-widest">MORPH SURFACE</span>
                        <p className="text-[8px] opacity-40">GLOW INTENSITY: {glowPower}%</p>
                      </div>
                      <span className="text-[9px] font-mono text-accent/55 uppercase tracking-wider">{selectedGradient.label}</span>
                    </div>

                    {/* Centered Glowing Shape customized in real-time by the inputs */}
                    <div className="flex-1 flex items-center justify-center relative">
                      <motion.div
                        animate={{
                          borderRadius: `${50 - (orbMorph / 2)}% ${50 + (orbMorph / 2)}% ${40 + (orbMorph / 3)}% ${60 - (orbMorph / 3)}%`,
                          rotate: [0, 360],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          borderRadius: { type: 'spring', stiffness: 50, damping: 10 },
                          rotate: { repeat: Infinity, duration: 16, ease: 'linear' },
                          scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
                        }}
                        className={`w-28 h-28 bg-gradient-to-tr ${selectedGradient.cssClass} relative flex items-center justify-center transition-all duration-300`}
                        style={{
                          filter: `blur(${Math.max(0, (100 - glowPower) / 10)}px)`,
                          boxShadow: `0 0 ${glowPower / 2}px ${glowPower / 5}px rgba(${
                            activeGradient === 'cyber' ? '190,0,255' : activeGradient === 'aurora' ? '5,243,162' : '255,0,118'
                          }, 0.55)`
                        }}
                      >
                        {/* Interactive floating particles inside sphere */}
                        <div className="absolute inset-2 border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
                          <motion.div 
                            animate={{ y: [-15, 15, -15], rotate: [0, 180, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                            className="w-4 h-4 bg-white/20 rounded-full mix-blend-color-dodge filter blur-xs"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Quick switch of engine themes inside stage */}
                    <div className="flex justify-between items-center">
                      <span className="text-[7px] font-mono text-accent/40 uppercase">Theme profile preset</span>
                      <div className="flex gap-2 text-[8px] font-bold uppercase font-mono">
                        <button 
                          onClick={() => setActiveGradient('cyber')}
                          className={`px-2 py-1 rounded transition-colors ${activeGradient === 'cyber' ? 'bg-accent/20 text-accent border border-accent/35' : 'opacity-40 hover:opacity-100'}`}
                        >
                          Cyber
                        </button>
                        <button 
                          onClick={() => setActiveGradient('aurora')}
                          className={`px-2 py-1 rounded transition-colors ${activeGradient === 'aurora' ? 'bg-accent/20 text-accent border border-accent/35' : 'opacity-40 hover:opacity-100'}`}
                        >
                          Aurora
                        </button>
                        <button 
                          onClick={() => setActiveGradient('sunset')}
                          className={`px-2 py-1 rounded transition-colors ${activeGradient === 'sunset' ? 'bg-accent/20 text-accent border border-accent/35' : 'opacity-40 hover:opacity-100'}`}
                        >
                          Sunset
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab Component State 3: Token Code */}
                {activeTab === 'code' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-full flex flex-col justify-between relative z-10"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-accent/10">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        </div>
                        <span className="text-[8px] font-mono text-accent/40">FaziCanvasMesh.tsx</span>
                      </div>
                      <span className="text-[7px] font-mono text-emerald-500 bg-emerald-500/10 px-1 border border-emerald-500/15 rounded">SYNC_OK</span>
                    </div>

                    {/* Preformated synchronized JSX syntax highlights */}
                    <pre className="flex-1 my-2 overflow-auto font-mono text-[8px] text-accent/75 leading-relaxed bg-black/40 p-2.5 rounded-lg py-3 border border-accent/5">
                      <span className="text-fuchsia-400">import</span> React <span className="text-fuchsia-400">from</span> <span className="text-emerald-300">"react"</span>; <br />
                      <span className="text-fuchsia-400">import</span> &#123; motion &#125; <span className="text-fuchsia-400">from</span> <span className="text-emerald-300">"motion/react"</span>; <br />
                      <br />
                      <span className="text-yellow-200">export const</span> <span className="text-sky-300">VisualMeshOrb</span> = () =&gt; &#123; <br />
                      &nbsp;&nbsp;<span className="text-fuchsia-400">return</span> ( <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">motion.div</span> <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123; <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">borderRadius</span>: <span className="text-emerald-300">"{orbMorph}% {(100 - orbMorph)}% {orbMorph}% 50%"</span>, <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">colors</span>: <span className="text-emerald-300">"[{selectedGradient.hex}]"</span>, <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">glowBlur</span>: <span className="text-orange-300">"{Math.round(glowPower / 2.5)}px"</span>, <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-orange-300">coordsLocator</span>: <span className="text-emerald-300">"x: {coords.x}, y: {coords.y}"</span> <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;&#125; <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className=<span className="text-emerald-300">"w-32 h-32 blur-glow-engine"</span> <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;/&gt; <br />
                      &nbsp;&nbsp;); <br />
                      &#125;;
                    </pre>

                    <div className="flex justify-between items-center text-[7px] font-mono text-accent/30 bg-accent/2 p-1 px-2 rounded border border-accent/5">
                      <span>LINES: 14 • BYTES: 285</span>
                      <span>UTF-8 ENCODING</span>
                    </div>
                  </motion.div>
                )}

                {/* Simulated Screen bezel footer */}
                <span className="text-[7px] font-mono opacity-20 uppercase tracking-widest block text-center border-t border-accent/5 pt-3">
                  SYSTEM ENGINE v4.2.6 • COGNITIVE USER DISCOVERY
                </span>
              </div>

              {/* Controllable customizers for UI Artistry tab */}
              <div className="space-y-4 border-t border-accent/10 pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">Adjust Design Tokens</span>
                  <span className="text-[8px] font-bold text-accent font-mono">CONTROLS</span>
                </div>

                <div className="grid grid-cols-2 gap-5 text-[9px] font-mono">
                  {/* Slider 1: Morph Shape */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] opacity-60">
                      <span>MORPH POWER:</span>
                      <span className="text-accent font-bold font-mono">{orbMorph}px</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={orbMorph}
                      onChange={(e) => setOrbMorph(Number(e.target.value))}
                      className="w-full accent-accent bg-accent/10 rounded-lg appearance-none h-1.5 cursor-pointer outline-none"
                    />
                  </div>

                  {/* Slider 2: Glow Power */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] opacity-60">
                      <span>RADIAL GLOW:</span>
                      <span className="text-accent font-bold font-mono">{glowPower}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={glowPower}
                      onChange={(e) => setGlowPower(Number(e.target.value))}
                      className="w-full accent-accent bg-accent/10 rounded-lg appearance-none h-1.5 cursor-pointer outline-none"
                    />
                  </div>
                </div>
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
          {data.tickerText || 'UI/UX DESIGN • PRODUCT STRATEGY • BRAND IDENTITY • INTERACTION DESIGN • FLUID MOTION WORKFLOW • PROTOYPING SYSTEMS • '}
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
    return <Sparkles className="w-6 h-6" />;
  };

  const getColSpan = (index: number) => {
    switch (index) {
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
                onClick={() => navigate(`/category/${encodeURIComponent(service.title)}`)}
                className={`group relative ${colSpan} flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-[#14211a]/40 border border-accent/10 hover:border-accent/30 transition-all duration-500 select-none cursor-pointer overflow-hidden min-h-[340px]`}
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
                  <span className="text-xl font-mono text-accent/30 group-hover:text-accent/80 transition-colors">
                    [{service.id}]
                  </span>
                </div>

                {/* Mid section: Icon & Title */}
                <div className="space-y-6 pt-12 relative z-10">
                  {/* Icon bracket container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#0e1712] border border-accent/15 flex items-center justify-center text-accent/70 group-hover:text-accent group-hover:border-accent/40 group-hover:scale-105 transition-all duration-500 shadow-inner">
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

                {/* Bottom section: Explore CTA */}
                <div className="pt-8 flex justify-between items-center border-t border-accent/5 relative z-10 mt-auto">
                  <span className="text-[10px] font-mono tracking-widest text-accent/40 group-hover:text-accent transition-colors">
                    EXPLORE PROJECTS //
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#0e1712] border border-accent/10 flex items-center justify-center text-accent/40 group-hover:text-primary group-hover:bg-accent group-hover:border-accent group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight size={18} />
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

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const defaultProjects: Project[] = [
      {
        id: 1,
        title: "Lumina Healthcare App",
        category: "Mobile App Screens design",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
        year: "2024"
      },
      {
        id: 2,
        title: "Vortex SaaS Dashboard",
        category: "Dashboard / Admin Panel design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        year: "2024"
      },
      {
        id: 3,
        title: "Elysium Premium E-commerce",
        category: "E-commerce Store design",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
        year: "2024"
      },
      {
        id: 4,
        title: "Apex Landing Page",
        category: "Landing Pages design",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
        year: "2024"
      }
    ];

    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      if (parsed && parsed.length > 0) {
        setProjects(parsed);
      } else {
        setProjects(defaultProjects);
        localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const steps = [
    {
      num: "01",
      title: "Discover & Research",
      desc: "Deep diving into your brand's core values, target audience habits, and industry benchmarks to define strategic targets."
    },
    {
      num: "02",
      title: "Wireframing & UX Architecture",
      desc: "Structuring interface layouts with logical user flows and intuitive information architecture blueprints before styling."
    },
    {
      num: "03",
      title: "Premium UI Design",
      desc: "Dressing blueprints with gorgeous theme choices, sleek font hierarchies, bespoke graphics, and clean motion layouts."
    },
    {
      num: "04",
      title: "Interactive Prototype & Handoff",
      desc: "Creating high-fidelity clickable mockups and fully documented pixel-perfect developer style guides."
    }
  ];

  return (
    <section id="working" className="px-6 py-40 bg-accent text-primary border-t border-primary/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-40">
        
        {/* SUBSECTION 1: WORKING PROCESS */}
        <div className="space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-primary/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">01 / MY METHOD</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none">
                WORKING <br /> <span className="text-stroke">PROCESS</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-lg opacity-60 leading-relaxed max-w-xl">
                A highly structured, human-centric design methodology engineered to translate complex brand ideas into pixel-perfect digital interactive experiences.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="bg-primary/2 hover:bg-primary/5 border border-primary/10 p-8 rounded-3xl space-y-8 group transition-all duration-500"
              >
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-display font-black text-primary/20 group-hover:text-primary transition-colors duration-500">{step.num}</span>
                  <span className="w-2 h-2 bg-primary opacity-20 rounded-full group-hover:scale-150 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-display font-bold">{step.title}</h3>
                  <p className="text-sm opacity-55 font-normal leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SUBSECTION 2: SELECTED PROJECTS SHOWCASE */}
        <div className="space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-primary/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/60">02 / PORTFOLIO</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none">
                WORKING <br /> <span className="text-stroke">GALLERY</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-lg opacity-60 leading-relaxed max-w-xl">
                Explore a curation of high-end interfaces and modern layouts built with strategic intent, flawless layouts, and smooth intuitive motion guidelines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.slice(0, 4).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/category/${encodeURIComponent(project.category)}`)}
                className="group cursor-pointer space-y-6"
              >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 aspect-[16/11]">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.2s]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/80 backdrop-blur-md border border-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                    <ArrowUpRight size={20} className="text-primary" />
                  </div>
                </div>
                <div className="flex justify-between items-start px-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50">{project.category}</span>
                    <h3 className="text-2xl font-display font-bold group-hover:text-primary/80 transition-colors">{project.title}</h3>
                  </div>
                  <span className="text-xs font-mono opacity-40">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/category/${encodeURIComponent('Website Design & Layout')}`)}
              className="px-12 py-5 bg-primary text-accent rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-colors shadow-2xl shadow-primary/5"
            >
              Browse All Categories
            </motion.button>
          </div>
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

const Home = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);
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
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryGallery />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
