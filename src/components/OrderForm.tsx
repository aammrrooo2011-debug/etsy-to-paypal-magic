import { useState } from "react";
import { ShoppingBag, ExternalLink, CreditCard, Shield, Truck, Star, CheckCircle, Loader2 } from "lucide-react";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";

import { useCurrency } from "@/context/CurrencyContext";

const OrderForm = () => {
  const { currency, formatPrice } = useCurrency();
  const [personalization, setPersonalization] = useState("");
  const { startCheckout, loading } = useStripeCheckout();

  // Calculate dynamic prices
  const rates: Record<string, number> = { GBP: 1, USD: 1.25, EUR: 1.15 };
  const currentRate = rates[currency] || 1;
  const boxQuranPrice = Math.round(108 * currentRate);
  const completeSetPrice = Math.round(126 * currentRate);

  const handleStripeBoxQuran = () => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Box & Quran',
        value: boxQuranPrice,
        currency: currency
      });
    }

    startCheckout({ 
      variationId: "box-quran", 
      variationName: "Box & Quran", 
      amount: boxQuranPrice,
      currency: currency,
      personalization 
    });
  };

  const handleStripeCompleteSet = () => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Complete Gift Set',
        value: completeSetPrice,
        currency: currency
      });
    }

    startCheckout({ 
      variationId: "all-set", 
      variationName: "Complete Gift Set", 
      amount: completeSetPrice,
      currency: currency,
      personalization 
    });
  };

  return (
    <section id="order" className="py-20 bg-gradient-to-b from-cream to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-soft-fade-in">
            Order Your <span className="text-primary">Gift Set</span>
          </h2>
          <p className="text-muted-foreground mb-2">
            Choose your preferred option below.

          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Scroll back up to select your variation and personalisation, then come back here to pay.
          </p>

          <div className="space-y-4 bg-card border border-border rounded-2xl p-8 shadow-soft animate-soft-fade-in">

            {/* Option 1: Stripe - Primary */}
            <div className="space-y-3 p-5 rounded-xl bg-gradient-to-br from-[#635BFF]/5 to-[#4B44E8]/5 border-2 border-[#635BFF]/20">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-foreground">Pay by Card (Stripe)</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-full">
                  BEST PRICE — 10% OFF
                </span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Accepts Visa, Mastercard, Amex, Apple Pay, Google Pay</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Shipping address collected at checkout</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> 256-bit SSL encrypted — fully secure</li>
              </ul>

              <div className="space-y-2 py-2">
                <label htmlFor="order-personalization" className="text-xs font-bold text-foreground">
                  ADD PERSONALISATION (FREE)
                </label>
                <input
                  id="order-personalization"
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  placeholder="e.g. Bismillah, Name, Date..."
                  className="w-full px-4 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>

              <button
                id="order-stripe-box-quran-btn"
                onClick={handleStripeBoxQuran}
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#635BFF] to-[#4B44E8] rounded-xl shadow-lifted hover:scale-[1.02] transition-all gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                Box & Quran — {formatPrice(boxQuranPrice)}
              </button>

              <button
                id="order-stripe-complete-set-btn"
                onClick={handleStripeCompleteSet}
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#635BFF] to-[#4B44E8] rounded-xl shadow-lifted hover:scale-[1.02] transition-all gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                Complete Gift Set — {formatPrice(completeSetPrice)}
              </button>
            </div>


            {/* Trust Badges */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
                <Shield className="w-5 h-5 text-gold" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
                <Truck className="w-5 h-5 text-gold" />
                <span>Free Express Shipping — 3–5 Day UK Delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-foreground font-medium">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span>5.0 from 34 Verified Buyer Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
