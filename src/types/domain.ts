/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Language {
  ENGLISH = 'en',
  URDU = 'ur',
  ROMAN_URDU = 'ur-roman',
  PUNJABI = 'pa',
  PASHTO = 'ps',
  SINDHI = 'sd',
  HINDI = 'hi',
  MIXED = 'mixed'
}

export enum Mood {
  INSPIRATIONAL = 'inspirational',
  SAD = 'sad',
  ROMANTIC = 'romantic',
  MOTIVATIONAL = 'motivational',
  WISDOM = 'wisdom',
  SUFI = 'sufi',
  ATTITUDE = 'attitude',
  HAPPINESS = 'happiness',
  LIFE = 'life',
  SUCCESS = 'success',
  DISCIPLINE = 'discipline'
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  photoUrl?: string;
  language: Language;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Quote {
  id: string;
  text: string;
  translation?: string;
  authorId: string;
  authorName: string;
  tags: string[];
  language: Language;
  mood?: Mood;
  isCurated: boolean;
  createdAt: string;
  likesCount: number;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  quoteIds: string[];
  coverImageUrl?: string;
  createdBy: string;
}

export interface UserSubmission {
  id: string;
  text: string;
  authorName: string;
  language: Language;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CaptionStyle {
  id: string;
  name: string;
  fontFamily: string;
  color: string;
  backgroundColor?: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
  padding: number;
  borderRadius: number;
}
