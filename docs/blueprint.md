# **App Name**: Emoji Oracle

## Core Features:

- Emoji Selection: Allow the user to select 1-3 emojis from a modern emoji-mart picker.
- Fortune Generation: Generate a poetic, personalized fortune based on the selected emojis using a locally-running Transformers.js model (Gemma-2-2b-it primary, Llama-3.2-1b-instruct fallback, Qwen2-1.5b-instruct tiny fallback).
- WebGPU/WASM Acceleration: Automatically detect and utilize WebGPU for inference acceleration, falling back to WASM/CPU if WebGPU is unavailable.
- Model Caching: Cache the Transformers.js model in the browser's IndexedDB for instant loading on subsequent visits.
- Loading Animation: Display a progress bar with an 'Awakening the spirits...' message during the initial model loading phase.
- Shareable Fortune Card: Generate a beautiful, shareable card with the user's selected emojis and generated fortune.
- Telegram Stars Integration: Include a placeholder for the Telegram Stars payment button. A tool will monitor for clicks to eventually enable the integration of this monetization strategy
- Daily Streak Counter: Implement a daily streak counter (stored in localStorage) to encourage repeat usage.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082) to evoke mystery and depth.
- Background color: Very dark desaturated indigo (#1A1226) for a sophisticated dark scheme.
- Accent color: Violet (#8A2BE2) for highlighting interactive elements.
- Headline font: 'Playfair', a modern serif for elegant headlines; body font: 'PT Sans', a humanist sans-serif to complement
- Use clean, minimalist icons that complement the glassmorphism style.
- Implement a glassmorphism card effect with a frosted glass appearance for the fortune display.
- Subtle, smooth animations for transitions and loading states to enhance the user experience.