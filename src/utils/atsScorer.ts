import type { ResumeData, ATSScore, ATSScoreBreakdown } from '../types';

/**
 * Calculate ATS score for a resume
 *
 * Scoring breakdown:
 * - Contact Info: 20 points (name, email, phone, location, links)
 * - Summary: 15 points (has summary of appropriate length)
 * - Experience: 25 points (has experience with dates, bullets)
 * - Education: 15 points (has education entries)
 * - Skills: 15 points (has skills listed)
 * - Formatting: 10 points (overall structure quality)
 */
export function calculateATSScore(data: ResumeData): ATSScore {
  const breakdown: ATSScoreBreakdown = {
    contactInfo: calculateContactScore(data),
    formatting: calculateFormattingScore(data),
    keywords: 0, // Will be calculated separately with job description
    length: calculateLengthScore(data),
    sections: calculateSectionsScore(data),
  };

  const overall = Math.round(
    breakdown.contactInfo +
    breakdown.formatting +
    breakdown.length +
    breakdown.sections
  );

  return {
    overall: Math.min(100, overall),
    breakdown,
  };
}

function calculateContactScore(data: ResumeData): number {
  const { personalInfo } = data;
  let score = 0;
  const maxScore = 20;

  // Name (6 points)
  if (personalInfo.fullName.trim()) score += 6;

  // Email (6 points)
  if (personalInfo.email.trim()) {
    score += 4;
    // Bonus for valid email format
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      score += 2;
    }
  }

  // Phone (4 points)
  if (personalInfo.phone.trim()) score += 4;

  // Location (2 points)
  if (personalInfo.location.trim()) score += 2;

  // LinkedIn or Portfolio (2 points)
  if (personalInfo.linkedinUrl.trim() || personalInfo.portfolioUrl.trim()) {
    score += 2;
  }

  return Math.min(maxScore, score);
}

function calculateFormattingScore(data: ResumeData): number {
  let score = 0;
  const maxScore = 10;

  // Check for proper structure
  const hasAnyExperience = data.experience.length > 0;
  const hasAnyEducation = data.education.length > 0;
  const hasAnySkills = data.skills.items.length > 0;

  // Basic structure (4 points)
  if (hasAnyExperience || hasAnyEducation) score += 4;

  // Experience bullets are filled (3 points)
  const experienceWithBullets = data.experience.filter(
    exp => exp.bullets.some(b => b.trim().length > 20)
  );
  if (experienceWithBullets.length > 0) score += 3;

  // Skills section filled (3 points)
  if (hasAnySkills && data.skills.items.length >= 3) score += 3;

  return Math.min(maxScore, score);
}

function calculateLengthScore(data: ResumeData): number {
  let score = 0;
  const maxScore = 15;

  // Summary length (5 points)
  const summaryLength = data.summary.text.length;
  if (summaryLength >= 100 && summaryLength <= 500) {
    score += 5;
  } else if (summaryLength >= 50) {
    score += 3;
  } else if (summaryLength > 0) {
    score += 1;
  }

  // Experience content (5 points)
  const totalBulletLength = data.experience.reduce((acc, exp) => {
    return acc + exp.bullets.reduce((bAcc, b) => bAcc + b.length, 0);
  }, 0);
  if (totalBulletLength >= 500) {
    score += 5;
  } else if (totalBulletLength >= 200) {
    score += 3;
  } else if (totalBulletLength > 0) {
    score += 1;
  }

  // Number of skills (5 points)
  const skillCount = data.skills.items.length;
  if (skillCount >= 8) {
    score += 5;
  } else if (skillCount >= 5) {
    score += 3;
  } else if (skillCount >= 2) {
    score += 2;
  } else if (skillCount > 0) {
    score += 1;
  }

  return Math.min(maxScore, score);
}

function calculateSectionsScore(data: ResumeData): number {
  let score = 0;
  const maxScore = 55; // This is the bulk of the score

  // Experience section (25 points)
  if (data.experience.length > 0) {
    const expWithDetails = data.experience.filter(
      exp => exp.jobTitle && exp.company && exp.startDate
    );
    if (expWithDetails.length >= 2) {
      score += 25;
    } else if (expWithDetails.length === 1) {
      score += 15;
    } else if (data.experience.length > 0) {
      score += 5;
    }
  }

  // Education section (15 points)
  if (data.education.length > 0) {
    const eduWithDetails = data.education.filter(
      edu => edu.degree && edu.institution
    );
    if (eduWithDetails.length >= 1) {
      score += 15;
    } else {
      score += 5;
    }
  }

  // Summary section (10 points)
  if (data.summary.text.trim().length >= 50) {
    score += 10;
  } else if (data.summary.text.trim().length > 0) {
    score += 5;
  }

  // Certifications bonus (3 points)
  if (data.certifications.length > 0) {
    score += 3;
  }

  // Projects bonus (2 points)
  if (data.projects.length > 0) {
    score += 2;
  }

  return Math.min(maxScore, score);
}

/**
 * Get score color based on value
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
}

/**
 * Get score label based on value
 */
export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Needs Work';
  return 'Getting Started';
}

/**
 * Get improvement suggestions based on score breakdown
 */
export function getImprovementSuggestions(data: ResumeData, breakdown: ATSScoreBreakdown): string[] {
  const suggestions: string[] = [];

  // Contact info suggestions
  if (breakdown.contactInfo < 20) {
    if (!data.personalInfo.fullName.trim()) {
      suggestions.push('Add your full name');
    }
    if (!data.personalInfo.email.trim()) {
      suggestions.push('Add your email address');
    }
    if (!data.personalInfo.phone.trim()) {
      suggestions.push('Add your phone number');
    }
    if (!data.personalInfo.linkedinUrl.trim() && !data.personalInfo.portfolioUrl.trim()) {
      suggestions.push('Add a LinkedIn profile or portfolio URL');
    }
  }

  // Summary suggestions
  if (!data.summary.text.trim()) {
    suggestions.push('Add a professional summary (2-3 sentences)');
  } else if (data.summary.text.length < 100) {
    suggestions.push('Expand your professional summary');
  }

  // Experience suggestions
  if (data.experience.length === 0) {
    suggestions.push('Add work experience');
  } else {
    const incompleteExp = data.experience.filter(
      exp => !exp.jobTitle || !exp.company || !exp.startDate
    );
    if (incompleteExp.length > 0) {
      suggestions.push('Complete all experience entries with job title, company, and dates');
    }
    const expWithoutBullets = data.experience.filter(
      exp => !exp.bullets.some(b => b.trim().length > 20)
    );
    if (expWithoutBullets.length > 0) {
      suggestions.push('Add detailed bullet points to describe your achievements');
    }
  }

  // Education suggestions
  if (data.education.length === 0) {
    suggestions.push('Add your education');
  }

  // Skills suggestions
  if (data.skills.items.length === 0) {
    suggestions.push('Add your skills');
  } else if (data.skills.items.length < 5) {
    suggestions.push('Add more skills (aim for 8-12)');
  }

  return suggestions.slice(0, 5); // Return top 5 suggestions
}
