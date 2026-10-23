create table public.materiais (
  id uuid default uuid_generate_v4() primary key,
  sku text unique not null,
  nome text not null,
  categoria text not null,
  localizacao text not null,
  quantidade numeric not null default 0,
  minimo numeric not null default 0,
  unid text not null default 'PC',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.requisicoes (
  id uuid default uuid_generate_v4() primary key,
  codigo_req text unique not null,
  sku text not null,
  material text not null,
  quantidade numeric not null,
  localizacao text not null,
  equipamento text not null,
  destino text not null,
  requisitante text not null,
  registrado_por text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);