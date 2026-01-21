import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemplateId, ViewMode, ActiveSection } from '../types';

interface UIStore {
  // Template
  selectedTemplate: TemplateId;
  setTemplate: (template: TemplateId) => void;

  // View mode (normal vs ATS)
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;

  // Active section in form
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;

  // Job matcher
  jobDescription: string;
  setJobDescription: (text: string) => void;
  isJobMatcherOpen: boolean;
  toggleJobMatcher: () => void;

  // Builder view state
  isBuilderView: boolean;
  setBuilderView: (isBuilder: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      // Template - default to modern
      selectedTemplate: 'modern',
      setTemplate: (template) => set({ selectedTemplate: template }),

      // View mode
      viewMode: 'normal',
      setViewMode: (mode) => set({ viewMode: mode }),
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === 'normal' ? 'ats' : 'normal',
        })),

      // Active section
      activeSection: 'personal',
      setActiveSection: (section) => set({ activeSection: section }),

      // Job matcher
      jobDescription: '',
      setJobDescription: (text) => set({ jobDescription: text }),
      isJobMatcherOpen: false,
      toggleJobMatcher: () =>
        set((state) => ({ isJobMatcherOpen: !state.isJobMatcherOpen })),

      // Builder view
      isBuilderView: false,
      setBuilderView: (isBuilder) => set({ isBuilderView: isBuilder }),
    }),
    {
      name: 'resume-builder-ui',
      partialize: (state) => ({
        selectedTemplate: state.selectedTemplate,
        // Don't persist viewMode, activeSection, jobDescription, isJobMatcherOpen
      }),
    }
  )
);
