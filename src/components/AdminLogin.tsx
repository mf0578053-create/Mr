import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdminAuthenticated') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'faizan' && password.trim() === 'faizanakram@#') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-accent p-6 relative select-none">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity bg-accent/5 px-4 py-2.5 rounded-full border border-accent/10"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Website
      </Link>

      <div className="w-full max-w-md bg-accent/5 border border-accent/15 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-primary mb-6 shadow-xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-bold text-accent">Admin Portal</h1>
          <p className="text-accent/60 text-sm mt-2">Enter your admin credentials to access messages and portfolio management.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-accent/60 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/40" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-accent/10 border border-accent/20 rounded-2xl py-4 pl-12 pr-4 text-accent placeholder:text-accent/30 focus:outline-none focus:border-accent/60 transition-colors text-base font-medium"
                placeholder="faizan"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-accent/60 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-accent/10 border border-accent/20 rounded-2xl py-4 pl-12 pr-4 text-accent placeholder:text-accent/30 focus:outline-none focus:border-accent/60 transition-colors text-base font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-primary font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all text-base cursor-pointer shadow-lg"
          >
            Access Dashboard <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-accent/10 text-center">
          <p className="text-[11px] font-mono opacity-40">
            Default Login: <span className="text-accent/80 font-bold">faizan</span> | Pass: <span className="text-accent/80 font-bold">faizanakram@#</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
