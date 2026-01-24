'use client';

import { useGame } from '@/context/GameContext';
import { motion } from 'framer-motion';

export const ResultScreen = () => {
    const {
        companyName,
        budget,
        score,
        history,
        resetGame
    } = useGame();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-2xl rounded-3xl shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="bg-blue-600 p-10 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-extrabold mb-2">{companyName}</h2>
                        <p className="text-blue-100 font-medium">Serüveni Tamamlandı</p>

                        <div className="mt-8 flex justify-center gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-black">{score}</div>
                                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider">Toplam Puan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black">${budget.toLocaleString()}</div>
                                <div className="text-blue-200 text-xs font-bold uppercase tracking-wider">Kalan Para</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <h3 className="text-gray-800 font-bold text-xl mb-4">Geri Bildirimler</h3>
                    <div className="space-y-3 mb-8 max-h-60 overflow-y-auto pr-2">
                        {history.map((item, i) => (
                            <div key={i} className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="text-blue-500">Feature {i + 1}:</span> {item}
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={resetGame}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-2xl shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all uppercase tracking-wider w-full md:w-auto"
                        >
                            Tekrar Oyna
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
