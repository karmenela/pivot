'use client';

import { useGame } from '@/context/GameContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Target, Gem, TrendingUp } from 'lucide-react';

const LOGO_OPTIONS = [
    { id: 'rocket', icon: Rocket, label: 'Hız' },
    { id: 'bulb', icon: Lightbulb, label: 'Yenilik' },
    { id: 'target', icon: Target, label: 'Hedef' },
    { id: 'gem', icon: Gem, label: 'Kalite' },
    { id: 'chart', icon: TrendingUp, label: 'Büyüme' },
];

export const Onboarding = () => {
    const { setCompanyName, setLogo } = useGame();
    const [name, setName] = useState('');
    const [selectedLogo, setSelectedLogo] = useState('rocket');

    const handleStart = () => {
        if (!name.trim()) return;
        setLogo(selectedLogo);
        setCompanyName(name);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Şirketini Kur</h2>

                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2 ml-1">
                        Şirket İsmi
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Gelecek Teknoloji"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg text-gray-800 bg-gray-50"
                    />
                </div>

                <div className="mb-10">
                    <label className="block text-gray-700 text-sm font-bold mb-4 ml-1">
                        Logo Seçimi
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                        {LOGO_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setSelectedLogo(opt.id)}
                                className={`aspect-square rounded-xl flex items-center justify-center text-3xl border-b-4 transition-all ${selectedLogo === opt.id
                                        ? 'bg-blue-100 border-blue-500 scale-105 text-blue-600'
                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-400'
                                    }`}
                            >
                                <opt.icon size={32} strokeWidth={1.5} />
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleStart}
                    disabled={!name.trim()}
                    className={`w-full font-bold py-4 rounded-2xl shadow-[0_4px_0_rgb(0,0,0,0.1)] transition-all text-lg uppercase tracking-wide
                        ${name.trim()
                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-[0_4px_0_rgb(29,78,216)] active:translate-y-1 active:shadow-none'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Şirketi Kur
                </button>
            </motion.div>
        </div>
    );
};
