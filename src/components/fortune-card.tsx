'use client';

import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Share2, Star, Flame, Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

  const shareText = `My Emoji Fortune (${emojis.join(' ')}): "${fortune}"\n\nFind your own fortune: @MagicalA_bot\nJoin the channel for more mystical fun: https://t.me/benignemojioracle`;

  const handleShare = () => {
    try {
      const url = 'https://t.me/MagicalA_bot';
      const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;
      
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
    navigator.clipboard.writeText(shareText);
    toast({
      title: "Copied to clipboard!",
      description: "Your fortune is ready to be shared.",
    });
  }
  
  const handleTip = () => {
    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe?.user) {
        // The invoice payload format is: telegram-stars-for-user-<user_id>
        // The invoice must be created by the bot before it can be shown.
        // For this example, we'll create a placeholder invoice.
        const invoiceSlug = `tip-1-star-for-${window.Telegram.WebApp.initDataUnsafe.user.id}`;
        window.Telegram.WebApp.showInvoice(
          invoiceSlug,
          (status: 'paid' | 'cancelled' | 'failed' | 'pending') => {
            if (status === 'paid') {
              toast({
                title: "Thanks for the tip!",
                description: "Your star has been received.",
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
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <Card className="relative bg-black/30 backdrop-blur-xl rounded-2xl border-white/10 shadow-2xl shadow-primary/10 overflow-hidden">
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
                  <Share2 className="mr-2" /> Share
                </Button>
                <Button onClick={handleCopy} variant="secondary" className="w-full">
                  <Copy className="mr-2" /> Copy
                </Button>
              </div>
              <Button onClick={onReset} variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                <RotateCcw className="mr-2" />
                Try Again
              </Button>
              <Button onClick={handleTip} variant="outline" className="w-full border-amber-400/50 text-amber-400 hover:bg-amber-400/10 hover:text-amber-300">
                <Star className="mr-2" /> Tip with Stars
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default FortuneCard;
