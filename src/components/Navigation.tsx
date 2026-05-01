import { Home, Search, Heart, Image, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/appStore';

export function Navigation() {
  const { theme } = useAppStore();
  const isDark = theme === 'dark';

  const tabs = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: Image, label: 'Canvas', path: '/caption' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav
      className={cn(
        // Base
        "fixed z-50 transition-all duration-300",

        // Mobile → Bottom bar
        "bottom-0 left-0 right-0 border-t-2",

        // Tablet/Desktop → Sidebar
        "md:top-0 md:bottom-0 md:left-0 md:right-auto md:w-20 lg:w-64 md:border-t-0 md:border-r-2",

        // Colors
        isDark
          ? "bg-brand-ink border-white"
          : "bg-white border-brand-ink shadow-md"
      )}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between px-2",

          // Mobile
          "h-16",

          // Desktop
          "md:flex-col md:h-full md:py-6 md:px-0 md:justify-start md:gap-4 overflow-y-auto"
        )}
      >
        {/* Logo */}
        <div className="hidden md:flex flex-col items-center mb-6 px-4">
          <div className="w-12 h-12 bg-brand-primary border-2 border-brand-ink flex items-center justify-center text-white mb-2 shadow-md">
            <span className="font-black text-xl">Q</span>
          </div>
          <h2 className="text-xs font-black uppercase tracking-widest hidden lg:block">
            Qalam
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex w-full md:flex-col md:gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 items-center justify-center gap-1 transition-all",

                  // Mobile layout
                  "flex-col h-16",

                  // Desktop layout
                  "md:flex-row md:flex-none md:w-full md:justify-start md:px-4 md:py-3 md:gap-3",

                  // Active state
                  isActive
                    ? "text-brand-primary bg-brand-primary/10"
                    : isDark
                    ? "text-white/40 hover:bg-white/5"
                    : "text-brand-ink/40 hover:bg-brand-paper"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <tab.icon size={22} strokeWidth={isActive ? 3 : 2} />
                  <span className="text-[9px] font-bold md:text-sm lg:block hidden">
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}