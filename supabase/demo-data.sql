-- Demo orders for the portfolio: about 150 realistic orders over the last
-- 12 months, so the Management Software dashboard has meaningful charts.
--
-- Before running: create a user demo-orders@example.com in
-- Authentication → Users (Auto Confirm User, not an admin). It owns all demo
-- orders; customer names and emails are stored on each order, so the
-- dashboard still shows ~30 different customers.
--
-- Run in the Supabase SQL Editor (it runs as the database owner, so RLS
-- does not apply). To remove the demo data, see the end of this file.
--
-- The same user is the login of the Management Software public demo. Its
-- password is public, so after creating it, mark it with the demo role (see
-- "Demo role" in schema.sql for what the role blocks):
--
--   update auth.users
--   set raw_app_meta_data = raw_app_meta_data || '{"role": "demo"}'
--   where email = 'demo-orders@example.com';

do $$
declare
  v_user_id uuid;
  v_first_names text[] := array[
    'Giulia', 'Marco', 'Francesca', 'Luca', 'Chiara', 'Alessandro', 'Sara',
    'Matteo', 'Martina', 'Davide', 'Elena', 'Simone', 'Valentina', 'Andrea',
    'Federica', 'Lorenzo'
  ];
  v_last_names text[] := array[
    'Romano', 'Bianchi', 'Ricci', 'Colombo', 'Marino', 'Greco', 'Bruno',
    'Gallo', 'Conti', 'De Luca', 'Mancini', 'Costa', 'Giordano', 'Rizzo',
    'Lombardi', 'Moretti'
  ];
  v_cities text[] := array[
    'Milano', 'Roma', 'Torino', 'Bologna', 'Firenze', 'Napoli', 'Palermo',
    'Verona', 'Bari', 'Genova'
  ];
  v_postal_codes text[] := array[
    '20121', '00185', '10121', '40121', '50122', '80121', '90133',
    '37121', '70121', '16121'
  ];
  v_streets text[] := array[
    'Via Roma', 'Via Garibaldi', 'Corso Italia', 'Via Mazzini', 'Via Dante',
    'Via Verdi', 'Viale Europa', 'Via Cavour'
  ];
  v_payment_methods text[] := array['card', 'card', 'paypal', 'cod'];
  v_customer_count constant integer := 30;
  v_month integer;
  v_orders_in_month integer;
  v_month_start timestamptz;
  v_created_at timestamptz;
  v_age_days numeric;
  v_customer integer;
  v_first text;
  v_last text;
  v_city integer;
  v_status public.order_status;
  v_roll numeric;
  v_items integer;
  v_order_id uuid;
  v_subtotal numeric(10,2);
  v_product_ids integer[];
  v_quantities integer[];
  i integer;
