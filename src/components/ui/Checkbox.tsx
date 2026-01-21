import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={`flex items-center gap-3 cursor-pointer min-h-[44px] py-1 ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          className="w-5 h-5 rounded border-border text-accent focus:ring-accent/50 focus:ring-2 bg-bg-primary cursor-pointer"
          {...props}
        />
        <span className="text-sm text-text-secondary">{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
