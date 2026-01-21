import type { TemplateProps } from './types';
import { formatDateRange } from './types';

export function TemplateClassic({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const hasContent = personalInfo.fullName || personalInfo.email;

  return (
    <div className="p-8 font-serif text-gray-900 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="mt-2 text-sm text-gray-600 space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <><span>|</span><span>{personalInfo.phone}</span></>}
          {personalInfo.location && <><span>|</span><span>{personalInfo.location}</span></>}
        </div>
        <div className="mt-1 text-sm text-gray-600 space-x-2">
          {personalInfo.linkedinUrl && (
            <span>{personalInfo.linkedinUrl.replace('https://', '').replace('www.', '')}</span>
          )}
          {personalInfo.portfolioUrl && (
            <><span>|</span><span>{personalInfo.portfolioUrl.replace('https://', '').replace('www.', '')}</span></>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary.text && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm">{summary.text}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm">{exp.jobTitle}</h3>
                    <p className="text-sm italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                  </span>
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="mt-2 ml-4 list-disc text-sm space-y-1">
                    {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
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
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm">{edu.degree}</h3>
                  <p className="text-sm italic">{edu.institution}</p>
                  {edu.achievements && <p className="text-sm text-gray-600 mt-1">{edu.achievements}</p>}
                </div>
                {edu.year && <span className="text-sm text-gray-600">{edu.year}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.items.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm">{skills.items.join(' • ')}</p>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-sm">
                <span><strong>{cert.name}</strong>{cert.issuer && ` - ${cert.issuer}`}</span>
                {cert.year && <span className="text-gray-600">{cert.year}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-400 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-bold text-sm">
                  {project.name}
                  {project.link && (
                    <span className="font-normal text-gray-600 ml-2">
                      ({project.link.replace('https://', '').replace('www.', '')})
                    </span>
                  )}
                </h3>
                {project.description && <p className="text-sm mt-1">{project.description}</p>}
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
  );
}
