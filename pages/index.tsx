import { useState, useEffect } from 'react';

interface Snippet {
  prompt: string;
  code: string;
  createdAt: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [history, setHistory] = useState<Snippet[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('snippets');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setCode(data.code?.trim() || '');
  };

  const saveSnippet = () => {
    const newSnippet: Snippet = {
      prompt,
      code,
      createdAt: new Date().toISOString(),
    };
   const updated = [newSnippet, ...history];
    setHistory(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('snippets', JSON.stringify(updated));
    }
  };

  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteSnippet = (index: number) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('snippets', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Code Snippet Memo</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="PythonでFizzBuzzを書いて"
          className="w-full p-2 border rounded mb-2"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          生成
        </button>
      </form>

      {code && (
        <div className="mb-6">
          <pre className="bg-gray-900 text-green-200 p-4 rounded overflow-x-auto">
            <code>{code}</code>
          </pre>
          <button
            onClick={saveSnippet}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
         >
            保存
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-2">履歴</h2>
      <ul className="space-y-4">
        {history.map((snip, idx) => (
          <li key={idx} className="border rounded p-2 bg-white">
            <p className="font-medium">{snip.prompt}</p>
            <pre className="bg-gray-900 text-green-200 p-2 rounded mt-1 overflow-x-auto">
              <code>{snip.code}</code>
            </pre>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-gray-200 px-2 py-1 rounded"
                onClick={() => copySnippet(snip.code)}
              >
                コピー
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteSnippet(idx)}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}