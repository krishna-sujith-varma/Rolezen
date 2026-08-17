'use client';

import React from 'react';
import { PersonalDetails, WorkExperience, Education, SkillCategory, SectionId } from '@/types/resume';
import { cn } from '@/utils/cn';

export interface PreviewPaneProps {
  personalDetails: PersonalDetails;
  experiences: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  sectionOrder?: SectionId[];
  template: string;
  zoom?: number; // Zoom level scale e.g. 0.85, 1.0, 1.15
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  personalDetails,
  experiences,
  education,
  skills,
  sectionOrder = ['personal', 'experience', 'education', 'skills'],
  template,
  zoom = 1.0,
}) => {
  const accentColors = {
    executive: '#0F172A',
    'tech-lead': '#16A34A',
    'modern-minimal': '#475569',
  };

  const accentColor = accentColors[template as keyof typeof accentColors] || '#0F172A';

  // Render individual sections according to user-configured sectionOrder
  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'experience':
        if (experiences.length === 0) return null;
        return (
          <div key="experience" className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F172A] border-b border-[#E2E8F0] pb-1">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                    <span>
                      {exp.position} — <span className="text-[#16A34A]">{exp.company}</span>
                    </span>
                    <span className="text-[#64748B] font-normal">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#475569] space-y-1 leading-relaxed pl-1">
                    {exp.bulletPoints.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F172A] border-b border-[#E2E8F0] pb-1">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0F172A]">{edu.institution}</span> —{' '}
                    <span className="text-[#475569]">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                  </div>
                  <span className="text-[#64748B]">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F172A] border-b border-[#E2E8F0] pb-1">
              Skills & Technical Expertise
            </h2>
            <div className="space-y-2">
              {skills.map((sg) => (
                <div key={sg.category} className="text-xs">
                  <span className="font-bold text-[#0F172A]">{sg.category}: </span>
                  <span className="text-[#475569]">{sg.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#E2E8F0]/50 dark:bg-[#0B0F19] overflow-y-auto p-4 sm:p-8 lg:p-12 items-center justify-start select-none transition-colors">
      {/* Zoom Scale Container */}
      <div
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        className="transition-transform duration-200"
      >
        {/* True A4 Paper Canvas Frame */}
        <div
          className={cn(
            'w-[794px] min-h-[1123px] bg-white rounded-sm shadow-2xl shadow-slate-900/20 border border-[#E2E8F0] p-12 space-y-6 text-[#0F172A] font-sans'
          )}
        >
          {/* Header Section (Personal Info is always pinned top) */}
          <div className="border-b border-[#E2E8F0] pb-6 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: accentColor }}>
              {personalDetails.fullName || 'Alex Vance'}
            </h1>
            <p className="text-sm font-semibold text-[#16A34A] uppercase tracking-wider">
              {personalDetails.jobTitle || 'Senior Staff Frontend Architect'}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#64748B] pt-1">
              {personalDetails.email && <span>{personalDetails.email}</span>}
              {personalDetails.phone && <span>• {personalDetails.phone}</span>}
              {personalDetails.location && <span>• {personalDetails.location}</span>}
              {personalDetails.linkedin && <span>• {personalDetails.linkedin}</span>}
              {personalDetails.github && <span>• {personalDetails.github}</span>}
            </div>
            {personalDetails.summary && (
              <p className="text-xs text-[#475569] leading-relaxed pt-3">{personalDetails.summary}</p>
            )}
          </div>

          {/* Dynamic Reordered Sections */}
          {sectionOrder
            .filter((id) => id !== 'personal')
            .map((id) => renderSection(id))}
        </div>
      </div>
    </div>
  );
};
