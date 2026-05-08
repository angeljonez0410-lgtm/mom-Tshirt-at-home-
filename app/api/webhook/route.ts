import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { sendEbookDeliveryEmail } from "@/lib/email";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, skipped: true });
  }

  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  const body = await req.text();

  try {
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_details?.email;
      const name = session.customer_details?.name;
      const downloadUrl =
        process.env.EBOOK_PDF_URL ||
        process.env.NEXT_PUBLIC_EBOOK_PDF_URL ||
        "http://localhost:3000/success?download=missing";

      if (email) {
        await sendEbookDeliveryEmail({
          to: email,
          customerName: name,
          downloadUrl,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 400 });
  }
}
