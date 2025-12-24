// app/signalement/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Camera, MapPin, AlertTriangle, Bus, Users, Clock, Send } from "lucide-react";
import { clsx } from "clsx";

export default function SignalementPage() {
    const [category, setCategory] = useState<string | null>(null);
    const [isBlocking, setIsBlocking] = useState(false);

    const categories = [
        { id: "panne", label: "Panne Bus", icon: Bus },
        { id: "accident", label: "Accident", icon: AlertTriangle },
        { id: "retard", label: "Retard Import.", icon: Clock },
        { id: "agression", label: "Incivilité", icon: Users },
    ];

    return (
        <div className="flex flex-col min-h-screen pb-24">

            {/* HEADER */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md bg-[var(--background)]/80">
                <div className="flex items-center justify-between mb-2">
                    <Link href="/" className="p-2 -ml-2 text-[var(--muted)]"><ChevronLeft size={28} /></Link>
                    <h1 className="text-lg font-bold text-[var(--foreground)]">Nouveau Signalement</h1>
                    <div className="w-8" />
                </div>
            </div>

            <div className="p-4 space-y-6">

                {/* 1. NIVEAU URGENCE */}
                <div className="card-base p-4 rounded-3xl">
                    <p className="text-sm font-bold text-[var(--muted)] mb-3 uppercase">Le véhicule est-il immobilisé ?</p>
                    <div className="flex bg-[var(--background)] p-1 rounded-xl">
                        <button onClick={() => setIsBlocking(false)} className={clsx("flex-1 py-3 rounded-lg text-sm font-bold transition-all", !isBlocking ? "card-base text-[var(--foreground)] shadow-sm" : "text-[var(--muted)]")}>Non, je roule</button>
                        <button onClick={() => setIsBlocking(true)} className={clsx("flex-1 py-3 rounded-lg text-sm font-bold transition-all", isBlocking ? "bg-red-500 text-white shadow-sm" : "text-[var(--muted)]")}>Oui, Bloquant</button>
                    </div>
                </div>

                {/* 2. CATÉGORIES */}
                <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = category === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={clsx(
                                    "p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 h-28 transition-all active:scale-95",
                                    isSelected
                                        ? "bg-blue-50 dark:bg-blue-900/30 border-blue-600 text-blue-700 dark:text-blue-300"
                                        : "card-base border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                                )}
                            >
                                <Icon size={28} className={isSelected ? "text-blue-600 dark:text-blue-300" : "text-[var(--muted)]"} />
                                <span className="font-bold text-sm">{cat.label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* 3. LOCALISATION & PHOTO */}
                <div className="space-y-3">
                    <div className="card-base p-3 rounded-2xl flex items-center gap-3 text-[var(--foreground)]">
                        <MapPin className="text-blue-600" />
                        <span className="font-medium text-sm">Gare Routière Creil (GPS Auto)</span>
                    </div>

                    <button className="w-full card-base border-2 border-dashed border-[var(--card-border)] rounded-2xl h-32 flex flex-col items-center justify-center gap-2 text-[var(--muted)] active:bg-[var(--background)] transition-colors">
                        <Camera size={32} />
                        <span className="text-sm font-medium">Ajouter une photo (Optionnel)</span>
                    </button>
                </div>

                {/* 4. DESCRIPTION */}
                <textarea
                    className="w-full card-base rounded-2xl p-4 text-[var(--foreground)] focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32 placeholder:text-[var(--muted)]"
                    placeholder="Détails supplémentaires..."
                ></textarea>

                {/* BOUTON ENVOYER */}
                <button className="w-full bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-transform flex items-center justify-center gap-2">
                    <Send size={20} />
                    ENVOYER LE SIGNALEMENT
                </button>

            </div>
        </div>
    );
}