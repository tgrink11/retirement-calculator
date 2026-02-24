export interface AssetClass {
  name: string;
  annualVolatility: number;
  expectedReturn: number;
  color: string;
}

export interface AllocationEntry extends AssetClass {
  weight: number;
}

export interface PortfolioAllocation {
  allocations: AllocationEntry[];
  expectedPortfolioReturn: number;
  portfolioVolatility: number;
}
