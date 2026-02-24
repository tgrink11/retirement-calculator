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
        <Guide />
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
            {/* Teaser — always visible */}
            <NestEggSummary />

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
