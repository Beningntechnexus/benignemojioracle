'use client';

import { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import EmojiPicker from '@/components/emoji-picker';
import FortuneCard from '@/components/fortune-card';
import { generateEmojiFortune } from '@/ai/flows/generate-emoji-fortune';
import { getStreak } from '@/lib/streaks';
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    Telegram: any;
  }
}

export default function Home() {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [fortune, setFortune] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  
  const { toast } = useToast();

  useEffect(() => {
    // We need to check for window existence for server components
    if (typeof window !== 'undefined') {
      const { count } = getStreak();
      setDailyStreak(count);
      
      // Initialize Telegram Web App
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      }
    }
  }, []);

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmojis((prev) => {
      if (prev.includes(emoji)) {
        return prev.filter((e) => e !== emoji);
      }
      if (prev.length < 3) {
        return [...prev, emoji];
      }
      return prev;
    });
  };

  const handleGenerateFortune = () => {
    if (selectedEmojis.length === 0) return;
    setError(null);
    startTransition(async () => {
      try {
        const result = await generateEmojiFortune({ emojis: selectedEmojis });
        if (result.fortune) {
          setFortune(result.fortune);
          // Update streak on successful generation, which also updates localStorage
          const { count } = getStreak();
          setDailyStreak(count);
        } else {
          throw new Error("The spirits are quiet. Please try again.");
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Fortune Telling Failed",
          description: errorMessage,
        })
      }
    });
  };

  const handleReset = () => {
    setFortune(null);
    setSelectedEmojis([]);
    setError(null);
  };

  const renderContent = () => {
    if (isPending) {
      return (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center justify-center text-center gap-4"
        >
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="font-headline text-2xl text-foreground">
            Awakening the spirits...
          </p>
        </motion.div>
      );
    }

    if (fortune) {
      return (
        <FortuneCard
          key="fortune"
          emojis={selectedEmojis}
          fortune={fortune}
          streak={dailyStreak}
          onReset={handleReset}
        />
      );
    }

    return (
      <motion.div
        key="picker"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md flex flex-col items-center gap-8"
      >
        <div className="text-center">
            <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-500 mb-2">
                Emoji Oracle
            </h1>
            <p className="text-muted-foreground text-lg">
                Select 1 to 3 emojis to reveal your fate.
            </p>
        </div>

        <div className="min-h-[56px] w-full bg-black/20 rounded-lg flex items-center justify-center p-4 border border-white/10">
          {selectedEmojis.length > 0 ? (
            <p className="text-4xl tracking-widest">{selectedEmojis.join(' ')}</p>
          ) : (
            <p className="text-muted-foreground">Your chosen emojis will appear here</p>
          )}
        </div>

        <EmojiPicker onEmojiSelect={handleEmojiSelect} />

        <Button
          onClick={handleGenerateFortune}
          disabled={selectedEmojis.length === 0 || isPending}
          size="lg"
          className="w-full text-lg py-7 rounded-full shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40"
        >
          <Sparkles className="mr-2" />
          Reveal My Fortune
        </Button>
      </motion.div>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </main>
  );
}
