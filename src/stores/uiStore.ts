import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemplateId, ViewMode, ActiveSection, AccentColorId, AccentColor } from '../types';

// Define accent color palette
export const accentColors: Record<AccentColorId, AccentColor> = {
  slate: {
    id: 'slate',
    name: 'Slate',
    primary: '#334155',
    secondary: '#64748b',
    text: '#ffffff',
  },
  navy: {
    id: 'navy',
    name: 'Navy',
    primary: '#1e3a5f',
    secondary: '#3b82f6',
    text: '#ffffff',
  },
  burgundy: {
    id: 'burgundy',
    name: 'Burgundy',
    primary: '#7f1d1d',
    secondary: '#b91c1c',
    text: '#ffffff',
  },
  teal: {
    id: 'teal',
    name: 'Teal',
    primary: '#0d9488',
    secondary: '#14b8a6',
    text: '#ffffff',
  },
};

interface UIStore {
  // Template
  selectedTemplate: TemplateId;
  setTemplate: (template: TemplateId) => void;

  // Accent color for templates
  accentColor: AccentColorId;
  setAccentColor: (color: AccentColorId) => void;

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

      // Accent color - default to slate
      accentColor: 'slate',
      setAccentColor: (color) => set({ accentColor: color }),

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
        accentColor: state.accentColor,
        // Don't persist viewMode, activeSection, jobDescription, isJobMatcherOpen
      }),
    }
  )
);
