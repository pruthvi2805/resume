import type { ResumeData } from '../types';

/**
 * Generates a filename for the PDF based on the user's name
 */
export function generateFilename(data: ResumeData): string {
  const name = data.personalInfo.fullName.trim();
  if (name) {
    // Convert name to filename-safe format
    const safeName = name
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '_');
    return `${safeName}_Resume.pdf`;
  }
  return 'Resume.pdf';
}

/**
 * Check if resume has enough content to export
 */
export function canExportPDF(data: ResumeData): boolean {
  const hasName = data.personalInfo.fullName.trim().length > 0;
  const hasEmail = data.personalInfo.email.trim().length > 0;
  return hasName || hasEmail;
}

/**
 * Triggers the browser print dialog for PDF export
 * The print styles in index.css will handle showing only the resume
 */
export function exportToPDF(): void {
  window.print();
}
