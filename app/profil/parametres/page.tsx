// app/profil/parametres/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ChevronLeft, Moon, Sun, Smartphone, Bell, Eye, Volume2 } from "lucide-react";
import { clsx } from "clsx";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Évite les erreurs d'hydratation
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col min-h-screen bg-[var(--background)] pb-24 transition-colors duration-300">

            {/* HEADER AVEC RETOUR */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--nav-border)]">
                <div className="flex items-center gap-3 mb-2">
                    <Link href="/profil" className="p-2 -ml-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                        <ChevronLeft size={28} />
                    </Link>
                    <h1 className="text-lg font-bold text-[var(--foreground)]">Paramètres</h1>
                </div>
            </div>

            <div className="p-4 space-y-6">

                {/* SECTION APPARENCE */}
                <section className="space-y-3">
                    <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-wider ml-1">Apparence</h2>

                    <div className="card-base p-4 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4 text-[var(--foreground)]">
                            <Eye size={20} className="text-blue-600 dark:text-blue-400" />
                            <span className="font-bold">Thème de l'application</span>
                        </div>

                        {/* SÉLECTEUR DE THÈME (SEGMENT CONTROL) */}
                        <div className="bg-[var(--background)] p-1.5 rounded-xl flex border border-[var(--card-border)]">

                            {/* BOUTON CLAIR */}
                            <button
                                onClick={() => setTheme('light')}
                                className={clsx(
                                    "flex-1 flex flex-col items-center justify-center py-3 rounded-lg text-xs font-medium gap-1 transition-all",
                                    theme === 'light'
                                        ? "bg-white text-blue-700 shadow-sm border border-slate-200"
                                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                                )}
                            >
                                <Sun size={18} />
                                Clair
                            </button>

                            {/* BOUTON SOMBRE */}
                            <button
                                onClick={() => setTheme('dark')}
                                className={clsx(
                                    "flex-1 flex flex-col items-center justify-center py-3 rounded-lg text-xs font-medium gap-1 transition-all",
                                    theme === 'dark'
                                        ? "bg-slate-800 text-white shadow-sm"
                                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                                )}
                            >
                                <Moon size={18} />
                                Sombre
                            </button>

                            {/* BOUTON SYSTÈME */}
                            <button
                                onClick={() => setTheme('system')}
                                className={clsx(
                                    "flex-1 flex flex-col items-center justify-center py-3 rounded-lg text-xs font-medium gap-1 transition-all",
                                    theme === 'system'
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                                )}
                            >
                                <Smartphone size={18} />
                                Système
                            </button>
                        </div>
                        <p className="text-[10px] text-[var(--muted)] mt-2 text-center">
                            Le mode "Système" s'adapte automatiquement aux réglages de votre téléphone.
                        </p>
                    </div>
                </section>

                {/* SECTION NOTIFICATIONS (MOCK) */}
                <section className="space-y-3">
                    <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-wider ml-1">Préférences</h2>

                    <div className="card-base rounded-2xl overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b border-[var(--card-border)]">
                            <div className="flex items-center gap-3">
                                <Bell size={20} className="text-[var(--muted)]" />
                                <span className="text-[var(--foreground)] font-medium">Notifications Push</span>
                            </div>
                            {/* Switch Factice */}
                            <div className="w-11 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Volume2 size={20} className="text-[var(--muted)]" />
                                <span className="text-[var(--foreground)] font-medium">Sons d'alerte</span>
                            </div>
                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}