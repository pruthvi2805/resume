import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../ui/Input';

export function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = data;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Personal Information</h2>
        <p className="text-sm text-text-muted">Basic contact details for your resume header</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          required
          placeholder="John Doe"
          value={personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
        />

        <Input
          label="Email"
          type="email"
          required
          placeholder="john@example.com"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
        />

        <Input
          label="Location"
          placeholder="New York, NY"
          value={personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
        />

        <Input
          label="LinkedIn URL"
          type="url"
          placeholder="https://linkedin.com/in/johndoe"
          value={personalInfo.linkedinUrl}
          onChange={(e) => updatePersonalInfo({ linkedinUrl: e.target.value })}
        />

        <Input
          label="Portfolio URL"
          type="url"
          placeholder="https://johndoe.com"
          value={personalInfo.portfolioUrl}
          onChange={(e) => updatePersonalInfo({ portfolioUrl: e.target.value })}
        />
      </div>
    </div>
  );
}
