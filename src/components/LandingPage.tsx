'use client';

import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export const LandingPage = () => {
    const { setGameStatus } = useGame();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
            >
                <div className="mb-8 flex justify-center">
                    <div className="p-6 bg-blue-50 rounded-6xl rotate-12 inline-block">
                        <Rocket size={64} className="text-blue-600" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 tracking-tight">
                    Girişimcilik <span className="text-blue-600">Simülasyonu</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                    Sıfırdan bir şirket kur, stratejik kararlar al ve başarıya ulaş.
                    Finansal okuryazarlığı ve risk yönetimini eğlenerek öğren.
                </p>

                <button
                    onClick={() => setGameStatus('ONBOARDING')}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-2xl shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all text-xl uppercase tracking-wider"
                >
                    OYUNA BAŞLA
                </button>
            </motion.div>
        </div>
    );
};
