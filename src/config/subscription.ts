import { type SubscriptionPlan } from "@/types";

if (!process.env.STRIPE_PRO_PLAN_ID) {
  throw new Error("Stripe PRO Plan ID is missing in environment variables");
}

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "Você pode criar até 1 projeto. Atualize para o plano PRO para criar até 10 projetos",
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "Agora você tem projetos ilimitados!",
  stripePriceId: process.env.STRIPE_PRO_PLAN_ID,
};
