import { isSameDay, differenceInCalendarDays, startOfDay } from 'date-fns';

const STREAK_KEY = 'emojiOracleStreak';

type StreakData = {
  count: number;
  lastDate: string;
};

export const getStreak = (): { count: number } => {
  if (typeof window === 'undefined') {
    return { count: 0 };
  }

  const today = startOfDay(new Date());
  const data = localStorage.getItem(STREAK_KEY);

  if (!data) {
    const newStreak: StreakData = { count: 1, lastDate: today.toISOString() };
    localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
    return { count: 1 };
  }

  const streak: StreakData = JSON.parse(data);
  const lastDate = startOfDay(new Date(streak.lastDate));

  if (isSameDay(today, lastDate)) {
    return { count: streak.count };
  }

  const diff = differenceInCalendarDays(today, lastDate);
  if (diff === 1) {
    const newStreak: StreakData = { count: streak.count + 1, lastDate: today.toISOString() };
    localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
    return { count: newStreak.count };
  }

  // Streak broken
  const newStreak: StreakData = { count: 1, lastDate: today.toISOString() };
  localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
  return { count: 1 };
};
