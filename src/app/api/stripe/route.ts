import { type NextRequest } from "next/server";
import { z } from "zod";
import { getUserSubscriptionPlan } from "@/actions/subscription";
import { siteConfig } from "@/config/site";
import { proPlan } from "@/config/subscription";
import { getCurrentSession } from "@/lib/server/session";
import stripe from "@/lib/server/stripe";


export async function GET(req: NextRequest) {
  const locale = req.cookies.get("Next-Locale")?.value || "en";

  const billingUrl = siteConfig(locale).url + "/dashboard/billing/";
  try {
    const { user, session } = await getCurrentSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    // Certifique-se de que os valores necessários estão disponíveis
    if (!proPlan.stripePriceId) {
      throw new Error("Stripe price ID is missing");
    }

    if (!user.email) {
      throw new Error("User email is missing");
    }

    // O usuário está no plano Pro. Crie uma sessão no portal de faturamento.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      return Response.json({ url: stripeSession.url });
    }

    // O usuário está no plano gratuito. Crie uma sessão de checkout para upgrade.
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price: proPlan.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: String(user.id), // Converta para string
      },
    });

    return new Response(JSON.stringify({ url: stripeSession.url }), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    console.error("Stripe API Error:", error); // Log para depuração
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: errorMessage }),
      { status: 500 }
    );
  }
}
