import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Download, Share2, Type, Palette, Layout, Move, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export function CaptionBuilder() {
  const [text, setText] = useState('Stars beyond the stars worlds etc.');
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=1000');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#ffffff');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [verticalAlign, setVerticalAlign] = useState<'start' | 'center' | 'end'>('center');

  const canvasRef = useRef<HTMLDivElement>(null);

  const presets = [
    { name: 'Aurora', url: 'https://images.unsplash.com/photo-1531366930491-81747a780dfb?auto=format&fit=crop&w=800' },
    { name: 'Zen', url: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=800' },
    { name: 'Sahara', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=800' },
    { name: 'Void', url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=800' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-paper">
      {/* Top Banner */}
      <header className="p-4 flex items-center justify-between border-b-2 border-brand-ink bg-white">
        <h2 className="text-xs font-black uppercase tracking-[0.3em]">Canvas_Interface</h2>
        <div className="flex gap-4">
          <button className="text-brand-ink hover:text-brand-primary transition-colors"><Download size={20} /></button>
          <button className="text-brand-ink hover:text-brand-primary transition-colors"><Share2 size={20} /></button>
        </div>
      </header>

      {/* Main Preview */}
      <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center gap-4">
        <div 
          ref={canvasRef}
          className="w-full aspect-[4/5] border-4 border-brand-ink relative shadow-[12px_12px_0px_0px_rgba(255,62,0,0.1)] flex items-center justify-center group bg-white"
          style={{ 
            backgroundImage: `url(${bgImage})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center' 
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          
          <motion.div 
            drag
            dragConstraints={canvasRef}
            className={cn(
              "relative z-10 px-8 py-4 w-full cursor-grab active:cursor-grabbing",
              verticalAlign === 'start' && 'mb-auto',
              verticalAlign === 'end' && 'mt-auto'
            )}
            style={{ 
              color, 
              fontSize: `${fontSize}px`,
              textAlign
            }}
          >
            <p className="font-sans font-black uppercase leading-tight drop-shadow-md tracking-tighter">
              {text}
            </p>
          </motion.div>

          <footer className="absolute bottom-2 right-2 bg-brand-ink text-white p-1 text-[7px] font-mono flex items-center gap-1">
            <Sparkles size={8} /> MODULE: QALAM_CANVAS
          </footer>
        </div>
      </div>

      {/* Controls Container */}
      <div className="bg-white border-t-4 border-brand-ink p-8 flex flex-col gap-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {presets.map(p => (
            <button
              key={p.name}
              onClick={() => setBgImage(p.url)}
              className="flex-shrink-0 flex flex-col items-center gap-2"
            >
              <div 
                className={cn(
                  "w-12 h-12 border-2 transition-all",
                  bgImage === p.url ? "border-brand-primary scale-110 shadow-[4px_4px_0_0_#FF3E00]" : "border-brand-ink/20"
                )}
                style={{ backgroundImage: `url(${p.url})`, backgroundSize: 'cover' }}
              />
              <span className="text-[9px] uppercase font-mono text-brand-ink/40">{p.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Type, label: 'Font' },
            { icon: Palette, label: 'Color' },
            { icon: Layout, label: 'Align' },
            { icon: Move, label: 'Size' }
          ].map(ctrl => (
            <button key={ctrl.label} className="flex flex-col items-center gap-2">
              <div className="w-full aspect-square border-2 border-brand-ink flex items-center justify-center text-brand-ink hover:bg-brand-primary hover:text-white transition-all">
                <ctrl.icon size={20} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest">{ctrl.label}</span>
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-brand-paper border-2 border-brand-ink p-4 text-sm font-bold uppercase outline-none focus:bg-white min-h-[100px] tracking-tight"
          placeholder="ENTER_DATA..."
        />
      </div>
    </div>
  );
}
