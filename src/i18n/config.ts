export const i18n = {
  defaultLocale: 'uk',
  locales: ['uk', 'ru'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  uk: 'Українська',
  ru: 'Рос',
};

export const localeFlags: Record<Locale, string> = {
  uk: '🇺🇦',
  ru: 'ru',
};
