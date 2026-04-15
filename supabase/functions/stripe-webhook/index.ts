import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { sendMetaCapiEvent, sha256 } from "../_shared/meta-capi.ts";

// Webhook: no CORS needed — called by Stripe directly
serve(async (req) => {
  const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
  const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
      httpClient: Stripe.createFetchHttpClient(),
    });

    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Payment completed for session:", session.id);

    const shipping = session.shipping_details?.address;
    const customerName = session.shipping_details?.name || "Customer";

    const { error } = await supabase
      .from("orders")
      .update({
        customer_name: customerName,
        customer_email: session.customer_details?.email || session.customer_email,
        customer_phone: session.customer_details?.phone || null,
        shipping_address: shipping
          ? {
              line1: shipping.line1,
              line2: shipping.line2,
              city: shipping.city,
              postcode: shipping.postal_code,
              country: shipping.country,
            }
          : {},
        stripe_payment_status: "completed",
        status: "confirmed",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_session_id", session.id);

    if (session.customer_details?.email) {
      const email = session.customer_details.email.toLowerCase().trim();
      const hashedEmail = await sha256(email);
      
      // Get variation from metadata
      const variationName = session.metadata?.variation || "Quran Set";
      const amount = session.amount_total ? session.amount_total / 100 : 0;

      await sendMetaCapiEvent([
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: "https://quranset.co.uk",
          user_data: {
            em: [hashedEmail],
            fn: session.customer_details.name ? [await sha256(session.customer_details.name.split(" ")[0])] : undefined,
            ln: session.customer_details.name ? [await sha256(session.customer_details.name.split(" ").slice(1).join(" "))] : undefined,
            client_ip_address: session.customer_details.address?.country || undefined, // IP not available in webhook, use country as backup if needed or omit
          },
          custom_data: {
            value: amount,
            currency: session.currency?.toUpperCase() || "GBP",
            content_name: variationName,
            content_category: "Quran Set",
          },
        },
      ]);
    }

    if (error) {
      console.error("Failed to update order:", error);
      return new Response("DB update failed", { status: 500 });
    }

    console.log(`Order confirmed for session ${session.id}`);
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    await supabase
      .from("orders")
      .update({ stripe_payment_status: "expired", status: "cancelled" })
      .eq("stripe_session_id", session.id);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
