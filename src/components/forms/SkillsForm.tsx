import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useResumeStore } from '../../stores/resumeStore';
import { Input } from '../ui/Input';

export function SkillsForm() {
  const { data, updateSkills } = useResumeStore();
  const { skills } = data;
  const [inputValue, setInputValue] = useState('');

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.items.includes(trimmed)) {
      updateSkills([...skills.items, trimmed]);
    }
    setInputValue('');
  };

  const removeSkill = (index: number) => {
    updateSkills(skills.items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const newSkills = pastedText.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
    const uniqueNewSkills = newSkills.filter(s => !skills.items.includes(s));
    if (uniqueNewSkills.length > 0) {
      updateSkills([...skills.items, ...uniqueNewSkills]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-1">Skills</h2>
        <p className="text-sm text-text-muted">Add your technical and professional skills</p>
      </div>

      <div className="space-y-3">
        <Input
          label="Add Skills"
          placeholder="Type a skill and press Enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        <p className="text-xs text-text-muted">
          Press Enter or comma to add. You can also paste a comma-separated list.
        </p>
      </div>

      {skills.items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.items.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="ml-1 hover:text-error transition-colors"
                title="Remove skill"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-bg-hover rounded-lg border border-border text-center">
          <p className="text-sm text-text-muted">
            No skills added yet. Start typing to add your skills.
          </p>
        </div>
      )}

      <div className="p-3 bg-bg-hover rounded-lg border border-border">
        <h4 className="text-xs font-medium text-text-secondary mb-2">Popular skill categories:</h4>
        <div className="flex flex-wrap gap-2 text-xs text-text-muted">
          <span className="px-2 py-1 bg-bg-primary rounded">Programming Languages</span>
          <span className="px-2 py-1 bg-bg-primary rounded">Frameworks</span>
          <span className="px-2 py-1 bg-bg-primary rounded">Tools & Platforms</span>
          <span className="px-2 py-1 bg-bg-primary rounded">Soft Skills</span>
        </div>
      </div>
    </div>
  );
}
