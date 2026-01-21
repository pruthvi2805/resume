import { useState } from 'react';
import { useUIStore, accentColors } from '../../stores/uiStore';
import type { TemplateId, AccentColorId } from '../../types';

const templates: { id: TemplateId; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'compact', label: 'Compact' },
  { id: 'executive', label: 'Executive' },
  { id: 'technical', label: 'Technical' },
];

const colorOptions: { id: AccentColorId; label: string }[] = [
  { id: 'slate', label: 'Slate' },
  { id: 'navy', label: 'Navy' },
  { id: 'burgundy', label: 'Burgundy' },
  { id: 'teal', label: 'Teal' },
];

interface MobileFABProps {
  onDownload: () => void;
  canDownload: boolean;
  visible: boolean;
}

export function MobileFAB({ onDownload, canDownload, visible }: MobileFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedTemplate, setTemplate, accentColor, setAccentColor, viewMode, setViewMode } = useUIStore();

  // Don't render if not visible
  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden fixed bottom-[100px] right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 transition-all active:scale-95 ${
          isOpen ? 'bg-text-primary rotate-45' : 'bg-accent'
        }`}
        aria-label={isOpen ? 'Close settings' : 'Open settings'}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Expanded Panel */}
      {isOpen && (
        <div className="lg:hidden fixed bottom-[170px] right-4 w-72 max-w-[calc(100vw-32px)] bg-bg-surface rounded-2xl shadow-xl border border-border z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-bg-hover border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Resume Settings</h3>
          </div>

          <div className="p-4 space-y-4">
            {/* View Mode Toggle */}
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2 block">
                View Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('normal')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg min-h-[44px] transition-all ${
                    viewMode === 'normal'
                      ? 'bg-accent text-white'
                      : 'bg-bg-hover text-text-primary'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setViewMode('ats')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg min-h-[44px] transition-all ${
                    viewMode === 'ats'
                      ? 'bg-accent text-white'
                      : 'bg-bg-hover text-text-primary'
                  }`}
                >
                  ATS View
                </button>
              </div>
            </div>

            {/* Template Picker */}
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2 block">
                Template
              </label>
              <div className="grid grid-cols-3 gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`px-2 py-2.5 text-xs font-medium rounded-lg min-h-[44px] transition-all ${
                      selectedTemplate === t.id
                        ? 'bg-accent text-white'
                        : 'bg-bg-hover text-text-primary'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <label className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2 block">
                Accent Color
              </label>
              <div className="flex gap-3 justify-center">
                {colorOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setAccentColor(c.id)}
                    className={`w-11 h-11 rounded-full border-3 transition-all ${
                      accentColor === c.id
                        ? 'border-text-primary scale-110'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: accentColors[c.id].primary }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => {
                onDownload();
                setIsOpen(false);
              }}
              disabled={!canDownload}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 min-h-[48px] font-medium transition-all ${
                canDownload
                  ? 'bg-accent text-white active:scale-98'
                  : 'bg-bg-hover text-text-muted cursor-not-allowed'
              }`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
}
