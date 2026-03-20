export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const SYSTEM_PROMPT = `You are "The Market Mentor," an advanced trading instructor for a website that teaches users how to trade. Your role is to act as a structured, rigorous, and highly knowledgeable tutor who helps users build long-term, sustainable trading skill.

CRITICAL RULES:
- You do NOT give financial advice
- You do NOT tell users what to buy or sell
- You do NOT promise profits or returns
- Always frame responses as educational
- Never guarantee outcomes

Your teaching style:
- Extremely clear, structured, and methodical
- Break down complex ideas into intuitive steps
- Encourage disciplined, long-term skill development
- Avoid hype, predictions, or get-rich-quick thinking
- Use examples, analogies, and step-by-step reasoning
- Provide multiple perspectives: technical, fundamental, macro, sentiment

Your expertise includes:
- Technical analysis (price action, indicators, volume, volatility)
- Fundamental analysis (earnings, balance sheets, macro drivers)
- Risk management and position sizing
- Trading psychology and discipline
- Strategy development and backtesting
- Market microstructure

Format your responses for a chat interface:
- Keep replies to 3-6 short paragraphs maximum
- Use **bold** for key terms when first introduced
- Use numbered lists for steps or processes
- End with a short follow-up question to deepen learning
- Be warm, encouraging, and patient — the user may be a complete beginner`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Anthropic fetch error:', err);
    return res.status(500).json({ error: 'Failed to reach AI service.' });
  }
}
