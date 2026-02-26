import { CalculatorProvider } from './state/calculatorContext';
import { EmailGateProvider } from './state/emailGateContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SavingsInputs } from './components/inputs/SavingsInputs';
import { AgeInputs } from './components/inputs/AgeInputs';
import { SpendingInputs } from './components/inputs/SpendingInputs';
import { InflationInputs } from './components/inputs/InflationInputs';
import { AdvancedInputs } from './components/inputs/AdvancedInputs';
import { NestEggSummary } from './components/results/NestEggSummary';
import { SavingsGapSummary } from './components/results/SavingsGapSummary';
import { OutcomeVerdict } from './components/results/OutcomeVerdict';
import { DrawdownChart } from './components/charts/DrawdownChart';
import { SpendingBreakdownChart } from './components/charts/SpendingBreakdownChart';
import { MonteCarloChart } from './components/charts/MonteCarloChart';
import { PortfolioPieChart } from './components/charts/PortfolioPieChart';
import { YearByYearTable } from './components/results/YearByYearTable';
import { AssumptionsSummary } from './components/results/AssumptionsSummary';
import { EmailGate } from './components/EmailGate';
import { Guide } from './components/layout/Guide';

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="print:hidden">
          <Guide />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel — always visible */}
          <div className="lg:col-span-4 space-y-4">
            <SavingsInputs />
            <AgeInputs />
            <SpendingInputs />
            <InflationInputs />
            <AdvancedInputs />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-8 space-y-6">
            {/* Print-only header with logo — hidden on screen */}
            <div className="hidden print:block text-center mb-2">
              <img src="/logo.png" alt="Best of US Investors" className="mx-auto h-16 mb-2" />
              <p className="text-sm text-slate-500">Retirement Calculator Report</p>
            </div>

            {/* Teaser — always visible */}
            <NestEggSummary />

            {/* Print button — always visible */}
            <div className="flex justify-end print:hidden">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print to PDF
              </button>
            </div>

            {/* Gated — requires email to unlock */}
            <EmailGate>
              <div className="space-y-6">
                <SavingsGapSummary />
                <OutcomeVerdict />
                <DrawdownChart />
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <SpendingBreakdownChart />
                  <PortfolioPieChart />
                </div>
                <MonteCarloChart />
                <YearByYearTable />
                <AssumptionsSummary />
              </div>
            </EmailGate>

            {/* Print-only disclaimer — hidden on screen */}
            <div className="hidden print:block mt-8 pt-4 border-t border-slate-200 text-xs text-slate-400 text-center space-y-2">
              <p className="font-semibold text-slate-500">Disclaimer</p>
              <p>
                The information provided by Best of US Investors is for educational purposes only
                and should not be considered financial advice. Investing involves risk, including
                possible loss of principal. Always conduct your own research or consult a licensed
                professional before making investment decisions. Best of US Investors and its
                partners may hold positions in the securities discussed.
              </p>
              <p className="pt-2 border-t border-slate-100 text-slate-500">
                &copy; {new Date().getFullYear()} Best of US Investors. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CalculatorProvider>
      <EmailGateProvider>
        <AppContent />
      </EmailGateProvider>
    </CalculatorProvider>
  );
}
