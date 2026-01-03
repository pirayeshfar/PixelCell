
import React, { useState, useRef, useEffect } from 'react';
import { generateExcel } from '../services/excelService';
import { analyzeImage } from '../services/geminiService';

export const ImageProcessor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resolution, setResolution] = useState<number>(50); // Default 50x50
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAiAnalysis('');
        setStatus('');
      };
      reader.readAsDataURL(file);
    }
  };

  const processAndDownload = async () => {
    if (!selectedImage || !canvasRef.current) return;
    
    setIsProcessing(true);
    setStatus('Preparing spreadsheet layers...');

    try {
      const img = new Image();
      img.src = selectedImage;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate new dimensions based on resolution while maintaining aspect ratio
      const aspectRatio = img.width / img.height;
      let targetWidth = resolution;
      let targetHeight = Math.round(resolution / aspectRatio);

      // Limit height for extreme vertical images
      if (targetHeight > 150) {
        targetHeight = 150;
        targetWidth = Math.round(150 * aspectRatio);
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      
      setStatus('Analyzing with Gemini AI...');
      // Start AI analysis in parallel
      const analysisPromise = analyzeImage(selectedImage);
      
      setStatus('Stitching pixel cells...');
      await generateExcel(imageData, targetWidth, targetHeight);

      const analysisResult = await analysisPromise;
      setAiAnalysis(analysisResult);
      
      setStatus('Success! Check your downloads.');
    } catch (error) {
      console.error(error);
      setStatus('Error processing image.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid md:grid-cols-2">
        {/* Left Side: Upload & Control */}
        <div className="p-8 space-y-6 border-r border-slate-800">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">1. Select your image</h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-800/50 rounded-xl p-8 cursor-pointer transition-all text-center group"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
              {selectedImage ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-700">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-white font-medium">Change Image</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-slate-700 rounded-full mx-auto flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <p className="text-slate-400">Click or drag & drop</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">JPG, PNG, WEBP</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">2. Resolution</h3>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-bold border border-blue-500/20">
                {resolution} Pixels Wide
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="150" 
              value={resolution} 
              onChange={(e) => setResolution(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-xs text-slate-500 italic">
              * Higher resolution produces larger files. A limit of 150 prevents Excel lag.
            </p>
          </div>

          <button
            disabled={!selectedImage || isProcessing}
            onClick={processAndDownload}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
              !selectedImage || isProcessing 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white transform hover:-translate-y-1'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Generate Excel Art
              </>
            )}
          </button>
          
          {status && (
            <p className="text-center text-sm font-medium animate-pulse text-emerald-400">
              {status}
            </p>
          )}
        </div>

        {/* Right Side: Pixel Preview & AI */}
        <div className="p-8 bg-slate-950/50 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
          <div className="flex-grow flex flex-col gap-6">
            <div className="relative flex-grow min-h-[200px] border border-slate-800 rounded-xl bg-slate-900 pixel-grid flex items-center justify-center overflow-hidden">
               <canvas ref={canvasRef} className="hidden" />
               {!selectedImage ? (
                 <p className="text-slate-600 font-medium italic">Upload an image to see the mosaic</p>
               ) : (
                 <div 
                   className="w-full h-full"
                   style={{
                     imageRendering: 'pixelated',
                     background: `url(${selectedImage}) center/cover no-repeat`,
                     filter: `blur(${150/resolution}px)`
                   }}
                 ></div>
               )}
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 min-h-[120px]">
              <h4 className="text-xs uppercase font-bold text-slate-500 mb-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-blue-400">
                  <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
                  <path d="M3.265 10.602l7.635 4.11a1.5 1.5 0 001.442 0l7.635-4.11a.75.75 0 01.712 1.32L11.644 16.425a1.5 1.5 0 01-1.442 0l-9.313-5.018a.75.75 0 01.712-1.32z" />
                  <path d="M3.265 14.602l7.635 4.11a1.5 1.5 0 001.442 0l7.635-4.11a.75.75 0 01.712 1.32L11.644 20.425a1.5 1.5 0 01-1.442 0l-9.313-5.018a.75.75 0 01.712-1.32z" />
                </svg>
                Gemini AI Insight
              </h4>
              {aiAnalysis ? (
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{aiAnalysis}"
                </p>
              ) : (
                <p className="text-sm text-slate-600 italic">
                  The AI will analyze your image colors and composition once you click generate.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
