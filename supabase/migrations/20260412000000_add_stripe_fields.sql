-- Add Stripe fields to orders table
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_payment_status TEXT DEFAULT 'pending';

-- Index for fast webhook lookup
CREATE INDEX IF NOT EXISTS orders_stripe_session_id_idx ON public.orders (stripe_session_id);

-- Make shipping_address and customer_name nullable for Stripe pre-orders
-- (they're filled in by the webhook after the customer completes checkout)
ALTER TABLE public.orders
  ALTER COLUMN customer_name SET DEFAULT 'Pending',
  ALTER COLUMN shipping_address SET DEFAULT '{}';