begin
  select id into v_user_id from auth.users where email = 'demo-orders@example.com';
  if v_user_id is null then
    raise exception 'Create the user demo-orders@example.com first';
  end if;

  -- Same random data on every run
  perform setseed(0.42);

  for v_month in reverse 11..0 loop
    v_month_start := date_trunc('month', now()) - make_interval(months => v_month);
    -- A slowly growing shop: about 6 orders a year ago, about 17 this month
    v_orders_in_month := 6 + (11 - v_month) + floor(random() * 4)::integer;

    for i in 1..v_orders_in_month loop
      v_created_at := least(
        v_month_start + random() * (v_month_start + interval '1 month' - v_month_start),
        now() - interval '1 hour'
      );
      v_age_days := extract(epoch from now() - v_created_at) / 86400;

      -- Squaring the random number favours the first customers,
      -- so some of them order many times (returning customers)
      v_customer := 1 + floor(power(random(), 2) * v_customer_count)::integer;
      v_first := v_first_names[1 + (v_customer * 7) % array_length(v_first_names, 1)];
      -- The extra term keeps customers 1-14 and 17-30 from sharing a name
      v_last := v_last_names[1 + (v_customer * 11 + (v_customer / 16) * 5) % array_length(v_last_names, 1)];
      v_city := 1 + (v_customer * 3) % array_length(v_cities, 1);

      -- Older orders are delivered, recent ones are still in progress
      v_roll := random();
      if v_age_days > 30 then
        v_status := case when v_roll < 0.93 then 'delivered' else 'cancelled' end;
      elsif v_age_days > 7 then
        v_status := case
          when v_roll < 0.55 then 'delivered'
          when v_roll < 0.92 then 'shipped'
          else 'cancelled'
        end;
      else
        v_status := case
          when v_roll < 0.6 then 'processing'
          when v_roll < 0.95 then 'shipped'
          else 'cancelled'
        end;
      end if;

      -- 1 to 3 different products, 1 to 3 units each
      v_items := 1 + floor(random() * 3)::integer;
      select array_agg(id) into v_product_ids
      from (select id from public.products order by random() limit v_items) as picked;
      select array_agg(1 + floor(power(random(), 2) * 3)::integer)
      into v_quantities
      from generate_series(1, array_length(v_product_ids, 1));

      select sum(product.price * item.quantity)
      into v_subtotal
      from unnest(v_product_ids, v_quantities) as item(product_id, quantity)
      join public.products as product on product.id = item.product_id;

      insert into public.orders (
        user_id, created_at, full_name, email, phone, address, city,
        postal_code, status, total_amount, payment_method
      )
      values (
        v_user_id,
        v_created_at,
        v_first || ' ' || v_last,
        lower(replace(v_first || '.' || v_last, ' ', '')) || '@example.com',
        '+39 3' || lpad((1000000 + v_customer * 7919)::text, 9, '0'),
        v_streets[1 + v_customer % array_length(v_streets, 1)] || ' ' || (v_customer * 3 % 120 + 1),
        v_cities[v_city],
        v_postal_codes[v_city],
        v_status,
        -- Same shipping rule as create_order: free from 50 €, otherwise 6.90 €
        v_subtotal + case when v_subtotal >= 50 then 0 else 6.90 end,
        v_payment_methods[1 + floor(random() * array_length(v_payment_methods, 1))::integer]
      )
      returning id into v_order_id;

      insert into public.order_items (order_id, product_id, name, price, quantity)
      select v_order_id, product.id, product.name, product.price, item.quantity
      from unnest(v_product_ids, v_quantities) as item(product_id, quantity)
      join public.products as product on product.id = item.product_id;
    end loop;
  end loop;
end;
$$;

-- To remove all demo orders (their items are deleted by the cascade):
--
-- delete from public.orders
-- where user_id = (select id from auth.users where email = 'demo-orders@example.com');


-- Keep the demo data fresh.
-- The orders above have fixed dates, so without this the dashboard's
-- "last 30 days" KPIs would slowly drop to zero. Every night this job moves
-- all demo orders forward by the same number of days, so the newest one is
-- always from yesterday and the gaps between orders stay the same.
-- Run this section on its own: running the whole file again would insert
-- a second copy of the demo orders.
--
-- The function lives in a "private" schema: Supabase only exposes "public"
-- through its API, so nobody can call it from the browser.
create schema if not exists private;

create or replace function private.shift_demo_orders()
returns void
language plpgsql
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_days integer;
begin
  select id into v_user_id from auth.users where email = 'demo-orders@example.com';
  if v_user_id is null then
    return;
  end if;

  select (current_date - 1) - max(created_at)::date into v_days
  from public.orders
  where user_id = v_user_id;

  if v_days is null or v_days <= 0 then
    return;
  end if;

  update public.orders
  set created_at = created_at + make_interval(days => v_days)
  where user_id = v_user_id;
end;
$$;

-- Run it every night at 03:00 UTC with pg_cron
-- (enable it first in Database → Extensions, or with the line below).
create extension if not exists pg_cron with schema pg_catalog;

select cron.schedule(
  'shift-demo-orders',
  '0 3 * * *',
  'select private.shift_demo_orders()'
);
