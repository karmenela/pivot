'use client';

import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const LandingPage = () => {
    const { setGameStatus } = useGame();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                {/* Pivot Logo */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex justify-center mb-2"
                >
                    <Image
                        src="/pivot-logo.png"
                        alt="Pivot"
                        width={280}
                        height={280}
                        className="drop-shadow-xl"
                        priority
                    />
                </motion.div>

                <p className="text-lg text-[#777] font-bold mb-2">
                    Girişimcilik Simülasyonu
                </p>
                <p className="text-base text-[#AFAFAF] mb-10 leading-relaxed font-semibold">
                    Stratejik kararlar al, şirketini büyüt ve başarıya ulaş!
                </p>

                <button
                    onClick={() => setGameStatus('ONBOARDING')}
                    className="btn-green w-full font-black py-4 px-10 rounded-2xl text-xl uppercase tracking-wide"
                >
                    OYUNA BAŞLA
                </button>

                <p className="mt-6 text-[#AFAFAF] text-sm font-bold">
                    Ücretsiz · Türkçe · 10 dakika
                </p>
            </motion.div>
        </div>
    );
};
