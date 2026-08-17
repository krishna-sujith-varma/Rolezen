'use client';

import React from 'react';
import { Drawer, Button, Badge } from '@/components/ui';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export interface AIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIDrawer: React.FC<AIDrawerProps> = ({ isOpen, onClose }) => {
  const suggestions = [
    {
      type: 'Action Verb Boost',
      original: 'Responsible for leading frontend team and writing components.',
      enhanced: 'Spearheaded 6-person frontend engineering squad, architecting 24 reusable React components.',
      scoreDiff: '+14% Impact',
    },
    {
      type: 'Metric Enhancement',
      original: 'Improved page load speed of web app.',
      enhanced: 'Optimized Next.js bundle sizes and image pipeline, reducing LCP page load time by 42%.',
      scoreDiff: '+22% Impact',
    },
  ];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="AI Resume Copilot">
      <div className="space-y-6 pt-2">
        <div className="p-4 bg-[#DCFCE7] border border-[#16A34A]/20 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-[#16A34A]">
            <Sparkles className="h-4 w-4" />
            <span>AI Optimization Engine v2.0</span>
          </div>
          <p className="text-xs text-[#14532D]">
            Analyzed candidate data against 10,000+ accepted tech resumes.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Top AI Recommendations</h4>
          {suggestions.map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-[#E2E8F0] rounded-xl space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A]">{item.type}</span>
                <Badge status="primary">{item.scoreDiff}</Badge>
              </div>
              <p className="text-xs text-[#64748B] line-through">{item.original}</p>
              <p className="text-xs font-medium text-[#0F172A] bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                ✨ {item.enhanced}
              </p>
              <Button variant="outline" size="sm" className="w-full text-xs justify-between mt-2" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Apply to Editor
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
