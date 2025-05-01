'use client';

import { useState } from 'react';
import { 
  Dialog, DialogTrigger, DialogContent, 
  DialogHeader, DialogTitle, DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SubmitModal() {
  const [open, setOpen] = useState(false);
  const [anime, setAnime] = useState('');
  const [character, setCharacter] = useState('');
  const [quote, setQuote] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anime, character, quote, avatarURL })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Submission failed');
      }
      setSuccess(true);
      setAnime('');
      setCharacter('');
      setQuote('');
      setAvatarURL('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Submit Quote</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Submit New Quote</DialogTitle>
          <DialogDescription>Add a quote for review. You can approve it later from the Xata dashboard.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Anime</label>
            <Input value={anime} onChange={e => setAnime(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Character</label>
            <Input value={character} onChange={e => setCharacter(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Quote</label>
            <Textarea value={quote} onChange={e => setQuote(e.target.value)} required rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium">Avatar URL (optional)</label>
            <Input value={avatarURL} onChange={e => setAvatarURL(e.target.value)} />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Quote submitted!</p>}

          <DialogFooter className="flex justify-end space-x-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting…' : 'Submit'}
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
