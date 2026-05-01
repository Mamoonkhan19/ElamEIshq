import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Home } from './app/tabs/Home';
import { Search } from './app/tabs/Search';
import { Favorites } from './app/tabs/Favorites';
import { Settings } from './app/tabs/Settings';
import { CaptionBuilder } from './app/CaptionBuilder';

import { useAppStore } from './store/appStore';
import { cn } from './lib/utils';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen pb-24"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const { theme } = useAppStore();

  return (
    <BrowserRouter>
      <div className={cn(
        "min-h-screen relative font-sans transition-colors duration-300",
        theme === 'dark' ? "bg-brand-ink text-brand-paper dark" : "bg-brand-paper text-brand-ink"
      )}>
        <div className="flex flex-col md:flex-row min-h-screen">
          <Navigation />
          <main className={cn(
            "flex-1 w-full pb-24 md:pb-8",
            // Offset main content by sidebar width
            "md:ml-20 lg:ml-64"
          )}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
              <Routes>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
                <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
                <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
                <Route path="/caption" element={<PageTransition><CaptionBuilder /></PageTransition>} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
