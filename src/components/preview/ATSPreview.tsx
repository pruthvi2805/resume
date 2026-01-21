import type { ResumeData } from '../../types';
import { formatDateRange } from '../templates/types';

interface ATSPreviewProps {
  data: ResumeData;
}

export function ATSPreview({ data }: ATSPreviewProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const lines: string[] = [];

  // Header
  if (personalInfo.fullName) {
    lines.push(personalInfo.fullName.toUpperCase());
  }

  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
  ].filter(Boolean);
  if (contactParts.length > 0) {
    lines.push(contactParts.join(' | '));
  }

  const linkParts = [
    personalInfo.linkedinUrl?.replace('https://', '').replace('www.', ''),
    personalInfo.portfolioUrl?.replace('https://', '').replace('www.', ''),
  ].filter(Boolean);
  if (linkParts.length > 0) {
    lines.push(linkParts.join(' | '));
  }

  lines.push('');

  // Summary
  if (summary.text) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('---');
    lines.push(summary.text);
    lines.push('');
  }

  // Experience
  if (experience.length > 0) {
    lines.push('EXPERIENCE');
    lines.push('---');
    experience.forEach((exp) => {
      lines.push(`${exp.jobTitle} at ${exp.company}`);
      if (exp.location) lines.push(exp.location);
      lines.push(formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole));
      exp.bullets.filter(b => b.trim()).forEach((bullet) => {
        lines.push(`• ${bullet}`);
      });
      lines.push('');
    });
  }

  // Education
  if (education.length > 0) {
    lines.push('EDUCATION');
    lines.push('---');
    education.forEach((edu) => {
      lines.push(edu.degree);
      lines.push(edu.institution);
      if (edu.year) lines.push(edu.year);
      if (edu.achievements) lines.push(edu.achievements);
      lines.push('');
    });
  }

  // Skills
  if (skills.items.length > 0) {
    lines.push('SKILLS');
    lines.push('---');
    lines.push(skills.items.join(', '));
    lines.push('');
  }

  // Certifications
  if (certifications.length > 0) {
    lines.push('CERTIFICATIONS');
    lines.push('---');
    certifications.forEach((cert) => {
      let line = cert.name;
      if (cert.issuer) line += ` - ${cert.issuer}`;
      if (cert.year) line += ` (${cert.year})`;
      lines.push(line);
    });
    lines.push('');
  }

  // Projects
  if (projects.length > 0) {
    lines.push('PROJECTS');
    lines.push('---');
    projects.forEach((project) => {
      lines.push(project.name);
      if (project.link) lines.push(project.link);
      if (project.description) lines.push(project.description);
      lines.push('');
    });
  }

  const hasContent = personalInfo.fullName || personalInfo.email;

  return (
    <div className="p-8 font-mono text-sm text-gray-900 bg-white">
      {hasContent ? (
        <pre className="whitespace-pre-wrap leading-relaxed">{lines.join('\n')}</pre>
      ) : (
        <pre className="whitespace-pre-wrap text-gray-400">
{`YOUR NAME
email@example.com | City, Country

PROFESSIONAL SUMMARY
---
[Fill in your details to see the ATS preview]

EXPERIENCE
---
[Add your work experience]

EDUCATION
---
[Add your education]

SKILLS
---
[Add your skills]`}
        </pre>
      )}
    </div>
  );
}
