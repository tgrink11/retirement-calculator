export function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Best of US Investors Retirement Calculator
            </h1>
            <p className="text-sm text-slate-500">Realistic aging-adjusted projections</p>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
            Free Tool
          </span>
        </div>
      </div>
    </header>
  );
}
