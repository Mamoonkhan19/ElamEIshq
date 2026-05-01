import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDir(lang: string) {
  const rtlLanguages = ['ur', 'ur-roman', 'ps', 'sd', 'pa']; // Pa can be Shahmukhi (RTL) or Gurmukhi (LTR). Assuming Shahmukhi context if RTL requested.
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
}
