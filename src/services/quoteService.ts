import { Language, Quote, Mood } from "../types/domain";

// Mapped types for external APIs
interface QuotableResult {
  _id: string;
  content: string;
  author: string;
  tags: string[];
}

// LOCAL FALLBACK DATABASE - Expanded for diverse content without AI
const LOCAL_REPOSITORY: Record<Language, Partial<Quote>[]> = {
  [Language.ENGLISH]: [
    { text: "Be the change that you wish to see in the world.", authorName: "Mahatma Gandhi", tags: ["wisdom", "inspiration"] },
    { text: "The only way to do great work is to love what you do.", authorName: "Steve Jobs", tags: ["success", "motivational"] },
    { text: "In the middle of every difficulty lies opportunity.", authorName: "Albert Einstein", tags: ["wisdom", "resilience"] },
    { text: "Your time is limited, so don't waste it living someone else's life.", authorName: "Steve Jobs", tags: ["life", "wisdom"] },
    { text: "The biggest risk is not taking any risk.", authorName: "Mark Zuckerberg", tags: ["success", "risk"] },
    { text: "Stay hungry, stay foolish.", authorName: "Whole Earth Catalog", tags: ["inspiration", "curiosity"] }
  ],
  [Language.URDU]: [
    { text: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے، خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے", authorName: "Allama Iqbal", translation: "Elevate your selfhood so high that before every decree, God Himself asks you: What is your will?", tags: ["sufi", "wisdom", "iqbal", "philosophy"] },
    { text: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے", authorName: "Mirza Ghalib", translation: "Thousands of desires, each so strong that it takes one's breath away.", tags: ["poetry", "ghalib", "sad", "emotion"] },
    { text: "ستاروں سے آگے جہاں اور بھی ہیں", authorName: "Allama Iqbal", translation: "There are worlds beyond the stars.", tags: ["poetry", "iqbal", "inspiration", "hope"] },
    { text: "وقت سب سے بڑا استاد ہے", authorName: "Urdu Proverb", translation: "Time is the greatest teacher.", tags: ["wisdom", "time", "life"] },
    { text: "دلِ ناداں تجھے ہوا کیا ہے؟", authorName: "Mirza Ghalib", translation: "What has happened to you, O innocent heart?", tags: ["sad", "ghalib", "love"] }
  ],
  [Language.PASHTO]: [
    { text: "زه یو مست شان لیونی یم، زه په خپله نیشه مست یم", authorName: "Ghani Khan", translation: "I am a carefree madman, intoxicated with my own madness.", tags: ["poetry", "ghani khan", "philosophy", "mystic"] },
    { text: "خپله خاوره خپل نظام، دا زمونږه پښتونخوا ده", authorName: "Ghani Khan", translation: "Our own land, our own system, this is our Pakhtunkhwa.", tags: ["poetry", "patriotism", "ghani khan", "national"] },
    { text: "که غواړې چې پوه شې، نو واوره.", authorName: "Pashto Proverb", translation: "If you want to understand, then listen.", tags: ["wisdom", "learning"] },
    { text: "علم د ژوند رڼا ده.", authorName: "Pashto Saying", translation: "Knowledge is the light of life.", tags: ["wisdom", "education"] },
    { text: "دا څه رنګ جنون دی چې زما په سر کې دی", authorName: "Ghani Khan", translation: "What kind of madness is this that is in my head?", tags: ["poetry", "ghani khan", "sad", "madness"] },
    { text: "ژوند ښکلی دی خو چې پوه پاندې شي څوک", authorName: "Pashto Wisdom", translation: "Life is beautiful if one understands it.", tags: ["life", "wisdom", "optimism"] }
  ],
  [Language.PUNJABI]: [
    { text: "تیرا میرا ایہہ پیار انوکھا", authorName: "Punjabi Wisdom", translation: "This love of ours is unique.", tags: ["spiritual"] }
  ],
  [Language.SINDHI]: [
    { text: "سچی محبت سدا بہار آہی", authorName: "Sindhi Proverb", translation: "True love is evergreen.", tags: ["wisdom"] }
  ],
  [Language.HINDI]: [
    { text: "कर्म ही पूजा है", authorName: "Indian Wisdom", translation: "Work is worship.", tags: ["success", "wisdom"] }
  ],
  [Language.MIXED]: []
};

const mapQuotable = (q: QuotableResult): Quote => ({
  id: q._id,
  text: q.content,
  authorId: q.author.toLowerCase().replace(/\s+/g, '-'),
  authorName: q.author,
  tags: q.tags,
  language: Language.ENGLISH,
  isCurated: true,
  createdAt: new Date().toISOString(),
  likesCount: Math.floor(Math.random() * 1000)
});

/**
 * Cache System
 */
const getCacheKey = (topic: string, lang: Language) => `quote_cache_v2_${lang}_${topic.toLowerCase().replace(/\s+/g, '_')}`;

const getCachedQuotes = (topic: string, lang: Language): Quote[] | null => {
  try {
    const cached = localStorage.getItem(getCacheKey(topic, lang));
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < 12 * 60 * 60 * 1000) return data;
    }
  } catch (e) { return null; }
  return null;
};

const setCachedQuotes = (topic: string, lang: Language, data: Quote[]) => {
  try {
    localStorage.setItem(getCacheKey(topic, lang), JSON.stringify({ data, timestamp: Date.now() }));
  } catch (e) {}
};

/**
 * Robust fetch for Quotable API (List & Search)
 */
