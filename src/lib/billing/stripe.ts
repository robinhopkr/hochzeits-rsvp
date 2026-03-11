import 'server-only'

import Stripe from 'stripe'

import {
  BILLING_CURRENCY,
  BILLING_PRICE_LOOKUP_KEY,
  BILLING_PRODUCT_DESCRIPTION,
  BILLING_PRODUCT_NAME,
  BILLING_STATEMENT_DESCRIPTOR_SUFFIX,
  getBillingAmountCents,
} from '@/lib/billing/constants'
import { ENV } from '@/lib/constants'

let cachedStripeClient: Stripe | null | undefined
let cachedBillingPrice: Stripe.Price | null | undefined

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

async function getConfiguredBillingPrice(): Promise<Stripe.Price | null> {
  if (cachedBillingPrice !== undefined) {
    return cachedBillingPrice
  }

  const stripe = getStripeClient()

  if (!stripe) {
    cachedBillingPrice = null
    return cachedBillingPrice
  }

  const prices = await stripe.prices.list({
    active: true,
    lookup_keys: [BILLING_PRICE_LOOKUP_KEY],
    limit: 1,
  })

  cachedBillingPrice = prices.data[0] ?? null
  return cachedBillingPrice
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

  const configuredBillingPrice = await getConfiguredBillingPrice()
  const billingLineItem: Stripe.Checkout.SessionCreateParams.LineItem = configuredBillingPrice
    ? {
        quantity: 1,
        price: configuredBillingPrice.id,
      }
    : {
        quantity: 1,
        price_data: {
          currency: BILLING_CURRENCY,
          unit_amount: getBillingAmountCents(),
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
