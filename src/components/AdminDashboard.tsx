import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  X
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: '',
    image: '',
    year: new Date().getFullYear().toString()
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Default projects if none saved
      const defaultProjects = [
        { id: 1, title: "Lumina Health", category: "Mobile App • Healthtech", image: "https://picsum.photos/seed/lumina/1200/800", year: "2024" },
        { id: 2, title: "Orbit Dashboard", category: "Web App • SaaS", image: "https://picsum.photos/seed/orbit/1200/800", year: "2023" }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const handleDelete = (id: number) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
  };

  const handleAdd = (e: React.FormEvent) => {
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
    setIsAdding(false);
    setNewProject({ title: '', category: '', image: '', year: new Date().getFullYear().toString() });
  };

  return (
    <div className="min-h-screen bg-primary text-accent">
      {/* Sidebar / Header */}
      <header className="border-b border-accent/10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-xs opacity-40 uppercase tracking-widest">Manage Portfolio Content</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-display font-bold">Projects</h2>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-primary font-bold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" /> Add New Project
          </button>
        </div>

        {/* Add Project Modal */}
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary/80 backdrop-blur-sm">
            <div className="w-full max-w-xl bg-primary border border-accent/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-bold">New Project</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Project Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent/30"
                      placeholder="e.g. Lumina Health"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Category</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                      <input
                        type="text"
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent/30"
                        placeholder="e.g. UI/UX Design"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-40">Year</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                      <input
                        type="text"
                        value={newProject.year}
                        onChange={(e) => setNewProject({...newProject, year: e.target.value})}
                        className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent/30"
                        placeholder="2024"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-40">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
                    <input
                      type="url"
                      value={newProject.image}
                      onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                      className="w-full bg-accent/5 border border-accent/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent/30"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Save className="w-5 h-5" /> Save Project
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Project List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-accent/5 border border-accent/10 rounded-3xl overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-3 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md text-red-400 rounded-2xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
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

        {projects.length === 0 && (
          <div className="text-center py-20 bg-accent/5 border border-dashed border-accent/10 rounded-3xl">
            <p className="text-accent/40">No projects found. Add your first project!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
