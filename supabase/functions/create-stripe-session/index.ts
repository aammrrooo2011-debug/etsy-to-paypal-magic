const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is missing.");

    const body = await req.json();
    const { variationId, personalization, variationName, amountGBP } = body;

    console.log(`Creating session for ${variationName}. Personalization: ${personalization}`);

    const origin = req.headers.get("origin") || "https://quranset.co.uk";

    const stripeParams = new URLSearchParams();
    stripeParams.append("payment_method_types[0]", "card");
    // stripeParams.append("payment_method_types[1]", "paypal"); // Removed paypal temporarily to ensure best metadata support for now
    
    // Dynamic Product Name based on personalization
    const productName = personalization 
      ? `Personalized Quran Set — (${personalization})` 
      : `Personalized Quran Set — ${variationName}`;

    stripeParams.append("line_items[0][price_data][currency]", "gbp");
    stripeParams.append("line_items[0][price_data][unit_amount]", (amountGBP * 100).toString());
    stripeParams.append("line_items[0][price_data][product_data][name]", productName);
    stripeParams.append("line_items[0][price_data][product_data][description]", `Personalization text: ${personalization || "Standard Set"}`);
    stripeParams.append("line_items[0][quantity]", "1");
    
    stripeParams.append("mode", "payment");
    stripeParams.append("success_url", `${origin}/?payment=success`);
    stripeParams.append("cancel_url", `${origin}/?payment=cancelled`);
    
    stripeParams.append("shipping_address_collection[allowed_countries][0]", "GB");
    stripeParams.append("phone_number_collection[enabled]", "true");
    
    // Crucial for your Dashboard
    stripeParams.append("metadata[personalization]", personalization || "None");
    stripeParams.append("metadata[variation]", variationName);
    stripeParams.append("metadata[source]", "quranset_v3");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: stripeParams.toString(),
    });

    const session = await response.json();

    if (session.error) {
      console.error("Stripe Error:", session.error);
      throw new Error(session.error.message);
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Function Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
