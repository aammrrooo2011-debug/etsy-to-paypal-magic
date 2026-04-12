import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      variationId,
      variationName,
      amount,         // price in GBP pence (e.g. 10800 for £108.00)
      customerEmail,
      personalization,
      successUrl,
      cancelUrl,
    } = await req.json();

    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key not configured");
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Personalized Quran Gift Set — ${variationName}`,
              description: personalization
                ? `Custom personalisation: "${personalization}"`
                : "Luxury handcrafted Islamic gift from Turkey",
              images: [
                "https://apuenngnlwshdhffbjng.supabase.co/storage/v1/object/public/product-images/product-1.jpg",
              ],
            },
            unit_amount: amount, // in pence
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: customerEmail || undefined,
      success_url: successUrl || `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.get("origin")}/?cancelled=true`,
      metadata: {
        variation_id: variationId,
        variation_name: variationName,
        personalization: personalization || "",
      },
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      phone_number_collection: {
        enabled: true,
      },
      locale: "en-GB",
    });

    // Save pending order to Supabase
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: dbOrder, error: dbError } = await supabase
      .from("orders")
      .insert({
        customer_name: "Pending",
        customer_email: customerEmail || "pending@checkout.stripe",
        shipping_address: {},
        personalization: personalization || null,
        price: amount / 100,
        stripe_session_id: session.id,
        stripe_payment_status: "pending",
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      // Non-fatal: log but still redirect to Stripe
      console.error("DB insert error:", dbError);
    } else {
      console.log("Order pre-saved:", dbOrder?.id);
    }

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
