import { useState, type FormEvent, type ReactNode } from 'react';
import { useEmailGate } from '../state/emailGateContext';
import { useCalculator } from '../state/calculatorContext';

interface EmailGateProps {
  children: ReactNode;
}

export function EmailGate({ children }: EmailGateProps) {
  const { isUnlocked, isSubmitting, error, submitEmail } = useEmailGate();
  const { inputs, result } = useCalculator();
  const [email, setEmail] = useState('');

  if (isUnlocked) {
    return <>{children}</>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      submitEmail(email.trim(), inputs, result.requiredNestEgg);
    }
  };

  return (
    <div className="relative">
      {/* Blurred preview of gated content */}
      <div className="blur-sm pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-start justify-center pt-16 bg-white/60 backdrop-blur-sm rounded-lg">
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 max-w-md mx-4 w-full">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Unlock Your Full Retirement Plan
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Enter your email to see your savings gap, portfolio allocation,
              Monte Carlo simulations, and year-by-year projections.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Unlocking...' : 'Get My Full Plan'}
            </button>
            {error && (
              <p className="text-xs text-red-600 text-center">{error}</p>
            )}
          </form>

          <p className="text-xs text-slate-400 text-center mt-3">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
}
