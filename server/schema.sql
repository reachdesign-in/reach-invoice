CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'owner',
  reset_token_hash TEXT,
  reset_token_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
