CREATE TABLE IF NOT EXISTS developer_accounts (
  user_id text PRIMARY KEY,
  email text NOT NULL,
  name text NOT NULL,
  email_verified boolean NOT NULL DEFAULT false,
  tenant_id text NOT NULL UNIQUE,
  customer_id text NOT NULL UNIQUE,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  subscription_status text NOT NULL DEFAULT 'inactive',
  subscription_expires_at timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  billing_mode text NOT NULL DEFAULT 'test',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS developer_api_keys (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES developer_accounts(user_id),
  name text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  key_prefix text NOT NULL,
  scopes text[] NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz,
  last_used_at timestamptz
);
CREATE INDEX IF NOT EXISTS developer_keys_user_idx ON developer_api_keys(user_id);
CREATE TABLE IF NOT EXISTS developer_api_usage (
  key_id text NOT NULL REFERENCES developer_api_keys(id),
  window_start timestamptz NOT NULL,
  requests integer NOT NULL DEFAULT 1,
  PRIMARY KEY (key_id, window_start)
);
CREATE TABLE IF NOT EXISTS developer_billing_events (
  event_id text PRIMARY KEY,
  event_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS developer_checkout_attempts (
  user_id text PRIMARY KEY REFERENCES developer_accounts(user_id),
  attempt_id text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now()
);
