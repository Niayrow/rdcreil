// app/profil/page.tsx
"use client";

import Link from "next/link";
import {
    ChevronLeft,
    User,
    Lock,
    ShieldCheck,
    Award,
    GraduationCap,
    CalendarClock,
    Settings,
    LogOut,
    ChevronRight
} from "lucide-react";

export default function ProfilPage() {
    return (
        <div className="flex flex-col min-h-screen pb-24 font-sans transition-colors duration-300 
      bg-slate-50 dark:bg-[#0a0e17] 
      text-slate-900 dark:text-slate-200">

            {/* HEADER FIXE */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md border-b transition-colors
        bg-slate-50/80 border-slate-200 
        dark:bg-[#0a0e17]/80 dark:border-gray-800">

                <div className="flex items-center gap-3 mb-2">
                    <Link href="/" className="p-2 -ml-2 transition-colors
            text-slate-500 hover:text-slate-800 
            dark:text-gray-400 dark:hover:text-white">
                        <ChevronLeft size={28} />
                    </Link>
                    <span className="font-bold text-lg
            text-slate-800 
            dark:text-gray-200">
                        Mon Espace
                    </span>
                </div>
            </div>

            <div className="px-4 space-y-8 mt-4">

                {/* 1. CARTE PROFIL (Identité) */}
                <div className="rounded-3xl p-6 shadow-xl border transition-all
          bg-white border-slate-100 shadow-slate-200/50 
          dark:bg-gradient-to-br dark:from-[#1a1f2e] dark:to-[#0f121a] dark:border-gray-800 dark:shadow-none">

                    <div className="flex items-center gap-5 mb-8">
                        <div className="relative shrink-0">
                            {/* Cercle Avatar */}
                            <div className="w-20 h-20 rounded-full flex items-center justify-center p-0.5 shadow-lg
                bg-gradient-to-tr from-blue-600 to-indigo-600 
                shadow-blue-200 dark:shadow-blue-900/20">
                                <div className="w-full h-full rounded-full flex items-center justify-center transition-colors
                  bg-white 
                  dark:bg-[#1a1f2e]">
                                    <User size={36} className="text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            {/* Pastille En ligne */}
                            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 transition-colors
                bg-emerald-500 border-white 
                dark:border-[#1a1f2e]"></div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black mb-0.5 transition-colors
                text-slate-800 
                dark:text-white">
                                Sofiane Abedi
                            </h2>
                            <p className="text-sm mb-3 font-medium transition-colors
                text-slate-500 
                dark:text-gray-400">
                                Matricule : <span className="font-mono text-blue-600 dark:text-blue-400">424</span>
                            </p>

                            {/* Badge Statut */}
                            <div className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide inline-flex items-center shadow-sm border transition-colors
                bg-blue-50 text-blue-700 border-blue-100
                dark:bg-[#1e2330] dark:text-blue-300 dark:border-blue-500/20">
                                Conducteur Confirmé
                            </div>
                        </div>
                    </div>

                    {/* Bouton Mot de passe */}
                    <button className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl font-bold text-sm border transition-all active:scale-[0.98]
            bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100
            dark:bg-[#1e2330] dark:text-gray-300 dark:border-gray-700/50 dark:hover:bg-[#252a38]">
                        <Lock size={16} />
                        Modifier mot de passe
                    </button>
                </div>

                {/* 2. MES DOCUMENTS */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xs uppercase tracking-widest ml-1 transition-colors
               text-slate-400 
               dark:text-gray-400">
                            Mes documents
                        </h3>
                        <span className="text-xs font-medium transition-colors
               text-emerald-600 
               dark:text-emerald-500">
                            Tout est à jour
                        </span>
                    </div>

                    <div className="space-y-3">
                        {/* Carte: Permis D */}
                        <div className="rounded-2xl p-4 border flex items-center justify-between shadow-sm group transition-colors
              bg-white border-slate-200 hover:border-blue-300
              dark:bg-[#131722] dark:border-gray-800 dark:hover:border-gray-700">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner border group-hover:scale-110 transition-transform
                  bg-emerald-50 text-emerald-600 border-emerald-100
                  dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20">
                                    <ShieldCheck size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold leading-tight transition-colors
                    text-slate-800 
                    dark:text-white">
                                        Permis D
                                    </h4>
                                    <p className="text-xs mt-1 transition-colors
                    text-slate-500 
                    dark:text-gray-500">
                                        Exp : 14 Mai 2028
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm transition-colors
                  text-emerald-600 
                  dark:text-emerald-500">
                                    Valide
                                </p>
                                <p className="text-[10px] transition-colors
                  text-slate-400 
                  dark:text-gray-600">
                                    J+1240
                                </p>
                            </div>
                        </div>

                        {/* Carte: FCO Voyageurs */}
                        <div className="rounded-2xl p-4 border flex items-center justify-between shadow-sm group transition-colors
              bg-white border-slate-200 hover:border-blue-300
              dark:bg-[#131722] dark:border-gray-800 dark:hover:border-gray-700">

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner border group-hover:scale-110 transition-transform
                  bg-emerald-50 text-emerald-600 border-emerald-100
                  dark:bg-emerald-500/10 dark:text-emerald-500 dark:border-emerald-500/20">
                                    <Award size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold leading-tight transition-colors
                    text-slate-800 
                    dark:text-white">
                                        FCO Voyageurs
                                    </h4>
                                    <p className="text-xs mt-1 transition-colors
                    text-slate-500 
                    dark:text-gray-500">
                                        Exp : 20 Sept. 2027
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm transition-colors
                  text-emerald-600 
                  dark:text-emerald-500">
                                    Valide
                                </p>
                                <p className="text-[10px] transition-colors
                  text-slate-400 
                  dark:text-gray-600">
                                    J+980
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. PARCOURS FORMATION */}
                <section className="space-y-4 pt-2">
                    <h3 className="font-bold text-xs uppercase tracking-widest ml-1 transition-colors
            text-slate-400 
            dark:text-gray-400">
                        Parcours Formation 2026
                    </h3>

                    <div className="rounded-2xl p-5 border flex items-start gap-4 relative overflow-hidden shadow-sm transition-colors
            bg-gradient-to-r from-blue-50 to-white border-blue-100
            dark:from-blue-900/20 dark:to-[#131722] dark:border-blue-900/30">

                        {/* Décoration Blur */}
                        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl transition-colors
               bg-blue-100 
               dark:bg-blue-600/10"></div>

                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shrink-0 z-10 transition-colors
               bg-blue-600 text-white shadow-blue-200 
               dark:bg-blue-500 dark:shadow-blue-900/50">
                            <GraduationCap size={20} />
                        </div>

                        <div className="z-10 w-full">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-sm transition-colors
                      text-slate-800 
                      dark:text-white">
                                    Perfectionnement Éco-Conduite
                                </h4>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded transition-colors
                      bg-blue-100 text-blue-700 
                      dark:bg-blue-500/20 dark:text-blue-300">
                                    À venir
                                </span>
                            </div>
                            <p className="text-xs mt-1 leading-relaxed transition-colors
                  text-slate-600 
                  dark:text-gray-400">
                                Module pratique sur véhicule. Objectif : réduction consommation carburant -5%.
                            </p>
                            <div className="flex items-center gap-2 mt-3 text-xs font-medium transition-colors
                  text-blue-600 
                  dark:text-blue-400">
                                <CalendarClock size={14} />
                                <span>Prévu : 12 Mars 2026</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-3 text-center text-xs font-medium transition-colors
             text-slate-500 hover:text-slate-800 
             dark:text-gray-600 dark:hover:text-gray-400">
                        Voir l'historique des formations complétées
                    </button>
                </section>

                {/* 4. PARAMÈTRES & DÉCONNEXION */}
                <section className="space-y-3 pt-4 pb-6 border-t transition-colors
          border-slate-200 
          dark:border-gray-800">

                    {/* Lien vers Paramètres */}
                    <Link
                        href="/profil/parametres"
                        className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all group shadow-sm
               bg-white border-slate-200 hover:bg-slate-50
               dark:bg-[#131722] dark:border-gray-800 dark:hover:bg-[#1a1f2e]">

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                    bg-slate-100 text-slate-500 group-hover:text-slate-800
                    dark:bg-gray-800 dark:text-gray-400 dark:group-hover:text-white">
                                <Settings size={20} />
                            </div>
                            <span className="font-bold transition-colors
                    text-slate-800 
                    dark:text-gray-200">
                                Paramètres d'application
                            </span>
                        </div>
                        <ChevronRight size={20} className="transition-colors
                text-slate-400 group-hover:text-slate-600 
                dark:text-gray-600 dark:group-hover:text-gray-400" />
                    </Link>

                    {/* Bouton Déconnexion */}
                    <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border font-bold transition-all shadow-sm
             bg-white border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-200
             dark:bg-[#131722] dark:border-gray-800 dark:text-red-500 dark:hover:bg-red-500/10 dark:hover:border-red-500/20">
                        <LogOut size={20} />
                        Se déconnecter
                    </button>

                    <p className="text-center text-[10px] font-mono pt-4 transition-colors
             text-slate-400 
             dark:text-gray-600">
                        Version 2.1.0 • Build 8842
                    </p>
                </section>

            </div>
        </div>
    );
}