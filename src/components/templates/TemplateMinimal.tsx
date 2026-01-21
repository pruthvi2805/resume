import type { TemplateProps } from './types';
import { formatDateRange } from './types';

export function TemplateMinimal({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const hasContent = personalInfo.fullName || personalInfo.email;

  return (
    <div className="p-12 font-sans text-gray-700" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Ultra minimal header */}
      <header className="mb-12">
        <h1 className="text-3xl font-extralight text-gray-900 tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="mt-4 text-sm text-gray-400 font-light">
          {[
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location
          ].filter(Boolean).join('  ·  ')}
        </div>
        {(personalInfo.linkedinUrl || personalInfo.portfolioUrl) && (
          <div className="mt-1 text-sm text-gray-400 font-light">
            {[
              personalInfo.linkedinUrl?.replace('https://', '').replace('www.', ''),
              personalInfo.portfolioUrl?.replace('https://', '').replace('www.', '')
            ].filter(Boolean).join('  ·  ')}
          </div>
        )}
      </header>

      {/* Summary - No header, just text */}
      {summary.text && (
        <section className="mb-10">
          <p className="text-sm leading-loose text-gray-500 font-light">{summary.text}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gray-300 mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-300">
                    {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-0.5">
                  {exp.company}{exp.location && `, ${exp.location}`}
                </p>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                      <li key={idx} className="text-sm text-gray-500 font-light leading-relaxed">
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
        <section className="mb-10">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gray-300 mb-6">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm text-gray-900">{edu.degree}</h3>
                  {edu.year && <span className="text-xs text-gray-300">{edu.year}</span>}
                </div>
                <p className="text-sm text-gray-400">{edu.institution}</p>
                {edu.achievements && <p className="text-xs text-gray-400 mt-1 font-light">{edu.achievements}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills - Simple comma list */}
      {skills.items.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gray-300 mb-4">Skills</h2>
          <p className="text-sm text-gray-500 font-light">{skills.items.join('  ·  ')}</p>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gray-300 mb-4">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm">
                <span className="text-gray-700">{cert.name}</span>
                {cert.issuer && <span className="text-gray-400 font-light"> — {cert.issuer}</span>}
                {cert.year && <span className="text-gray-300 font-light"> ({cert.year})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[10px] uppercase tracking-[0.25em] text-gray-300 mb-6">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-sm text-gray-900">{project.name}</h3>
                {project.link && (
                  <p className="text-xs text-gray-300 mt-0.5">{project.link.replace('https://', '').replace('www.', '')}</p>
                )}
                {project.description && (
                  <p className="text-sm text-gray-500 font-light mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!hasContent && (
        <div className="text-center text-gray-300 py-12">
          <p className="text-sm font-light">Fill in your details to see the preview</p>
        </div>
      )}
    </div>
  );
}
