import type { TemplateProps } from './types';
import { formatDateRange } from './types';

export function TemplateTechnical({ data, accentColor }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects } = data;

  const hasContent = personalInfo.fullName || personalInfo.email;

  return (
    <div className="p-8 font-mono text-gray-800" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      {/* Header - Code style */}
      <header className="mb-6">
        <div className="text-xs text-gray-400 mb-1">// Developer Profile</div>
        <h1 className="text-2xl font-bold" style={{ color: accentColor.primary }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedinUrl || personalInfo.portfolioUrl) && (
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
            {personalInfo.linkedinUrl && (
              <span>{personalInfo.linkedinUrl.replace('https://', '').replace('www.', '')}</span>
            )}
            {personalInfo.portfolioUrl && (
              <span>{personalInfo.portfolioUrl.replace('https://', '').replace('www.', '')}</span>
            )}
          </div>
        )}
      </header>

      {/* Skills - Prominent position for tech resumes */}
      {skills.items.length > 0 && (
        <section className="mb-6 p-4 rounded-lg" style={{ backgroundColor: accentColor.primary + '10' }}>
          <h2 className="text-xs font-bold mb-3" style={{ color: accentColor.primary }}>
            {'<'}<span className="text-gray-700">TechStack</span>{' />'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.items.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded border"
                style={{
                  borderColor: accentColor.secondary,
                  color: accentColor.primary,
                  backgroundColor: 'white'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Summary */}
      {summary.text && (
        <section className="mb-6">
          <h2 className="text-xs font-bold mb-2" style={{ color: accentColor.primary }}>
            {'/**'} About {' */'}
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 pl-4 border-l-2" style={{ borderColor: accentColor.secondary }}>
            {summary.text}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold mb-3" style={{ color: accentColor.primary }}>
            {'{'} Experience {'}'}
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ backgroundColor: accentColor.secondary + '40' }} />
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[3px]" style={{ backgroundColor: accentColor.primary }} />
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-xs text-gray-500">
                      <span style={{ color: accentColor.secondary }}>@</span> {exp.company}
                      {exp.location && <span className="text-gray-400"> | {exp.location}</span>}
                    </p>
                  </div>
                  <code className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentRole)}
                  </code>
                </div>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.bullets.filter(b => b.trim()).map((bullet, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex gap-2">
                        <span style={{ color: accentColor.secondary }}>→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold mb-3" style={{ color: accentColor.primary }}>
            {'['} Projects {']'}
          </h2>
          <div className="grid gap-3">
            {projects.map((project) => (
              <div key={project.id} className="p-3 border rounded-lg" style={{ borderColor: accentColor.secondary + '40' }}>
                <h3 className="font-semibold text-sm text-gray-900">
                  {project.name}
                  {project.link && (
                    <span className="font-normal text-xs ml-2" style={{ color: accentColor.secondary }}>
                      {project.link.replace('https://', '').replace('www.', '')}
                    </span>
                  )}
                </h3>
                {project.description && (
                  <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications in two columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold mb-3" style={{ color: accentColor.primary }}>
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-xs text-gray-900">{edu.degree}</h3>
                  <p className="text-xs text-gray-500">{edu.institution}</p>
                  {edu.year && <p className="text-[10px] text-gray-400">{edu.year}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold mb-3" style={{ color: accentColor.primary }}>
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-semibold text-xs text-gray-900">{cert.name}</h3>
                  {cert.issuer && <p className="text-xs text-gray-500">{cert.issuer}</p>}
                  {cert.year && <p className="text-[10px] text-gray-400">{cert.year}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Empty state */}
      {!hasContent && (
        <div className="text-center text-gray-400 py-12">
          <p className="font-mono text-sm">// Fill in your details to see the preview</p>
        </div>
      )}
    </div>
  );
}
