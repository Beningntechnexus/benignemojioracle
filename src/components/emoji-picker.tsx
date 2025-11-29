'use client';

import type { FC } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  return (
    <div className="w-full flex justify-center">
      <Picker
        data={data}
        onEmojiSelect={(emoji: any) => onEmojiSelect(emoji.native)}
        theme="dark"
        maxFrequentRows={2}
        navPosition="bottom"
        previewPosition="none"
        searchPosition="none"
        perLine={8}
      />
    </div>
  );
};

export default EmojiPicker;
