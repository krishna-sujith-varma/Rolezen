'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { fetchSampleResume } from '@/services/resume';
import { PersonalDetails, WorkExperience, Education, SkillCategory, SectionId } from '@/types/resume';
import { StudioToolbar } from '@/features/resume/toolbar';
import { ResumeMapEditor } from '@/features/resume/sidebar';
import { PreviewPane } from '@/features/resume/preview-pane';
import { InspectorPanel } from '@/features/resume/inspector-panel';
import { StudioStatusBar } from '@/features/resume/status-bar';
import { Toast } from '@/components/ui';
import { calculateRealtimeATS } from '@/lib/ats-calculator';
import { AnimatePresence } from 'framer-motion';
import { Edit3, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function StudioBuilderPage() {
  const [template, setTemplate] = useState<string>('executive');
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: 'Alex Vance',
    jobTitle: 'Senior Staff Frontend Architect',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexvance',
    github: 'github.com/alexvance',
    summary: 'Senior Frontend Architect with 8+ years building enterprise React & Next.js applications serving millions of active users.',
  });

  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>([
    'personal',
    'experience',
    'education',
    'skills',
  ]);
  const [zoom, setZoom] = useState(1.0);

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Inspector Panel State ('ats' | 'ai' | null)
  const [inspectorMode, setInspectorMode] = useState<'ats' | 'ai' | null>('ats');

  // Mobile View Switcher ('map' | 'canvas')
  const [mobileView, setMobileView] = useState<'map' | 'canvas'>('canvas');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load initial sample resume data
  useEffect(() => {
    fetchSampleResume().then((data) => {
      setPersonalDetails(data.personalDetails);
      setExperiences(data.experience);
      setEducation(data.education);
      setSkills(data.skills);
    });
  }, []);

  // Real-time dynamic ATS & word count calculation engine
  const metrics = useMemo(() => {
    return calculateRealtimeATS(personalDetails, experiences, education, skills);
  }, [personalDetails, experiences, education, skills]);

  const handleExportPDF = () => {
    setToastMessage('Exporting vector-grade A4 PDF... Download ready!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add missing keyword to skills directly
  const handleAddSkillKeyword = (keyword: string) => {
    if (skills.length === 0) {
      setSkills([{ category: 'Core Competencies', skills: [keyword] }]);
    } else {
      const updated = [...skills];
      if (!updated[0].skills.includes(keyword)) {
        updated[0] = {
          ...updated[0],
          skills: [...updated[0].skills, keyword],
        };
        setSkills(updated);
        setToastMessage(`Added "${keyword}" to Skills & Technologies!`);
        setTimeout(() => setToastMessage(null), 2500);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors">
      {/* 1. Top Studio Toolbar */}
      <StudioToolbar
        template={template}
        onTemplateChange={setTemplate}
        onOpenInspector={(mode) => setInspectorMode(inspectorMode === mode ? null : mode)}
        onExportPDF={handleExportPDF}
        atsScore={metrics.atsScore}
        zoom={zoom}
        onZoomChange={setZoom}
      />

      {/* 2. Main Studio 3-Column Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Column 1 (Left): Connected Resume Map & Section Editor */}
        <div
          className={cn(
            'h-full flex flex-col shrink-0 transition-all duration-200',
            mobileView === 'map' ? 'flex w-full' : 'hidden lg:flex'
          )}
        >
          <ResumeMapEditor
            personalDetails={personalDetails}
            onUpdatePersonal={setPersonalDetails}
            experiences={experiences}
            onUpdateExperiences={setExperiences}
            education={education}
            onUpdateEducation={setEducation}
            skills={skills}
            onUpdateSkills={setSkills}
            sectionOrder={sectionOrder}
            onUpdateSectionOrder={setSectionOrder}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Column 2 (Center): True A4 Paper Resume Canvas */}
        <div
          className={cn(
            'flex-1 h-full overflow-hidden transition-all duration-200',
            mobileView === 'canvas' ? 'flex' : 'hidden lg:flex'
          )}
        >
          <PreviewPane
            personalDetails={personalDetails}
            experiences={experiences}
            education={education}
            skills={skills}
            sectionOrder={sectionOrder}
            template={template}
            zoom={zoom}
          />
        </div>

        {/* Column 3 (Right): Slide-Over Inspector (Live ATS Score, AI Copilot, Properties) */}
        <InspectorPanel
          isOpen={inspectorMode !== null}
          onClose={() => setInspectorMode(null)}
          mode={inspectorMode || 'ats'}
          metrics={metrics}
          onAddSkillKeyword={handleAddSkillKeyword}
        />
      </div>

      {/* 3. Bottom Studio Status Bar (Real-Time Synchronous Metrics) */}
      <StudioStatusBar
        wordCount={metrics.totalWords}
        charCount={metrics.totalCharacters}
        atsScore={metrics.atsScore}
        version="v2.4"
        targetJob={personalDetails.jobTitle}
      />

      {/* 4. Mobile Bottom App Bar (Screens < 1024px) */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#0F172A] dark:bg-[#1E293B] text-white p-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setMobileView('map')}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer min-h-[38px]',
            mobileView === 'map' ? 'bg-[#16A34A] text-white' : 'text-[#94A3B8]'
          )}
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>Resume Map</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileView('canvas')}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors cursor-pointer min-h-[38px]',
            mobileView === 'canvas' ? 'bg-[#16A34A] text-white' : 'text-[#94A3B8]'
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>A4 Canvas</span>
        </button>

        <button
          type="button"
          onClick={() => setInspectorMode(inspectorMode === 'ats' ? null : 'ats')}
          className="p-2 text-[#22C55E] hover:bg-white/10 rounded-full transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
          title="ATS Inspector"
        >
          <ShieldCheck className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setInspectorMode(inspectorMode === 'ai' ? null : 'ai')}
          className="p-2 text-[#22C55E] hover:bg-white/10 rounded-full transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
          title="AI Copilot"
        >
          <Sparkles className="h-4 w-4" />
        </button>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toastMessage && (
          <div className="fixed top-18 right-6 z-50">
            <Toast type="success" message={toastMessage} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
