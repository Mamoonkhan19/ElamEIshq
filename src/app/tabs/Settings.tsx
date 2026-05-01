import { Globe, Shield, User, Bell, Info, Moon } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { Language } from '../../types/domain';
import { cn } from '../../lib/utils';

export function Settings() {
  const { 
    language, setLanguage, 
    theme, setTheme, 
    moderationEnabled,
    quoteLength, setQuoteLength
  } = useAppStore();

  const MenuItem = ({ icon: Icon, title, value, onClick, active }: any) => (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-5 transition-all border-2",
        active ? "bg-white border-brand-ink" : "bg-transparent border-transparent"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-brand-primary text-white border border-brand-ink">
          <Icon size={18} />
        </div>
        <div className="text-left">
          <p className="text-[13px] font-black uppercase tracking-tight">{title}</p>
          <p className="text-[10px] text-brand-ink/40 font-mono mt-0.5">{value}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="p-6 pb-32">
      <header className="flex flex-col pt-4 mb-8">
        <div className={cn("flex justify-between items-end border-b-2 pb-4", theme === 'dark' ? "border-white" : "border-brand-ink")}>
          <div>
            <div className={cn("text-[10px] uppercase font-mono font-bold", theme === 'dark' ? "text-white/40" : "text-gray-500")}>Configuration_Panel</div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Device <span className="text-brand-primary">Prefs</span></h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="flex flex-col gap-3">
          <h3 className="text-[10px] font-mono text-gray-400 px-1">01_INTERFACE_ENGINE</h3>
          <div className="flex flex-col gap-3">
            <div className={cn(
              "p-5 border-2",
              theme === 'dark' ? "bg-white/5 border-white/20" : "bg-white border-brand-ink"
            )}>
              <p className={cn("text-[10px] font-black uppercase mb-3", theme === 'dark' ? "text-white/40" : "opacity-40")}>Active_Language</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'English', code: Language.ENGLISH },
                  { name: 'Urdu', code: Language.URDU },
                  { name: 'Pashto', code: Language.PASHTO },
                  { name: 'Mixed Loop 🔥', code: Language.MIXED },
                ].map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "py-3 text-[10px] font-black uppercase border-2 transition-all",
                      language === lang.code 
                        ? "bg-brand-primary text-white border-brand-ink shadow-[4px_4px_0_0_#1a1a1a]" 
                        : theme === 'dark' ? "bg-white/5 text-white/40 border-white/10" : "bg-brand-paper/50 text-brand-ink/40 border-transparent"
                    )}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={cn(
              "p-5 border-2",
              theme === 'dark' ? "bg-white/5 border-white/20" : "bg-white border-brand-ink"
            )}>
              <p className={cn("text-[10px] font-black uppercase mb-3", theme === 'dark' ? "text-white/40" : "opacity-40")}>Quote_Length_Filter</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {[
                  { name: 'Short', code: 'short' },
                  { name: 'Mid', code: 'medium' },
                  { name: 'Long', code: 'long' },
                  { name: 'Any', code: 'any' },
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => setQuoteLength(l.code as any)}
                    className={cn(
                      "py-2 text-[9px] font-black uppercase border-2 transition-all",
                      quoteLength === l.code 
                        ? "bg-brand-primary text-white border-brand-ink shadow-[2px_2px_0_0_#1a1a1a]" 
                        : theme === 'dark' ? "bg-white/5 text-white/40 border-white/10" : "bg-brand-paper/50 text-brand-ink/40 border-transparent"
                    )}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>
            
            <MenuItem 
              icon={Moon} 
              title="Appearance" 
              value={theme.toUpperCase()}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              active
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-[10px] font-mono text-gray-400 px-1">02_SECURITY_GATE</h3>
          <div className="flex flex-col gap-3">
            <MenuItem 
              icon={Shield} 
              title="Safety Filter" 
              value={moderationEnabled ? "ACTIVE" : "DISABLED"} 
              active
            />
          </div>
          
          <div className={cn(
            "mt-4 p-6 border-2 border-dashed flex flex-col items-center justify-center text-center",
            theme === 'dark' ? "border-white/10" : "border-brand-ink/20"
          )}>
            <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2", theme === 'dark' ? "text-white/20" : "text-brand-ink/20")}>System_Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-widest opacity-40">All_Systems_Nominal</span>
            </div>
          </div>
        </section>
      </div>

      <footer className={cn("mt-12 text-[10px] font-mono flex justify-between border-t pt-6 px-1", theme === 'dark' ? "text-white/20 border-white/10" : "text-brand-ink/30 border-brand-ink/10")}>
        <span>&copy; QALAM_2026</span>
        <span>ENGINE_V1.0.42</span>
      </footer>
    </div>
  );
}
