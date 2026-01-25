'use client';

import { useGame } from '@/context/GameContext';
import { scenarios } from '@/data/scenarios';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Rocket, Lightbulb, Target, Gem, TrendingUp, Book, Plus, Minus } from 'lucide-react';

// Dictionary Data
const DICTIONARY_TERMS = [
    { term: 'Melek Yatırımcı', def: 'Henüz yolun başındaki girişimlere sermaye (para) sağlayan ve karşılığında hisse alan bireysel yatırımcı.' },
    { term: 'Burn Rate', def: 'Şirketin her ay kasasından harcadığı (yaktığı) para miktarı. Nakit akışı dengesi için önemlidir.' },
    { term: 'MVP', def: 'Minimum Viable Product. Ürünün en temel, çalışır halidir. Gereksiz özelliklerden arındırılmış ilk versiyon.' },
    { term: 'CAC', def: 'Customer Acquisition Cost. Bir müşteriyi kazanmak için harcanan pazarlama ve satış bütçesi.' },
    { term: 'Exit', def: 'Girişimcinin şirketi satarak veya halka arz ederek yatırımdan çıkış yapması ve nakit kazanması.' },
    { term: 'Pivot', def: 'İş modelini veya ürünü, pazar şartlarına göre köklü bir şekilde değiştirmek.' },
    { term: 'Startup', def: 'Büyüme yeteneği yüksek, teknoloji odaklı ve henüz iş modeli tam oturmamış genç şirket.' },
];

const LOGO_ICONS: any = {
    rocket: Rocket,
    bulb: Lightbulb,
    target: Target,
    gem: Gem,
    chart: TrendingUp
};

