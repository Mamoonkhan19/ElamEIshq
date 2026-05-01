import { useState, useEffect, useRef } from 'react';
import { QuoteCard } from '../../components/QuoteCard';
import { useGetInfiniteQuotes } from '../../lib/react-query/queries';
import { Sparkles, Loader2, TrendingUp, Compass, Coffee, Heart } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { cn } from '../../lib/utils';

export function Home() {
  const { language, theme, quoteLength } = useAppStore();
  const loaderTrigger = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const categories = [
    { title: 'Mixed Loop', icon: TrendingUp, query: 'popular' },
    { title: 'Motivation', icon: Sparkles, query: 'motivational' },
    { title: 'Sufi Soul', icon: Heart, query: 'sufi' },
    { title: 'Success', icon: TrendingUp, query: 'success' },
    { title: 'Discipline', icon: Coffee, query: 'discipline' },
    { title: 'Wisdom', icon: Coffee, query: 'wisdom' },
    { title: 'Deep Life', icon: Compass, query: 'life' },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading
  } = useGetInfiniteQuotes({
    category: activeCategory.query,
    language,
    length: quoteLength
  });

  // Use the flattened allQuotes from select() — fallback to manual flatten
  const quotes = (data as any)?.allQuotes ?? data?.pages.flatMap(p => (p as any).quotes ?? p) ?? [];

  // Reset scroll position when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { threshold: 0.1 });

    if (loaderTrigger.current) {
      observer.observe(loaderTrigger.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className={cn("flex flex-col min-h-screen transition-colors duration-300", isDark ? "bg-brand-ink" : "bg-brand-paper")}>
      {/* Header */}
      <header className={cn("p-6 pt-10 sticky top-0 z-20", isDark ? "bg-brand-ink" : "bg-brand-paper")}>
        <div className={cn("flex justify-between items-end border-b-2 pb-4", isDark ? "border-white" : "border-brand-ink")}>
          <div>
            <div className={cn("text-[10px] uppercase font-mono font-bold tracking-[0.2em]", isDark ? "text-white/40" : "text-gray-400")}>Live_Feed // V1.0</div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Qalam <span className="text-brand-primary">Engine</span></h1>
          </div>
          <div className="flex flex-col items-end">
            <span className={cn(
              "w-3 h-3 border",
              isLoading || isFetchingNextPage ? "bg-brand-primary animate-spin" : isDark ? "bg-white/40 animate-pulse" : "bg-green-500 animate-pulse",
              isDark ? "border-white" : "border-brand-ink"
            )}></span>
            <span className="text-[8px] font-mono mt-1">STATUS: {isLoading || isFetchingNextPage ? 'FETCHING' : 'IDLE'}</span>
          </div>
        </div>
      </header>

      {/* Category Selector */}
      <div className={cn(
        "px-6 py-4 flex gap-4 overflow-x-auto scrollbar-none sticky top-32 z-10 backdrop-blur-sm border-b",
        isDark ? "bg-brand-ink/80 border-white/5" : "bg-brand-paper/80 border-brand-ink/5"
      )}>
        {categories.map((cat) => (
          <button
            key={cat.title}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-2 transition-all whitespace-nowrap text-[10px] font-black uppercase tracking-widest",
              activeCategory.title === cat.title
                ? isDark ? "bg-white text-brand-ink border-white shadow-[4px_4px_0_0_#FF3E00]" : "bg-brand-ink text-white border-brand-ink shadow-[4px_4px_0_0_#FF3E00]"
                : isDark ? "bg-brand-ink text-white/60 border-white/10" : "bg-white text-brand-ink/60 border-brand-ink/10"
            )}
          >
            <cat.icon size={14} />
            {cat.title}
          </button>
        ))}
      </div>

      {/* Feed */}
      <section className="p-6">
        {status === 'pending' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={cn(
                "p-6 border-2 animate-pulse flex flex-col gap-4",
                isDark ? "bg-white/5 border-white/10" : "bg-white border-brand-ink/10"
              )}>
                <div className={cn("h-40 border", isDark ? "bg-white/5 border-white/5" : "bg-brand-paper border-brand-ink/5")} />
                <div className={cn("h-4 w-1/3", isDark ? "bg-white/5" : "bg-brand-paper")} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quotes.map((quote: any, idx: number) => (
                <QuoteCard key={`${quote.id}-${idx}`} quote={quote} />
              ))}
            </div>

            {/* End of list trigger */}
            <div ref={loaderTrigger} className="py-20 flex flex-col items-center justify-center gap-4 col-span-full">
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="animate-spin text-brand-primary" size={32} />
                  <span className={cn("text-[10px] font-mono uppercase", isDark ? "text-white/20" : "text-brand-ink/40")}>Synchronizing_Wisdom...</span>
                </>
              ) : hasNextPage ? (
                <button
                  onClick={() => fetchNextPage()}
                  className={cn(
                    "px-6 py-3 border-2 text-[10px] font-black uppercase tracking-widest transition-all",
                    isDark ? "border-white text-white hover:bg-white hover:text-brand-ink" : "border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white"
                  )}
                >
                  Load More
                </button>
              ) : (
                <div className={cn("text-center py-10 border-t w-full", isDark ? "border-white/10" : "border-brand-ink/10")}>
                  <p className={cn("text-[10px] font-mono uppercase tracking-[0.3em]", isDark ? "text-white/10" : "text-brand-ink/30")}>
                    You're_All_Caught_Up
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
