import { MICROCREDIT_PRODUCTS_BASE, type MicrocreditProduct } from './microcreditProducts';

export interface CashCreditProduct {
  id: number;
  slug: string;
  bank: string;
  logo: string;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  interestRate: string;
  interestRateValue: number;
  monthlyPaymentExample: number;
  rating: number;
  reviews: number;
  features: string[];
  requirements: string[];
  color: string;
  popular?: boolean;
  recommended?: boolean;
  website?: string;
  phone?: string;
}

// Use the same data as microcredit products
export const CASH_CREDIT_PRODUCTS_BASE = MICROCREDIT_PRODUCTS_BASE;

// Generate IDs and return full cash credit products (using microcredit structure)
export const CASH_CREDIT_PRODUCTS: MicrocreditProduct[] = CASH_CREDIT_PRODUCTS_BASE.map((product, index) => ({
  ...product,
  id: index + 1,
}));

// Helper function to get cash credit product by ID
export function getCashCreditProductById(id: number): MicrocreditProduct | undefined {
  return CASH_CREDIT_PRODUCTS.find(product => product.id === id);
}

// Helper function to get cash credit product by slug
export function getCashCreditProductBySlug(slug: string): MicrocreditProduct | undefined {
  return CASH_CREDIT_PRODUCTS.find(product => product.slug === slug);
}
