-- Run this in Supabase SQL Editor (Project → SQL Editor → New query)

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  ref_number text unique not null,
  service_slug text not null,
  service_name text not null,
  price integer not null,
  phone text not null,
  field_values jsonb,
  file_urls jsonb,
  txn_id text,
  status text not null default 'awaiting_payment',
  created_at timestamptz not null default now()
);

create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_at_idx on orders (created_at desc);

-- Row Level Security: the browser (anon key) should NEVER read/write orders
-- directly. All order reads/writes go through the Next.js API routes using
-- the service role key, which bypasses RLS. So we enable RLS and add no
-- public policies — this locks the table to server-side access only.
alter table orders enable row level security;

-- ── Storage bucket for uploaded documents (NID copies, photos, etc.) ──
-- Do this in the Supabase Dashboard, not SQL:
-- 1. Go to Storage → Create a new bucket named "order-documents"
-- 2. Set it to "Public" (simplest for MVP — files are only discoverable
--    if someone has the exact URL, which is a random path + timestamp).
--    For stricter privacy later, make it private and generate signed URLs
--    from the server instead.
-- 3. No public INSERT policy needed for reads; for uploads from the browser
--    (used by the order form), add a Storage policy allowing INSERT for
--    the "anon" role scoped to the "order-documents" bucket only:
--
--    Policy name: allow anon uploads to order-documents
--    Allowed operation: INSERT
--    Target roles: anon
--    USING expression: bucket_id = 'order-documents'
