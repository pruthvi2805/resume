import type { TemplateProps } from './types';
import { formatDateRange } from './types';

export function TemplateModern({ data, accentColor }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const hasContent = personalInfo.fullName || personalInfo.email;

  return (
    <div className="font-sans text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Bold Header with accent stripe */}
      <header className="px-8 py-6" style={{ backgroundColor: accentColor.primary, color: accentColor.text }}>
        <h1 className="text-2xl font-bold tracking-tight">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedinUrl || personalInfo.portfolioUrl) && (
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-60">
            {personalInfo.linkedinUrl && (
              <span>{personalInfo.linkedinUrl.replace('https://', '').replace('www.', '')}</span>
            )}
            {personalInfo.portfolioUrl && (
              <span>{personalInfo.portfolioUrl.replace('https://', '').replace('www.', '')}</span>
            )}
          </div>
        )}
      </header>

      <div className="p-8">
        {/* Summary */}
        {summary.text && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accentColor.primary, borderColor: accentColor.primary }}>
              Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{summary.text}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: accentColor.primary, borderColor: accentColor.primary }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: accentColor.secondary + '40' }}>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location && ` · ${exp.location}`}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                    </span>
                  </div>
                  {exp.bullets.filter(b => b.trim()).length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                        <li key={idx} className="text-sm text-gray-700 pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
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
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: accentColor.primary, borderColor: accentColor.primary }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    {edu.achievements && <p className="text-sm text-gray-500 mt-1">{edu.achievements}</p>}
                  </div>
                  {edu.year && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {edu.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.items.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: accentColor.primary, borderColor: accentColor.primary }}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.items.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs font-medium rounded"
                  style={{ backgroundColor: accentColor.primary, color: accentColor.text }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: accentColor.primary, borderColor: accentColor.primary }}>
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    <strong>{cert.name}</strong>
                    {cert.issuer && <span className="text-gray-500"> · {cert.issuer}</span>}
                  </span>
                  {cert.year && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {cert.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3 pb-1 border-b-2" style={{ color: accentColor.primary, borderColor: accentColor.primary }}>
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="pl-4 border-l-2" style={{ borderColor: accentColor.secondary + '40' }}>
                  <h3 className="font-bold text-sm text-gray-900">
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
