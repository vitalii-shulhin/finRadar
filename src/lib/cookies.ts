// Client-side cookie utilities using native browser APIs

export const cookies = {
  get: (name: string): string | null => {
    if (typeof window === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }

    return null;
  },

  set: (name: string, value: string, days: number = 365): void => {
    if (typeof window === 'undefined') return;

    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${name}=${value};${expires};path=/`;
  },

  remove: (name: string): void => {
    if (typeof window === 'undefined') return;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
};
