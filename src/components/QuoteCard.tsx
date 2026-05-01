import { motion } from 'motion/react';
import { Heart, Share2, Copy, Trash2, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { Quote, Language } from '../types/domain';
import { cn, getDir } from '../lib/utils';
import { useAppStore } from '../store/appStore';

interface QuoteCardProps {
  quote: Quote;
  onAction?: (action: string) => void;
  key?: string | number;
}

export function QuoteCard({ quote, onAction }: QuoteCardProps) {
  const { theme, toggleFavorite, favorites } = useAppStore();
  const isFavorite = favorites.includes(quote.id);
  const isRtl = getDir(quote.language) === 'rtl';
  const isDark = theme === 'dark';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quote.text);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "p-6 border-2 flex flex-col gap-6 relative transition-colors duration-300",
        isDark 
          ? "bg-brand-ink border-white text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]" 
          : "bg-white border-brand-ink text-brand-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
      )}
    >
      <div className="absolute -top-3 -left-2 bg-brand-primary text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter">
        QuoteRef: {quote.id.padStart(3, '0')}
      </div>

      <div 
        className={cn(
          "flex flex-col gap-4",
          isRtl ? "urdu-text text-right text-2xl" : "font-sans text-left"
        )}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <blockquote className="text-xl md:text-2xl font-black leading-tight uppercase tracking-tighter">
          "{quote.text}"
        </blockquote>
        
        {quote.translation && (
          <p className={cn(
            "text-xs font-mono border-l pl-4 py-1",
            isDark ? "text-white/40 border-white/20" : "text-brand-ink/60 border-brand-ink/20"
          )}>
            {quote.translation}
          </p>
        )}
      </div>

      <div className={cn(
        "flex items-end justify-between mt-auto pt-4 border-t",
        isDark ? "border-white/10" : "border-brand-ink/10"
      )}>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black text-gray-500 opacity-60">Author</span>
          <span className="text-sm font-bold tracking-tight">{quote.authorName}</span>
          <div className="flex flex-wrap gap-1 mt-2">
            {quote.tags.map(tag => (
              <span 
                key={tag} 
                className={cn(
                  "text-[9px] uppercase font-mono px-1 border",
                  isDark ? "border-white/20 text-white/40" : "border-brand-ink/20 text-brand-ink/40"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-1">
          <button 
            onClick={() => toggleFavorite(quote.id)}
            className={cn(
              "p-2 border transition-all",
              isFavorite 
                ? "bg-brand-primary text-white border-brand-primary" 
                : isDark 
                  ? "text-white/40 border-white/20 hover:bg-white/5" 
                  : "text-brand-ink/40 border-brand-ink hover:bg-brand-paper"
            )}
            id={`fav-${quote.id}`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={copyToClipboard}
            className={cn(
              "p-2 border transition-all",
              isDark 
                ? "text-white/40 border-white/20 hover:bg-white hover:text-brand-ink" 
                : "text-brand-ink/40 border-brand-ink hover:bg-brand-ink hover:text-white"
            )}
            id={`copy-${quote.id}`}
          >
            <Copy size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
