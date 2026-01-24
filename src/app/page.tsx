'use client';

import { useGame } from '@/context/GameContext';
import { LandingPage } from '@/components/LandingPage';
import { Onboarding } from '@/components/Onboarding';
import { GameScreen } from '@/components/GameScreen';
import { ResultScreen } from '@/components/ResultScreen';

export default function Home() {
  const { gameStatus } = useGame();

  switch (gameStatus) {
    case 'LANDING':
      return <LandingPage />;
    case 'ONBOARDING':
      return <Onboarding />;
    case 'PLAYING':
      return <GameScreen />;
    case 'FINISHED':
      return <ResultScreen />;
    default:
      return <LandingPage />;
  }
}
