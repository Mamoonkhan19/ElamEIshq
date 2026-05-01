# Qalam - Multilingual Quotes & Captions Hub

Qalam is a premium, production-grade multilingual quote platform designed for wisdom seekers and content creators. It supports a wide range of south-asian languages including Urdu, Punjabi, Pashto, Sindhi, and Hindi, along with English and Roman Urdu.

## 🚀 Features

- **Multilingual Wisdom**: Seamlessly switch between Urdu, English, and other regional languages.
- **RTL Support**: Native rendering for Arabic-script languages (Urdu, Pashto, etc.) using Noto Nastaliq.
- **Smart Search**: Normalized search engine that handles case-sensitivity, punctuation, and mood filtering.
- **Caption Builder**: A powerful canvas-based editor to create beautiful images for social media directly from quotes.
- **Persistence**: Favorite quotes and settings are stored locally using Zustand with persistence.
- **Immersive UI**: Mobile-first, "Warm Organic" aesthetic with smooth Framer Motion transitions.

## 🏗 Architecture

- **Framework**: React 19 + Vite (Optimized for Mobile Web).
- **Styling**: Tailwind CSS 4.0 with design tokens for typography and color.
- **Navigation**: React Router with motion transitions.
- **State**: Zustand with local storage middleware.
- **Icons**: Lucide React.
- **Animations**: Framer Motion 12.

## 📁 Project Structure

- `src/app/`: Screen components and layout.
- `src/components/`: Reusable UI primitives (QuoteCard, Navigation).
- `src/services/`: Search engine, mock data, and business logic.
- `src/store/`: Global app state (Zustand).
- `src/types/`: Strong TypeScript domain models.
- `src/theme/`: Shared layout and typography tokens (via Tailwind @theme).

## 🌍 Languages Supported

- Urdu (اردو) - Native Nastaliq Script
- Roman Urdu
- English
- Punjabi (پنجابی)
- Pashto (پښتو)
- Sindhi (سنڌي)
- Hindi (हिंदी)

## 🛠 Setup & Development

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`

## 🔄 Swapping to Real API

To replace the mock data with a real backend:
1. Update `src/services/mock/data.ts` to call your API.
2. The UI is built using the domain models in `src/types/domain.ts`, so no UI changes are required if the API follows the contracts.
