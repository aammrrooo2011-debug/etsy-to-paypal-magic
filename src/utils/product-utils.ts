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

const EXCHANGE_RATE_TRY_TO_GBP = 44.58;
const DISCOUNT_RATE = 0.90; // 10% off

export const getProducts = (): Product[] => {
  return (productsData as any[]).map(p => {
    let priceGBP = p.price;
    if (p.currency === 'TRY') {
      // Convert TRY to Etsy's GBP equivalent, then apply 10% discount
      const etsyGBP = p.price / EXCHANGE_RATE_TRY_TO_GBP;
      priceGBP = Math.round(etsyGBP * DISCOUNT_RATE);
    }
    
    return {
      ...p,
      originalPrice: Math.round(p.price / EXCHANGE_RATE_TRY_TO_GBP),
      price: priceGBP,
      currency: 'GBP'
    };
  });
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(p => p.id === id);
};

export const getFeaturedProducts = (limit = 4): Product[] => {
  return getProducts().slice(0, limit);
};
