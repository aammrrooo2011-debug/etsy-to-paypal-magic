const PAGE_ID = "1111982905328296";
const IG_ID = "17841406333222297";
const SITE = "https://quranset.co.uk";
const SUPABASE_URL = "https://rylocypafnadybtnsjho.supabase.co";

// ── SALES AI BRAIN — Natural & Personal ──
function buildReply(text, name) {
  const t = text.toLowerCase().trim();
  const hi = name ? `Hi ${name}! ` : "";
  const dear = name ? ` ${name}` : "";

  // ── GREETINGS ──
  if (/^(hi|hello|hey|salam|assalam|marhaba|hola|yo|good\s?(morning|evening|afternoon))/.test(t)) {
    return `Wa Alaikum Assalam${dear}! 🌙✨

So lovely to hear from you! I'm here to help you find the perfect Islamic gift.

What's the occasion?
🎁 A special gift for someone?
💍 Wedding or Engagement?
🕌 Ramadan / Eid celebration?
📦 Bulk orders for an event?

Just let me know and I'll guide you to the best set!`;
  }

  // ── WEDDING / ENGAGEMENT / NIKKAH ──
  if (/wedding|nikkah|engage|bride|groom|nikah|marry|marriage/.test(t)) {
    return `${hi}MashaAllah, congratulations! 💍🤍

I'd love to help you pick something special. Our most loved wedding gifts are:

✨ Velvet Quran Set in a luxury wooden box — includes prayer mat, rosary & scarf. Gorgeous for the bride!
✨ Plexiglass Bag Set — a real showstopper presentation
✨ Acrylic Quran Box — modern & elegant

Every set can have the couple's names personalized on it! Prices start from £45 and shipping is free.

How many do you need? Just for the couple, or for guests too?`;
  }

  // ── EID / RAMADAN ──
  if (/eid|ramadan|ramazan|mubarak/.test(t)) {
    return `${hi}Eid/Ramadan Mubarak! 🌙🤲

Here are our top picks for the season:

🕌 Velvet Quran Set — full set with Quran, prayer mat, rosary & scarf
🎁 Mini Quran Favors (5 pack) — perfect for gatherings
🧕 Prayer Rug & Rosary Set — beautifully boxed

I can offer you 15% off with code QURAN15! And shipping is completely free to UK, US & Europe.

Want me to suggest something based on your budget?`;
  }

  // ── GIFT / BIRTHDAY / GRADUATION ──
  if (/gift|birthday|graduat|present|surprise|mother|father|mom|dad|parent/.test(t)) {
    return `${hi}That's such a thoughtful idea! 🎁

Our gift sets are designed to impress — they come beautifully packaged and ready to give.

For a personal touch, we engrave names in gold lettering. Our bestsellers for gifts:

✨ Velvet Quran Set — from £45
✨ Lace Prayer Mat Set — handmade embroidery, so elegant
✨ Prayer Dress Set — includes everything she needs

What's your budget? I'll match you with the perfect set!`;
  }

  // ── BULK / WHOLESALE / PARTY FAVORS ──
  if (/bulk|wholesale|favor|party|50|100|many|quantity|multiple/.test(t)) {
    return `${hi}We'd love to help with your bulk order! 📦

We can personalize each set with a different name — perfect for party favors or corporate gifts.

For 5+ items, use code QURAN25 for 25% off!

For orders over 50 pieces, we offer special wholesale pricing. Just tell me how many you need and I'll prepare a quote for you!`;
  }

  // ── PRICE / COST / HOW MUCH ──
  if (/price|cost|how much|expensive|cheap|budget|afford/.test(t)) {
    return `${hi}Great question! Here's a quick overview:

🔹 Mini Quran Favors: from £12 (pack of 5)
🔹 Prayer Rug & Rosary: from £30
🔹 Velvet Quran Gift Set: £45–£75
🔹 Luxury Wooden Box Sets: £75–£110
🔹 Premium Handmade: £95–£130

All prices include free shipping! And you can use QURAN15 for 15% off 😊

What budget works best for you? I'll find something perfect.`;
  }

  // ── SHIPPING / DELIVERY ──
  if (/ship|deliver|track|arrive|when|how long|days/.test(t)) {
    return `${hi}Great news — shipping is completely FREE on every order! 🚚

📍 UK: 3–5 business days
📍 USA: 4–6 business days
📍 Europe: 4–6 business days

Everything comes with tracking so you can follow your parcel. We ship from Turkey directly to your door!

Would you like to go ahead and place an order? 😊`;
  }

  // ── PERSONALIZATION ──
  if (/personal|custom|name|engrav|write|text|monogram/.test(t)) {
    return `${hi}Yes, we personalize everything by hand! ✍️

You can add:
• Names in Arabic or English
• Short messages or dates
• Gold or silver lettering

It's completely free — just enter the text at checkout. Please double-check the spelling since personalized items are made just for you!

Want to see how it looks? Check out the photos on ${SITE}/shop 😊`;
  }

  // ── DISCOUNT / PROMO ──
  if (/discount|code|coupon|promo|offer|sale|deal/.test(t)) {
    return `${hi}I have something special for you! 🎉

🏷️ QURAN15 → 15% off any order
🏷️ QURAN20 → 20% off orders over £60
🏷️ QURAN25 → 25% off when you buy 5+

Just enter the code at checkout. Happy shopping! 🛍️
${SITE}/shop`;
  }

  // ── ORDER / BUY / CHECKOUT ──
  if (/order|buy|checkout|purchase|pay|cart|website/.test(t)) {
    return `${hi}Ordering is super easy! Here's how:

1. Browse our shop: ${SITE}/shop
2. Pick your favourite set
3. Add personalization (names, messages)
4. Use code QURAN15 for 15% off!
5. Pay securely with card, Apple Pay, or Google Pay 💳

Shipping is free and you'll get a tracking number. Let me know if you need help choosing!`;
  }

  // ── TRUST / REVIEWS / QUALITY ──
  if (/review|quality|trust|legit|real|safe|scam/.test(t)) {
    return `${hi}I completely understand wanting to be sure! Here's why our customers trust us:

⭐ Over 5,000 happy customers worldwide
🇹🇷 Handcrafted with premium materials in Turkey
🔒 Secure checkout via Stripe
📦 Free tracked shipping on every order
💬 Excellent reviews on Etsy & Google

We've been doing this since 2020 and ship to 40+ countries. You're in safe hands! 😊`;
  }

  // ── CONTACT / HELP ──
  if (/contact|email|phone|whatsapp|help|support|speak|human|agent/.test(t)) {
    return `${hi}Of course! You can reach us:

📧 aammrrooo2011@hotmail.com
💬 Or just reply here — I'm happy to help!

Our team usually gets back to you within a few hours. What do you need help with?`;
  }

  // ── THANK YOU ──
  if (/thank|thanks|shukran|jazak/.test(t)) {
    return `JazakAllah Khair${dear}! 🤲🌙

It was lovely chatting with you! Don't forget — QURAN15 gets you 15% off anytime 😊

${SITE}/shop`;
  }

  // ── YES / INTERESTED ──
  if (/^(yes|yeah|yep|ok|sure|interested|tell me more|go ahead)/.test(t)) {
    return `Lovely${dear}! 🎉

Just tell me:
1. What's the occasion?
2. How many sets?
3. Your budget range?

I'll pick the best option for you! 💎`;
  }

  // ── NO / NOT NOW ──
  if (/^(no|nah|not now|later|maybe)/.test(t)) {
    return `No worries${dear}! Take your time 😊

When you're ready, just message us here or visit ${SITE}/shop

We'll be here whenever you need us! 🌙`;
  }

  // ── DEFAULT: Warm & Natural ──
  return `${hi}Thanks for reaching out! 🌙✨

We make luxury, handmade Islamic gift sets — perfect for weddings, Eid, birthdays, and more.

Every set can be personalized with names, and we ship free to UK, US & Europe!

What are you looking for? Just tell me and I'll help you find something beautiful 😊

${SITE}/shop`;
}