export const GameScreen = () => {
    const {
        companyName,
        logo,
        budget,
        currentScenarioId,
        makeDecision,
        gameStatus,
        score
    } = useGame();

    const [showDictionary, setShowDictionary] = useState(false);
    const [feedback, setFeedback] = useState<{ text: string; cost: number } | null>(null);

    // Find current scenario
    const scenario = scenarios.find(s => s.id === currentScenarioId);

    // Resolve Logo Icon
    const LogoIcon = LOGO_ICONS[logo] || Rocket;

    // Progress percentage
    const totalScenarios = scenarios.length;
    const currentIndex = scenarios.findIndex(s => s.id === currentScenarioId);
    const progress = Math.max(5, ((currentIndex + 1) / totalScenarios) * 100);

    const [pendingOption, setPendingOption] = useState<any>(null);

    const onOptionSelect = (option: any) => {
        setPendingOption(option);
    };

    const confirmDecision = () => {
        if (pendingOption) {
            makeDecision(pendingOption.cost, pendingOption.nextScenarioId, pendingOption.feedback);
            setPendingOption(null);
        }
    };

    if (!scenario) return <div className="text-center p-10">Yükleniyor...</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50 w-full mx-auto shadow-sm relative">
            {/* Top Bar */}
            <header className="bg-white p-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10 w-full">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
                        <LogoIcon size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 leading-tight">{companyName}</h3>
                        <div className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full inline-block">
                            ${budget.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="flex-1 mx-6">
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <div className="font-bold text-blue-600">
                    Puan: {score}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                {/* Dictionary FAB - Repositioned */}
                <button
                    onClick={() => setShowDictionary(true)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 bg-white border-2 border-gray-200 p-3 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform z-20 text-blue-600"
                    title="Sözlük"
                >
                    <Book size={24} />
                </button>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={scenario.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8 relative">
                            {/* Speech Bubble Tail for a "character" feel if desired, simplified for now */}
                            <p className="text-xl md:text-2xl text-black font-bold leading-relaxed">
                                {scenario.text}
                            </p>

                            {scenario.info && (
                                <div className="mt-6 flex gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 items-start">
                                    <Lightbulb className="text-blue-600 shrink-0 mt-1" size={24} />
                                    <p className="text-sm text-blue-800 italic">
                                        "{scenario.info}"
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {scenario.options.map((option: any) => (
                                <button
                                    key={option.id}
                                    onClick={() => onOptionSelect(option)}
                                    className="group relative bg-white border-2 border-gray-200 hover:border-blue-400 p-6 md:p-8 rounded-2xl text-left transition-all hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm flex flex-col justify-between min-h-[160px]"
                                >
                                    <div className="mb-4">
                                        <div className="font-normal text-black text-lg md:text-xl leading-snug mb-3">{option.text}</div>

                                        {option.pros && (
                                            <div className="flex items-start gap-2 text-sm text-green-700 mb-1">
                                                <Plus size={16} className="mt-0.5 shrink-0" strokeWidth={3} />
                                                <span>{option.pros}</span>
                                            </div>
                                        )}
                                        {option.cons && (
                                            <div className="flex items-start gap-2 text-sm text-red-700">
                                                <Minus size={16} className="mt-0.5 shrink-0" strokeWidth={3} />
                                                <span>{option.cons}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className={`text-base font-bold ${option.cost > 0 ? 'text-red-500' : option.cost < 0 ? 'text-green-500' : 'gray-400'}`}>
                                        {option.cost > 0 ? `-$${option.cost.toLocaleString()}` : option.cost < 0 ? `+$${Math.abs(option.cost).toLocaleString()}` : 'Ücretsiz'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </main>



            {/* Dictionary Modal */}
            <AnimatePresence>
                {showDictionary && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-800">Girişimcilik Sözlüğü</h3>
                                <button onClick={() => setShowDictionary(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
                            </div>
                            <div className="p-6 overflow-y-auto">
                                <div className="space-y-4">
                                    {DICTIONARY_TERMS.map((item, idx) => (
                                        <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                                            <h4 className="font-bold text-blue-600 mb-1">{item.term}</h4>
                                            <p className="text-gray-600 text-sm">{item.def}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                                <button onClick={() => setShowDictionary(false)} className="text-blue-500 font-bold hover:underline">Kapat</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Feedback Sheet/Modal */}
            <AnimatePresence>
                {pendingOption && (
                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4 bg-black/20">
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-hidden"
                        >
                            <div className={`p-6 ${pendingOption.risk === 'low' ? 'bg-green-50' : pendingOption.risk === 'medium' ? 'bg-yellow-50' : 'bg-red-50'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/50
                                        ${pendingOption.risk === 'low' ? 'text-green-700' : pendingOption.risk === 'medium' ? 'text-yellow-700' : 'text-red-700'}`}>
                                        {pendingOption.risk === 'low' ? 'Düşük Risk' : pendingOption.risk === 'medium' ? 'Orta Risk' : 'Yüksek Risk'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Kararını Ver</h3>
                                <p className="text-gray-600 mb-6">
                                    "{pendingOption.text}" seçeneğini onaylıyor musun?
                                    <br />
                                    <span className="font-bold text-gray-800 mt-2 block">
                                        Maliyet: {pendingOption.cost > 0 ? `-$${pendingOption.cost.toLocaleString()}` : pendingOption.cost < 0 ? `+$${Math.abs(pendingOption.cost).toLocaleString()}` : 'Ücretsiz'}
                                    </span>
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setPendingOption(null)}
                                        className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors uppercase text-sm tracking-wider"
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        onClick={confirmDecision}
                                        className={`flex-1 py-3 px-6 rounded-xl font-bold text-white shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-1 transition-all uppercase text-sm tracking-wider
                                            ${pendingOption.risk === 'high' ? 'bg-red-500 hover:bg-red-600 shadow-[0_4px_0_rgb(185,28,28)]' : 'bg-green-500 hover:bg-green-600 shadow-[0_4px_0_rgb(21,128,61)]'}`}
                                    >
                                        ONAYLA
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
