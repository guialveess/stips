import { type SubscriptionPlan } from "@/types";

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "Você pode criar até 3 projetos. Atualize para o plano PRO para projetos ilimitados.",
  stripePriceId: "",
};

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "Agora você tem projetos ilimitados!",
  stripePriceId: process.env.STRIPE_PRO_PLAN_ID as string,
};
