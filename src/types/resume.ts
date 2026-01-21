// Personal Information
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

// Professional Summary
export interface Summary {
  text: string;
}

// Work Experience Entry
export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string; // YYYY-MM format
  endDate: string; // YYYY-MM format or "present"
  isCurrentRole: boolean;
  bullets: string[];
}

// Education Entry
export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year: string;
  achievements: string;
}

// Certification Entry
export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

// Project Entry
export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  link: string;
}

// Skills
export interface Skills {
  items: string[]; // Array of skill strings
}

// Complete Resume Data
export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: Summary;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: Skills;
  certifications: CertificationEntry[];
  projects: ProjectEntry[];
}

// Template Types
export type TemplateId = 'classic' | 'modern' | 'minimal' | 'compact';

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
}

// ATS Score
export interface ATSScore {
  overall: number; // 0-100
  breakdown: ATSScoreBreakdown;
}

export interface ATSScoreBreakdown {
  contactInfo: number;
  formatting: number;
  keywords: number;
  length: number;
  sections: number;
}

// Job Matcher
export interface JobMatchResult {
  matchPercentage: number;
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

// UI State
export type ViewMode = 'normal' | 'ats';
export type ActiveSection =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'projects';

// Theme
export type Theme = 'light' | 'dark';

// Resume Accent Colors
export type AccentColorId = 'slate' | 'navy' | 'burgundy' | 'teal';

export interface AccentColor {
  id: AccentColorId;
  name: string;
  primary: string;    // Main accent (header bg, badges)
  secondary: string;  // Lighter accent (borders, highlights)
  text: string;       // Text on primary bg
}
