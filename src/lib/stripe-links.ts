// Stripe Payment Links — live, created via API
// Box & Quran: £108 | Complete Gift Set: £126
// Both collect: UK shipping address, phone number, personalisation text

export const STRIPE_PAYMENT_LINKS = {
  "box-quran": "https://buy.stripe.com/3cI9AUclMcKZb5pfNh6Na00",   // £108
  "all-set":   "https://buy.stripe.com/6oU00k0D48uJa1lbx16Na01",   // £126
} as const;

export type VariationId = keyof typeof STRIPE_PAYMENT_LINKS;
