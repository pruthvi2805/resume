import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ResumeData,
  PersonalInfo,
  Summary,
  ExperienceEntry,
  EducationEntry,
  CertificationEntry,
  ProjectEntry,
} from '../types';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default empty resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedinUrl: '',
    portfolioUrl: '',
  },
  summary: {
    text: '',
  },
  experience: [],
  education: [],
  skills: {
    items: [],
  },
  certifications: [],
  projects: [],
};

interface ResumeStore {
  // Data
  data: ResumeData;

  // Personal Info actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Summary actions
  updateSummary: (summary: Partial<Summary>) => void;

  // Experience actions
  addExperience: () => void;
  updateExperience: (id: string, entry: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;

  // Education actions
  addEducation: () => void;
  updateEducation: (id: string, entry: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  // Skills actions
  updateSkills: (skills: string[]) => void;

  // Certifications actions
  addCertification: () => void;
  updateCertification: (id: string, entry: Partial<CertificationEntry>) => void;
  removeCertification: (id: string) => void;

  // Projects actions
  addProject: () => void;
  updateProject: (id: string, entry: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;

  // General actions
  clearAll: () => void;
  importData: (data: ResumeData) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultResumeData,

      // Personal Info
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),

      // Summary
      updateSummary: (summary) =>
        set((state) => ({
          data: {
            ...state.data,
            summary: { ...state.data.summary, ...summary },
          },
        })),

      // Experience
      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              {
                id: generateId(),
                jobTitle: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                isCurrentRole: false,
                bullets: [''],
              },
            ],
          },
        })),

      updateExperience: (id, entry) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((e) =>
              e.id === id ? { ...e, ...entry } : e
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((e) => e.id !== id),
          },
        })),

      reorderExperience: (fromIndex, toIndex) =>
        set((state) => {
          const newExperience = [...state.data.experience];
          const [removed] = newExperience.splice(fromIndex, 1);
          newExperience.splice(toIndex, 0, removed);
          return {
            data: {
              ...state.data,
              experience: newExperience,
            },
          };
        }),

      // Education
      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                id: generateId(),
                degree: '',
                institution: '',
                year: '',
                achievements: '',
              },
            ],
          },
        })),

      updateEducation: (id, entry) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((e) =>
              e.id === id ? { ...e, ...entry } : e
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((e) => e.id !== id),
          },
        })),

      // Skills
      updateSkills: (items) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: { items },
          },
        })),

      // Certifications
      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [
              ...state.data.certifications,
              {
                id: generateId(),
                name: '',
                issuer: '',
                year: '',
              },
            ],
          },
        })),

      updateCertification: (id, entry) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((c) =>
              c.id === id ? { ...c, ...entry } : c
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter((c) => c.id !== id),
          },
        })),

      // Projects
      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              {
                id: generateId(),
                name: '',
                description: '',
                link: '',
              },
            ],
          },
        })),

      updateProject: (id, entry) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) =>
              p.id === id ? { ...p, ...entry } : p
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((p) => p.id !== id),
          },
        })),

      // General
      clearAll: () => set({ data: defaultResumeData }),

      importData: (data) => set({ data }),
    }),
    {
      name: 'resume-builder-data',
    }
  )
);
