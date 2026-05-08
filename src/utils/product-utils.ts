import productsData from "../data/products.json";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  tags: string[];
  sku: string;
}

const EXCHANGE_RATES = {
  GBP: 44.58,
  USD: 32.25,
  EUR: 34.80
};

const DISCOUNT_RATE = 0.90; // 10% off

export const getProducts = (targetCurrency: 'GBP' | 'USD' | 'EUR' = 'GBP'): Product[] => {
  return (productsData as any[]).map(p => {
    const rate = EXCHANGE_RATES[targetCurrency];
    const basePrice = p.price; // in TRY
    
    // Convert TRY to target currency, then apply 10% discount
    const convertedPrice = Math.round((basePrice / rate) * DISCOUNT_RATE);
    const originalPrice = Math.round(basePrice / rate);
    
    return {
      ...p,
      originalPrice,
      price: convertedPrice,
      currency: targetCurrency
    };
  });
};

export const getProductById = (id: string, targetCurrency: 'GBP' | 'USD' | 'EUR' = 'GBP'): Product | undefined => {
  return getProducts(targetCurrency).find(p => p.id === id);
};

export const getFeaturedProducts = (limit = 4, targetCurrency: 'GBP' | 'USD' | 'EUR' = 'GBP'): Product[] => {
  return getProducts(targetCurrency).slice(0, limit);
};
