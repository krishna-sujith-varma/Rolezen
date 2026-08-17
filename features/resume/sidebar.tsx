'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Sparkles,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from 'lucide-react';
import { PersonalDetails, WorkExperience, Education, SkillCategory, SectionId } from '@/types/resume';
import { Input, Textarea, Button, Badge } from '@/components/ui';
import { optimizeBulletPoint } from '@/services/ai';
import { cn } from '@/utils/cn';

export interface ResumeMapEditorProps {
  personalDetails: PersonalDetails;
  onUpdatePersonal: (details: PersonalDetails) => void;
  experiences: WorkExperience[];
  onUpdateExperiences: (exps: WorkExperience[]) => void;
  education: Education[];
  onUpdateEducation: (edu: Education[]) => void;
  skills: SkillCategory[];
  onUpdateSkills: (skills: SkillCategory[]) => void;
  sectionOrder: SectionId[];
  onUpdateSectionOrder: (order: SectionId[]) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SECTION_CONFIGS: Record<SectionId, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  personal: { label: 'Personal Information', icon: User },
  experience: { label: 'Work Experience', icon: Briefcase },
  education: { label: 'Education', icon: GraduationCap },
  skills: { label: 'Skills & Tech', icon: Wrench },
  projects: { label: 'Key Projects', icon: Briefcase },
};

