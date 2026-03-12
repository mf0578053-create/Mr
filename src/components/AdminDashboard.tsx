import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  LogOut, 
  Image as ImageIcon, 
  Type, 
  Calendar, 
  Tag,
  Save,
  X,
  User,
  Briefcase,
  Mail,
  MapPin,
  Phone,
  Globe,
  Star,
  Layers,
  Info,
  Link as LinkIcon,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface HeroData {
  headline: string;
  subHeadline: string;
  description: string;
  tickerText: string;
}

interface AboutData {
  title: string;
  highlight: string;
  description: string;
  instagram: string;
  behance: string;
  linkedin: string;
}

interface ContactData {
  email: string;
  phone: string;
  location: string;
  whatsapp: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [showToast, setShowToast] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: '',
    image: '',
    year: new Date().getFullYear().toString()
  });

  // Hero State
  const [hero, setHero] = useState<HeroData>({
    headline: '',
    subHeadline: '',
    description: '',
    tickerText: ''
  });

  // Services State
  const [services, setServices] = useState<Service[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState<Partial<Service>>({
    title: '',
    description: '',
    image: ''
  });

  // About State
  const [about, setAbout] = useState<AboutData>({
    title: '',
    highlight: '',
    description: '',
    instagram: '',
    behance: '',
    linkedin: ''
  });

  // Contact State
  const [contact, setContact] = useState<ContactData>({
    email: '',
    phone: '',
    location: '',
    whatsapp: ''
  });

  // Messages State
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Load all data from localStorage
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));

    const savedHero = localStorage.getItem('portfolio_hero');
    if (savedHero) setHero(JSON.parse(savedHero));

    const savedServices = localStorage.getItem('portfolio_services');
    if (savedServices) setServices(JSON.parse(savedServices));

    const savedAbout = localStorage.getItem('portfolio_about');
    if (savedAbout) setAbout(JSON.parse(savedAbout));

    const savedContact = localStorage.getItem('portfolio_contact');
    if (savedContact) setContact(JSON.parse(savedContact));

    const savedMessages = localStorage.getItem('portfolio_messages');
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, [navigate]);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  // Projects Handlers
  const handleDeleteProject = (id: number) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    triggerToast();
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Date.now(),
      title: newProject.title || 'Untitled Project',
      category: newProject.category || 'Uncategorized',
      image: newProject.image || `https://picsum.photos/seed/${Date.now()}/1200/800`,
      year: newProject.year || new Date().getFullYear().toString()
    };
    const updated = [project, ...projects];
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    setIsAddingProject(false);
    setNewProject({ title: '', category: '', image: '', year: new Date().getFullYear().toString() });
    triggerToast();
  };

  // Services Handlers
  const handleDeleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem('portfolio_services', JSON.stringify(updated));
    triggerToast();
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const service: Service = {
      id: (services.length + 1).toString().padStart(2, '0'),
      title: newService.title || 'New Service',
      description: newService.description || '',
      image: newService.image || `https://picsum.photos/seed/${Date.now()}/600/400`
    };
    const updated = [...services, service];
    setServices(updated);
    localStorage.setItem('portfolio_services', JSON.stringify(updated));
    setIsAddingService(false);
    setNewService({ title: '', description: '', image: '' });
    triggerToast();
  };

  // Generic Save Handlers
  const saveHero = () => {
    localStorage.setItem('portfolio_hero', JSON.stringify(hero));
    triggerToast();
  };

  const saveAbout = () => {
    localStorage.setItem('portfolio_about', JSON.stringify(about));
    triggerToast();
  };

  const saveContact = () => {
    localStorage.setItem('portfolio_contact', JSON.stringify(contact));
    triggerToast();
  };

  // Messages Handlers
  const handleDeleteMessage = (id: number) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
    triggerToast();
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-primary text-accent flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-accent/10 flex flex-col bg-accent/2">
        <div className="p-8 border-b border-accent/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-black text-xs">F</span>
            </div>
            <h1 className="font-display font-bold text-lg">Admin Panel</h1>
          </div>
          <p className="text-[10px] opacity-40 uppercase tracking-widest">v1.0.0 • Faizan Akram</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-accent text-primary' 
                  : 'hover:bg-accent/5 opacity-60 hover:opacity-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-accent/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full">
        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 20 }}
              className="fixed top-8 right-8 z-[100] bg-accent text-primary px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-bold">Changes saved successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-display font-bold">Projects</h2>
                <p className="opacity-40 mt-1">Manage your portfolio work gallery</p>
              </div>
              <button 
                onClick={() => setIsAddingProject(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-primary font-bold hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="group bg-accent/5 border border-accent/10 rounded-3xl overflow-hidden flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-3 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md text-red-400 rounded-2xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{project.category}</span>
                      <span className="text-[10px] font-bold opacity-40">{project.year}</span>
                    </div>
                    <h4 className="text-xl font-display font-bold">{project.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modals */}
        {isAddingProject && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-primary/80 backdrop-blur-sm">
            <div className="w-full max-w-xl bg-primary border border-accent/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-bold">New Project</h3>
                <button onClick={() => setIsAddingProject(false)} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-accent/30"
                    placeholder="e.g. Lumina Health"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Category</label>
                    <input
                      type="text"
                      value={newProject.category}
                      onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                      className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-accent/30"
                      placeholder="e.g. UI/UX Design"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Year</label>
                    <input
                      type="text"
                      value={newProject.year}
                      onChange={(e) => setNewProject({...newProject, year: e.target.value})}
                      className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-accent/30"
                      placeholder="2024"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Image URL</label>
                  <input
                    type="url"
                    value={newProject.image}
                    onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                    className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-accent/30"
                    placeholder="https://..."
                  />
                </div>
                <button type="submit" className="w-full bg-accent text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90">
                  <Save className="w-5 h-5" /> Save Project
                </button>
              </form>
            </div>
          </div>
        )}

        {isAddingService && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-primary/80 backdrop-blur-sm">
            <div className="w-full max-w-xl bg-primary border border-accent/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-bold">New Service</h3>
                <button onClick={() => setIsAddingService(false)} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddService} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Service Title</label>
                  <input
                    type="text"
                    value={newService.title}
                    onChange={(e) => setNewService({...newService, title: e.target.value})}
                    className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-accent/30"
                    placeholder="e.g. UI/UX Design"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-accent/30 h-32 resize-none"
                    placeholder="Describe what you offer..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={newService.image}
                    onChange={(e) => setNewService({...newService, image: e.target.value})}
                    className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 px-4 focus:outline-none focus:border-accent/30"
                    placeholder="https://..."
                  />
                </div>
                <button type="submit" className="w-full bg-accent text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90">
                  <Save className="w-5 h-5" /> Save Service
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
