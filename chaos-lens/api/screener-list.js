export default async function handler(req, res) {
  const key = process.env.FMP_KEY;
  if (!key) return res.status(500).json({ error: 'FMP_KEY not configured' });

  try {
    // Fetch S&P 500 constituents and small/mid-cap universe in parallel
    const [sp500Res, screenerRes] = await Promise.allSettled([
      fetch(`https://financialmodelingprep.com/api/v3/sp500_constituent?apikey=${key}`),
      fetch(`https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=300000000&marketCapLessThan=10000000000&exchange=NYSE,NASDAQ&limit=2000&apikey=${key}`),
    ]);

    const symbols = new Map();

    // Process S&P 500
    if (sp500Res.status === 'fulfilled' && sp500Res.value.ok) {
      const data = await sp500Res.value.json();
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.symbol) {
            symbols.set(item.symbol, {
              symbol: item.symbol,
              name: item.name || item.symbol,
              sector: item.sector || 'Unknown',
              universe: 'SP500',
            });
          }
        }
      }
    }

    // Process small/mid-cap screener (Russell 2000 proxy)
    if (screenerRes.status === 'fulfilled' && screenerRes.value.ok) {
      const data = await screenerRes.value.json();
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.symbol && !symbols.has(item.symbol)) {
            symbols.set(item.symbol, {
              symbol: item.symbol,
              name: item.companyName || item.symbol,
              sector: item.sector || 'Unknown',
              universe: 'SmallMidCap',
            });
          }
        }
      }
    }

    const result = Array.from(symbols.values());

    if (result.length === 0) {
      return res.status(502).json({ error: 'No symbols returned from FMP' });
    }

    // Cache for 24 hours — constituent lists don't change often
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');
    return res.status(200).json(result);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
