CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'trial',
  plan TEXT NOT NULL DEFAULT 'trial',
  trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT now() + interval '14 days',
  subscription_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE organizations ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'trial';
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'trial';
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ NOT NULL DEFAULT now() + interval '14 days';
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'owner',
  email_verified BOOLEAN NOT NULL DEFAULT false,
  reset_token_hash TEXT,
  reset_token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS app_records (
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  collection_key TEXT NOT NULL,
  record_id TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, collection_key, record_id)
);

CREATE TABLE IF NOT EXISTS app_singletons (
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  singleton_key TEXT NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (organization_id, singleton_key)
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_invoice_number_per_company
  ON app_records (organization_id, collection_key, (data->>'number'))
  WHERE collection_key = 'invoices' AND data ? 'number';

CREATE UNIQUE INDEX IF NOT EXISTS uniq_quotation_number_per_company
  ON app_records (organization_id, collection_key, (data->>'number'))
  WHERE collection_key = 'quotations' AND data ? 'number';

CREATE INDEX IF NOT EXISTS idx_records_collection_updated
  ON app_records (organization_id, collection_key, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_records_date
  ON app_records (organization_id, collection_key, (data->>'date'));

CREATE INDEX IF NOT EXISTS idx_records_status
  ON app_records (organization_id, collection_key, (data->>'status'));

CREATE INDEX IF NOT EXISTS idx_records_client
  ON app_records (organization_id, collection_key, (data->>'clientId'));

CREATE INDEX IF NOT EXISTS idx_records_jsonb
  ON app_records USING GIN (data);

CREATE INDEX IF NOT EXISTS idx_organizations_status
  ON organizations (status);

CREATE INDEX IF NOT EXISTS idx_organizations_plan
  ON organizations (plan);
