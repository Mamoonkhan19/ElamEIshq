import { Quote, Language } from '../../types/domain';

/**
 * Normalizes text for search by removing diacritics, punctuation, and extra whitespace.
 * Also handles basic Roman Urdu to Urdu mapping concepts if needed.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

export function searchQuotes(quotes: Quote[], query: string, filters?: { language?: Language; mood?: string }): Quote[] {
  const normalizedQuery = normalizeText(query);
  
  return quotes.filter(quote => {
    const textMatch = normalizeText(quote.text).includes(normalizedQuery);
    const authorMatch = normalizeText(quote.authorName).includes(normalizedQuery);
    const tagMatch = quote.tags.some(tag => normalizeText(tag).includes(normalizedQuery));
    
    const langMatch = !filters?.language || quote.language === filters.language;
    const moodMatch = !filters?.mood || quote.mood?.toLowerCase() === filters.mood.toLowerCase();
    
    return (textMatch || authorMatch || tagMatch) && langMatch && moodMatch;
  });
}
