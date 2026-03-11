import 'server-only'

import Stripe from 'stripe'

import {
  BILLING_CURRENCY,
  BILLING_PRODUCT_DESCRIPTION,
  BILLING_PRODUCT_NAME,
  BILLING_STATEMENT_DESCRIPTOR_SUFFIX,
  getBillingAmountCents,
  getBillingPriceLookupKey,
} from '@/lib/billing/constants'
import { ENV } from '@/lib/constants'

let cachedStripeClient: Stripe | null | undefined
const cachedBillingPrices = new Map<string, Stripe.Price | null>()

function getStripeSecretKey(): string | null {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim()
  return secretKey ? secretKey : null
}

export function getStripeWebhookSecret(): string | null {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  return webhookSecret ? webhookSecret : null
}

export function getStripeClient(): Stripe | null {
  if (cachedStripeClient !== undefined) {
    return cachedStripeClient
  }

  const secretKey = getStripeSecretKey()
  if (!secretKey) {
    cachedStripeClient = null
    return cachedStripeClient
  }

  cachedStripeClient = new Stripe(secretKey)
  return cachedStripeClient
}

async function getConfiguredBillingPrice(now: Date = new Date()): Promise<Stripe.Price | null> {
  const stripe = getStripeClient()

  if (!stripe) {
    return null
  }

  const lookupKey = getBillingPriceLookupKey(now)
  const cachedBillingPrice = cachedBillingPrices.get(lookupKey)

  if (cachedBillingPrice !== undefined) {
    return cachedBillingPrice
  }

  const prices = await stripe.prices.list({
    active: true,
    lookup_keys: [lookupKey],
    limit: 1,
  })

  const resolvedBillingPrice = prices.data[0] ?? null
  cachedBillingPrices.set(lookupKey, resolvedBillingPrice)
  return resolvedBillingPrice
}

export async function createBillingCheckoutSession(input: {
  adminEmail: string
  weddingSource: 'modern' | 'legacy'
  weddingSourceId: string
}): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient()

  if (!stripe) {
    throw new Error('Stripe ist aktuell nicht konfiguriert.')
  }

  const now = new Date()
  const configuredBillingPrice = await getConfiguredBillingPrice(now)
  const billingLineItem: Stripe.Checkout.SessionCreateParams.LineItem = configuredBillingPrice
    ? {
        quantity: 1,
        price: configuredBillingPrice.id,
      }
    : {
        quantity: 1,
        price_data: {
          currency: BILLING_CURRENCY,
          unit_amount: getBillingAmountCents(now),
          product_data: {
            name: BILLING_PRODUCT_NAME,
            description: BILLING_PRODUCT_DESCRIPTION,
          },
        },
      }

  return stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'de',
    billing_address_collection: 'required',
    customer_email: input.adminEmail,
    success_url: `${ENV.appUrl}/admin/kauf?billing=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ENV.appUrl}/admin/kauf?billing=cancelled`,
    metadata: {
      adminEmail: input.adminEmail,
      billingType: 'couple_access',
      weddingSource: input.weddingSource,
      weddingSourceId: input.weddingSourceId,
    },
    payment_intent_data: {
      metadata: {
        adminEmail: input.adminEmail,
        billingType: 'couple_access',
        weddingSource: input.weddingSource,
        weddingSourceId: input.weddingSourceId,
      },
      statement_descriptor_suffix: BILLING_STATEMENT_DESCRIPTOR_SUFFIX,
    },
    line_items: [billingLineItem],
  })
}

export async function retrieveBillingCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeClient()

  if (!stripe) {
    throw new Error('Stripe ist aktuell nicht konfiguriert.')
  }

  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent'],
  })
}
