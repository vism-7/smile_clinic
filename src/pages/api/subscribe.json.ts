import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const email = data.email;

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    // Send the email via Resend's API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'SmileClinic <welcome@yourdomain.com>', // Replace with your verified domain
        to: [email],
        subject: 'Welcome to SmileClinic Dental Studio! ✨',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #334155;">
            <h1 style="color: #0d9488;">Your Smile Journey Starts Here!</h1>
            <p>Thank you for connecting with SmileClinic Dental Studio.</p>
            <p>We've received your information request. Here are a few quick tips to prepare for a bright smile:</p>
            <ul>
              <li>Brush twice a day for a full 2 minutes.</li>
              <li>Don't forget to floss before bed!</li>
              <li>Schedule a professional cleaning every 6 months.</li>
            </ul>
            <p>If you need to lock in an immediate appointment, feel free to reach out to us directly on WhatsApp or reply to this email.</p>
            <br />
            <p style="font-size: 12px; color: #94a3b8;">SmileClinic Dental Studio • Portage Park, Chicago</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return new Response(JSON.stringify({ message: errorData.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Success! Info email sent.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
};