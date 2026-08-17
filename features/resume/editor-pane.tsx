'use client';

import React, { useState } from 'react';
import { PersonalDetails, WorkExperience, Education, SkillCategory } from '@/types/resume';
import { Input, Textarea, Button, Tabs, Card } from '@/components/ui';
import { User, Briefcase, GraduationCap, Wrench, Sparkles, Plus, Trash2 } from 'lucide-react';
import { optimizeBulletPoint } from '@/services/ai';

export interface EditorPaneProps {
  personalDetails: PersonalDetails;
  onUpdatePersonal: (details: PersonalDetails) => void;
  experiences: WorkExperience[];
  onUpdateExperiences: (exps: WorkExperience[]) => void;
  education: Education[];
  onUpdateEducation: (edu: Education[]) => void;
  skills: SkillCategory[];
  onUpdateSkills: (skills: SkillCategory[]) => void;
}

export const EditorPane: React.FC<EditorPaneProps> = ({
  personalDetails,
  onUpdatePersonal,
  experiences,
  onUpdateExperiences,
  education,
  onUpdateEducation,
  skills,
  onUpdateSkills,
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal');
  const [optimizingIndex, setOptimizingIndex] = useState<{ expId: string; bulletIdx: number } | null>(null);

  const tabs = [
    { id: 'personal', label: 'Personal', icon: <User className="h-4 w-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'skills', label: 'Skills', icon: <Wrench className="h-4 w-4" /> },
  ];

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

  // Add new work experience entry
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp_${Date.now()}`,
      company: 'Company Name',
      position: 'Job Title',
      location: 'City, State',
      startDate: '2024',
      endDate: 'Present',
      current: true,
      bulletPoints: ['Architected core frontend features improving performance by 25%.'],
    };
    onUpdateExperiences([...experiences, newExp]);
  };

  // Remove work experience entry
  const handleRemoveExperience = (id: string) => {
    onUpdateExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] border-r border-[#E2E8F0] overflow-hidden">
      {/* Tab Navigation */}
      <div className="p-4 bg-white border-b border-[#E2E8F0] shrink-0">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as any)} className="w-full justify-around" />
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* TAB 1: Personal Details */}
        {activeTab === 'personal' && (
          <Card padding="md" className="space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                label="Location (City, State)"
                value={personalDetails.location}
                onChange={(e) => onUpdatePersonal({ ...personalDetails, location: e.target.value })}
              />
              <Input
                label="LinkedIn Profile"
                value={personalDetails.linkedin || ''}
                onChange={(e) => onUpdatePersonal({ ...personalDetails, linkedin: e.target.value })}
              />
            </div>
            <Textarea
              label="Professional Summary"
              rows={4}
              value={personalDetails.summary}
              onChange={(e) => onUpdatePersonal({ ...personalDetails, summary: e.target.value })}
            />
          </Card>
        )}

        {/* TAB 2: Work Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A]">Work History</h3>
              <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={handleAddExperience}>
                Add Experience
              </Button>
            </div>

            {experiences.map((exp) => (
              <Card key={exp.id} padding="md" className="space-y-4 relative group">
                <button
                  onClick={() => handleRemoveExperience(exp.id)}
                  className="absolute top-4 right-4 p-1.5 text-[#64748B] hover:text-[#EF4444] rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                  <Input
                    label="Company Name"
                    value={exp.company}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, company: val } : x)));
                    }}
                  />
                  <Input
                    label="Position / Title"
                    value={exp.position}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateExperiences(experiences.map((x) => (x.id === exp.id ? { ...x, position: val } : x)));
                    }}
                  />
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

                {/* Bullet Points with AI Enhancement */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Key Accomplishments & Bullet Points
                  </label>
                  {exp.bulletPoints.map((bullet, bulletIdx) => {
                    const isOptimizing = optimizingIndex?.expId === exp.id && optimizingIndex?.bulletIdx === bulletIdx;
                    return (
                      <div key={bulletIdx} className="space-y-1.5 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
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
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-[#64748B]">XYZ Formula Recommended</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            isLoading={isOptimizing}
                            leftIcon={<Sparkles className="h-3.5 w-3.5 text-[#16A34A]" />}
                            onClick={() => handleEnhanceBullet(exp.id, bulletIdx, bullet)}
                            className="text-xs text-[#16A34A] hover:bg-[#DCFCE7]"
                          >
                            Enhance with AI
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB 3: Education */}
        {activeTab === 'education' && (
          <Card padding="md" className="space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Education History</h3>
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  value={`${edu.degree} - ${edu.fieldOfStudy}`}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateEducation(education.map((x) => (x.id === edu.id ? { ...x, degree: val } : x)));
                  }}
                />
              </div>
            ))}
          </Card>
        )}

        {/* TAB 4: Skills */}
        {activeTab === 'skills' && (
          <Card padding="md" className="space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A]">Core Competencies & Skills</h3>
            {skills.map((skillGroup, groupIdx) => (
              <div key={groupIdx} className="space-y-2">
                <Input
                  label={`Category ${groupIdx + 1}`}
                  value={skillGroup.category}
                  onChange={(e) => {
                    const val = e.target.value;
                    onUpdateSkills(skills.map((sg, i) => (i === groupIdx ? { ...sg, category: val } : sg)));
                  }}
                />
                <div className="flex flex-wrap gap-2 pt-2">
                  {skillGroup.skills.map((s) => (
                    <span key={s} className="px-3 py-1 bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] rounded-lg text-xs font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
};
