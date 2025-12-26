// app/signalement/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft, Phone, AlertTriangle, Bus, Users, Clock, Send, Camera, MapPin, StopCircle, Calendar, AlertOctagon
} from "lucide-react";
import { clsx } from "clsx";

export default function SignalementPage() {
    const [context, setContext] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);

    const categories = [
        { id: "panne", label: "Panne / Défaut Bus", icon: Bus },
        { id: "exploitation", label: "Incident Exploitation", icon: AlertOctagon },
        { id: "retard", label: "Retard Important", icon: Clock },
        { id: "voyageur", label: "Incident Voyageur", icon: Users },
    ];

    return (
        <div className="flex flex-col min-h-screen pb-24 font-sans bg-[#0a0e17] text-slate-200">

            {/* HEADER */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md bg-[#0a0e17]/80 border-b border-gray-800">
                <div className="flex items-center justify-between mb-2">
                    <Link href="/" className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft size={28} />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-200">Signalement</h1>
                    <div className="w-8" />
                </div>
            </div>

            <div className="p-4 space-y-6">

                {/* 1. SECTION URGENCE (LA SEULE AUTORISÉE EN ROULANT) */}
                <div className="rounded-3xl p-5 border-2 border-red-500/50 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-500/40 animate-pulse">
                            <Phone size={24} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-black text-white leading-none mb-1">URGENCE ?</h2>
                            <p className="text-sm text-red-200 font-medium mb-4 leading-tight">
                                Danger immédiat ou blocage en pleine voie.
                            </p>
                            <a
                                href="tel:112" // Remplacer par le numéro du PCC
                                className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                            >
                                APPELER LA RÉGULATION
                            </a>
                        </div>
                    </div>
                </div>

                {/* SÉPARATEUR VISUEL */}
                <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-gray-800 flex-1"></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sinon, rapport écrit</span>
                    <div className="h-px bg-gray-800 flex-1"></div>
                </div>

                {/* MESSAGE DE SÉCURITÉ (Avertissement) */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex gap-3 items-center">
                    <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                    <p className="text-xs text-amber-200 font-medium leading-snug">
                        Les signalements écrits doivent être effectués <span className="font-bold text-white underline decoration-amber-500">à l'arrêt</span> ou après le service.
                    </p>
                </div>

                {/* FORMULAIRE SÉQUENTIEL */}
                <div className="space-y-6">

                    {/* ÉTAPE A : QUAND ? (Contexte) */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">1. Quand cela est-il arrivé ?</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <button onClick={() => setContext('arret')} className={clsx("p-3 rounded-2xl border flex items-center gap-3 transition-all active:scale-[0.98]", context === 'arret' ? "bg-blue-600/20 border-blue-500 text-white" : "bg-[#131722] border-gray-800 text-gray-400 hover:border-gray-600")}>
                                <StopCircle size={20} className={context === 'arret' ? "text-blue-400" : "opacity-50"} />
                                <span className="font-bold text-sm">Maintenant (Je suis à l'arrêt)</span>
                            </button>
                            <button onClick={() => setContext('fin')} className={clsx("p-3 rounded-2xl border flex items-center gap-3 transition-all active:scale-[0.98]", context === 'fin' ? "bg-blue-600/20 border-blue-500 text-white" : "bg-[#131722] border-gray-800 text-gray-400 hover:border-gray-600")}>
                                <Clock size={20} className={context === 'fin' ? "text-blue-400" : "opacity-50"} />
                                <span className="font-bold text-sm">Après le service (Débrief)</span>
                            </button>
                            <button onClick={() => setContext('anterieur')} className={clsx("p-3 rounded-2xl border flex items-center gap-3 transition-all active:scale-[0.98]", context === 'anterieur' ? "bg-blue-600/20 border-blue-500 text-white" : "bg-[#131722] border-gray-800 text-gray-400 hover:border-gray-600")}>
                                <Calendar size={20} className={context === 'anterieur' ? "text-blue-400" : "opacity-50"} />
                                <span className="font-bold text-sm">Service précédent</span>
                            </button>
                        </div>
                    </div>

                    {/* ÉTAPE B : QUOI ? (Catégorie) - Seulement si contexte choisi */}
                    <div className={clsx("space-y-3 transition-all duration-500", !context && "opacity-30 pointer-events-none blur-[1px]")}>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">2. Type d'incident</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                const isSelected = category === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategory(cat.id)}
                                        className={clsx(
                                            "p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 h-24 transition-all active:scale-95",
                                            isSelected
                                                ? "bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                                                : "bg-[#131722] border-gray-800 text-gray-400 hover:border-gray-600 hover:bg-[#1a1f2e]"
                                        )}
                                    >
                                        <Icon size={24} className={isSelected ? "text-blue-400" : "opacity-50"} />
                                        <span className="font-bold text-xs text-center leading-tight">{cat.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* ÉTAPE C : DÉTAILS - Seulement si catégorie choisie */}
                    <div className={clsx("space-y-4 transition-all duration-500", (!context || !category) && "opacity-30 pointer-events-none blur-[1px]")}>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">3. Détails (Facultatif)</h3>

                        <div className="bg-[#131722] p-2 rounded-2xl border border-gray-800">
                            <textarea
                                className="w-full bg-transparent p-3 text-sm text-white placeholder-gray-600 resize-none outline-none h-24"
                                placeholder="Description brève..."
                            ></textarea>

                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800 px-2 pb-1">
                                <button className="flex items-center gap-2 bg-[#1a1f2e] hover:bg-gray-800 text-gray-300 px-3 py-2 rounded-lg text-xs font-bold border border-gray-700 transition-colors">
                                    <Camera size={16} /> Photo
                                </button>
                                <div className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-gray-600 bg-black/20 px-2 py-1 rounded">
                                    <MapPin size={10} />
                                    GPS AUTO
                                </div>
                            </div>
                        </div>

                        {/* BOUTON FINAL */}
                        <button
                            disabled={!context || !category}
                            className={clsx(
                                "w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all",
                                context && category
                                    ? "bg-blue-600 text-white shadow-blue-900/40 active:scale-95 hover:bg-blue-500"
                                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            <Send size={20} />
                            ENVOYER LE RAPPORT
                        </button>
                    </div>

                </div>

                {/* MENTIONS LÉGALES / PROTECTION */}
                <p className="text-[10px] text-red-400/60 text-center mt-8 px-8 leading-tight">
                    🚫 L'utilisation du téléphone est strictement interdite pendant la conduite. Tout signalement doit être effectué véhicule à l'arrêt.
                </p>

            </div>
        </div>
    );
}