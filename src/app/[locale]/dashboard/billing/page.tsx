import { AlertTriangleIcon } from "lucide-react";
import { getUserSubscriptionPlan } from "@/actions/subscription";
import { BillingForm } from "@/components/billing-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getCurrentSession } from "@/lib/server/session";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { House, MessageSquareShare, CircleUserRound } from "lucide-react";
import stripe from "@/lib/server/stripe";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Billing() {
  const { user } = await getCurrentSession();

  const subscriptionPlan = await getUserSubscriptionPlan(user?.id as string);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  const navItems = [
    {
      name: "Projetos",
      link: "/dashboard/projects",
      icon: <House className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Pagamento",
      link: "/dashboard/billing",
      icon: (
        <CircleUserRound className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Configuração",
      link: "/dashboard/settings",
      icon: (
        <MessageSquareShare className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center space-y-8">
      {/* <Alert>
        <div className="flex items-center gap-2">
          <AlertTriangleIcon className="h-5 w-5 shrink-0" />
          <h1>A</h1>
        </div>
      </Alert> */}
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
      <div className="w-full max-w-4xl">
        <FloatingNav navItems={navItems} />
      </div>
    </div>
  );
}
