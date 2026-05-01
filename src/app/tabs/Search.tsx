import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, Loader2, ArrowRight } from 'lucide-react';
import { QuoteCard } from '../../components/QuoteCard';
import { useGetInfiniteQuotes } from '../../lib/react-query/queries';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/appStore';

export function Search() {
  const { language, quoteLength } = useAppStore();
  const [query, setQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');
  const [activeMood, setActiveMood] = useState<string | null>(null);
  const loaderTrigger = useRef<HTMLDivElement>(null);

  const moods = ['Inspirational', 'Motivational', 'Sad', 'Romantic', 'Sufi', 'Attitude', 'Wisdom', 'Life'];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    status
  } = useGetInfiniteQuotes({
    query: searchTrigger || undefined,
    category: activeMood?.toLowerCase() || undefined,
    language,
    length: quoteLength
  });

  // Use allQuotes from select() — fallback to manual flatten
  const results = (data as any)?.allQuotes ?? data?.pages.flatMap(p => (p as any).quotes ?? p) ?? [];

  // Observer for Infinite Scroll
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTrigger(query);
    setActiveMood(null); // clear mood filter when doing a text search
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-paper">
      <header className="p-6 pt-10 sticky top-0 bg-brand-paper z-20">
        <div className="flex justify-between items-end border-b-2 border-brand-ink pb-4">
          <div>
            <div className="text-[10px] uppercase font-mono font-bold text-gray-400">Search_Core // Indexing</div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Deep <span className="text-brand-primary">Search</span></h1>
          </div>
        </div>
      </header>

      <div className="p-6 flex flex-col gap-6">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="KEYWORD_SEARCH / POET_NAME"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border-2 border-brand-ink py-4 pl-6 pr-16 outline-none focus:bg-brand-primary/5 transition-all font-mono text-sm tracking-tight"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-ink text-white p-2 border border-brand-ink hover:bg-brand-primary transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {moods.map(mood => (
            <button
              key={mood}
              onClick={() => {
                setActiveMood(activeMood === mood ? null : mood);
                setSearchTrigger(''); // clear text search when picking a mood
                setQuery('');
              }}
              className={cn(
                "px-3 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all border-2",
                activeMood === mood
                  ? "bg-brand-primary text-white border-brand-primary shadow-[2px_2px_0_0_#1a1a1a]"
                  : "bg-white text-brand-ink/60 border-brand-ink/10"
              )}
            >
              {mood}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {status === 'pending' && !isFetchingNextPage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white p-6 border-2 border-brand-ink/10 animate-pulse h-40" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((quote: any, idx: number) => (
                  <QuoteCard key={`${quote.id}-${idx}`} quote={quote} />
                ))}
              </div>

              <div ref={loaderTrigger} className="py-10 flex justify-center">
                {isFetchingNextPage && <Loader2 className="animate-spin text-brand-primary" size={24} />}
                {!hasNextPage && (
                  <p className="text-[10px] font-mono text-brand-ink/20 uppercase">End_Of_Repository</p>
                )}
              </div>
            </>
          ) : !isLoading && (searchTrigger || activeMood) ? (
            <div className="py-20 flex flex-col items-center text-center border-2 border-dashed border-brand-ink/20 opacity-40">
              <SearchIcon size={32} className="mb-2" />
              <p className="text-[10px] font-mono uppercase tracking-[0.3em]">No_Results_Found</p>
            </div>
          ) : !isLoading ? (
            <div className="py-20 flex flex-col items-center text-center border-2 border-dashed border-brand-ink/20 opacity-40">
              <SearchIcon size={32} className="mb-2" />
              <p className="text-[10px] font-mono uppercase tracking-[0.3em]">Query_Repository_Now</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
