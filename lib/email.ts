import { Resend } from "resend";

export async function sendEbookDeliveryEmail(params: {
  to: string;
  customerName?: string | null;
  downloadUrl: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const customerName = params.customerName || "there";

  await resend.emails.send({
    from: "Mom Hustle Tees <onboarding@resend.dev>",
    to: [params.to],
    subject: "Your Mom Hustle Tees Ebook is Ready! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <p>Hi ${customerName},</p>
        <p>Welcome to the Mom Hustle family! 💕</p>
        <p>Your ebook <strong>Mom Hustle Tees: The Stay-at-Home Mom's Guide to Starting a T-Shirt Business From Home</strong> is ready to download.</p>
        <p>
          <a href="${params.downloadUrl}" style="display:inline-block;padding:12px 20px;background:#f59e0b;color:#111;text-decoration:none;border-radius:8px;font-weight:bold;">
            Download Your Ebook
          </a>
        </p>
        <p><strong>What's Next?</strong></p>
        <ol>
          <li>Download your ebook</li>
          <li>Read through the materials guide (Section 3)</li>
          <li>Join our community on TikTok: @momhustletees</li>
          <li>Start creating!</li>
        </ol>
        <p>Questions? Reply to this email anytime.</p>
        <p>Let's build your empire from home! 🚀</p>
        <p>xo,<br/>Angel Jones<br/>Mom Hustle Tees</p>
        <p><em>P.S. Tag us in your first shirt creation. We love seeing moms WIN.</em></p>
      </div>
    `,
  });
}
