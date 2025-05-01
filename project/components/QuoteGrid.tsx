'use client';

import { useEffect, useState } from 'react';
import QuoteCard, { Quote } from './QuoteCard';

export default function QuoteGrid() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const QUOTES_PER_PAGE = 20;

  useEffect(() => {
    fetch('/api/quotes')
      .then((res) => res.json())
      .then((data) => {
        setQuotes(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Failed to load quotes:', err);
        setQuotes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(quotes.length / QUOTES_PER_PAGE);
  const startIndex = page * QUOTES_PER_PAGE;
  const currentQuotes = quotes.slice(startIndex, startIndex + QUOTES_PER_PAGE);

  if (loading) {
    return <p className="text-center py-8">Loading quotes…</p>;
  }

  if (!quotes.length) {
    return <p className="text-center py-8">No quotes available.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {currentQuotes.map((q) => (
          <QuoteCard key={q.xata_id || q.ID} quote={q} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          ⬅ Previous
        </button>

        <span>
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
