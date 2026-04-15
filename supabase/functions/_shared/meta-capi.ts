export async function sha256(message: string) {
  const msgUint8 = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export interface MetaEvent {
  event_name: string;
  event_time: number;
  action_source: "website" | "app" | "physical_store" | "system_generated" | "other";
  event_id?: string;
  event_source_url?: string;
  user_data: {
    em?: string[]; // email (hashed)
    ph?: string[]; // phone (hashed)
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
    external_id?: string[];
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
  };
}

export async function sendMetaCapiEvent(events: MetaEvent[]) {
  const FB_PIXEL_ID = Deno.env.get("FB_PIXEL_ID");
  const FB_ACCESS_TOKEN = Deno.env.get("FB_ACCESS_TOKEN");

  if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
    console.warn("Meta Pixel ID or Access Token is missing. CAPI event not sent.");
    return null;
  }

  const url = `https://graph.facebook.com/v17.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: events }),
    });

    const result = await response.json();
    if (result.error) {
      console.error("Meta CAPI Error:", result.error);
    } else {
      console.log("Meta CAPI Success:", result);
    }
    return result;
  } catch (err) {
    console.error("Failed to send Meta CAPI event:", err);
    return null;
  }
}
