import type { TemplateProps } from './types';
import { formatDateRange } from './types';

export function TemplateMinimal({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const hasContent = personalInfo.fullName || personalInfo.email;

  return (
    <div className="p-10 font-sans text-gray-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header - Very minimal */}
      <header className="mb-10">
        <h1 className="text-2xl font-light text-gray-900 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="mt-3 text-sm text-gray-500 space-y-1">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {personalInfo.linkedinUrl && (
              <span>{personalInfo.linkedinUrl.replace('https://', '').replace('www.', '')}</span>
            )}
            {personalInfo.portfolioUrl && (
              <span>{personalInfo.portfolioUrl.replace('https://', '').replace('www.', '')}</span>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary.text && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed text-gray-600">{summary.text}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline flex-wrap gap-x-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {exp.jobTitle} <span className="font-normal text-gray-500">at {exp.company}</span>
                  </h3>
                  <span className="text-xs text-gray-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                  </span>
                </div>
                {exp.location && <p className="text-xs text-gray-400 mt-0.5">{exp.location}</p>}
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                      <li key={idx} className="text-sm text-gray-600 pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-gray-300">
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
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline flex-wrap gap-x-4">
                  <h3 className="text-sm font-medium text-gray-900">{edu.degree}</h3>
                  {edu.year && <span className="text-xs text-gray-400">{edu.year}</span>}
                </div>
                <p className="text-sm text-gray-500">{edu.institution}</p>
                {edu.achievements && <p className="text-xs text-gray-400 mt-1">{edu.achievements}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.items.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
          <p className="text-sm text-gray-600">{skills.items.join(', ')}</p>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm">
                <span className="text-gray-700">{cert.name}</span>
                {cert.issuer && <span className="text-gray-400"> — {cert.issuer}</span>}
                {cert.year && <span className="text-gray-400"> ({cert.year})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-sm font-medium text-gray-900">{project.name}</h3>
                {project.link && (
                  <p className="text-xs text-gray-400">{project.link.replace('https://', '').replace('www.', '')}</p>
                )}
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
        <div className="text-center text-gray-300 py-12">
          <p className="text-sm">Fill in your details to see the preview</p>
        </div>
      )}
    </div>
  );
}
