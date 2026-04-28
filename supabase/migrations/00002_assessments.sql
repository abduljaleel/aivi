-- aivi.co.uk: Enterprise AI Competitiveness
-- Migration: 00002_assessments
-- Tables: questions, assessments, assessment_responses, roadmaps, scorecards

-- Questions bank for assessments
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  dimension text not null,
  question_text text not null,
  question_type text not null check (question_type in ('likert', 'multiple_choice', 'open_text', 'numeric')),
  weight numeric default 1.0,
  order_index integer not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Assessments track an org's AI competitiveness evaluation
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id),
  user_id uuid references auth.users(id),
  status text default 'draft' check (status in ('draft', 'in_progress', 'completed', 'archived')),
  started_at timestamptz,
  completed_at timestamptz,
  overall_score numeric,
  dimension_scores jsonb default '{}',
  created_at timestamptz default now()
);

-- Individual responses to assessment questions
create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.assessments(id) on delete cascade,
  question_id uuid references public.questions(id),
  dimension text not null,
  response_value text,
  score numeric,
  created_at timestamptz default now()
);

-- Generated roadmaps from completed assessments
create table if not exists public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid references public.assessments(id) on delete cascade,
  generated_at timestamptz default now(),
  recommendations jsonb default '[]',
  priority_actions jsonb default '[]',
  created_at timestamptz default now()
);

-- Scorecards for tracking progress over time
create table if not exists public.scorecards (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id),
  assessment_id uuid references public.assessments(id) on delete cascade,
  dimension text not null,
  score numeric not null,
  benchmark_percentile numeric,
  trend_direction text check (trend_direction in ('up', 'down', 'flat')),
  period text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.questions enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_responses enable row level security;
alter table public.roadmaps enable row level security;
alter table public.scorecards enable row level security;

-- RLS Policies

-- Questions are readable by all authenticated users
create policy "Authenticated users can read active questions"
  on public.questions for select
  using (auth.role() = 'authenticated' and is_active = true);

create policy "Org members can manage assessments"
  on public.assessments for all
  using (
    org_id in (select org_id from public.profiles where id = auth.uid())
  );

create policy "Assessment access for responses"
  on public.assessment_responses for all
  using (
    assessment_id in (
      select id from public.assessments
      where org_id in (select org_id from public.profiles where id = auth.uid())
    )
  );

create policy "Assessment access for roadmaps"
  on public.roadmaps for all
  using (
    assessment_id in (
      select id from public.assessments
      where org_id in (select org_id from public.profiles where id = auth.uid())
    )
  );

create policy "Org members can manage scorecards"
  on public.scorecards for all
  using (
    org_id in (select org_id from public.profiles where id = auth.uid())
  );
