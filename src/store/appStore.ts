import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '../types/domain';

interface AppState {
  language: Language;
  theme: 'light' | 'dark' | 'system';
  favorites: string[];
  recentSearches: string[];
  moderationEnabled: boolean;
  quoteLength: 'short' | 'medium' | 'long' | 'any';
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setQuoteLength: (length: 'short' | 'medium' | 'long' | 'any') => void;
  toggleFavorite: (quoteId: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: Language.ENGLISH,
      theme: 'system',
      favorites: [],
      recentSearches: [],
      moderationEnabled: true,
      quoteLength: 'any',
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setQuoteLength: (quoteLength) => set({ quoteLength }),
      toggleFavorite: (quoteId) =>
        set((state) => ({
          favorites: state.favorites.includes(quoteId)
            ? state.favorites.filter((id) => id !== quoteId)
            : [...state.favorites, quoteId],
        })),
      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [
            query,
            ...state.recentSearches.filter((q) => q !== query),
          ].slice(0, 10),
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'qalam-storage',
    }
  )
);
