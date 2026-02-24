export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center text-xs text-slate-400 space-y-3">
          <p className="text-sm font-semibold text-slate-500">Disclaimer</p>
          <p>
            The information provided by Best of US Investors is for educational purposes only
            and should not be considered financial advice. Investing involves risk, including
            possible loss of principal. Always conduct your own research or consult a licensed
            professional before making investment decisions. Best of US Investors and its
            partners may hold positions in the securities discussed.
          </p>
          <p className="pt-2 border-t border-slate-100 text-slate-500">
            &copy; {year} Best of US Investors. Created by Trent Grinkmeyer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
