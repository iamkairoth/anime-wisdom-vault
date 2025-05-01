// components/QuoteCard.tsx
'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface Quote {
  ID: number;
  Anime: string;
  Character: string;
  Quote: string;
  AvatarURL?: string; // optional
}

interface QuoteCardProps {
  quote: Quote;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="shadow-md hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle>{quote.Anime.replace(/[()]/g, '')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-2">
          {quote.AvatarURL && (
            <Image
              src={quote.AvatarURL}
              alt={quote.Character}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}
          <span className="font-bold">{quote.Character}</span>
        </div>
        <p className="text-sm leading-relaxed">{quote.Quote}</p>
      </CardContent>
    </Card>
  );
}
