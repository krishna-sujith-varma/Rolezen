'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Upload,
  Search,
  FileText,
  Trash2,
  Copy,
  Clock,
  ArrowRight,
  LogOut,
  CheckCircle2,
  FileCheck,
  X,
} from 'lucide-react';
import { RolezenLogo } from '@/icons';
import { Button, Card, Badge, Modal, Input } from '@/components/ui';
import { RESUME_TEMPLATES } from '@/constants/templates';

interface SavedProject {
  id: string;
  title: string;
  targetRole: string;
  template: string;
  atsScore: number;
  updatedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [projects, setProjects] = useState<SavedProject[]>([
    {
      id: 'proj-1',
      title: 'Senior Staff Architect Resume',
      targetRole: 'Senior Staff Frontend Architect',
      template: 'The Executive',
      atsScore: 91,
      updatedAt: '12 minutes ago',
    },
    {
      id: 'proj-2',
      title: 'Engineering Manager Resume',
      targetRole: 'Software Engineering Manager',
      template: 'Tech Lead',
      atsScore: 94,
      updatedAt: '2 days ago',
    },
    {
      id: 'proj-3',
      title: 'Startup Founder CV',
      targetRole: 'Head of Product & Tech',
      template: 'Modern Minimalist',
      atsScore: 88,
      updatedAt: '1 week ago',
    },
  ]);

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleCreateNew = () => {
    router.push('/studio/builder');
  };

  const handleDuplicate = (id: string) => {
    const target = projects.find((p) => p.id === id);
    if (!target) return;
    const duplicated: SavedProject = {
      ...target,
      id: `proj-${Date.now()}`,
      title: `${target.title} (Copy)`,
      updatedAt: 'Just now',
    };
    setProjects([duplicated, ...projects]);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setImportModalOpen(false);
      setSelectedFile(null);
      router.push('/studio/builder');
    }, 1200);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.targetRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#DCFCE7] selection:text-[#16A34A] flex flex-col font-sans">
      {/* Header Navigation */}
      <header className="h-16 border-b border-[#E2E8F0] bg-white px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none">
          <RolezenLogo size={32} className="transition-transform group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight text-[#0F172A]">Rolezen</span>
          <Badge status="neutral" className="ml-2 text-xs hidden xs:inline-flex">Workspace</Badge>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<LogOut className="h-4 w-4" />}
            onClick={() => router.push('/login')}
            className="text-xs text-[#64748B] hover:text-[#0F172A]"
          >
            Log Out
          </Button>
          <div className="h-8 w-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-xs font-bold ring-2 ring-[#16A34A]">
            AV
          </div>
        </div>
      </header>

      {/* Main Workspace Dashboard Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Welcome Banner & Quick Action Launchers */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl z-10">
            <Badge status="primary" className="text-xs font-bold">Workspace Active</Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A]">
              Welcome back, Alex
            </h1>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Launch your resume studio workspace, create targeted resume variants, or scan existing documents against ATS systems.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto z-10 shrink-0">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Plus className="h-5 w-5" />}
              onClick={handleCreateNew}
              className="text-sm font-semibold"
            >
              Create New Resume
            </Button>

            <Button
              variant="outline"
              size="lg"
              leftIcon={<Upload className="h-5 w-5 text-[#16A34A]" />}
              onClick={() => setImportModalOpen(true)}
              className="text-sm font-semibold"
            >
              Import Resume PDF
            </Button>
          </div>
        </div>

        {/* Section 2: Resume Manager (Project Asset Repository) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Resume Manager</h2>
              <p className="text-xs text-[#64748B]">Manage your active resume projects and versions</p>
            </div>

            {/* Search Bar */}
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search resumes or target roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white text-xs h-10"
              />
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                variant="hoverable"
                padding="none"
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs hover:border-[#16A34A] transition-all flex flex-col justify-between"
              >
                {/* Header Bar */}
                <div className="bg-[#F8FAFC] p-5 border-b border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#16A34A]" />
                    <span className="text-xs font-semibold text-[#64748B]">{project.template}</span>
                  </div>
                  <Badge status="success" className="text-xs font-bold">
                    ATS {project.atsScore}/100
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-[#0F172A] line-clamp-1">{project.title}</h3>
                  <p className="text-xs text-[#16A34A] font-semibold">{project.targetRole}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Edited {project.updatedAt}</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs h-9"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                    onClick={() => router.push('/studio/builder')}
                  >
                    Open Studio
                  </Button>

                  <button
                    type="button"
                    onClick={() => handleDuplicate(project.id)}
                    className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg border border-transparent hover:border-[#E2E8F0] transition-colors cursor-pointer"
                    title="Duplicate Resume"
                  >
                    <Copy className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-[#64748B] hover:text-[#EF4444] hover:bg-white rounded-lg border border-transparent hover:border-[#E2E8F0] transition-colors cursor-pointer"
                    title="Delete Resume"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Template Gallery Picker */}
        <div className="space-y-6 pt-6 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Template Gallery</h2>
              <p className="text-xs text-[#64748B]">Select a recruiter-tested layout to start building</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESUME_TEMPLATES.map((tpl) => (
              <Card
                key={tpl.id}
                variant="hoverable"
                padding="lg"
                className="bg-white border border-[#E2E8F0] rounded-2xl flex flex-col justify-between hover:border-[#16A34A] transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#0F172A]">{tpl.name}</h3>
                    {tpl.badge && <Badge status="primary">{tpl.badge}</Badge>}
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">{tpl.description}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-xs h-9 hover:border-[#16A34A] hover:text-[#16A34A]"
                  onClick={handleCreateNew}
                >
                  Use Template
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Interactive Import Resume Modal with Functional File Picker */}
      <Modal isOpen={importModalOpen} onClose={() => setImportModalOpen(false)} title="Import Resume PDF">
        <form onSubmit={handleImportSubmit} className="space-y-4">
          <p className="text-xs text-[#64748B] leading-relaxed">
            Upload your existing PDF or DOCX resume. Rolezen AI will parse work history, degree records, and skills into structural JSON format.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />

          {!selectedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#E2E8F0] hover:border-[#16A34A] rounded-2xl p-8 text-center space-y-3 cursor-pointer transition-colors bg-[#F8FAFC]"
            >
              <Upload className="h-8 w-8 text-[#16A34A] mx-auto" />
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Click to select PDF or DOCX file</p>
                <p className="text-[11px] text-[#64748B] mt-1">Supports PDF, DOCX (Max 10MB)</p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-[#DCFCE7]/50 border border-[#16A34A]/30 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="h-6 w-6 text-[#16A34A]" />
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">{selectedFile.name}</p>
                  <p className="text-[11px] text-[#64748B]">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="p-1 text-[#64748B] hover:text-[#EF4444] rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <Button variant="ghost" size="sm" type="button" onClick={() => setImportModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={isUploading}
              disabled={!selectedFile}
            >
              Parse & Open Studio
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
