import type { NextApiRequest, NextApiResponse } from 'next';

type Data = { code: string } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body as { prompt?: string };
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Missing OpenAI API key' });
    return;
  }

  const fullPrompt = `以下の処理を対応するコードで返してください（コメント付き）: ${prompt}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [{ role: 'user', content: fullPrompt }],
      }),
    });

    const json = await response.json();
    const code = json.choices?.[0]?.message?.content || '';
    res.status(200).json({ code });
  } catch (err) {
  res.status(500).json({ error: 'Failed to generate code' });
  }}