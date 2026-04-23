// src/lib/stripe.ts
import Stripe from "stripe"
import { Plan } from "@/types"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
})

export const STRIPE_PRICE_IDS: Partial<Record<Plan, string>> = {
  PRO: process.env.STRIPE_PRO_PRICE_ID!,
  BOSS: process.env.STRIPE_BOSS_PRICE_ID!,
}

export async function createCheckoutSession({
  userId,
  userEmail,
  plan,
  stripeCustomerId,
}: {
  userId: string
  userEmail: string
  plan: "PRO" | "BOSS"
  stripeCustomerId?: string | null
}) {
  const priceId = STRIPE_PRICE_IDS[plan]
  if (!priceId) throw new Error("Invalid plan")

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId ?? undefined,
    customer_email: stripeCustomerId ? undefined : userEmail,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: { userId, plan },
    subscription_data: {
      metadata: { userId, plan },
    },
  })

  return session
}

export async function createBillingPortalSession(stripeCustomerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })
  return session
}

export function getPlanFromPriceId(priceId: string): Plan {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "PRO"
  if (priceId === process.env.STRIPE_BOSS_PRICE_ID) return "BOSS"
  return "FREE"
}
