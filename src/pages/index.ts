import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const OWNER_EMAIL = "mhizruthygold@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { name, email, phone, service, date, time } = await req.json();

    // Email to client
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: "Booking Confirmed – Ruty's Makeovers",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fff;">
            <h1 style="color: #c8184a; font-size: 28px; margin-bottom: 8px;">Ruty's Makeovers</h1>
            <p style="color: #888; font-size: 13px; margin-bottom: 20px;">Where Beauty Comes Alive</p>
            <h2 style="font-size: 20px; color: #1a0a0f;">Your Booking is Confirmed!</h2>
            <p style="color: #555; line-height: 1.8;">Hi <strong>${name}</strong>, thank you for booking with Ruty's Makeovers. We can't wait to make you look and feel amazing!</p>
            <div style="background: #fdf6f0; border-left: 4px solid #c8184a; padding: 20px; margin: 24px 0; border-radius: 4px;">
              <p style="margin: 0 0 8px;"><strong>Service:</strong> ${service}</p>
              <p style="margin: 0 0 8px;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 0 0 8px;"><strong>Time:</strong> ${time}</p>
              <p style="margin: 0;"><strong>Phone:</strong> ${phone}</p>
            </div>
            <p style="color: #555; line-height: 1.8;">If you need to cancel or reschedule, please let us know at least <strong>24 hours</strong> before your appointment.</p>
            <p style="color: #555; line-height: 1.8;">You can reach us on WhatsApp: <a href="https://wa.me/2347064828365" style="color: #c8184a;">+234 706 482 8365</a></p>
            <hr style="border: none; border-top: 1px solid #f2c0d5; margin: 20px 0;">
            <p style="color: #aaa; font-size: 12px;">Elikpokwodu Road, Opposite OPM FREE SCHOOL, Port Harcourt</p>
          </div>
        `,
      }),
    });

    // Email to owner
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `New Booking – ${name} – ${service}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fff;">
            <h1 style="color: #c8184a; font-size: 24px;">New Booking Received!</h1>
            <div style="background: #fdf6f0; border-left: 4px solid #c8184a; padding: 20px; margin: 24px 0; border-radius: 4px;">
              <p style="margin: 0 0 8px;"><strong>Client Name:</strong> ${name}</p>
              <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 8px;"><strong>Phone / WhatsApp:</strong> ${phone}</p>
              <p style="margin: 0 0 8px;"><strong>Service:</strong> ${service}</p>
              <p style="margin: 0 0 8px;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 0;"><strong>Time:</strong> ${time}</p>
            </div>
            <p style="color: #555;">Log in to your dashboard to manage this booking.</p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
