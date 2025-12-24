// app/service/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertTriangle, Eraser, Bus, FileText, Send
} from "lucide-react";
import { clsx } from "clsx";

// --- DONNÉES IDENTIQUES (Je les laisse pour ne pas casser le fichier) ---
const EXCLUDED_BUSES = [39, 42, 50, 60, 70];
const BUS_LIST = Array.from({ length: 75 - 38 + 1 }, (_, i) => i + 38).filter((num) => !EXCLUDED_BUSES.includes(num));
const CHECKLIST_ITEMS = [
    { id: "extincteur", label: "Extincteur valide & présent" },
    { id: "info_voyageur", label: "Information Voyageur" },
    { id: "eclairage_ext", label: "Éclairage Extérieur" },
    { id: "eclairage_int", label: "Éclairage Intérieur" },
    { id: "pneus", label: "État des pneumatiques" },
];
const CARROSSERIE_VIEWS = ["Avant", "Latéral Gauche", "Latéral Droit", "Arrière"];

export default function PriseServicePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [selectedBus, setSelectedBus] = useState<number | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [currentViewIndex, setCurrentViewIndex] = useState(0);
    const [defectType, setDefectType] = useState<"choc" | "rayure">("choc");
    const [defects, setDefects] = useState<any[]>([]);
    const [checklist, setChecklist] = useState<Record<string, boolean | null>>({});
    const [remarks, setRemarks] = useState("");

    const handleCarrosserieClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const newDefect = { id: Date.now(), viewIndex: currentViewIndex, x, y, type: defectType };
        setDefects([...defects, newDefect]);
    };
    const removeDefect = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setDefects(defects.filter(d => d.id !== id));
    };
    const handleChecklist = (id: string, value: boolean) => setChecklist(prev => ({ ...prev, [id]: value }));
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const finish = () => {
        setIsSuccess(true);
        setTimeout(() => { router.push("/?service_started=true"); }, 3000);
    };

    const progress = (step / 4) * 100;

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-blue-600 dark:bg-blue-900 text-white p-6 text-center animate-in fade-in duration-500">
                <div className="bg-white/20 p-6 rounded-full mb-6 backdrop-blur-sm animate-bounce">
                    <Send size={48} className="text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">Envoyé à la régulation</h1>
                <p className="text-blue-100 text-lg mb-8">La prise de service est validée.</p>
                <div className="bg-white/10 rounded-xl p-4 w-full max-w-xs border border-white/20">
                    <p className="font-bold text-xl flex items-center justify-center gap-2">👋 Bonne route !</p>
                </div>
            </div>
        );
    }

    return (
        // Ajout de transition-colors et fond sombre
        <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

            {/* HEADER */}
            <div className="bg-white dark:bg-slate-900 px-4 pt-4 pb-2 sticky top-0 z-20 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-3">
                    {step > 1 ? (
                        <button onClick={prevStep} className="p-2 -ml-2 text-slate-500 dark:text-slate-400"><ChevronLeft size={28} /></button>
                    ) : (
                        <Link href="/" className="p-2 -ml-2 text-slate-500 dark:text-slate-400"><ChevronLeft size={28} /></Link>
                    )}
                    <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                        {step === 1 && "Véhicule"}
                        {step === 2 && "Carrosserie"}
                        {step === 3 && "Checklist"}
                        {step === 4 && "Validation"}
                    </h1>
                    <div className="w-8" />
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* CONTENU */}
            <div className="flex-1 overflow-y-auto p-4 pb-40">
                {/* ÉTAPE 1 : BUS */}
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 text-blue-800 dark:text-blue-300 text-sm mb-4 border border-blue-100 dark:border-blue-900/50">
                            <Bus className="shrink-0" />
                            <p>Sélectionnez votre véhicule parmi la liste autorisée.</p>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {BUS_LIST.map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setSelectedBus(num)}
                                    className={clsx(
                                        "h-16 rounded-xl font-bold text-lg shadow-sm transition-all active:scale-95 flex items-center justify-center",
                                        selectedBus === num
                                            ? "bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-900"
                                            : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800"
                                    )}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ÉTAPE 2 : CARROSSERIE */}
                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <button onClick={() => setDefectType("choc")} className={clsx("flex-1 py-2 rounded-lg text-sm font-bold gap-2 flex items-center justify-center transition-colors", defectType === "choc" ? "bg-red-500 text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}><AlertTriangle size={16} /> Choc</button>
                            <button onClick={() => setDefectType("rayure")} className={clsx("flex-1 py-2 rounded-lg text-sm font-bold gap-2 flex items-center justify-center transition-colors", defectType === "rayure" ? "bg-orange-400 text-white" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}><Eraser size={16} /> Rayure</button>
                        </div>
                        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                            {CARROSSERIE_VIEWS.map((view, index) => (
                                <button key={view} onClick={() => setCurrentViewIndex(index)} className={clsx("px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors", currentViewIndex === index ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900 border-slate-800 dark:border-white" : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800")}>{view}</button>
                            ))}
                        </div>

                        {/* Zone Carrosserie */}
                        <div className="relative aspect-[4/3] bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 shadow-sm overflow-hidden group cursor-crosshair transition-colors" onClick={handleCarrosserieClick}>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-slate-100 dark:text-slate-800 font-black text-5xl uppercase opacity-50 transition-colors">{CARROSSERIE_VIEWS[currentViewIndex]}</div>
                                <div className="absolute w-3/4 h-3/4 border-4 border-slate-100 dark:border-slate-800 rounded-3xl transition-colors" />
                            </div>
                            {defects.filter(d => d.viewIndex === currentViewIndex).map((defect) => (
                                <button key={defect.id} onClick={(e) => removeDefect(defect.id, e)} style={{ left: `${defect.x}%`, top: `${defect.y}%` }} className={clsx("absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-white dark:border-slate-800 shadow-lg flex items-center justify-center transition-transform", defect.type === "choc" ? "bg-red-500" : "bg-orange-400")}>
                                    {defect.type === "choc" ? <AlertTriangle size={14} className="text-white" /> : <Eraser size={14} className="text-white" />}
                                </button>
                            ))}
                        </div>
                        {defects.length > 0 && <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-sm"><p className="font-bold text-slate-700 dark:text-slate-300 mb-2">{defects.length} Signalement(s)</p></div>}
                    </div>
                )}

                {/* ÉTAPE 3 : CHECKLIST */}
                {step === 3 && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                        {CHECKLIST_ITEMS.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-3 transition-colors">
                                <span className="font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                                <div className="flex gap-2 h-12">
                                    <button onClick={() => handleChecklist(item.id, false)} className={clsx("flex-1 rounded-xl flex items-center justify-center transition-colors", checklist[item.id] === false ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700")}><XCircle size={24} /></button>
                                    <button onClick={() => handleChecklist(item.id, true)} className={clsx("flex-1 rounded-xl flex items-center justify-center transition-colors", checklist[item.id] === true ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700")}><CheckCircle2 size={24} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ÉTAPE 4 : REMARQUES */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="text-center pt-4">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">C'est presque fini</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Avez-vous autre chose à signaler ?</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-300 font-bold"><FileText size={20} /> Remarques (Optionnel)</div>
                            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="..." className="w-full h-32 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border-0 focus:ring-2 focus:ring-blue-500 resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400" />
                        </div>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="fixed bottom-16 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-30 transition-colors">
                <div className="max-w-md mx-auto">
                    {step < 4 ? (
                        <button onClick={nextStep} disabled={step === 1 && !selectedBus} className="w-full bg-blue-700 text-white font-bold text-lg h-14 rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">Suivant <ChevronRight /></button>
                    ) : (
                        <button onClick={finish} className="w-full bg-green-600 text-white font-bold text-lg h-14 rounded-2xl shadow-lg flex items-center justify-center gap-2">VALIDER LA PRISE DE SERVICE</button>
                    )}
                </div>
            </div>
        </div>
    );
}