'use client';

import React, { useState, useEffect } from 'react';
import { fetchSampleResume } from '@/services/resume';
import { PersonalDetails, WorkExperience, Education, SkillCategory } from '@/types/resume';
import { StudioToolbar } from '@/features/resume/toolbar';
import { ResumeMapEditor } from '@/features/resume/sidebar';
import { PreviewPane } from '@/features/resume/preview-pane';
import { InspectorPanel } from '@/features/resume/inspector-panel';
import { StudioStatusBar } from '@/features/resume/status-bar';
import { Toast } from '@/components/ui';
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
  const [atsScore, setAtsScore] = useState(91);
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

  const handleExportPDF = () => {
    setToastMessage('Exporting vector-grade A4 PDF... Download ready!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#F8FAFC]">
      {/* 1. Top Studio Toolbar */}
      <StudioToolbar
        template={template}
        onTemplateChange={setTemplate}
        onOpenInspector={(mode) => setInspectorMode(inspectorMode === mode ? null : mode)}
        onExportPDF={handleExportPDF}
        atsScore={atsScore}
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
            template={template}
            zoom={zoom}
          />
        </div>

        {/* Column 3 (Right): Slide-Over Inspector (ATS Score, AI Copilot, Properties) */}
        <InspectorPanel
          isOpen={inspectorMode !== null}
          onClose={() => setInspectorMode(null)}
          mode={inspectorMode || 'ats'}
          atsScore={atsScore}
        />
      </div>

      {/* 3. Bottom Studio Status Bar (VS Code Style) */}
      <StudioStatusBar
        wordCount={482}
        charCount={3120}
        atsScore={atsScore}
        version="v2.4"
        targetJob={personalDetails.jobTitle}
      />

      {/* 4. Mobile Bottom App Bar (Screens < 1024px) */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#0F172A] text-white p-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-1">
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
