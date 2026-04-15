import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CheckoutOptions {
  variationId: string;
  variationName: string;
  amountGBP: number;
  personalization?: string;
}

export function useStripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async (opts: CheckoutOptions) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Starting seamless checkout process...", opts);

      // Extract Meta cookies if present
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };

      const fbp = getCookie("_fbp");
      const fbc = getCookie("_fbc");

      const { data, error: funcError } = await supabase.functions.invoke("create-stripe-session", {
        body: {
          ...opts,
          fbp,
          fbc,
          eventSourceUrl: window.location.href,
        },
      });

      if (funcError) throw funcError;
      if (!data?.url) throw new Error("No checkout URL returned from server.");

      // Redirect to the dynamic Stripe Checkout page
      window.location.href = data.url;
    } catch (err: any) {
      console.error("Stripe Checkout Error:", err);
      setError(err.message || "Could not connect to Stripe. Please try again.");
      setLoading(false);
    }
  };

  return { startCheckout, loading, error };
}
