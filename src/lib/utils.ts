// Helper function to create URL-safe slug from text
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\wа-яії\s-]/g, '') // Keep letters (Latin + Cyrillic), numbers, spaces, and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .substring(0, 100); // Limit length
}

// Helper function to format currency
export function formatCurrency(value: number, currency: string = 'UAH'): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Helper function to format percentage
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
