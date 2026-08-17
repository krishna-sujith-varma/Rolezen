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
} from 'lucide-react';
import { PersonalDetails, WorkExperience, Education, SkillCategory } from '@/types/resume';
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
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const SECTION_ITEMS = [
  { id: 'personal', label: 'Personal Info', icon: User, completed: true },
  { id: 'experience', label: 'Work Experience', icon: Briefcase, completed: true },
  { id: 'education', label: 'Education', icon: GraduationCap, completed: true },
  { id: 'skills', label: 'Skills & Tech', icon: Wrench, completed: true },
];

export const ResumeMapEditor: React.FC<ResumeMapEditorProps> = ({
  personalDetails,
  onUpdatePersonal,
  experiences,
  onUpdateExperiences,
  education,
  onUpdateEducation,
  skills,
  onUpdateSkills,
  collapsed,
  onToggleCollapse,
}) => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [optimizingIndex, setOptimizingIndex] = useState<{ expId: string; bulletIdx: number } | null>(null);

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
      bulletPoints: ['Architected core frontend features improving throughput by 30%.'],
    };
    onUpdateExperiences([...experiences, newExp]);
  };

  const handleRemoveExperience = (id: string) => {
    onUpdateExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <aside
      className={cn(
        'h-full bg-white border-r border-[#E2E8F0] flex flex-col justify-between transition-all duration-300 select-none z-20 shrink-0 shadow-xs',
        collapsed ? 'w-16' : 'w-80 md:w-96'
      )}
    >
      {/* 1. Resume Map Top Selector Bar */}
      <div className="p-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Resume Map</span>
            <Badge status="primary" className="text-[10px]">Connected</Badge>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-white transition-colors mx-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* 2. Section Map Selector Bar */}
      <div className="p-2 border-b border-[#E2E8F0] bg-white flex flex-col gap-1 shrink-0">
        {SECTION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[40px]',
                isActive
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#22C55E]' : 'text-[#64748B]')} />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.completed && (
                    <CheckCircle2 className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-[#22C55E]' : 'text-[#16A34A]')} />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Animated Click-Through Section Editor (Inside Left Map) */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
          <AnimatePresence mode="wait">
            {/* SECTION 1: Personal Info */}
            {activeSection === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs"
              >
                <h4 className="text-xs font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
                  Personal Information
                </h4>
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
                  label="Summary"
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
                  <h4 className="text-xs font-bold text-[#0F172A]">Work History</h4>
                  <Button variant="outline" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />} onClick={handleAddExperience} className="h-8 text-xs">
                    Add Position
                  </Button>
                </div>

                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] space-y-3 relative group shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="absolute top-3 right-3 p-1 text-[#64748B] hover:text-[#EF4444] rounded-lg transition-colors cursor-pointer"
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
                          label="Start"
                          value={exp.startDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, startDate: val } : x)));
                          }}
                        />
                        <Input
                          label="End"
                          value={exp.endDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, endDate: val } : x)));
                          }}
                        />
                      </div>
                    </div>

                    {/* Bullet Points with AI Enhancement */}
                    <div className="space-y-2 pt-1 border-t border-[#E2E8F0]">
                      <label className="block text-[11px] font-bold text-[#0F172A] uppercase tracking-wider">
                        Bullet Points
                      </label>
                      {exp.bulletPoints.map((bullet, bulletIdx) => {
                        const isOptimizing = optimizingIndex?.expId === exp.id && optimizingIndex?.bulletIdx === bulletIdx;
                        return (
                          <div key={bulletIdx} className="space-y-1 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
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
                                className="text-[11px] h-7 text-[#16A34A] hover:bg-[#DCFCE7]"
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
                className="space-y-3 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs"
              >
                <h4 className="text-xs font-bold text-[#0F172A]">Education History</h4>
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
                className="space-y-3 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs"
              >
                <h4 className="text-xs font-bold text-[#0F172A]">Skills & Technologies</h4>
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
                        <span key={sk} className="px-2.5 py-0.5 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-md text-[11px] font-semibold">
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
        <div className="p-3 border-t border-[#E2E8F0] bg-white text-[11px] text-[#64748B] text-center shrink-0">
          Connected to A4 Resume Canvas
        </div>
      )}
    </aside>
  );
};
