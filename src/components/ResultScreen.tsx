'use client';

import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const ResultScreen = () => {
    const { companyName, budget, score, history, resetGame } = useGame();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-lg rounded-3xl overflow-hidden border-2 border-[#E5E5E5] shadow-xl"
            >
                {/* Header */}
                <div className="bg-[#58CC02] p-8 text-center relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex justify-center mb-3"
                    >
                        <Image src="/unicorn.png" alt="Pivot" width={140} height={140} className="drop-shadow-xl" />
                    </motion.div>
                    <h2 className="text-2xl font-black text-white mb-1">{companyName}</h2>
                    <p className="text-green-100 font-bold text-sm mb-6">Tebrikler! Simülasyonu tamamladın.</p>

                    <div className="flex justify-center gap-8">
                        <div className="text-center bg-white/20 rounded-2xl px-6 py-3">
                            <div className="text-3xl font-black text-white">{score}</div>
                            <div className="text-green-100 text-xs font-black uppercase tracking-wider mt-1">Toplam Puan</div>
                        </div>
                        <div className="text-center bg-white/20 rounded-2xl px-6 py-3">
                            <div className="text-3xl font-black text-white">${budget.toLocaleString()}</div>
                            <div className="text-green-100 text-xs font-black uppercase tracking-wider mt-1">Kalan Para</div>
                        </div>
                    </div>
                </div>

                {/* History */}
                <div className="p-6">
                    <h3 className="text-[#3c3c3c] font-black text-base mb-4 uppercase tracking-wide">Geri Bildirimler</h3>
                    <div className="space-y-2 mb-8 max-h-56 overflow-y-auto pr-1">
                        {history.map((item, i) => (
                            <div key={i} className="flex gap-2 text-sm text-[#777] bg-[#F7F7F7] p-3 rounded-xl border-2 border-[#E5E5E5] font-semibold">
                                <span className="text-[#1CB0F6] font-black shrink-0">{i + 1}.</span> {item}
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={resetGame}
                        className="btn-green w-full font-black py-4 rounded-2xl text-lg uppercase tracking-wide"
                    >
                        Tekrar Oyna
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
