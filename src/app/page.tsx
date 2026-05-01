'use client';

import { useGame } from '@/context/GameContext';
import { LandingPage } from '@/components/LandingPage';
import { Onboarding } from '@/components/Onboarding';
import { StoryScreen } from '@/components/StoryScreen';
import { GameScreen } from '@/components/GameScreen';
import { ResultScreen } from '@/components/ResultScreen';
import { TipsScreen } from '@/components/TipsScreen';
import { BankruptScreen } from '@/components/BankruptScreen';
import { QuizScreen } from '@/components/QuizScreen';

export default function Home() {
  const { gameStatus } = useGame();

  switch (gameStatus) {
    case 'LANDING':
      return <LandingPage />;
    case 'ONBOARDING':
      return <Onboarding />;
    case 'STORY':
      return <StoryScreen />;
    case 'PLAYING':
      return <GameScreen />;
    case 'TIPS':
      return <TipsScreen />;
    case 'QUIZ':
      return <QuizScreen />;
    case 'FINISHED':
      return <ResultScreen />;
    case 'BANKRUPT':
      return <BankruptScreen />;
    default:
      return <LandingPage />;
  }
}
