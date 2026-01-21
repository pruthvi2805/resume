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
 * Opens a clean print window with just the resume content
 * This avoids browser headers/footers in the PDF output
 */
export function exportToPDF(): void {
  const resumeElement = document.getElementById('resume-print-area');
  if (!resumeElement) {
    console.error('Resume print area not found');
    return;
  }

  // Clone the resume content
  const resumeHTML = resumeElement.innerHTML;

  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (!printWindow) {
    // Fallback to regular print if popup blocked
    window.print();
    return;
  }

  // Write clean HTML to the print window
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 12px;
          line-height: 1.4;
          color: #000;
          background: #fff;
        }

        @page {
          size: letter;
          margin: 0.5in;
        }

        @media print {
          html, body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }

        /* Resume container */
        .resume-container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0.5in;
          background: white;
        }

        /* Typography for resume */
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
        h2 { font-size: 14px; font-weight: 600; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #e5e5e5; text-transform: uppercase; letter-spacing: 0.5px; }
        h3 { font-size: 13px; font-weight: 600; }
        p, li { font-size: 12px; line-height: 1.5; }

        /* Links */
        a { color: inherit; text-decoration: none; }

        /* Lists */
        ul { padding-left: 16px; margin: 4px 0; }
        li { margin-bottom: 2px; }

        /* Sections */
        section { margin-bottom: 16px; }

        /* Skills badges */
        .skill-badge {
          display: inline-block;
          padding: 2px 8px;
          margin: 2px;
          background: #f3f4f6;
          border-radius: 4px;
          font-size: 11px;
        }
      </style>
    </head>
    <body>
      <div class="resume-container">
        ${resumeHTML}
      </div>
      <script>
        // Auto-print and close
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
            // Fallback close after delay (for browsers that don't support onafterprint)
            setTimeout(function() {
              window.close();
            }, 1000);
          }, 250);
        };
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
}