async function fetchQuotable(page = 1, tag = '', query = '', minLen = 0, maxLen = 5000): Promise<Quote[]> {
  try {
    const lengthParams = minLen || maxLen < 5000 ? `&minLength=${minLen}&maxLength=${maxLen}` : '';
    
    let url = "";
    if (query) {
      url = `https://api.quotable.io/search/quotes?query=${encodeURIComponent(query)}${tag ? `&tags=${tag}` : ''}&page=${page}${lengthParams}`;
    } else {
      url = `https://api.quotable.io/quotes?page=${page}&limit=10${tag ? `&tags=${tag}` : ''}${lengthParams}`;
    }
    
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results.map(mapQuotable);
  } catch (e) {
    return [];
  }
}

/**
 * PoetryDB integration
 */
async function fetchPoetry(): Promise<Quote[]> {
  try {
    const res = await fetch('https://poetrydb.org/poemcount/10');
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((p: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      text: p.lines.slice(0, 4).join('\n'),
      authorId: p.author.toLowerCase().replace(/\s+/g, '-'),
      authorName: p.author,
      tags: ['poetry', 'classic'],
      language: Language.ENGLISH,
      isCurated: true,
      createdAt: new Date().toISOString(),
      likesCount: Math.floor(Math.random() * 200)
    }));
  } catch (e) { return []; }
}

/**
 * Advice Slip API
 */
async function fetchAdvice(): Promise<Quote[]> {
  try {
    const res = await fetch('https://api.adviceslip.com/advice/search/life');
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.slips) return [];
    return data.slips.map((s: any) => ({
      id: `advice-${s.id}`,
      text: s.advice,
      authorId: 'anonymous',
      authorName: 'Advice Slip',
      tags: ['wisdom', 'advice'],
      language: Language.ENGLISH,
      isCurated: true,
      createdAt: new Date().toISOString(),
      likesCount: Math.floor(Math.random() * 100)
    }));
  } catch (e) { return []; }
}

export interface SearchParams {
  query?: string;
  category?: string;
  language?: Language;
  page?: number;
  length?: 'short' | 'medium' | 'long' | 'any';
}

/**
 * Pure API/Local Fetch Layer (No AI)
 */
export async function fetchHybridQuotes(params: SearchParams): Promise<Quote[]> {
  const { query, category, language = Language.ENGLISH, page = 1, length = 'any' } = params;
  const topic = query || category || 'general';

  // Check Cache
  const cached = getCachedQuotes(topic, language);
  if (cached && page === 1) return cached;

  // Region 1: Regional (Currently only Local Fallback available for non-English)
  if (language !== Language.ENGLISH && language !== Language.MIXED) {
    const rawLocal = LOCAL_REPOSITORY[language] || LOCAL_REPOSITORY[Language.ENGLISH];
    const filtered = query 
      ? rawLocal.filter(q => {
          const searchSpace = `${q.text} ${q.authorName} ${q.tags?.join(' ')} ${q.translation || ''}`.toLowerCase();
          const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
          return queryWords.every(word => searchSpace.includes(word));
        })
      : rawLocal;

    const local = filtered.map(q => ({
      ...q,
      id: Math.random().toString(36).substr(2, 9),
      language,
      createdAt: new Date().toISOString(),
      likesCount: Math.floor(Math.random() * 100),
      isCurated: true
    } as Quote));
    return local.sort(() => Math.random() - 0.5);
  }

  // Region 2: Mixed Mode
  if (language === Language.MIXED) {
    const [en, ur, ps] = await Promise.all([
      fetchHybridQuotes({ ...params, language: Language.ENGLISH }),
      fetchHybridQuotes({ ...params, language: Language.URDU }),
      fetchHybridQuotes({ ...params, language: Language.PASHTO })
    ]);
    return [...en, ...ur, ...ps].sort(() => Math.random() - 0.5);
  }

  // Region 3: English API Discovery
  try {
    const apiResults: Quote[] = [];
    
    // Category-specific high-quality sources
    if (category === 'poetry' || category === 'sufi') {
      const poetry = await fetchPoetry();
      apiResults.push(...poetry);
    } 
    
    if (category === 'wisdom' || !category) {
      const advice = await fetchAdvice();
      apiResults.push(...advice);
    }

    // Main source: Quotable
    let minLen = 0, maxLen = 5000;
    if (length === 'short') maxLen = 80;
    if (length === 'medium') { minLen = 81; maxLen = 160; }
    if (length === 'long') minLen = 161;

    const quotableRes = await fetchQuotable(page, category === 'popular' ? '' : category, query, minLen, maxLen);
    apiResults.push(...quotableRes);

    // Final Local Fallback if APIs are blocked or empty
    if (apiResults.length === 0) {
      const rawLocal = LOCAL_REPOSITORY[Language.ENGLISH];
      const filtered = query 
        ? rawLocal.filter(q => {
            const searchSpace = `${q.text} ${q.authorName} ${q.tags?.join(' ')}`.toLowerCase();
            const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
            return queryWords.every(word => searchSpace.includes(word));
          })
        : rawLocal;

      const local = filtered.map(q => ({
        ...q,
        id: Math.random().toString(36).substr(2, 9),
        language: Language.ENGLISH,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        isCurated: true
      } as Quote));
      return local;
    }

    const finalResults = apiResults.sort(() => Math.random() - 0.5);
    if (page === 1) setCachedQuotes(topic, language, finalResults);
    return finalResults;
  } catch (err) {
    // Return local data on any fatal fetch error
    return LOCAL_REPOSITORY[Language.ENGLISH].map(q => ({
      ...q,
      id: Math.random().toString(36).substr(2, 9),
      language: Language.ENGLISH,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isCurated: true
    } as Quote));
  }
}

