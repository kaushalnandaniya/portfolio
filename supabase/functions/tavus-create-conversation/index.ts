import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("TAVUS_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "TAVUS_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        replica_id: "r9f0947d9a15",
        persona_id: "p9da9214ed61",
        conversation_name: "Chat with Hitakshi",
        properties: {
          max_call_duration: 600,
          enable_closed_captions: true,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Tavus API error:", data);
      return new Response(JSON.stringify({ error: data?.message || "Tavus API error", details: data }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        conversation_url: data.conversation_url,
        conversation_id: data.conversation_id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
