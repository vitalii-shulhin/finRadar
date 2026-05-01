import type { Locale } from '../config';
import uk from './uk';
import ru from './ru';

const dictionaries = {
  uk,
  ru,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries.uk;
};

export type Dictionary = typeof uk;
