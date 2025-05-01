'use client';

import QuoteGrid from '@/components/QuoteGrid';
import ThemeToggle from '@/components/ThemeToggle';
import SubmitModal from '@/components/SubmitModal'


export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold">Anime Wisdom Vault</h1>
        <SubmitModal />
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <QuoteGrid />
      </main>

      {/* Footer */}
      <footer className="w-full p-4 text-center text-sm border-t border-border">
        © {new Date().getFullYear()} Anime Wisdom Vault
      </footer>
    </div>
  );
}
