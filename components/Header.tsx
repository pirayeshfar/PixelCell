
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded flex items-center justify-center font-bold text-white italic">
            P
          </div>
          <h1 className="text-xl font-bold tracking-tight">PixelCell</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <a href="https://github.com" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium transition-all">
            Star on GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};
