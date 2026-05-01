'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { scenarios } from '../data/scenarios';

type GameState = {
    companyName: string;
    ceoName: string;
    logo: string;
    budget: number;
    currentScenarioId: number | string;
    history: string[]; // Log of decisions
    score: number;
    hasUsedFinance: boolean;
    gameStatus: 'LANDING' | 'ONBOARDING' | 'STORY' | 'PLAYING' | 'TIPS' | 'QUIZ' | 'FINISHED' | 'BANKRUPT';
    setCompanyName: (name: string) => void;
    setCeoName: (name: string) => void;
    setLogo: (logo: string) => void;
    makeDecision: (cost: number, nextId: number | string, feedback: string) => void;
    applyFinance: (amount: number) => void;
    proceedToNext: () => void;
    setGameStatus: (status: 'LANDING' | 'ONBOARDING' | 'STORY' | 'PLAYING' | 'TIPS' | 'QUIZ' | 'FINISHED' | 'BANKRUPT') => void;
    resetGame: () => void;
};

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [companyName, setCompanyName] = useState('');
    const [ceoName, setCeoName] = useState('');
    const [logo, setLogo] = useState('rocket');
    const [budget, setBudget] = useState(200000);
    const [currentScenarioId, setCurrentScenarioId] = useState<number | string>(1);
    const [history, setHistory] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [hasUsedFinance, setHasUsedFinance] = useState(false);
    const [gameStatus, setGameStatus] = useState<'LANDING' | 'ONBOARDING' | 'STORY' | 'PLAYING' | 'TIPS' | 'QUIZ' | 'FINISHED' | 'BANKRUPT'>('LANDING');
    const [pendingNextId, setPendingNextId] = useState<number | string | null>(null);

    const makeDecision = (cost: number, nextId: number | string, feedback: string) => {
        const newBudget = budget - cost;
        setBudget(newBudget);
        setHistory((prev) => [...prev, feedback]);
        setScore((prev) => prev + 100 + (cost < 0 ? 500 : 0));

        if (newBudget <= 0) {
            setGameStatus('BANKRUPT');
            return;
        }

        if (nextId === 'END') {
            setPendingNextId('END');
        } else {
            setPendingNextId(nextId);
        }
        setGameStatus('TIPS');
    };

    const applyFinance = (amount: number) => {
        setBudget((prev) => prev + amount);
        setHasUsedFinance(true);
    };

    const proceedToNext = () => {
        if (pendingNextId === 'END') {
            setGameStatus('QUIZ');
        } else if (pendingNextId) {
            setCurrentScenarioId(pendingNextId);
            setGameStatus('PLAYING');
        }
        setPendingNextId(null);
    };

    const resetGame = () => {
        setCompanyName('');
        setCeoName('');
        setLogo('rocket');
        setBudget(200000);
        setCurrentScenarioId(1);
        setHistory([]);
        setScore(0);
        setHasUsedFinance(false);
        setGameStatus('LANDING');
    };

    return (
        <GameContext.Provider
            value={{
                companyName,
                ceoName,
                logo,
                budget,
                currentScenarioId,
                history,
                score,
                hasUsedFinance,
                gameStatus,
                setCompanyName: (name) => {
                    setCompanyName(name);
                    setGameStatus('STORY');
                },
                setCeoName,
                setLogo,
                makeDecision,
                applyFinance,
                proceedToNext,
                setGameStatus,
                resetGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
