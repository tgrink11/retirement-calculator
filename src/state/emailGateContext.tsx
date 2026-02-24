import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { CalculatorInputs } from '../types/calculator';

interface EmailGateContextValue {
  isUnlocked: boolean;
  isSubmitting: boolean;
  error: string | null;
  submitEmail: (email: string, inputs: CalculatorInputs, nestEgg: number) => Promise<void>;
}

const EmailGateContext = createContext<EmailGateContextValue | null>(null);

const STORAGE_KEY = 'bousi_retirement_unlocked';

export function EmailGateProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitEmail = useCallback(
    async (email: string, inputs: CalculatorInputs, nestEgg: number) => {
      setIsSubmitting(true);
      setError(null);

      try {
        const { error: dbError } = await supabase.from('calculator_leads').insert({
          email,
          current_age: inputs.currentAge,
          current_savings: inputs.currentSavings,
          expected_return: inputs.expectedReturn,
          retirement_age: inputs.retirementAge,
          life_expectancy: inputs.lifeExpectancy,
          annual_spend: inputs.annualSpend,
          part_time_income: inputs.partTimeIncome,
          portfolio_mode: inputs.portfolioMode,
          required_nest_egg: nestEgg,
        });

        if (dbError) {
          // If the table doesn't exist or there's a DB error,
          // still unlock — don't block the user experience
          console.warn('Supabase insert failed:', dbError.message);
        }

        setIsUnlocked(true);
        try {
          localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
          // localStorage unavailable — unlock for this session only
        }
      } catch (err) {
        console.warn('Supabase request failed:', err);
        // Still unlock on network errors — don't gate on infra issues
        setIsUnlocked(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return (
    <EmailGateContext.Provider value={{ isUnlocked, isSubmitting, error, submitEmail }}>
      {children}
    </EmailGateContext.Provider>
  );
}

export function useEmailGate(): EmailGateContextValue {
  const ctx = useContext(EmailGateContext);
  if (!ctx) throw new Error('useEmailGate must be used within EmailGateProvider');
  return ctx;
}
