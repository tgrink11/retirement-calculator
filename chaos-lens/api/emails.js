export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  // Forward to Google Sheets webhook (or any webhook URL)
  const webhookUrl = process.env.EMAILS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: 'chaos-report',
        }),
      });
    } catch (e) {
      // Log but don't block user on webhook failure
      console.error('Email webhook failed:', e.message);
    }
  } else {
    // No webhook configured — just log for now
    console.log('Email collected (no webhook):', email);
  }

  return res.status(200).json({ ok: true });
}
