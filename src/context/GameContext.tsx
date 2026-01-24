'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { scenarios } from '../data/scenarios';

type GameState = {
    companyName: string;
    logo: string;
    budget: number;
    currentScenarioId: number | string;
    history: string[]; // Log of decisions
    score: number;
    gameStatus: 'LANDING' | 'ONBOARDING' | 'PLAYING' | 'FINISHED';
    setCompanyName: (name: string) => void;
    setLogo: (logo: string) => void;
    makeDecision: (cost: number, nextId: number | string, feedback: string) => void;
    setGameStatus: (status: 'LANDING' | 'ONBOARDING' | 'PLAYING' | 'FINISHED') => void;
    resetGame: () => void;
};

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [companyName, setCompanyName] = useState('');
    const [logo, setLogo] = useState('rocket');
    const [budget, setBudget] = useState(200000);
    const [currentScenarioId, setCurrentScenarioId] = useState<number | string>(1);
    const [history, setHistory] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState<'LANDING' | 'ONBOARDING' | 'PLAYING' | 'FINISHED'>('LANDING');

    const makeDecision = (cost: number, nextId: number | string, feedback: string) => {
        setBudget((prev) => prev - cost);
        setHistory((prev) => [...prev, feedback]);

        // Simple scoring logic: budget left + bonus for progress
        setScore((prev) => prev + 100 + (cost < 0 ? 500 : 0)); // Bonus for earning money (negative cost)

        if (nextId === 'END') {
            setGameStatus('FINISHED');
        } else {
            setCurrentScenarioId(nextId);
        }
    };

    const resetGame = () => {
        setCompanyName('');
        setLogo('rocket');
        setBudget(200000);
        setCurrentScenarioId(1);
        setHistory([]);
        setScore(0);
        setGameStatus('LANDING');
    };

    return (
        <GameContext.Provider
            value={{
                companyName,
                logo,
                budget,
                currentScenarioId,
                history,
                score,
                gameStatus,
                setCompanyName: (name) => {
                    setCompanyName(name);
                    setGameStatus('PLAYING');
                },
                setLogo,
                makeDecision,
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
