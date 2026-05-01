'use client';

import { useGame } from '@/context/GameContext';
import { scenarios } from '@/data/scenarios';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Rocket, Lightbulb, Target, Gem, TrendingUp, Book, Plus, Minus, Landmark } from 'lucide-react';
import Image from 'next/image';

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

const FINANCE_OPTIONS = [
    {
        id: 'bank',
        name: 'Banka Kredisi',
        amount: 50000,
        pros: 'Hisseleden vazgecmezsin',
        cons: 'Faizli geri odeme yukumlulugu',
    },
    {
        id: 'angel',
        name: 'Melek Yatirimci',
        amount: 100000,
        pros: 'Mentor destegi ve ag baglantilar',
        cons: 'Sirketin %10 hissesini verirsin',
    },
    {
        id: 'crowdfunding',
        name: 'Kitle Fonlamasi',
        amount: 40000,
        pros: 'Hisse veya borc yok, topluluk desteği',
        cons: 'Kampanya sureci zaman alir',
    },
    {
        id: 'grant',
        name: 'Devlet Hibes (KOSGEB)',
        amount: 30000,
        pros: 'Geri odemesiz, faiz yok',
        cons: 'Uzun basvuru sureci, katı kosullar',
    },
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
        applyFinance,
        hasUsedFinance,
        score
    } = useGame();

    const [showDictionary, setShowDictionary] = useState(false);
    const [showFinance, setShowFinance] = useState(false);
    const [pendingOption, setPendingOption] = useState<any>(null);

    const scenario = scenarios.find(s => s.id === currentScenarioId);
    const LogoIcon = LOGO_ICONS[logo] || Rocket;

    const totalScenarios = scenarios.length;
    const currentIndex = scenarios.findIndex(s => s.id === currentScenarioId);
    const progress = Math.max(5, ((currentIndex + 1) / totalScenarios) * 100);

    const confirmDecision = () => {
        if (pendingOption) {
            makeDecision(pendingOption.cost, pendingOption.nextScenarioId, pendingOption.feedback);
            setPendingOption(null);
        }
    };

    if (!scenario) return <div className="text-center p-10 font-black text-[#AFAFAF]">Yükleniyor...</div>;

    return (
        <div className="flex flex-col h-screen bg-white w-full mx-auto relative">
            {/* Top Bar */}
            <header className="bg-white sticky top-0 z-10 border-b-2 border-[#E5E5E5]">
                {/* Budget Banner */}
                <div className="bg-[#F0FFF0] border-b-2 border-[#58CC02] px-4 py-2 flex items-center justify-center gap-2">
                    <span className="text-[#58A700] text-sm font-black uppercase tracking-wide">Sermaye</span>
                    <span className="text-2xl font-black text-[#58CC02]">${budget.toLocaleString()}</span>
                </div>

                {/* Company + Progress + Score */}
                <div className="px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#DDF4FF] rounded-xl flex items-center justify-center text-[#1CB0F6] border-2 border-[#1CB0F6]">
                            <LogoIcon size={16} strokeWidth={2.5} />
                        </div>
                        <p className="font-black text-[#3c3c3c] text-sm">{companyName}</p>
                    </div>

                    <div className="flex-1 mx-4">
                        <div className="h-3 w-full bg-[#E5E5E5] rounded-full overflow-hidden">
                            <div className="progress-bar" style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-black text-[#FFCC00] text-sm">Puan: {score}</span>
                        <button
                            type="button"
                            onClick={() => !hasUsedFinance && setShowFinance(true)}
                            title={hasUsedFinance ? 'Finans hakki kullanildi' : 'Finansman al'}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-black uppercase tracking-wide transition-all ${
                                hasUsedFinance
                                    ? 'border-[#E5E5E5] text-[#AFAFAF] cursor-not-allowed'
                                    : 'border-[#FF9600] text-[#FF9600] hover:bg-[#FFF3E0]'
                            }`}
                        >
                            <Landmark size={13} strokeWidth={2.5} />
                            {hasUsedFinance ? 'Kullanildi' : 'Finans'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
                {/* Dictionary FAB */}
                <button
                    type="button"
                    onClick={() => setShowDictionary(true)}
                    className="absolute top-4 right-4 bg-white border-2 border-[#E5E5E5] p-2.5 rounded-full shadow-sm hover:border-[#1CB0F6] transition-colors z-20 text-[#1CB0F6]"
                    title="Sözlük"
                >
                    <Book size={20} />
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={scenario.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-2xl mx-auto"
                    >
                        {/* Scenario card with unicorn */}
                        <div className="flex items-end gap-3 mb-5">
                            <Image
                                src="/unicorn.png"
                                alt="Pivot"
                                width={96}
                                height={96}
                                className="drop-shadow-md shrink-0 mb-1"
                            />
                            <div className="bg-white border-2 border-[#E5E5E5] rounded-2xl rounded-bl-sm p-4 flex-1 shadow-sm">
                                <p className="text-base md:text-lg text-[#3c3c3c] font-bold leading-relaxed">
                                    {scenario.text}
                                </p>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-4">
                            {scenario.options.map((option: any) => (
                                <button
                                    type="button"
                                    key={option.id}
                                    onClick={() => setPendingOption(option)}
                                    className="bg-white border-2 border-[#E5E5E5] hover:border-[#1CB0F6] p-6 rounded-2xl text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 flex flex-col justify-between min-h-[180px]"
                                >
                                    <div className="mb-4">
                                        <p className="font-black text-[#3c3c3c] text-lg leading-snug mb-3">{option.text}</p>
                                        {option.pros && (
                                            <div className="flex items-start gap-1.5 text-sm text-[#58CC02] font-bold mb-1.5">
                                                <Plus size={14} className="mt-0.5 shrink-0" strokeWidth={3} />
                                                <span>{option.pros}</span>
                                            </div>
                                        )}
                                        {option.cons && (
                                            <div className="flex items-start gap-1.5 text-sm text-[#FF4B4B] font-bold">
                                                <Minus size={14} className="mt-0.5 shrink-0" strokeWidth={3} />
                                                <span>{option.cons}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-base font-black ${option.cost > 0 ? 'text-[#FF4B4B]' : option.cost < 0 ? 'text-[#58CC02]' : 'text-[#AFAFAF]'}`}>
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
                            className="bg-white rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl overflow-hidden border-2 border-[#E5E5E5]"
                        >
                            <div className="p-5 border-b-2 border-[#E5E5E5] flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Image src="/unicorn.png" alt="Pivot" width={32} height={32} />
                                    <h3 className="text-lg font-black text-[#3c3c3c]">Girişimcilik Sözlüğü</h3>
                                </div>
                                <button type="button" onClick={() => setShowDictionary(false)} className="text-[#AFAFAF] hover:text-[#3c3c3c] font-black text-sm uppercase tracking-wide">Kapat</button>
                            </div>
                            <div className="p-5 overflow-y-auto">
                                <div className="space-y-4">
                                    {DICTIONARY_TERMS.map((item, idx) => (
                                        <div key={idx} className="border-b-2 border-[#E5E5E5] last:border-0 pb-4 last:pb-0">
                                            <h4 className="font-black text-[#1CB0F6] mb-1">{item.term}</h4>
                                            <p className="text-[#777] text-sm font-semibold">{item.def}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 border-t-2 border-[#E5E5E5] text-center">
                                <button type="button" onClick={() => setShowDictionary(false)} className="btn-green font-black py-3 px-8 rounded-2xl text-sm uppercase tracking-wide">Kapat</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Confirm Sheet */}
            <AnimatePresence>
                {pendingOption && (
                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4 bg-black/20">
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden border-2 border-[#E5E5E5]"
                        >
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Image src="/unicorn.png" alt="Pivot" width={48} height={48} className="drop-shadow" />
                                    <div>
                                        <span className={`text-xs font-black uppercase tracking-wider px-2 py-1 rounded-lg ${
                                            pendingOption.risk === 'low' ? 'bg-[#D7FFB8] text-[#58A700]'
                                            : pendingOption.risk === 'medium' ? 'bg-[#FFF3CC] text-[#FF9600]'
                                            : 'bg-[#FFE0E0] text-[#FF4B4B]'
                                        }`}>
                                            {pendingOption.risk === 'low' ? 'Düşük Risk' : pendingOption.risk === 'medium' ? 'Orta Risk' : 'Yüksek Risk'}
                                        </span>
                                        <p className="text-[#3c3c3c] font-black mt-1">Bu kararı onayla?</p>
                                    </div>
                                </div>

                                <p className="text-[#777] font-bold mb-1 text-sm">"{pendingOption.text}"</p>
                                <p className={`font-black text-base mb-6 ${pendingOption.cost > 0 ? 'text-[#FF4B4B]' : pendingOption.cost < 0 ? 'text-[#58CC02]' : 'text-[#AFAFAF]'}`}>
                                    Maliyet: {pendingOption.cost > 0 ? `-$${pendingOption.cost.toLocaleString()}` : pendingOption.cost < 0 ? `+$${Math.abs(pendingOption.cost).toLocaleString()}` : 'Ücretsiz'}
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPendingOption(null)}
                                        className="flex-1 py-3 px-4 rounded-2xl font-black text-[#AFAFAF] border-2 border-[#E5E5E5] hover:border-[#AFAFAF] transition-colors uppercase text-sm tracking-wide"
                                    >
                                        Vazgeç
                                    </button>
                                    <button
                                        type="button"
                                        onClick={confirmDecision}
                                        className={`flex-1 py-3 px-4 rounded-2xl font-black text-white uppercase text-sm tracking-wide ${
                                            pendingOption.risk === 'high' ? 'btn-red' : 'btn-green'
                                        }`}
                                    >
                                        ONAYLA
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Finance Modal */}
            <AnimatePresence>
                {showFinance && (
                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4 bg-black/30">
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white w-full md:max-w-lg md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden border-2 border-[#E5E5E5]"
                        >
                            <div className="p-5 border-b-2 border-[#E5E5E5] flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-black text-[#3c3c3c]">Finansman Sec</h3>
                                    <p className="text-xs font-bold text-[#AFAFAF]">Bu hakki yalnizca bir kez kullanabilirsin.</p>
                                </div>
                                <button type="button" onClick={() => setShowFinance(false)} className="text-[#AFAFAF] hover:text-[#3c3c3c] font-black text-sm uppercase tracking-wide">Kapat</button>
                            </div>

                            <div className="p-4 flex flex-col gap-3">
                                {FINANCE_OPTIONS.map((opt) => (
                                    <button
                                        type="button"
                                        key={opt.id}
                                        onClick={() => {
                                            applyFinance(opt.amount);
                                            setShowFinance(false);
                                        }}
                                        className="border-2 border-[#E5E5E5] hover:border-[#FF9600] rounded-2xl p-4 text-left transition-all hover:shadow-sm active:scale-[0.99]"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-2">
                                            <p className="font-black text-[#3c3c3c] text-base">{opt.name}</p>
                                            <span className="text-[#58CC02] font-black text-base shrink-0">+${opt.amount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-start gap-1.5 text-xs text-[#58CC02] font-bold mb-1">
                                            <Plus size={12} className="mt-0.5 shrink-0" strokeWidth={3} />
                                            <span>{opt.pros}</span>
                                        </div>
                                        <div className="flex items-start gap-1.5 text-xs text-[#FF4B4B] font-bold">
                                            <Minus size={12} className="mt-0.5 shrink-0" strokeWidth={3} />
                                            <span>{opt.cons}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
