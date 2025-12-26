// app/messages/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft, MessageCircle, AlertOctagon, Info, Check, MapPin,
    FileText, Bus, RefreshCw, Filter, Archive, Phone, X, Calendar, Map, UserCheck, CheckCircle2
} from "lucide-react";
import { clsx } from "clsx";

// Définition des types
type MessageCategory = 'regulation' | 'planning' | 'atelier';
type MessageStatus = 'pending' | 'processed';

interface Message {
    id: number;
    category: MessageCategory;
    sender: string;
    time: string;
    title: string;
    body: string;
    status: MessageStatus;
    processedAt?: string;
    // Données spécifiques pour les modales
    details?: {
        stopsExcluded?: string[];
        deviationPath?: string;
        dates?: string;
        type?: string;
        validator?: string;
    };
}

export default function MessagesPage() {
    const [filter, setFilter] = useState<MessageCategory | 'all'>('all');

    // État pour la modale active (null = fermée)
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [modalType, setModalType] = useState<'route' | 'request' | null>(null);

    // Données initiales
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            category: 'regulation',
            sender: "Régulation",
            time: "12:15",
            title: "Déviation Ligne A",
            body: "Accident rue de la République. Déviation via Bd Jaurès. Arrêts 'Mairie' et 'Poste' non desservis.",
            status: 'pending',
            details: {
                stopsExcluded: ["Mairie", "Poste Centrale", "Place Jean Jaurès"],
                deviationPath: "Boulevard Jaurès > Rue de la Paix"
            }
        },
        {
            id: 2,
            category: 'planning',
            sender: "Planning / RH",
            time: "Hier, 14:30",
            title: "Validation congés",
            body: "Votre demande pour la période du 24/12 au 26/12 a été validée.",
            status: 'pending',
            details: {
                type: "Congés Payés",
                dates: "24 Déc. 2025 - 26 Déc. 2025",
                validator: "Service RH (Mme. Dupont)"
            }
        },
        {
            id: 3,
            category: 'atelier',
            sender: "Atelier",
            time: "Hier, 09:15",
            title: "Bus 402 Disponible",
            body: "Remplacement rétroviseur terminé. Véhicule disponible rangée 4.",
            status: 'processed',
            processedAt: "Hier, 10:00"
        }
    ]);

    const handleAcknowledge = (id: number) => {
        const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => prev.map(msg =>
            msg.id === id ? { ...msg, status: 'processed', processedAt: `Aujourd'hui, ${now}` } : msg
        ));
    };

    const openModal = (msg: Message, type: 'route' | 'request') => {
        setSelectedMessage(msg);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedMessage(null);
        setModalType(null);
    };

    // Filtrage
    const filteredMessages = messages.filter(msg => filter === 'all' || msg.category === filter);
    const pendingMessages = filteredMessages.filter(msg => msg.status === 'pending');
    const processedMessages = filteredMessages.filter(msg => msg.status === 'processed');

    const getCategoryStyles = (cat: MessageCategory) => {
        switch (cat) {
            case 'regulation': return {
                border: "border-red-500/50",
                bg: "bg-red-500/10",
                text: "text-red-400",
                icon: AlertOctagon,
                btnPrimary: "bg-red-600 hover:bg-red-500 text-white",
                btnSecondary: "bg-red-900/20 text-red-300 hover:bg-red-900/40"
            };
            case 'planning': return {
                border: "border-blue-500/50",
                bg: "bg-blue-500/10",
                text: "text-blue-400",
                icon: FileText,
                btnPrimary: "bg-blue-600 hover:bg-blue-500 text-white",
                btnSecondary: "bg-blue-900/20 text-blue-300 hover:bg-blue-900/40"
            };
            case 'atelier': return {
                border: "border-emerald-500/50",
                bg: "bg-emerald-500/10",
                text: "text-emerald-400",
                icon: Bus,
                btnPrimary: "bg-emerald-600 hover:bg-emerald-500 text-white",
                btnSecondary: "bg-emerald-900/20 text-emerald-300 hover:bg-emerald-900/40"
            };
        }
    };

    return (
        <div className="flex flex-col min-h-screen pb-24 font-sans bg-[#0a0e17] text-slate-200">

            {/* --- MODALE DYNAMIQUE --- */}
            {selectedMessage && modalType && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
                    <div className="bg-[#1a1f2e] w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border-t sm:border border-gray-700 transform transition-all animate-in slide-in-from-bottom-10 sm:zoom-in-95">

                        {/* En-tête Modale */}
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xl font-black text-white flex items-center gap-2">
                                {modalType === 'route' ? <Map className="text-red-400" /> : <FileText className="text-blue-400" />}
                                {modalType === 'route' ? "Détail Déviation" : "Ma Demande"}
                            </h3>
                            <button onClick={closeModal} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:bg-slate-700 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* CONTENU : ITINÉRAIRE */}
                        {modalType === 'route' && (
                            <div className="space-y-4">
                                <div className="bg-slate-900 rounded-xl p-1 h-32 relative overflow-hidden border border-gray-700">
                                    {/* Placeholder Carte */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-[#131722]">
                                        <MapPin className="mb-2" />
                                        <span className="text-xs font-mono ml-2">CARTE INTERACTIVE</span>
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                                        Ligne A
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                        <p className="text-xs text-red-300 font-bold uppercase mb-1">Arrêts non desservis</p>
                                        <ul className="text-sm text-white space-y-1 list-disc list-inside">
                                            {selectedMessage.details?.stopsExcluded?.map((stop) => (
                                                <li key={stop}>{stop}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-[#131722] p-3 rounded-xl border border-gray-800">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Itinéraire Bis</p>
                                        <p className="text-sm text-gray-300">{selectedMessage.details?.deviationPath}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTENU : DEMANDE RH */}
                        {modalType === 'request' && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-[#131722] p-4 rounded-2xl border border-gray-800">
                                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center shrink-0">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase">Type</p>
                                        <p className="text-white font-bold text-lg">{selectedMessage.details?.type}</p>
                                    </div>
                                </div>

                                <div className="bg-[#131722] p-4 rounded-2xl border border-gray-800 space-y-3">
                                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                                        <span className="text-sm text-gray-400">Période</span>
                                        <span className="text-sm font-bold text-white text-right">{selectedMessage.details?.dates}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">Validé par</span>
                                        <span className="text-sm font-bold text-white flex items-center gap-1.5">
                                            <UserCheck size={14} className="text-green-500" />
                                            {selectedMessage.details?.validator}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex items-center gap-3">
                                    <CheckCircle2 size={20} className="text-green-500" />
                                    <p className="text-sm text-green-300 font-medium">Votre planning a été mis à jour.</p>
                                </div>
                            </div>
                        )}

                        {/* Pied de page Modale */}
                        <div className="mt-6">
                            <button
                                onClick={closeModal}
                                className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform hover:bg-slate-200"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* HEADER */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md bg-[#0a0e17]/90 border-b border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <Link href="/" className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft size={28} />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-200">Messagerie Pro</h1>
                    <button className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white">
                        <Phone size={20} />
                    </button>
                </div>

                {/* FILTRES */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {(['all', 'regulation', 'planning', 'atelier'] as const).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={clsx(
                                "px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-colors whitespace-nowrap",
                                filter === cat
                                    ? "bg-white text-black"
                                    : "bg-[#131722] text-gray-400 border border-gray-800"
                            )}
                        >
                            {cat === 'all' ? 'Tous' : cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 mt-4 space-y-8">

                {/* SECTION : À TRAITER */}
                {pendingMessages.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                            À traiter ({pendingMessages.length})
                        </div>

                        {pendingMessages.map((msg) => {
                            const style = getCategoryStyles(msg.category);
                            const Icon = style.icon;

                            return (
                                <div key={msg.id} className={clsx("p-4 rounded-2xl border-l-4 shadow-lg bg-[#131722] border-y border-r border-y-gray-800 border-r-gray-800", style.border)}>

                                    {/* En-tête Carte */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={clsx("text-xs font-bold px-2 py-0.5 rounded uppercase", style.bg, style.text)}>
                                                {msg.sender}
                                            </span>
                                            {msg.category === 'regulation' && (
                                                <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded animate-pulse">URGENT</span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-gray-500 font-medium">{msg.time}</span>
                                    </div>

                                    <h3 className="font-bold text-white text-lg mb-1">{msg.title}</h3>
                                    <p className="text-sm text-gray-400 leading-snug mb-4">
                                        {msg.body}
                                    </p>

                                    {/* ACTIONS CONTEXTUELLES */}
                                    <div className="flex gap-3">
                                        {/* Bouton Secondaire (MODALE) */}
                                        <button
                                            onClick={() => {
                                                if (msg.category === 'regulation') openModal(msg, 'route');
                                                if (msg.category === 'planning') openModal(msg, 'request');
                                            }}
                                            className={clsx("flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors", style.btnSecondary)}
                                        >
                                            {msg.category === 'regulation' && <><MapPin size={14} /> Itinéraire</>}
                                            {msg.category === 'planning' && <><FileText size={14} /> Ma demande</>}
                                            {msg.category === 'atelier' && <><Bus size={14} /> Voir Bus</>}
                                        </button>

                                        {/* Bouton Primaire (Action) */}
                                        <button
                                            onClick={() => handleAcknowledge(msg.id)}
                                            className={clsx("flex-[2] py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all", style.btnPrimary)}
                                        >
                                            <Check size={16} />
                                            {msg.category === 'regulation' ? "Pris en compte" : "OK, Bien reçu"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* SECTION : TRAITÉ / HISTORIQUE */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
                        <Check size={12} />
                        Traité / Historique
                    </div>

                    {processedMessages.length === 0 && (
                        <p className="text-center text-xs text-gray-600 py-4 italic">Aucun message traité récemment.</p>
                    )}

                    {processedMessages.map((msg) => {
                        const style = getCategoryStyles(msg.category);
                        return (
                            <div key={msg.id} className="p-4 rounded-2xl bg-[#0f121a] border border-gray-800/50 opacity-60 hover:opacity-100 transition-opacity">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={clsx("text-[10px] font-bold uppercase", style.text)}>{msg.sender}</span>
                                    <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                        <Check size={10} /> Traité : {msg.processedAt}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-300 text-sm">{msg.title}</h3>
                                <p className="text-xs text-gray-500 line-clamp-1">{msg.body}</p>
                            </div>
                        )
                    })}
                </div>

                {/* LIEN ARCHIVES */}
                <button className="w-full py-4 flex flex-col items-center justify-center gap-1 text-gray-600 hover:text-gray-400 transition-colors border-t border-gray-800 mt-8">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <Archive size={14} />
                        Accéder aux archives
                    </div>
                    <span className="text-[10px]">Messages de plus de 30 jours</span>
                </button>

            </div>
        </div>
    );
}