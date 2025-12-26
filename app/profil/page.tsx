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
    ChevronRight,
    Info,
    Mail
} from "lucide-react";
import { clsx } from "clsx";

export default function ProfilPage() {
    return (
        <div className="flex flex-col min-h-screen pb-24 font-sans transition-colors duration-300 
      bg-[#0a0e17] text-slate-200">

            {/* HEADER FIXE */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md border-b transition-colors
        bg-[#0a0e17]/80 border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                    <Link href="/" className="p-2 -ml-2 transition-colors
            text-gray-400 hover:text-white">
                        <ChevronLeft size={28} />
                    </Link>
                    <span className="font-bold text-lg text-gray-200">
                        Mon Espace
                    </span>
                </div>
            </div>

            <div className="px-4 space-y-8 mt-4">

                {/* 1. CARTE PROFIL (Identité) */}
                <div className="rounded-3xl p-6 shadow-none border transition-all
          bg-gradient-to-br from-[#1a1f2e] to-[#0f121a] border-gray-800">

                    <div className="flex items-start gap-5">
                        <div className="relative shrink-0">
                            {/* Cercle Avatar */}
                            <div className="w-20 h-20 rounded-full flex items-center justify-center p-0.5 shadow-lg
                bg-gradient-to-tr from-blue-600 to-indigo-600 
                shadow-blue-900/20">
                                <div className="w-full h-full rounded-full flex items-center justify-center transition-colors
                  bg-[#1a1f2e]">
                                    <User size={36} className="text-blue-400" />
                                </div>
                            </div>
                            {/* Pastille En ligne */}
                            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 transition-colors
                bg-emerald-500 border-[#1a1f2e]"></div>
                        </div>

                        <div className="flex flex-col items-start">
                            <h2 className="text-2xl font-black mb-0.5 transition-colors text-white">
                                Sofiane Abedi
                            </h2>
                            <p className="text-sm mb-3 font-medium transition-colors text-gray-400">
                                Matricule : <span className="font-mono text-blue-400">424</span>
                            </p>

                            {/* Badge Statut */}
                            <div className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide inline-flex items-center shadow-sm border transition-colors
                bg-[#1e2330] text-blue-300 border-blue-500/20 mb-3">
                                Conducteur Confirmé
                            </div>

                            {/* LIEN SECONDAIRE (Mot de passe) */}
                            <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
                                <Lock size={12} />
                                <span>Modifier mon mot de passe</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. MES DOCUMENTS (Intelligent) */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xs uppercase tracking-widest ml-1 transition-colors text-gray-400">
                            Mes documents
                        </h3>
                        {/* Indicateur global discret */}
                        <span className="text-[10px] font-medium transition-colors text-orange-400 flex items-center gap-1">
                            <Info size={12} /> 1 action requise
                        </span>
                    </div>

                    <div className="space-y-3">
                        {/* Cas 1 : Document Valide (Vert) */}
                        <div className="rounded-2xl p-4 border flex items-center justify-between shadow-sm group transition-colors
              bg-[#131722] border-gray-800 hover:border-gray-700">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner border group-hover:scale-110 transition-transform
                  bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                    <ShieldCheck size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold leading-tight transition-colors text-white">
                                        Permis D
                                    </h4>
                                    <p className="text-xs mt-1 transition-colors text-gray-500">
                                        Exp : 14 Mai 2028
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm transition-colors text-emerald-500">
                                    Valide
                                </p>
                                <p className="text-[10px] transition-colors text-gray-600">
                                    J+1240
                                </p>
                            </div>
                        </div>

                        {/* Cas 2 : Document Bientôt Expiré (Orange) - DEMO */}
                        <div className="rounded-2xl p-4 border flex items-center justify-between shadow-sm group transition-colors
              bg-[#131722] border-orange-900/30 hover:border-orange-700/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner border group-hover:scale-110 transition-transform
                  bg-orange-500/10 text-orange-500 border-orange-500/20">
                                    <Award size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold leading-tight transition-colors text-white">
                                        FCO Voyageurs
                                    </h4>
                                    <p className="text-xs mt-1 transition-colors text-orange-400 font-medium">
                                        Expire dans 28 jours
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm transition-colors text-orange-500">
                                    Action
                                </p>
                                <p className="text-[10px] transition-colors text-orange-400/60">
                                    J-28
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. PARCOURS FORMATION (Actionnable) */}
                <section className="space-y-4 pt-2">
                    <div className="flex justify-between items-end">
                        <h3 className="font-bold text-xs uppercase tracking-widest ml-1 transition-colors text-gray-400">
                            Parcours Formation 2026
                        </h3>
                    </div>

                    <div className="rounded-2xl p-5 border flex flex-col gap-4 relative overflow-hidden shadow-sm transition-colors
            bg-gradient-to-r from-blue-900/20 to-[#131722] border-blue-900/30">

                        {/* En-tête de la carte */}
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shrink-0 transition-colors
                 bg-blue-500 text-white shadow-blue-900/50">
                                <GraduationCap size={20} />
                            </div>
                            <div className="w-full">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-sm transition-colors text-white">
                                        Perfectionnement Éco-Conduite
                                    </h4>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded transition-colors
                        bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                        À venir
                                    </span>
                                </div>
                                <p className="text-xs mt-1 leading-relaxed transition-colors text-gray-400">
                                    Module pratique sur véhicule. Objectif : réduction consommation carburant -5%.
                                </p>
                            </div>
                        </div>

                        {/* Footer de la carte (Actions) */}
                        <div className="relative z-10 pt-3 mt-1 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-medium transition-colors text-blue-400">
                                <CalendarClock size={14} />
                                <span>Avant le 31/03 (Obligatoire)</span>
                            </div>
                            <button className="text-xs font-bold text-white bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">
                                Détails
                            </button>
                        </div>

                        {/* Décoration Blur */}
                        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl transition-colors bg-blue-600/10"></div>
                    </div>

                    <button className="w-full py-2 text-center text-xs font-medium transition-colors
             text-gray-600 hover:text-gray-400">
                        Voir l'historique complet
                    </button>
                </section>

                {/* 4. INFO CONFIANCE & PARAMÈTRES */}
                <section className="space-y-3 pt-4 pb-8 border-t transition-colors border-gray-800">

                    {/* Lien vers Paramètres */}
                    <Link
                        href="/profil/parametres"
                        className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all group shadow-sm
               bg-[#131722] border-gray-800 hover:bg-[#1a1f2e]">

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                    bg-gray-800 text-gray-400 group-hover:text-white">
                                <Settings size={20} />
                            </div>
                            <span className="font-bold transition-colors text-gray-200">
                                Paramètres d'application
                            </span>
                        </div>
                        <ChevronRight size={20} className="transition-colors
                text-gray-600 group-hover:text-gray-400" />
                    </Link>

                    {/* Bouton Déconnexion */}
                    <button className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border font-bold transition-all shadow-sm
             bg-[#131722] border-gray-800 text-red-500 hover:bg-red-500/10 hover:border-red-500/20">
                        <LogOut size={20} />
                        Se déconnecter
                    </button>

                    {/* INFO DE CONFIANCE (Trust Footer) */}
                    <div className="pt-6 pb-2 text-center space-y-1 opacity-60">
                        <p className="text-[10px] text-gray-500 flex items-center justify-center gap-2">
                            <span>Compte actif depuis 2022</span> • <span>Sync : 09:01</span>
                        </p>
                        <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
                            <Mail size={10} /> Support : exploitation@transports-creil.fr
                        </p>
                        <p className="text-[9px] text-gray-700 font-mono mt-2">
                            v2.1.0 • Build 8842 • ID: #U-424
                        </p>
                    </div>
                </section>

            </div>
        </div>
    );
}