import type { TemplateProps } from './types';
import { formatDateRange } from './types';

export function TemplateExecutive({ data, accentColor }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const hasContent = personalInfo.fullName || personalInfo.email;
  const hasSidebar = skills.items.length > 0 || certifications.length > 0 || personalInfo.email;

  return (
    <div className="flex min-h-full font-sans text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      {hasSidebar && (
        <div className="w-[180px] flex-shrink-0 p-6 text-white" style={{ backgroundColor: accentColor.primary }}>
          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-[10px] uppercase tracking-widest opacity-70 mb-3">Contact</h2>
            <div className="space-y-2 text-xs">
              {personalInfo.email && (
                <div className="break-all opacity-90">{personalInfo.email}</div>
              )}
              {personalInfo.phone && (
                <div className="opacity-90">{personalInfo.phone}</div>
              )}
              {personalInfo.location && (
                <div className="opacity-90">{personalInfo.location}</div>
              )}
              {personalInfo.linkedinUrl && (
                <div className="opacity-80 break-all">
                  {personalInfo.linkedinUrl.replace('https://', '').replace('www.', '')}
                </div>
              )}
              {personalInfo.portfolioUrl && (
                <div className="opacity-80 break-all">
                  {personalInfo.portfolioUrl.replace('https://', '').replace('www.', '')}
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.items.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[10px] uppercase tracking-widest opacity-70 mb-3">Skills</h2>
              <div className="space-y-1.5">
                {skills.items.map((skill, idx) => (
                  <div key={idx} className="text-xs opacity-90">{skill}</div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[10px] uppercase tracking-widest opacity-70 mb-3">Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-medium opacity-95">{cert.name}</div>
                    {cert.issuer && <div className="opacity-70">{cert.issuer}</div>}
                    {cert.year && <div className="opacity-60">{cert.year}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="mb-6 pb-4 border-b-2" style={{ borderColor: accentColor.primary }}>
          <h1 className="text-2xl font-bold" style={{ color: accentColor.primary }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
        </header>

        {/* Summary */}
        {summary.text && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor.primary }}>
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{summary.text}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor.primary }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location && ` | ${exp.location}`}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                    </span>
                  </div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['•'] before:absolute before:left-0" style={{ color: 'inherit' }}>
                          <span style={{ color: accentColor.secondary }} className="absolute left-0">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor.primary }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    {edu.achievements && <p className="text-xs text-gray-500 mt-1">{edu.achievements}</p>}
                  </div>
                  {edu.year && <span className="text-xs text-gray-500">{edu.year}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor.primary }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold text-sm text-gray-900">
                    {project.name}
                    {project.link && (
                      <span className="font-normal text-gray-500 ml-2 text-xs">
                        {project.link.replace('https://', '').replace('www.', '')}
                      </span>
                    )}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!hasContent && (
          <div className="text-center text-gray-400 py-12">
            <p>Fill in your details to see the preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
