import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

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
