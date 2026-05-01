import { Language, Quote, Mood } from "../types/domain";

interface QuotableResult {
  _id: string;
  content: string;
  author: string;
  tags: string[];
}

// Expanded local repository with more quotes per language/category
const LOCAL_REPOSITORY: Record<string, Partial<Quote>[]> = {
  [Language.ENGLISH]: [
    { text: "Be the change that you wish to see in the world.", authorName: "Mahatma Gandhi", tags: ["wisdom", "inspiration", "life"] },
    { text: "The only way to do great work is to love what you do.", authorName: "Steve Jobs", tags: ["success", "motivational", "work"] },
    { text: "In the middle of every difficulty lies opportunity.", authorName: "Albert Einstein", tags: ["wisdom", "resilience", "motivation"] },
    { text: "Your time is limited, so don't waste it living someone else's life.", authorName: "Steve Jobs", tags: ["life", "wisdom", "inspiration"] },
    { text: "The biggest risk is not taking any risk.", authorName: "Mark Zuckerberg", tags: ["success", "risk", "motivational"] },
    { text: "Stay hungry, stay foolish.", authorName: "Steve Jobs", tags: ["inspiration", "curiosity", "motivational"] },
    { text: "It does not matter how slowly you go as long as you do not stop.", authorName: "Confucius", tags: ["discipline", "perseverance", "wisdom"] },
    { text: "Everything you've ever wanted is on the other side of fear.", authorName: "George Addair", tags: ["motivation", "courage", "life"] },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", authorName: "Winston Churchill", tags: ["success", "failure", "discipline"] },
    { text: "The secret of getting ahead is getting started.", authorName: "Mark Twain", tags: ["discipline", "success", "motivational"] },
    { text: "Life is what happens when you're busy making other plans.", authorName: "John Lennon", tags: ["life", "wisdom"] },
    { text: "The way to get started is to quit talking and begin doing.", authorName: "Walt Disney", tags: ["discipline", "success", "motivational"] },
    { text: "Don't watch the clock; do what it does. Keep going.", authorName: "Sam Levenson", tags: ["discipline", "motivational"] },
    { text: "You miss 100% of the shots you don't take.", authorName: "Wayne Gretzky", tags: ["success", "motivational"] },
    { text: "The mind is everything. What you think you become.", authorName: "Buddha", tags: ["wisdom", "life", "inspiration"] },
    { text: "An unexamined life is not worth living.", authorName: "Socrates", tags: ["wisdom", "life", "philosophy"] },
    { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", authorName: "Mother Teresa", tags: ["inspiration", "happiness", "life"] },
    { text: "When you reach the end of your rope, tie a knot in it and hang on.", authorName: "Franklin D. Roosevelt", tags: ["resilience", "discipline", "motivational"] },
    { text: "Always remember that you are absolutely unique. Just like everyone else.", authorName: "Margaret Mead", tags: ["humor", "wisdom", "life"] },
    { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", authorName: "Ralph Waldo Emerson", tags: ["inspiration", "wisdom", "life"] },
    { text: "You will face many defeats in life, but never let yourself be defeated.", authorName: "Maya Angelou", tags: ["resilience", "discipline", "inspiration"] },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", authorName: "Abraham Lincoln", tags: ["life", "wisdom"] },
    { text: "Never let the fear of striking out keep you from playing the game.", authorName: "Babe Ruth", tags: ["motivational", "courage"] },
    { text: "Life is either a daring adventure or nothing at all.", authorName: "Helen Keller", tags: ["life", "inspiration", "courage"] },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", authorName: "Thomas A. Edison", tags: ["success", "discipline", "motivational"] },
    { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", authorName: "Dr. Seuss", tags: ["inspiration", "wisdom", "life"] },
    { text: "If life were predictable it would cease to be life, and be without flavor.", authorName: "Eleanor Roosevelt", tags: ["life", "wisdom"] },
    { text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", authorName: "Oprah Winfrey", tags: ["wisdom", "life", "happiness"] },
    { text: "If you want to live a happy life, tie it to a goal, not to people or things.", authorName: "Albert Einstein", tags: ["happiness", "life", "wisdom"] },
    { text: "Never let the fear of striking out keep you from playing the game.", authorName: "Babe Ruth", tags: ["courage", "motivational"] },
  ],
  [Language.URDU]: [
    { text: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے", authorName: "Allama Iqbal", translation: "Elevate your selfhood so high that before every decree, God Himself asks: What is your will?", tags: ["sufi", "wisdom", "iqbal", "philosophy", "motivational"] },
    { text: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارماں لیکن پھر بھی کم نکلے", authorName: "Mirza Ghalib", translation: "Thousands of desires, each so strong it takes one's breath away. Many of my dreams were fulfilled, yet they still felt few.", tags: ["poetry", "ghalib", "sad", "emotion", "romantic"] },
    { text: "ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں", authorName: "Allama Iqbal", translation: "There are worlds beyond the stars. There are more trials of love yet to come.", tags: ["poetry", "iqbal", "inspiration", "hope", "motivational"] },
    { text: "وقت سب سے بڑا استاد ہے، ہر کسی کو کچھ نہ کچھ سکھاتا ہے", authorName: "Urdu Proverb", translation: "Time is the greatest teacher; it teaches everyone something or the other.", tags: ["wisdom", "time", "life"] },
    { text: "دلِ ناداں تجھے ہوا کیا ہے؟\nآخر اس درد کی دوا کیا ہے؟", authorName: "Mirza Ghalib", translation: "What has happened to you, O innocent heart? After all, what is the remedy for this pain?", tags: ["sad", "ghalib", "love", "emotion"] },
    { text: "آ کہ تجھ بن دنیا کی رونق سونی لگتی ہے\nتیری یاد میں یہ آنکھیں نم ہو آتی ہیں", authorName: "Faiz Ahmed Faiz", translation: "Come, for without you the world seems barren. In your memory these eyes fill with tears.", tags: ["romantic", "sad", "faiz", "love"] },
    { text: "ہم تو عشق میں ڈوبے ہیں ساقی\nتم بھی اس میں ڈوب جاؤ", authorName: "Sufi Kalam", translation: "We are drowned in love, O Saqi. You too should drown in it.", tags: ["sufi", "love", "mystic"] },
    { text: "جو دل میں ہو وہ زبان پر لانا بھی ایک فن ہے", authorName: "Urdu Saying", translation: "To bring what is in the heart onto the tongue is also an art.", tags: ["wisdom", "life"] },
    { text: "کامیابی ان کو ملتی ہے جو کوشش نہیں چھوڑتے", authorName: "Urdu Wisdom", translation: "Success belongs to those who don't give up trying.", tags: ["success", "motivational", "discipline"] },
    { text: "محبت میں نہ خود رہتے ہیں، نہ تم کو رہنے دیتے ہیں\nعجب آفت کا ٹکڑا ہوں میں کہاں کہاں تم کو لے دیتے ہیں", authorName: "Mirza Ghalib", translation: "In love, neither do I remain myself, nor let you remain. What a piece of calamity I am, where all I lead you.", tags: ["romantic", "ghalib", "love", "poetry"] },
    { text: "زندگی کا سفر ہے یہ کیسا سفر\nکوئی سمجھا نہیں کوئی جانا نہیں", authorName: "Sahir Ludhianvi", translation: "What a journey this life is. No one understood it, no one knew it.", tags: ["life", "sad", "philosophy"] },
    { text: "اگر دل کو سمجھانا ہو تو بہت مشکل ہے\nاگر دل کی مانو تو بہت آسان ہے", authorName: "Urdu Proverb", translation: "If you try to reason with the heart, it's very difficult. If you listen to the heart, it's very easy.", tags: ["wisdom", "life", "love"] },
    { text: "یہ زندگی کسی کی بھی نہ آئی کام\nجو آئے اس کے سنگ چلے، وہی ہیں نامور", authorName: "Urdu Saying", translation: "This life serves no one alone. Those who walk alongside others — they are the famous ones.", tags: ["life", "wisdom"] },
    { text: "درد تھا لیکن تھا اپنا\nاب کسی غیر کا دل ہے", authorName: "Amjad Islam Amjad", translation: "It was pain, but it was mine. Now it belongs to a stranger's heart.", tags: ["sad", "romantic", "emotion"] },
    { text: "تنہائی کا عالم بھی کیا عالم ہے\nاپنی ہی آواز سے ڈر لگتا ہے", authorName: "Urdu Kalam", translation: "What a state this loneliness is. Even the sound of my own voice frightens me.", tags: ["sad", "life", "emotion"] },
  ],
  [Language.PASHTO]: [
    { text: "زه یو مست شان لیونی یم، زه په خپله نیشه مست یم", authorName: "Ghani Khan", translation: "I am a carefree madman, intoxicated with my own madness.", tags: ["poetry", "ghani khan", "philosophy", "mystic", "sufi"] },
    { text: "خپله خاوره خپل نظام، دا زمونږه پښتونخوا ده", authorName: "Ghani Khan", translation: "Our own land, our own system, this is our Pakhtunkhwa.", tags: ["poetry", "patriotism", "ghani khan"] },
    { text: "که غواړې چې پوه شې، نو واوره", authorName: "Pashto Proverb", translation: "If you want to understand, then listen.", tags: ["wisdom", "learning"] },
    { text: "علم د ژوند رڼا ده", authorName: "Pashto Saying", translation: "Knowledge is the light of life.", tags: ["wisdom", "education", "life"] },
    { text: "دا څه رنګ جنون دی چې زما په سر کې دی\nدا د محبت اور دی چې زما زړه کې سوزي", authorName: "Ghani Khan", translation: "What kind of madness is this that is in my head? This is the fire of love burning in my heart.", tags: ["poetry", "ghani khan", "sad", "romantic", "love"] },
    { text: "ژوند ښکلی دی خو چې پوه پاندې شي څوک", authorName: "Pashto Wisdom", translation: "Life is beautiful if one understands it.", tags: ["life", "wisdom", "optimism"] },
    { text: "د خدای بنده هغه دی چې د بل چا خدمت کوي", authorName: "Pashto Proverb", translation: "The true servant of God is one who serves others.", tags: ["wisdom", "sufi", "life"] },
    { text: "زړه مو زړه دی، سترګه مو سترګه\nمینه مو مینه، درد مو درد دی", authorName: "Rahman Baba", translation: "Our heart is a heart, our eye is an eye. Our love is love, our pain is pain.", tags: ["sufi", "poetry", "rahman baba", "love"] },
    { text: "چې مینه وکړې نو ولې یې پریږدې؟\nچې لاړ شي نو ولې یې یادوې؟", authorName: "Pashto Folk", translation: "If you loved, why did you leave? If they are gone, why do you remember them?", tags: ["sad", "romantic", "love", "emotion"] },
    { text: "صبر د ټولو درملو نه ښه دوا ده", authorName: "Pashto Proverb", translation: "Patience is the best of all medicines.", tags: ["wisdom", "life", "discipline"] },
    { text: "هغه سړی لوی دی چې د خپل ژوند مالک وي", authorName: "Pashto Wisdom", translation: "That person is great who is the master of their own life.", tags: ["wisdom", "success", "life", "motivational"] },
    { text: "د نیکۍ لاره هیڅکله تنها نه وي", authorName: "Rahman Baba", translation: "The path of goodness is never lonely.", tags: ["wisdom", "sufi", "life", "rahman baba"] },
  ],
  [Language.PUNJABI]: [
    { text: "رب دا شکر کرو، جو ملیا اے اوہو کافی اے", authorName: "Punjabi Wisdom", translation: "Be thankful to God; what you have received is enough.", tags: ["wisdom", "sufi", "life"] },
    { text: "پیار وچ اوہ طاقت اے جو تلواراں نہیں رکھدیاں", authorName: "Punjabi Saying", translation: "Love has a power that swords do not possess.", tags: ["love", "romantic", "wisdom"] },
    { text: "جو وی ہووے، رب دی رضا وچ خوش رہو", authorName: "Punjabi Proverb", translation: "Whatever happens, remain happy in God's will.", tags: ["sufi", "wisdom", "life"] },
    { text: "سچ بولن والا کدے ڈردا نہیں", authorName: "Punjabi Wisdom", translation: "One who speaks the truth never fears.", tags: ["wisdom", "discipline", "life"] },
    { text: "محبت دی رمز نہ کوئی جانے، دل ہی دل نوں پہچانے", authorName: "Punjabi Folk", translation: "No one knows the secret of love; only the heart recognizes the heart.", tags: ["romantic", "love", "sufi"] },
  ],
  [Language.SINDHI]: [
    { text: "سچی محبت سدا بہار آهي", authorName: "Sindhi Proverb", translation: "True love is ever-blooming.", tags: ["love", "wisdom", "romantic"] },
    { text: "علم حاصل ڪر، دنيا فتح ٿيندي", authorName: "Sindhi Saying", translation: "Gain knowledge, and the world will be conquered.", tags: ["wisdom", "success", "education"] },
    { text: "جيڪو ڪري ٿو محنت، ملي ٿو منزل کيس", authorName: "Shah Abdul Latif Bhittai", translation: "Whoever toils with effort finds their destination.", tags: ["discipline", "success", "motivational"] },
    { text: "دل جو درد ٻڌائڻ ڏکيو آهي", authorName: "Sindhi Kalam", translation: "It is hard to speak of the heart's pain.", tags: ["sad", "emotion", "life"] },
    { text: "صبر جو ميوو مٺو هوندو آهي", authorName: "Sindhi Proverb", translation: "The fruit of patience is sweet.", tags: ["wisdom", "discipline", "life"] },
  ],
  [Language.HINDI]: [
    { text: "कर्म ही पूजा है, जो कर्म करे वही पूजा पाए", authorName: "Indian Wisdom", translation: "Work is worship; one who works receives the blessings.", tags: ["success", "wisdom", "discipline"] },
    { text: "जो बीत गई सो बात गई", authorName: "Harivansh Rai Bachchan", translation: "What has passed is past.", tags: ["life", "wisdom", "philosophy"] },
    { text: "मन के हारे हार है, मन के जीते जीत", authorName: "Kabir Das", translation: "Defeat is when the mind is defeated; victory is when the mind wins.", tags: ["wisdom", "motivational", "discipline"] },
    { text: "जैसी करनी वैसी भरनी", authorName: "Hindi Proverb", translation: "As you sow, so shall you reap.", tags: ["wisdom", "life", "karma"] },
    { text: "दूर के ढोल सुहावने लगते हैं", authorName: "Hindi Proverb", translation: "Distant drums sound sweet.", tags: ["wisdom", "humor", "life"] },
    { text: "अपना हाथ जगन्नाथ", authorName: "Hindi Saying", translation: "Your own hand is your destiny.", tags: ["wisdom", "discipline", "success"] },
  ],
  [Language.MIXED]: [],
};

// Category to Quotable API tag mapping
const CATEGORY_TAG_MAP: Record<string, string> = {
  popular: '',
  motivational: 'motivational',
  motivation: 'motivational',
  sufi: 'inspirational',
  success: 'success',
  discipline: 'perseverance',
  wisdom: 'wisdom',
  life: 'life',
  inspirational: 'inspirational',
  sad: 'life',
  romantic: 'love',
  attitude: 'motivational',
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

// Track shown IDs per session to avoid repeats
const shownIds = new Set<string>();

async function fetchQuotable(page = 1, tag = '', query = '', minLen = 0, maxLen = 5000): Promise<Quote[]> {
  try {
    const mappedTag = CATEGORY_TAG_MAP[tag?.toLowerCase()] ?? tag;
    const lengthParams = (minLen > 0 || maxLen < 5000) ? `&minLength=${minLen}&maxLength=${maxLen}` : '';

    let url = '';
    if (query) {
      url = `https://api.quotable.io/search/quotes?query=${encodeURIComponent(query)}${mappedTag ? `&tags=${mappedTag}` : ''}&page=${page}${lengthParams}`;
    } else {
      url = `https://api.quotable.io/quotes?page=${page}&limit=15${mappedTag ? `&tags=${mappedTag}` : ''}${lengthParams}`;
    }

    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.results) return [];
    return data.results.map(mapQuotable);
  } catch (e) {
    return [];
  }
}

async function fetchPoetry(): Promise<Quote[]> {
  try {
    const res = await fetch('https://poetrydb.org/poemcount/10');
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((p: any) => ({
      id: `poetry-${p.title?.toLowerCase().replace(/\s+/g, '-') ?? Math.random().toString(36).substr(2, 9)}`,
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
      tags: ['wisdom', 'advice', 'life'],
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
 * Deduplicate quotes — remove already-seen IDs within the session
 */
function deduplicateQuotes(quotes: Quote[]): Quote[] {
  const unique: Quote[] = [];
  for (const q of quotes) {
    if (!shownIds.has(q.id)) {
      shownIds.add(q.id);
      unique.push(q);
    }
  }
  return unique;
}

/**
 * Get local quotes filtered by category/query, paged manually
 */
function getLocalQuotes(
  language: Language,
  query?: string,
  category?: string,
  page = 1,
  pageSize = 10
): Quote[] {
  const pool = LOCAL_REPOSITORY[language] ?? LOCAL_REPOSITORY[Language.ENGLISH];

  let filtered = pool;

  if (query) {
    const q = query.toLowerCase();
    filtered = pool.filter(item => {
      const searchSpace = `${item.text} ${item.authorName} ${item.tags?.join(' ')} ${(item as any).translation ?? ''}`.toLowerCase();
      return query.toLowerCase().split(/\s+/).filter(Boolean).every(word => searchSpace.includes(word));
    });
  } else if (category && category !== 'popular') {
    const cat = category.toLowerCase();
    filtered = pool.filter(item => item.tags?.some(t => t.toLowerCase().includes(cat)));
    // If no exact match, return everything (better UX than empty)
    if (filtered.length === 0) filtered = pool;
  }

  // Deterministic shuffle per page using page as seed
  const shuffled = [...filtered].sort((a, b) => {
    const hashA = (a.text?.charCodeAt(0) ?? 0) + page * 7;
    const hashB = (b.text?.charCodeAt(0) ?? 0) + page * 13;
    return hashA - hashB;
  });

  const start = (page - 1) * pageSize;
  const slice = shuffled.slice(start, start + pageSize);

  // If we've exhausted the local list, cycle through with different ordering
  if (slice.length === 0 && pool.length > 0) {
    const cycled = [...pool].reverse().slice(0, pageSize);
    return cycled.map(q => ({
      ...q,
      id: `local-${Math.random().toString(36).substr(2, 9)}`,
      language,
      createdAt: new Date().toISOString(),
      likesCount: Math.floor(Math.random() * 100),
      isCurated: true,
    } as Quote));
  }

  return slice.map(q => ({
    ...q,
    id: q.id ?? `local-${Math.random().toString(36).substr(2, 9)}`,
    language,
    createdAt: new Date().toISOString(),
    likesCount: Math.floor(Math.random() * 100),
    isCurated: true,
  } as Quote));
}

export async function fetchHybridQuotes(params: SearchParams): Promise<Quote[]> {
  const { query, category, language = Language.ENGLISH, page = 1, length = 'any' } = params;

  // Regional languages — use expanded local repo with manual paging
  if (language !== Language.ENGLISH && language !== Language.MIXED) {
    const results = getLocalQuotes(language, query, category, page);
    return deduplicateQuotes(results);
  }

  // Mixed mode — pull from all languages
  if (language === Language.MIXED) {
    const [en, ur, ps, pa] = await Promise.all([
      fetchHybridQuotes({ ...params, language: Language.ENGLISH }),
      fetchHybridQuotes({ ...params, language: Language.URDU }),
      fetchHybridQuotes({ ...params, language: Language.PASHTO }),
      fetchHybridQuotes({ ...params, language: Language.PUNJABI }),
    ]);
    return deduplicateQuotes([...en, ...ur, ...ps, ...pa].sort(() => Math.random() - 0.5));
  }

  // English — hit real APIs
  try {
    const apiResults: Quote[] = [];

    let minLen = 0, maxLen = 5000;
    if (length === 'short') maxLen = 80;
    if (length === 'medium') { minLen = 81; maxLen = 160; }
    if (length === 'long') minLen = 161;

    // Fetch from Quotable (main source)
    const quotableTag = category === 'popular' ? '' : category ?? '';
    const quotableResults = await fetchQuotable(page, quotableTag, query, minLen, maxLen);
    apiResults.push(...quotableResults);

    // Supplementary sources based on category
    if (page === 1) {
      if (category === 'poetry' || category === 'sufi') {
        const poetry = await fetchPoetry();
        apiResults.push(...poetry);
      }
      if (category === 'wisdom' || category === 'life' || !category) {
        const advice = await fetchAdvice();
        apiResults.push(...advice);
      }
    }

    // If APIs returned nothing, use local
    if (apiResults.length === 0) {
      const local = getLocalQuotes(Language.ENGLISH, query, category, page);
      return deduplicateQuotes(local);
    }

    return deduplicateQuotes(apiResults);
  } catch {
    const local = getLocalQuotes(Language.ENGLISH, query, category, page);
    return deduplicateQuotes(local);
  }
}
