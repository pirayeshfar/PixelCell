
import React from 'react';

const FeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
  <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400">
      {icon}
    </div>
    <h4 className="font-bold text-lg">{title}</h4>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export const Features: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <FeatureCard 
        title="High Precision Colors"
        desc="We extract the RGB values of every pixel and translate them to Excel hex fills for perfect reproduction."
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.903a9.75 9.75 0 0115.804-10.703M4.098 19.903A9.713 9.713 0 013 12c0-5.385 4.365-9.75 9.75-9.75a9.713 9.713 0 017.804 3.903m-15.51 16c.729.12 1.473.18 2.229.18 1.403 0 2.76-.209 4.037-.597m-4.037.597l2.843-4.264a2.25 2.25 0 012.232-1.127 2.25 2.25 0 012.232 1.127l2.843 4.264m-4.037.597a9.758 9.758 0 005.512-2.382" /></svg>}
      />
      <FeatureCard 
        title="Smart Aspect Ratio"
        desc="Your spreadsheets are scaled automatically to preserve the shape and size of your original images."
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>}
      />
      <FeatureCard 
        title="Gemini AI Analysis"
        desc="Integrated AI describes your creation, helping you understand color patterns and artistic sentiment."
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>}
      />
    </div>
  );
};
