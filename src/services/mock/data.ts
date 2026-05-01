import { Language, Quote, Mood } from '../../types/domain';

export const MOCK_QUOTES: Quote[] = [
  {
    id: '1',
    text: "The only way to do great work is to love what you do.",
    authorId: 'steve-jobs',
    authorName: 'Steve Jobs',
    tags: ['inspiration', 'work'],
    language: Language.ENGLISH,
    mood: Mood.INSPIRATIONAL,
    isCurated: true,
    createdAt: new Date().toISOString(),
    likesCount: 1240
  },
  {
    id: '2',
    text: "ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں",
    translation: "Beyond the stars there are other worlds;\nThere are more tests of love yet to come.",
    authorId: 'allama-iqbal',
    authorName: 'Allama Iqbal',
    tags: ['poetry', 'stars', 'journey'],
    language: Language.URDU,
    mood: Mood.INSPIRATIONAL,
    isCurated: true,
    createdAt: new Date().toISOString(),
    likesCount: 5000
  },
  {
    id: '3',
    text: "It is not the mountains ahead to climb that wear you out; it's the pebble in your shoe.",
    authorId: 'muhammad-ali',
    authorName: 'Muhammad Ali',
    tags: ['perseverance', 'small-things'],
    language: Language.ENGLISH,
    mood: Mood.MOTIVATIONAL,
    isCurated: true,
    createdAt: new Date().toISOString(),
    likesCount: 890
  },
  {
    id: '4',
    text: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے",
    authorId: 'allama-iqbal',
    authorName: 'Allama Iqbal',
    tags: ['poetry', 'selfhood'],
    language: Language.URDU,
    mood: Mood.MOTIVATIONAL,
    isCurated: true,
    createdAt: new Date().toISOString(),
    likesCount: 15000
  }
];
