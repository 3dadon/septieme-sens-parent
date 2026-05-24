create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  sense_slug text not null,
  title text not null,
  slug text not null,
  category text,
  description text,
  content text,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint articles_sense_slug_slug_key unique (sense_slug, slug)
);

alter table public.articles enable row level security;

drop policy if exists "Published articles are public" on public.articles;
create policy "Published articles are public"
  on public.articles
  for select
  using (published = true);

drop policy if exists "Authenticated users can insert articles" on public.articles;
create policy "Authenticated users can insert articles"
  on public.articles
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update articles" on public.articles;
create policy "Authenticated users can update articles"
  on public.articles
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete articles" on public.articles;
create policy "Authenticated users can delete articles"
  on public.articles
  for delete
  to authenticated
  using (true);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row
  execute function public.set_updated_at();

comment on policy "Authenticated users can insert articles" on public.articles
  is 'V1: any authenticated admin can insert. Later, restrict with auth.jwt()->>''email'' = ''admin@example.com'' or a dedicated admin profile table.';