// ── DATABASE DEDUP ──
async function isDuplicate(mid) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/bot_processed_messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({ mid })
    });
    // Only block if we get a 409 Conflict (meaning it already exists)
    if (res.status === 409) return true;
    return false;
  } catch {
    return false;
  }
}

// ── GET CUSTOMER NAME ──
async function getCustomerName(userId) {
  const token = Deno.env.get("META_PAGE_ACCESS_TOKEN");
  if (!token) return "";
  try {
    const res = await fetch(`https://graph.facebook.com/v17.0/${userId}?fields=name&access_token=${token}`);
    const data = await res.json();
    return data.name ? data.name.split(" ")[0] : "";
  } catch {
    return "";
  }
}

// ── SEND REPLY ──
async function reply(recipientId, text) {
  const token = Deno.env.get("META_PAGE_ACCESS_TOKEN");
  if (!token) return;
  try {
    const res = await fetch(`https://graph.facebook.com/v17.0/me/messages?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text }
      })
    });
    const data = await res.json();
    if (data.error) console.error("META_ERR:", JSON.stringify(data.error));
  } catch (e) {
    console.error("NET_ERR:", e.message);
  }
}

// ── MAIN HANDLER ──
Deno.serve(async (req) => {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    const verifyToken = Deno.env.get("META_VERIFY_TOKEN") || "quranset_bot_secret";
    if (mode === "subscribe" && token === verifyToken) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const body = await req.json();

    if (body.object === "page" || body.object === "instagram") {
      for (const entry of body.entry) {
        const messaging = entry.messaging;
        if (!messaging) continue;

        for (const event of messaging) {
          if (event.message?.is_echo) continue;
          const sid = event.sender?.id;
          if (!sid) continue;
          if (sid === PAGE_ID || sid === IG_ID) continue;

          const text = event.message?.text;
          if (!text) continue;

          // DATABASE DEDUP: Use official message ID
          const mid = event.message?.mid;
          if (!mid) continue; // If there is no mid, we can't reliably dedup
          
          if (await isDuplicate(mid)) continue;

          const name = await getCustomerName(sid);
          const aiReply = buildReply(text, name);
          await reply(sid, aiReply);
        }
      }
    }

    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (e) {
    console.error("ERR", e.message);
    return new Response("error", { status: 400 });
  }
});
