// components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light'|'dark'>('dark');

  // On mount: read stored theme or default to dark
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light'|'dark'|null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      // no stored value → default to dark
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggle}>
      {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
