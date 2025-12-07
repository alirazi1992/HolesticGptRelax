/**
 * Detects if the text contains Persian/Arabic characters to determine direction.
 * Returns 'rtl' if Persian/Arabic characters are found, otherwise 'ltr'.
 */
export function detectDirection(text: string): 'rtl' | 'ltr' {
  if (!text) return 'ltr';

  // Unicode ranges for Arabic, Persian, and related scripts
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlRegex.test(text) ? 'rtl' : 'ltr';
}