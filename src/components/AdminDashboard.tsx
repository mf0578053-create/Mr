import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Plus, 
  Trash2, 
  LogOut, 
  Briefcase,
  Mail,
  CheckCircle2,
  ChevronRight,
  User,
  X,
  Save
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
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
  const [activeTab, setActiveTab] = useState('dashboard');
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

  // Messages Handlers
  const handleDeleteMessage = (id: number) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
    triggerToast();
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'messages', label: 'Messages', icon: Mail },
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

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-display font-bold">Dashboard</h2>
              <p className="opacity-40 mt-1">Welcome back! Here's an overview of your portfolio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-accent/5 border border-accent/10 rounded-3xl p-8 space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{projects.length}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">Total Projects</p>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/10 rounded-3xl p-8 space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{messages.length}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">Total Messages</p>
                </div>
              </div>

              <div className="bg-accent/5 border border-accent/10 rounded-3xl p-8 space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Active</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">Portfolio Status</p>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setActiveTab('projects')}
                  className="flex items-center justify-between p-4 bg-primary border border-accent/10 rounded-2xl hover:border-accent/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/5 rounded-xl flex items-center justify-center">
                      <Plus className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                    </div>
                    <span className="font-bold">Add New Project</span>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100" />
                </button>
                <button 
                  onClick={() => setActiveTab('messages')}
                  className="flex items-center justify-between p-4 bg-primary border border-accent/10 rounded-2xl hover:border-accent/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/5 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                    </div>
                    <span className="font-bold">Check Messages</span>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>
        )}

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

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-display font-bold">Messages</h2>
              <p className="opacity-40 mt-1">View inquiries from your portfolio visitors</p>
            </div>

            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="text-center py-20 bg-accent/5 border border-dashed border-accent/10 rounded-3xl">
                  <p className="opacity-40">No messages yet.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-accent/5 border border-accent/10 rounded-3xl p-8 space-y-4 relative group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-xl font-bold">{msg.name}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-accent/10 px-2 py-1 rounded-md opacity-60">
                            {msg.date}
                          </span>
                        </div>
                        <p className="text-sm text-accent/60">{msg.email}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="pt-4 border-t border-accent/10">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Subject: {msg.subject}</p>
                      <p className="text-lg leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
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
      </main>
    </div>
  );
};

export default AdminDashboard;
