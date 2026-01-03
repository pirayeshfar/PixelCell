
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageProcessor } from './components/ImageProcessor';
import { Features } from './components/Features';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <section className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Turn Pixels into Spreadsheet Art
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Convert your photos into Excel files where every cell is a colored pixel. 
              Perfect for hidden art, unique data visualizations, or just for fun.
            </p>
          </section>

          <ImageProcessor />

          <Features />
        </div>
      </main>
      <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm space-y-2">
        <p>Designed & Conceptualized by <span className="text-slate-300 font-medium">AmirSaman Pirayeshfar</span></p>
        <p>Built with Gemini AI & Pixel Precision • 2024</p>
      </footer>
    </div>
  );
};

export default App;
