import type { ResumeData } from '../../types';

export interface TemplateProps {
  data: ResumeData;
}

// Helper to format date for display
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

// Helper to format date range
export function formatDateRange(start: string, end: string, isCurrent: boolean): string {
  const startFormatted = formatDate(start);
  const endFormatted = isCurrent ? 'Present' : formatDate(end);
  if (!startFormatted) return '';
  return `${startFormatted} - ${endFormatted}`;
}
