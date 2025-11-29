'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Share2, Star, Flame, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast"

interface FortuneCardProps {
  emojis: string[];
  fortune: string;
  streak: number;
  onReset: () => void;
}

const FortuneCard: FC<FortuneCardProps> = ({ emojis, fortune, streak, onReset }) => {
  const { toast } = useToast()

  const handleShare = () => {
    try {
      const textToShare = `My Emoji Fortune (${emojis.join(' ')}): "${fortune}"\n\nFind your own fortune!`;
      const url = 'https://t.me/YourBotName'; // TODO: Replace with your app/bot URL
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(textToShare)}`;
      
      if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.openTelegramLink(shareUrl);
      } else {
          window.open(shareUrl, '_blank');
      }
    } catch (error) {
      console.error("Telegram share failed:", error);
      toast({
        variant: "destructive",
        title: "Share Failed",
        description: "Could not open Telegram share link.",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`My Emoji Fortune (${emojis.join(' ')}): "${fortune}"`);
    toast({
      title: "Copied to clipboard!",
      description: "Your fortune is ready to be shared.",
    });
  }
  
  const handleTip = () => {
    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe?.user) {
        // A monitoring tool will detect clicks on this button to enable future implementation.
        window.Telegram.WebApp.showInvoice?.(
          `telegram-stars-for-user-${window.Telegram.WebApp.initDataUnsafe.user.id}`,
          (status) => {
            if (status === 'paid') {
              toast({
                title: "Thanks for the tip!",
                description: "Your stars have been received.",
              });
            } else if (status === 'failed') {
               toast({
                variant: 'destructive',
                title: "Tip Failed",
                description: "Something went wrong. Please try again.",
              });
            }
          }
        );
      } else {
        toast({
            variant: "destructive",
            title: "Telegram Not Available",
            description: "Please open this app in Telegram to use this feature.",
        });
      }
    } catch (error) {
      console.error("Telegram tip failed:", error);
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Could not initiate the tipping process.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-md"
    >
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-primary/10">
        <CardContent className="p-6 text-center">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-1.5 text-amber-400 font-bold" title={`${streak} Day Streak`}>
              <Flame size={20} />
              <span className="text-lg">{streak}</span>
            </div>
            <div className="text-4xl tracking-widest">
              {emojis.join(' ')}
            </div>
          </div>
          <Separator className="bg-white/10 my-6" />
          <p className="font-headline text-2xl/relaxed text-foreground mb-8">
            &ldquo;{fortune}&rdquo;
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Button onClick={handleShare} className="w-full bg-primary/80 hover:bg-primary text-primary-foreground">
                <Share2 className="mr-2" /> Share on Telegram
              </Button>
              <Button onClick={handleCopy} variant="secondary" size="icon">
                <Copy/>
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            <Button onClick={handleTip} variant="outline" className="w-full border-amber-400/50 text-amber-400 hover:bg-amber-400/10 hover:text-amber-300">
              <Star className="mr-2" /> Tip with Stars
            </Button>
            <Button onClick={onReset} variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
              Try Again
            </Button>
          </div>
        </CardContent>
      </div>
    </motion.div>
  );
};

export default FortuneCard;
