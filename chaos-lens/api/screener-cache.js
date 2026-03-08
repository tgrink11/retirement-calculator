/**
 * Screener Cache API — reads/writes screener results from Supabase
 * GET: Returns today's cached results (if any)
 * POST: Saves scan results for today (upsert)
 */
export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(200).json({ results: null, error: 'Supabase not configured' });
  }

  const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
  };

  const today = new Date().toISOString().split('T')[0];

  // GET — fetch today's cached results
  if (req.method === 'GET') {
    try {
      const resp = await fetch(
        `${supabaseUrl}/rest/v1/screener_cache?scan_date=eq.${today}&select=results,scanned_at,scan_date&limit=1`,
        { headers }
      );

      if (!resp.ok) {
        return res.status(200).json({ results: null });
      }

      const data = await resp.json();
      if (data.length > 0) {
        res.setHeader('Cache-Control', 's-maxage=300'); // 5 min edge cache
        return res.status(200).json({
          results: data[0].results,
          scannedAt: data[0].scanned_at,
          date: data[0].scan_date,
        });
      }

      return res.status(200).json({ results: null });
    } catch (e) {
      console.error('Cache read failed:', e.message);
      return res.status(200).json({ results: null });
    }
  }

  // POST — save scan results for today
  if (req.method === 'POST') {
    try {
      const { results } = req.body || {};
      if (!Array.isArray(results) || results.length === 0) {
        return res.status(400).json({ error: 'Non-empty results array required' });
      }

      // Upsert: insert or update today's row (scan_date is UNIQUE)
      const resp = await fetch(
        `${supabaseUrl}/rest/v1/screener_cache`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Prefer': 'resolution=merge-duplicates,return=representation',
          },
          body: JSON.stringify({
            scan_date: today,
            results,
            scanned_at: new Date().toISOString(),
          }),
        }
      );

      if (!resp.ok) {
        const err = await resp.text();
        console.error('Supabase upsert failed:', err);
        return res.status(200).json({ ok: false, error: err });
      }

      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error('Cache save failed:', e.message);
      return res.status(200).json({ ok: false });
    }
  }

  return res.status(405).json({ error: 'GET or POST only' });
}