export const ResumeMapEditor: React.FC<ResumeMapEditorProps> = ({
  personalDetails,
  onUpdatePersonal,
  experiences,
  onUpdateExperiences,
  education,
  onUpdateEducation,
  skills,
  onUpdateSkills,
  sectionOrder,
  onUpdateSectionOrder,
  collapsed,
  onToggleCollapse,
}) => {
  const [activeSection, setActiveSection] = useState<SectionId>('personal');
  const [optimizingIndex, setOptimizingIndex] = useState<{ expId: string; bulletIdx: number } | null>(null);

  // Section Reordering (Personal Info is permanently locked at index 0)
  const handleMoveSection = (id: SectionId, direction: 'up' | 'down') => {
    if (id === 'personal') return; // Locked on top

    const currentIndex = sectionOrder.indexOf(id);
    if (currentIndex <= 1 && direction === 'up') return; // Cannot move above index 1 (personal info is index 0)
    if (currentIndex >= sectionOrder.length - 1 && direction === 'down') return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex, 0, moved);

    onUpdateSectionOrder(newOrder);
  };

  // AI Bullet Point Enhancer Action
  const handleEnhanceBullet = async (expId: string, bulletIdx: number, text: string) => {
    setOptimizingIndex({ expId, bulletIdx });
    try {
      const enhanced = await optimizeBulletPoint(text);
      const updatedExps = experiences.map((exp) => {
        if (exp.id === expId) {
          const newBullets = [...exp.bulletPoints];
          newBullets[bulletIdx] = enhanced;
          return { ...exp, bulletPoints: newBullets };
        }
        return exp;
      });
      onUpdateExperiences(updatedExps);
    } finally {
      setOptimizingIndex(null);
    }
  };

  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp_${Date.now()}`,
      company: 'Company Name',
      position: 'Job Title',
      location: 'City, State',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      bulletPoints: ['Architected core platform modules improving throughput by 35%.'],
    };
    onUpdateExperiences([...experiences, newExp]);
  };

  const handleRemoveExperience = (id: string) => {
    onUpdateExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <aside
      className={cn(
        'h-full bg-white dark:bg-[#0F172A] border-r border-[#E2E8F0] dark:border-slate-800 flex flex-col justify-between transition-all duration-300 select-none z-20 shrink-0 shadow-xs',
        collapsed ? 'w-16' : 'w-80 md:w-96'
      )}
    >
      {/* 1. Resume Map Top Selector Bar */}
      <div className="p-3.5 border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B0F19] flex items-center justify-between shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider">
              Resume Map
            </span>
            <Badge status="primary" className="text-[10px]">Active</Badge>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors mx-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* 2. Section Map Selector Bar with Reordering Appearance Controls */}
      <div className="p-2 border-b border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#0F172A] flex flex-col gap-1.5 shrink-0">
        {sectionOrder.map((sectionId, idx) => {
          const config = SECTION_CONFIGS[sectionId];
          if (!config) return null;
          const Icon = config.icon;
          const isActive = activeSection === sectionId;
          const isPersonal = sectionId === 'personal';
          const canMoveUp = !isPersonal && idx > 1;
          const canMoveDown = !isPersonal && idx < sectionOrder.length - 1;

          return (
            <div
              key={sectionId}
              className={cn(
                'group flex items-center justify-between rounded-xl p-1 transition-all',
                isActive
                  ? 'bg-[#0F172A] dark:bg-[#1E293B] text-white shadow-xs'
                  : 'text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F8FAFC] dark:hover:bg-slate-800/60'
              )}
            >
              <button
                type="button"
                onClick={() => setActiveSection(sectionId)}
                className="flex-1 flex items-center gap-2.5 px-2.5 py-1.5 text-xs font-semibold cursor-pointer text-left overflow-hidden min-h-[36px]"
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#22C55E]' : 'text-current')} />
                {!collapsed && (
                  <span className="truncate flex-1">{config.label}</span>
                )}
              </button>

              {!collapsed && (
                <div className="flex items-center gap-1 pr-1 shrink-0">
                  {isPersonal ? (
                    <div
                      className="p-1 text-slate-400 dark:text-slate-500 rounded flex items-center gap-1 text-[10px] font-bold"
                      title="Personal Info is locked on top"
                    >
                      <Lock className="h-3 w-3" />
                      <span className="text-[10px] uppercase tracking-wider">Pinned</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSection(sectionId, 'up');
                        }}
                        disabled={!canMoveUp}
                        className={cn(
                          'p-1 rounded transition-colors',
                          canMoveUp
                            ? 'hover:bg-white/20 cursor-pointer text-current'
                            : 'opacity-20 cursor-not-allowed text-slate-400'
                        )}
                        title="Move Section Up"
                        aria-label={`Move ${config.label} Up`}
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveSection(sectionId, 'down');
                        }}
                        disabled={!canMoveDown}
                        className={cn(
                          'p-1 rounded transition-colors',
                          canMoveDown
                            ? 'hover:bg-white/20 cursor-pointer text-current'
                            : 'opacity-20 cursor-not-allowed text-slate-400'
                        )}
                        title="Move Section Down"
                        aria-label={`Move ${config.label} Down`}
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Section Editor Form (Inside Left Map) */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC] dark:bg-[#0B0F19]">
          <AnimatePresence mode="wait">
            {/* SECTION 1: Personal Info */}
            {activeSection === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    Personal Information
                  </h4>
                  <Badge status="neutral" className="text-[10px]">Locked Top</Badge>
                </div>
                <Input
                  label="Full Name"
                  value={personalDetails.fullName}
                  onChange={(e) => onUpdatePersonal({ ...personalDetails, fullName: e.target.value })}
                />
                <Input
                  label="Target Job Title"
                  value={personalDetails.jobTitle}
                  onChange={(e) => onUpdatePersonal({ ...personalDetails, jobTitle: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={personalDetails.email}
                  onChange={(e) => onUpdatePersonal({ ...personalDetails, email: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  value={personalDetails.phone}
                  onChange={(e) => onUpdatePersonal({ ...personalDetails, phone: e.target.value })}
                />
                <Input
                  label="Location"
                  value={personalDetails.location}
                  onChange={(e) => onUpdatePersonal({ ...personalDetails, location: e.target.value })}
                />
                <Input
                  label="LinkedIn"
                  value={personalDetails.linkedin || ''}
                  onChange={(e) => onUpdatePersonal({ ...personalDetails, linkedin: e.target.value })}
                />
                <Textarea
                  label="Professional Summary"
                  rows={3}
                  value={personalDetails.summary}
                  onChange={(e) => onUpdatePersonal({ ...personalDetails, summary: e.target.value })}
                />
              </motion.div>
            )}

            {/* SECTION 2: Work Experience */}
            {activeSection === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">Work History</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Plus className="h-3.5 w-3.5" />}
                    onClick={handleAddExperience}
                    className="h-8 text-xs border-[#E2E8F0] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-white"
                  >
                    Add Position
                  </Button>
                </div>

                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 space-y-3 relative group shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="absolute top-3 right-3 p-1 text-[#64748B] hover:text-[#EF4444] rounded-lg transition-colors cursor-pointer"
                      title="Delete Experience"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    <div className="space-y-2 pr-6">
                      <Input
                        label="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, company: val } : x)));
                        }}
                      />
                      <Input
                        label="Position"
                        value={exp.position}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, position: val } : x)));
                        }}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Start Date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, startDate: val } : x)));
                          }}
                        />
                        <Input
                          label="End Date"
                          value={exp.endDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, endDate: val } : x)));
                          }}
                        />
                      </div>
                    </div>

                    {/* Bullet Points with AI Enhancement */}
                    <div className="space-y-2 pt-1 border-t border-[#E2E8F0] dark:border-slate-800">
                      <label className="block text-[11px] font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider">
                        Bullet Points
                      </label>
                      {exp.bulletPoints.map((bullet, bulletIdx) => {
                        const isOptimizing = optimizingIndex?.expId === exp.id && optimizingIndex?.bulletIdx === bulletIdx;
                        return (
                          <div
                            key={bulletIdx}
                            className="space-y-1.5 p-2.5 bg-[#F8FAFC] dark:bg-slate-900/60 border border-[#E2E8F0] dark:border-slate-800 rounded-xl"
                          >
                            <Textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => {
                                const val = e.target.value;
                                onUpdateExperiences(
                                  experiences.map((x) => {
                                    if (x.id === exp.id) {
                                      const newB = [...x.bulletPoints];
                                      newB[bulletIdx] = val;
                                      return { ...x, bulletPoints: newB };
                                    }
                                    return x;
                                  })
                                );
                              }}
                            />
                            <div className="flex items-center justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                isLoading={isOptimizing}
                                leftIcon={<Sparkles className="h-3 w-3 text-[#16A34A]" />}
                                onClick={() => handleEnhanceBullet(exp.id, bulletIdx, bullet)}
                                className="text-[11px] h-7 text-[#16A34A] dark:text-[#22C55E] hover:bg-[#DCFCE7] dark:hover:bg-emerald-950/40"
                              >
                                Enhance AI
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* SECTION 3: Education */}
            {activeSection === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs"
              >
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">Education History</h4>
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <Input
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateEducation(education.map((x) => (x.id === edu.id ? { ...x, institution: val } : x)));
                      }}
                    />
                    <Input
                      label="Degree & Field"
                      value={`${edu.degree} in ${edu.fieldOfStudy}`}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateEducation(education.map((x) => (x.id === edu.id ? { ...x, degree: val } : x)));
                      }}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Start Date"
                        value={edu.startDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateEducation(education.map((x) => (x.id === edu.id ? { ...x, startDate: val } : x)));
                        }}
                      />
                      <Input
                        label="End Date"
                        value={edu.endDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          onUpdateEducation(education.map((x) => (x.id === edu.id ? { ...x, endDate: val } : x)));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* SECTION 4: Skills */}
            {activeSection === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 bg-white dark:bg-[#0F172A] p-4 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-xs"
              >
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC]">Skills & Technologies</h4>
                {skills.map((sg, groupIdx) => (
                  <div key={groupIdx} className="space-y-2">
                    <Input
                      label={`Category ${groupIdx + 1}`}
                      value={sg.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        onUpdateSkills(skills.map((s, i) => (i === groupIdx ? { ...s, category: val } : s)));
                      }}
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {sg.skills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2.5 py-0.5 bg-[#F8FAFC] dark:bg-slate-800 text-[#0F172A] dark:text-slate-200 border border-[#E2E8F0] dark:border-slate-700 rounded-md text-[11px] font-semibold"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Footer Status */}
      {!collapsed && (
        <div className="p-3 border-t border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#0F172A] text-[11px] text-[#64748B] dark:text-slate-400 text-center shrink-0">
          Connected to A4 Resume Canvas
        </div>
      )}
    </aside>
  );
};
