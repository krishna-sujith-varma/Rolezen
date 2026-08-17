-- ====================================================================
-- ROLEZEN V1 — SUPABASE POSTGRESQL DATABASE SCHEMA & RLS POLICIES
-- ====================================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.resume_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled Resume',
    target_role TEXT NOT NULL DEFAULT 'Software Engineer',
    template TEXT NOT NULL DEFAULT 'executive',
    latest_version_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Versions Table
CREATE TABLE IF NOT EXISTS public.resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.resume_projects(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL DEFAULT 1,
    label TEXT,
    content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    ats_score INTEGER DEFAULT 90,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Foreign Key constraint pointing resume_projects.latest_version_id -> resume_versions.id
ALTER TABLE public.resume_projects 
    ADD CONSTRAINT fk_latest_version 
    FOREIGN KEY (latest_version_id) 
    REFERENCES public.resume_versions(id) 
    ON DELETE SET NULL;

-- 3. Row Level Security (RLS) Policies
ALTER TABLE public.resume_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;

-- Projects RLS: Users can only see & modify their own projects
CREATE POLICY "Users can manage their own resume projects"
    ON public.resume_projects
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Versions RLS: Users can only manage versions of projects they own
CREATE POLICY "Users can manage versions of their own projects"
    ON public.resume_versions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.resume_projects
            WHERE resume_projects.id = resume_versions.project_id
            AND resume_projects.user_id = auth.uid()
        )
    );

-- 4. Supabase Storage Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes-pdf', 'resumes-pdf', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('imported-resumes', 'imported-resumes', false)
ON CONFLICT (id) DO NOTHING;
