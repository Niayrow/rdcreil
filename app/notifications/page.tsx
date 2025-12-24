// app/notifications/page.tsx
"use client";

import Link from "next/link";
import { ChevronLeft, Bell, AlertTriangle, Info, CheckCircle2, Clock, Check } from "lucide-react";

export default function NotificationsPage() {
    // Données simulées
    const notifications = [
        {
            id: 1,
            type: "urgent",
            title: "Déviation Urgente - Ligne B",
            message: "Accident rue Pasteur. Déviation mise en place via Boulevard Jaurès jusqu'à nouvel ordre.",
            time: "Il y a 10 min",
            read: false,
        },
        {
            id: 2,
            type: "success",
            title: "Prise de service validée",
            message: "Votre début de service à 04:44 a été enregistré avec succès.",
            time: "Aujourd'hui, 04:45",
            read: true,
        },
        {
            id: 3,
            type: "info",
            title: "Fiche de paie disponible",
            message: "Votre bulletin de salaire de Décembre 2025 est disponible dans votre espace.",
            time: "Hier",
            read: true,
        },
        {
            id: 4,
            type: "info",
            title: "Maintenance préventive Bus 54",
            message: "Véhicule immobilisé demain pour contrôle technique.",
            time: "22 Déc.",
            read: true,
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0e17] pb-24 font-sans text-slate-200">

            {/* HEADER */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md bg-[#0a0e17]/80 border-b border-gray-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link href="/" className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft size={28} />
                    </Link>
                    <span className="font-bold text-gray-200 text-lg">Notifications</span>
                </div>

                {/* Bouton "Tout marquer comme lu" */}
                <button className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    <Check size={14} /> Tout lire
                </button>
            </div>

            <div className="px-4 mt-6 space-y-6">

                {/* SECTION : AUJOURD'HUI */}
                <div>
                    <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-3 ml-1">Aujourd'hui</h3>
                    <div className="space-y-3">
                        {notifications.slice(0, 2).map((notif) => (
                            <NotificationItem key={notif.id} data={notif} />
                        ))}
                    </div>
                </div>

                {/* SECTION : PLUS TÔT */}
                <div>
                    <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-3 ml-1">Plus tôt</h3>
                    <div className="space-y-3">
                        {notifications.slice(2).map((notif) => (
                            <NotificationItem key={notif.id} data={notif} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// Composant pour une ligne de notification
function NotificationItem({ data }: { data: any }) {

    // Déterminer l'icône et la couleur selon le type
    let Icon = Info;
    let colorClass = "text-blue-400 bg-blue-500/10 border-blue-500/20"; // Info par défaut

    if (data.type === 'urgent') {
        Icon = AlertTriangle;
        colorClass = "text-red-500 bg-red-500/10 border-red-500/20";
    } else if (data.type === 'success') {
        Icon = CheckCircle2;
        colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    }

    return (
        <div className={`relative p-4 rounded-2xl bg-[#131722] border border-gray-800 shadow-sm flex gap-4 ${!data.read ? 'border-l-4 border-l-blue-500' : ''}`}>
            {/* Indicateur Non lu (Point bleu) */}
            {!data.read && (
                <span className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
            )}

            {/* Icône */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border shadow-inner ${colorClass}`}>
                <Icon size={24} />
            </div>

            {/* Contenu */}
            <div className="flex-1">
                <div className="flex justify-between items-start pr-4">
                    <h4 className={`text-sm font-bold mb-1 ${!data.read ? 'text-white' : 'text-gray-300'}`}>
                        {data.title}
                    </h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {data.message}
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-medium text-gray-600">
                    <Clock size={12} />
                    {data.time}
                </div>
            </div>
        </div>
    );
}