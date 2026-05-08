import { NextResponse } from "next/server";
import { DOMAIN_URL, PRODUCT_NAME } from "@/lib/constants";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

type Payload = {
  source?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as Payload;

  // Graceful local fallback so demo mode still works without Stripe secrets.
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ url: `${DOMAIN_URL}/success?demo=1` });
  }

  try {
    const stripe = getStripeClient();

    // Edit product name, amount, and metadata here when pricing changes.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: 3700,
            product_data: {
              name: PRODUCT_NAME,
              description:
                "Mom Hustle Tees: The Stay-at-Home Mom's Guide to Starting a T-Shirt Business From Home",
            },
          },
        },
      ],
      customer_creation: "always",
      metadata: {
        source: payload.source || "unknown",
      },
      success_url: `${DOMAIN_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 },
    );
  }
}
