import type { ResumeData, JobMatchResult } from '../types';

// Common words to filter out
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
  'shall', 'can', 'need', 'dare', 'ought', 'used', 'this', 'that', 'these', 'those',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'whom',
  'if', 'then', 'else', 'when', 'where', 'why', 'how', 'all', 'each', 'every',
  'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'also', 'now',
  'about', 'after', 'before', 'above', 'below', 'between', 'into', 'through',
  'during', 'under', 'again', 'further', 'once', 'here', 'there', 'any', 'our',
  'your', 'their', 'its', 'my', 'his', 'her', 'up', 'down', 'out', 'off', 'over',
  'work', 'working', 'experience', 'team', 'teams', 'years', 'year', 'ability',
  'required', 'requirements', 'looking', 'seeking', 'job', 'position', 'role',
  'including', 'based', 'well', 'good', 'great', 'excellent', 'strong', 'proven',
  'ability', 'skills', 'skill', 'knowledge', 'understanding', 'familiar', 'using',
]);

// Common tech keywords to boost (case insensitive matching)
const TECH_KEYWORDS = new Set([
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby',
  'php', 'swift', 'kotlin', 'scala', 'react', 'angular', 'vue', 'node', 'nodejs',
  'express', 'django', 'flask', 'spring', 'rails', 'laravel', 'nextjs', 'next.js',
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'terraform', 'ansible',
  'jenkins', 'github', 'gitlab', 'ci/cd', 'devops', 'agile', 'scrum', 'jira',
  'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'graphql',
  'rest', 'api', 'microservices', 'serverless', 'lambda', 'cloud', 'linux',
  'git', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'webpack', 'vite',
  'testing', 'jest', 'mocha', 'cypress', 'selenium', 'machine learning', 'ml',
  'ai', 'deep learning', 'tensorflow', 'pytorch', 'data science', 'analytics',
  'figma', 'sketch', 'adobe', 'ui/ux', 'design', 'frontend', 'backend', 'fullstack',
]);

/**
 * Extract keywords from job description
 */
export function extractKeywords(text: string): string[] {
  if (!text.trim()) return [];

  // Normalize text
  const normalized = text.toLowerCase();

  // Extract words (including multi-word tech terms)
  const words: string[] = [];

  // Check for common tech phrases first
  TECH_KEYWORDS.forEach(keyword => {
    if (normalized.includes(keyword)) {
      words.push(keyword);
    }
  });

  // Extract individual words
  const singleWords = normalized
    .replace(/[^a-z0-9\s\-\/\+\#\.]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 2)
    .filter(word => !STOP_WORDS.has(word))
    .filter(word => !/^\d+$/.test(word)); // Filter pure numbers

  // Add unique single words
  singleWords.forEach(word => {
    if (!words.includes(word)) {
      words.push(word);
    }
  });

  // Count frequency and sort by it
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    const count = (normalized.match(new RegExp(word, 'gi')) || []).length;
    wordFreq.set(word, count);
  });

  // Sort by frequency (descending) and take top keywords
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 30);
}

/**
 * Get all text content from resume for matching
 */
function getResumeText(data: ResumeData): string {
  const parts: string[] = [];

  // Personal info
  parts.push(data.personalInfo.fullName);

  // Summary
  parts.push(data.summary.text);

  // Experience
  data.experience.forEach(exp => {
    parts.push(exp.jobTitle);
    parts.push(exp.company);
    exp.bullets.forEach(b => parts.push(b));
  });

  // Education
  data.education.forEach(edu => {
    parts.push(edu.degree);
    parts.push(edu.institution);
    parts.push(edu.achievements);
  });

  // Skills
  parts.push(...data.skills.items);

  // Certifications
  data.certifications.forEach(cert => {
    parts.push(cert.name);
    parts.push(cert.issuer);
  });

  // Projects
  data.projects.forEach(proj => {
    parts.push(proj.name);
    parts.push(proj.description);
  });

  return parts.join(' ').toLowerCase();
}

/**
 * Calculate job match result
 */
export function calculateJobMatch(data: ResumeData, jobDescription: string): JobMatchResult {
  if (!jobDescription.trim()) {
    return {
      matchPercentage: 0,
      foundKeywords: [],
      missingKeywords: [],
      suggestions: [],
    };
  }

  const keywords = extractKeywords(jobDescription);
  const resumeText = getResumeText(data);

  const foundKeywords: string[] = [];
  const missingKeywords: string[] = [];

  keywords.forEach(keyword => {
    // Check if keyword exists in resume (with some flexibility)
    const keywordPattern = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(keywordPattern, 'i');

    if (regex.test(resumeText)) {
      foundKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  // Calculate match percentage
  const matchPercentage = keywords.length > 0
    ? Math.round((foundKeywords.length / keywords.length) * 100)
    : 0;

  // Generate suggestions
  const suggestions = missingKeywords.slice(0, 5).map(keyword => {
    if (TECH_KEYWORDS.has(keyword)) {
      return `Add "${keyword}" to your skills section`;
    }
    return `Consider mentioning "${keyword}" in your experience or summary`;
  });

  return {
    matchPercentage,
    foundKeywords,
    missingKeywords,
    suggestions,
  };
}
