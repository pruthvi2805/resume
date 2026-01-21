import type { TemplateProps } from './types';
import { formatDateRange } from './types';

export function TemplateCompact({ data, accentColor }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const hasContent = personalInfo.fullName || personalInfo.email;

  return (
    <div className="p-6 font-sans text-gray-800 text-[13px]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header - Compact */}
      <header className="border-b pb-3 mb-4" style={{ borderColor: accentColor.secondary + '60' }}>
        <h1 className="text-xl font-bold" style={{ color: accentColor.primary }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedinUrl && (
            <span>• {personalInfo.linkedinUrl.replace('https://', '').replace('www.', '')}</span>
          )}
          {personalInfo.portfolioUrl && (
            <span>• {personalInfo.portfolioUrl.replace('https://', '').replace('www.', '')}</span>
          )}
        </div>
      </header>

      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 min-w-0">
          {/* Summary */}
          {summary.text && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase mb-1" style={{ color: accentColor.primary }}>Summary</h2>
              <p className="text-gray-600 leading-relaxed">{summary.text}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase mb-2" style={{ color: accentColor.primary }}>Experience</h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                        <p className="text-gray-600">{exp.company}{exp.location && ` | ${exp.location}`}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                      </span>
                    </div>
                    {exp.bullets.filter(b => b.trim()).length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                          <li key={idx} className="text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
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
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase mb-2" style={{ color: accentColor.primary }}>Education</h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      {edu.achievements && <p className="text-gray-500 text-xs mt-0.5">{edu.achievements}</p>}
                    </div>
                    {edu.year && <span className="text-xs text-gray-500">{edu.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xs font-bold uppercase mb-2" style={{ color: accentColor.primary }}>Projects</h2>
              <div className="space-y-2">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                      {project.link && (
                        <span className="font-normal text-gray-500 ml-1 text-xs">
                          ({project.link.replace('https://', '').replace('www.', '')})
                        </span>
                      )}
                    </h3>
                    {project.description && (
                      <p className="text-gray-600">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Skills & Certs */}
        {(skills.items.length > 0 || certifications.length > 0) && (
          <div className="w-40 flex-shrink-0 border-l pl-4" style={{ borderColor: accentColor.secondary + '40' }}>
            {/* Skills */}
            {skills.items.length > 0 && (
              <section className="mb-4">
                <h2 className="text-xs font-bold uppercase mb-2" style={{ color: accentColor.primary }}>Skills</h2>
                <div className="space-y-1">
                  {skills.items.map((skill, idx) => (
                    <div key={idx} className="text-gray-600">{skill}</div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="mb-4">
                <h2 className="text-xs font-bold uppercase mb-2" style={{ color: accentColor.primary }}>Certifications</h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className="font-medium text-gray-900">{cert.name}</div>
                      {cert.issuer && <div className="text-gray-500 text-xs">{cert.issuer}</div>}
                      {cert.year && <div className="text-gray-400 text-xs">{cert.year}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Empty state */}
      {!hasContent && (
        <div className="text-center text-gray-400 py-12">
          <p>Fill in your details to see the preview</p>
        </div>
      )}
    </div>
  );
}
