# Pivot - Entrepreneurship Simulation Game

Pivot is an interactive scenario-based entrepreneurship game built with Next.js.
Players create a startup, make high-impact business decisions, manage budget pressure, and navigate multiple outcomes such as growth, exit, quiz completion, or bankruptcy.

## Features

- Multi-screen game flow: Landing -> Onboarding -> Story -> Gameplay -> Tips -> Quiz -> Result
- Branching startup scenarios with decision consequences
- Budget, score, and decision history tracking
- Positive/negative financial events (investments, costs, exits)
- Bankruptcy fail state when cash reaches zero
- Educational business terms and strategy tips embedded in scenarios

## Tech Stack

- Next.js 16 (App Router, Turbopack in development)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Project Structure

- `src/app`: App entry, layout, and global styles
- `src/components`: Game screens (`LandingPage`, `Onboarding`, `StoryScreen`, `GameScreen`, `TipsScreen`, `QuizScreen`, `ResultScreen`, `BankruptScreen`)
- `src/context/GameContext.tsx`: Central game state and progression logic
- `src/data/scenarios.ts`: Scenario tree, options, costs, and educational info
- `public`: Static assets

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

```bash
npm run dev
```

If your environment has host/network interface issues, run:

```bash
npm run dev -- --hostname 127.0.0.1
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Core Gameplay Logic

- Initial budget starts at `$200,000`
- Every decision changes budget and score
- If budget drops to `0` or below, the game switches to the `BANKRUPT` screen
- Reaching an `END` scenario transitions to `QUIZ`, then `FINISHED`
- `resetGame()` resets all progression and returns the user to `LANDING`

## Notes

- Scenario content is currently authored in Turkish in `src/data/scenarios.ts`
- The game can be expanded by adding more scenario nodes and screen-level UX polish

## License

This project is currently private and has no explicit license file.
