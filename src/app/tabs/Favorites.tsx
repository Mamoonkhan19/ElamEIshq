import { useAppStore } from '../../store/appStore';
import { QuoteCard } from '../../components/QuoteCard';
import { MOCK_QUOTES } from '../../services/mock/data';
import { HeartOff } from 'lucide-react';

export function Favorites() {
  const { favorites } = useAppStore();
  const favoriteQuotes = MOCK_QUOTES.filter(q => favorites.includes(q.id));

  return (
    <div className="p-6 flex flex-col gap-8">
      <header className="flex flex-col pt-4">
        <div className="flex justify-between items-end border-b-2 border-brand-ink pb-4">
          <div>
            <div className="text-[10px] uppercase font-mono font-bold text-gray-500">Local_Persistence // Vault</div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Saved <span className="text-brand-primary">Assets</span></h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favoriteQuotes.length > 0 ? (
          favoriteQuotes.map(quote => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center text-center px-10 border-2 border-dashed border-brand-ink/20">
            <HeartOff size={32} className="mb-4 text-brand-ink/20" />
            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Vault_Empty</h3>
            <p className="text-[10px] mt-2 font-mono text-brand-ink/40">COLLECT WISDOM TO POPULATE THIS DATABASE</p>
          </div>
        )}
      </div>
    </div>
  );
}
