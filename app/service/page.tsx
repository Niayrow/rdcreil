// app/service/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertTriangle, Eraser, Bus, FileText, Send, Wrench, X, Clock, User, ThumbsUp, AlertOctagon
} from "lucide-react";
import { clsx } from "clsx";

// --- DONNÉES ---
const EXCLUDED_BUSES = [39, 40, 42, 50, 60, 70];
const ARTICULATED_BUSES = [53, 57, 58, 65, 66, 67, 68];
const ASSIGNED_BUS = 67;

const MECHANIC_REASONS: Record<number, { reason: string, date: string }> = {
    44: { reason: "Problème Système de Freinage", date: "Retour estimé : Demain" },
    53: { reason: "Vidange & Filtres", date: "En cours - Fin 14h" },
    62: { reason: "Porte arrière bloquée", date: "En attente pièce" },
    71: { reason: "Contrôle Technique Réglementaire", date: "Retour : 26/12" }
};

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

    const [mechanicModalBus, setMechanicModalBus] = useState<number | null>(null);

    // Carrosserie
    const [currentViewIndex, setCurrentViewIndex] = useState(0);
    const [defectType, setDefectType] = useState<"choc" | "rayure">("choc");
    const [defects, setDefects] = useState<any[]>([]);
    const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

    // Checklist & Validation
    const [checklist, setChecklist] = useState<Record<string, boolean | null>>({});
    const [remarks, setRemarks] = useState("");

    // --- LOGIQUE CARROSSERIE ---
    const handleCarrosserieClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const newDefect = { id: Date.now(), viewIndex: currentViewIndex, x, y, type: defectType };

        setDefects([...defects, newDefect]);

        const viewName = CARROSSERIE_VIEWS[currentViewIndex];
        setLastActionMessage(`Signalement : 1 ${defectType} ajouté sur ${viewName}`);

        setTimeout(() => setLastActionMessage(null), 3000);
    };

    const removeDefect = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setDefects(defects.filter(d => d.id !== id));
        setLastActionMessage("Signalement supprimé");
        setTimeout(() => setLastActionMessage(null), 2000);
    };

    // --- LOGIQUE CHECKLIST ---
    const handleChecklist = (id: string, value: boolean) => setChecklist(prev => ({ ...prev, [id]: value }));

    // Vérification : Est-ce que TOUT est coché ?
    const isChecklistComplete = CHECKLIST_ITEMS.every(item => checklist[item.id] !== undefined);

    // Calcul des problèmes pour l'étape 4
    const problematicItems = CHECKLIST_ITEMS.filter(item => checklist[item.id] === false);
    const hasProblems = problematicItems.length > 0;

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const finish = () => {
        setIsSuccess(true);
        setTimeout(() => { router.push("/?service_started=true"); }, 3000);
    };

    const progress = (step / 4) * 100;

    const handleBusClick = (num: number, isMechanic: boolean) => {
        if (isMechanic) {
            setMechanicModalBus(num);
        } else {
            setSelectedBus(num);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white p-6 text-center animate-in fade-in duration-500">
                <div className="bg-white/10 p-6 rounded-full mb-6 backdrop-blur-sm animate-bounce border border-white/20">
                    <Send size={48} className="text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">Envoyé à la régulation</h1>
                <p className="text-blue-200 text-lg mb-8">La prise de service est validée.</p>
                <div className="bg-white/5 rounded-xl p-4 w-full max-w-xs border border-white/10">
                    <p className="font-bold text-xl flex items-center justify-center gap-2">👋 Bonne route !</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-0px)] bg-[#0a0e17] text-slate-200 transition-colors duration-300 relative">

            {/* MODAL MÉCANIQUE */}
            {mechanicModalBus && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-[#1a1f2e] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-700">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500">
                                    <Wrench size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white">Bus {mechanicModalBus}</h3>
                                    <p className="text-sm font-bold text-orange-500 uppercase tracking-wide">Indisponible</p>
                                </div>
                            </div>
                            <button onClick={() => setMechanicModalBus(null)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:bg-slate-700">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="bg-[#131722] p-4 rounded-2xl mb-4 border border-gray-800">
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Motif de la panne</p>
                            <p className="text-slate-200 font-medium text-lg leading-snug">
                                {MECHANIC_REASONS[mechanicModalBus]?.reason || "Panne signalée"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-6">
                            <Clock size={16} />
                            <span>{MECHANIC_REASONS[mechanicModalBus]?.date || "Date de retour inconnue"}</span>
                        </div>
                        <button onClick={() => setMechanicModalBus(null)} className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform hover:bg-slate-200">Compris</button>
                    </div>
                </div>
            )}

            {/* HEADER : BOUTON QUITTE DISCRET */}
            <div className="bg-[#0a0e17]/80 backdrop-blur-md px-4 pt-4 pb-2 sticky top-0 z-20 shadow-sm border-b border-gray-800 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    {/* Gauche : Retour / Précédent */}
                    {step > 1 ? (
                        <button onClick={prevStep} className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"><ChevronLeft size={28} /></button>
                    ) : (
                        <div className="w-8"></div>
                    )}

                    <h1 className="text-lg font-bold text-white">
                        {step === 1 && "Véhicule"}
                        {step === 2 && "Carrosserie"}
                        {step === 3 && "Checklist"}
                        {step === 4 && "Validation"}
                    </h1>

                    {/* Droite : Bouton QUITTER discret */}
                    <Link href="/" className="p-2 -mr-2 text-slate-500 hover:text-red-400 transition-colors" aria-label="Annuler la prise de service">
                        <X size={24} />
                    </Link>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* CONTENU */}
            <div className="flex-1 overflow-y-auto p-4 pb-40">

                {/* ÉTAPE 1 : BUS */}
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-blue-900/20 p-4 rounded-xl flex gap-3 text-blue-300 text-sm mb-4 border border-blue-900/50">
                            <Bus className="shrink-0" />
                            <p>Sélectionnez un véhicule. <br />Le bus <span className="font-bold text-indigo-400">#{ASSIGNED_BUS}</span> vous est réservé.</p>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {BUS_LIST.map((num) => {
                                const isMechanic = Object.keys(MECHANIC_REASONS).map(Number).includes(num);
                                const isSelected = selectedBus === num;
                                const isAssigned = num === ASSIGNED_BUS;
                                const isArticulated = ARTICULATED_BUSES.includes(num);
                                return (
                                    <button
                                        key={num}
                                        onClick={() => handleBusClick(num, isMechanic)}
                                        className={clsx(
                                            "relative h-24 rounded-xl font-bold shadow-sm transition-all flex flex-col items-center justify-center gap-0.5 overflow-hidden",
                                            isSelected && "bg-blue-600 text-white ring-4 ring-blue-900 scale-105 z-10",
                                            !isSelected && isMechanic && "bg-slate-900/50 text-slate-600 border border-slate-800 cursor-help",
                                            !isSelected && !isMechanic && isAssigned && "bg-indigo-900/20 text-indigo-200 border-2 border-indigo-500 shadow-none active:scale-95",
                                            !isSelected && !isMechanic && !isAssigned && "bg-[#1e293b] text-slate-200 border border-slate-700 active:scale-95 hover:bg-[#253248]"
                                        )}
                                    >
                                        <div className={clsx("text-[9px] uppercase tracking-wider font-bold mb-0.5", isSelected ? "text-blue-200" : isAssigned ? "text-indigo-300" : isMechanic ? "text-slate-700" : "text-slate-400")}>{isArticulated ? "Articulé" : "Standard"}</div>
                                        <span className="text-xl leading-none mb-1">{num}</span>
                                        {isMechanic ? (<Wrench size={14} className="text-orange-900 opacity-60" />) : isAssigned ? (<div className={clsx("flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full", isSelected ? "bg-white/20 text-white" : "bg-indigo-500/30 text-indigo-300")}>{!isSelected && <User size={10} />}<span>Affecté</span></div>) : (<div className={clsx("flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full", isSelected ? "bg-white/20 text-white" : "bg-green-900/30 text-green-400")}>{!isSelected && <CheckCircle2 size={10} />}<span>Dispo</span></div>)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ÉTAPE 2 : CARROSSERIE */}
                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex bg-[#1e293b] p-1 rounded-xl shadow-sm border border-slate-800">
                            <button onClick={() => setDefectType("choc")} className={clsx("flex-1 py-2 rounded-lg text-sm font-bold gap-2 flex items-center justify-center transition-colors", defectType === "choc" ? "bg-red-600 text-white" : "text-slate-400 hover:bg-slate-800")}><AlertTriangle size={16} /> Choc</button>
                            <button onClick={() => setDefectType("rayure")} className={clsx("flex-1 py-2 rounded-lg text-sm font-bold gap-2 flex items-center justify-center transition-colors", defectType === "rayure" ? "bg-orange-500 text-white" : "text-slate-400 hover:bg-slate-800")}><Eraser size={16} /> Rayure</button>
                        </div>
                        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                            {CARROSSERIE_VIEWS.map((view, index) => (
                                <button key={view} onClick={() => setCurrentViewIndex(index)} className={clsx("px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-colors", currentViewIndex === index ? "bg-white text-slate-900 border-white" : "bg-slate-900 text-slate-400 border-slate-800")}>{view}</button>
                            ))}
                        </div>

                        <div className="relative aspect-[4/3] bg-[#1a1f2e] rounded-2xl border-2 border-dashed border-slate-700 shadow-sm overflow-hidden group cursor-crosshair transition-colors" onClick={handleCarrosserieClick}>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-slate-800 font-black text-5xl uppercase opacity-50 transition-colors">{CARROSSERIE_VIEWS[currentViewIndex]}</div>
                                <div className="absolute w-3/4 h-3/4 border-4 border-slate-800 rounded-3xl transition-colors" />
                            </div>
                            {defects.filter(d => d.viewIndex === currentViewIndex).map((defect) => (
                                <button key={defect.id} onClick={(e) => removeDefect(defect.id, e)} style={{ left: `${defect.x}%`, top: `${defect.y}%` }} className={clsx("absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-slate-800 shadow-lg flex items-center justify-center transition-transform", defect.type === "choc" ? "bg-red-500" : "bg-orange-400")}>
                                    {defect.type === "choc" ? <AlertTriangle size={14} className="text-white" /> : <Eraser size={14} className="text-white" />}
                                </button>
                            ))}
                        </div>

                        {lastActionMessage && (
                            <div className="bg-blue-600 text-white text-sm font-bold p-3 rounded-xl shadow-lg text-center animate-in fade-in slide-in-from-bottom-2">
                                {lastActionMessage}
                            </div>
                        )}

                        {defects.length > 0 && <div className="bg-[#1e293b] p-3 rounded-xl border border-slate-800 text-sm"><p className="font-bold text-slate-300 mb-2">{defects.length} Signalement(s) total</p></div>}
                    </div>
                )}

                {/* ÉTAPE 3 : CHECKLIST */}
                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <p className="text-sm text-slate-400 mb-2">Vérifiez les points suivants :</p>
                        {CHECKLIST_ITEMS.map((item) => (
                            <div key={item.id} className="bg-[#1e293b] p-4 rounded-3xl shadow-sm border border-slate-800 flex flex-col gap-4">
                                <span className="font-bold text-white text-lg">{item.label}</span>
                                <div className="flex gap-3 h-14">
                                    <button
                                        onClick={() => handleChecklist(item.id, false)}
                                        className={clsx(
                                            "flex-1 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95 border-2",
                                            checklist[item.id] === false
                                                ? "bg-red-600/20 border-red-600 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                                                : "bg-[#131722] border-slate-700 text-slate-500 hover:border-red-900/50 hover:text-red-800"
                                        )}
                                    >
                                        <XCircle size={24} />
                                        <span>Problème</span>
                                    </button>

                                    <button
                                        onClick={() => handleChecklist(item.id, true)}
                                        className={clsx(
                                            "flex-1 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95 border-2",
                                            checklist[item.id] === true
                                                ? "bg-emerald-600/20 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                                : "bg-[#131722] border-slate-700 text-slate-500 hover:border-emerald-900/50 hover:text-emerald-800"
                                        )}
                                    >
                                        <CheckCircle2 size={24} />
                                        <span>Valide</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ÉTAPE 4 : VALIDATION INTELLIGENTE */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">

                        <div className="text-center pt-4">
                            {hasProblems ? (
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-500 mb-4 animate-pulse">
                                    <AlertOctagon size={32} />
                                </div>
                            ) : (
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
                                    <ThumbsUp size={32} />
                                </div>
                            )}

                            <h2 className="text-2xl font-black text-white">
                                {hasProblems ? "Attention !" : "C'est presque fini"}
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">
                                {hasProblems ? "Vous avez signalé des anomalies." : "Le véhicule semble prêt."}
                            </p>
                        </div>

                        {hasProblems && (
                            <div className="bg-orange-500/10 border border-orange-500/30 p-5 rounded-3xl space-y-3">
                                <p className="font-bold text-orange-400 text-sm uppercase tracking-wider mb-2">Anomalies déclarées :</p>
                                <ul className="space-y-2">
                                    {problematicItems.map(item => (
                                        <li key={item.id} className="flex items-start gap-3 text-orange-200 text-sm font-medium bg-orange-500/10 p-3 rounded-xl border border-orange-500/10">
                                            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-orange-400/80 italic pt-2 text-center">
                                    Voulez-vous vraiment valider la prise de service avec ces défauts ?
                                </p>
                            </div>
                        )}

                        <div className="bg-[#1e293b] p-4 rounded-3xl shadow-sm border border-slate-800">
                            <div className="flex items-center gap-2 mb-2 text-slate-300 font-bold"><FileText size={20} /> Remarques (Optionnel)</div>
                            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Ajouter un commentaire..." className="w-full h-32 bg-slate-800 rounded-xl p-3 border-0 focus:ring-2 focus:ring-blue-500 resize-none text-slate-200 placeholder-slate-500" />
                        </div>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="fixed bottom-0 left-0 w-full bg-[#1a1f2e] border-t border-slate-800 p-4 z-30 transition-colors pb-8">
                <div className="max-w-md mx-auto">
                    {step < 4 ? (
                        <button
                            onClick={nextStep}
                            disabled={(step === 1 && !selectedBus) || (step === 3 && !isChecklistComplete)}
                            className="w-full bg-blue-600 text-white font-bold text-lg h-14 rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                        >
                            Suivant <ChevronRight />
                        </button>
                    ) : (
                        <button
                            onClick={finish}
                            className={clsx(
                                "w-full font-bold text-lg h-14 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-colors",
                                hasProblems ? "bg-orange-600 hover:bg-orange-500 text-white" : "bg-green-600 hover:bg-green-500 text-white"
                            )}
                        >
                            {hasProblems ? "CONFIRMER MALGRÉ DÉFAUTS" : "VALIDER LA PRISE DE SERVICE"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}