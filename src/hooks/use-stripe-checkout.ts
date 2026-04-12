import { useState } from "react";
import { STRIPE_PAYMENT_LINKS, VariationId } from "@/lib/stripe-links";

interface CheckoutOptions {
  variationId: VariationId;
  variationName: string;
  amountGBP: number;
  personalization?: string;
}

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const startCheckout = (opts: CheckoutOptions) => {
    setLoading(true);

    const paymentUrl = STRIPE_PAYMENT_LINKS[opts.variationId];
    if (!paymentUrl) {
      setLoading(false);
      return;
    }

    // Redirect to Stripe Payment Link — personalisation is collected on the Stripe page
    window.location.href = paymentUrl;
  };

  return { startCheckout, loading, error };
}
