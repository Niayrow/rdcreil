// app/messages/page.tsx
import Link from "next/link";
import { ChevronLeft, MessageCircle, AlertOctagon, Info } from "lucide-react";

export default function MessagesPage() {
    const messages = [
        {
            id: 1,
            sender: "Régulation",
            type: "urgent",
            time: "12:15",
            title: "Déviation Ligne A",
            preview: "Suite à un accident rue de la République, merci de passer par...",
            unread: true,
        },
        {
            id: 2,
            sender: "Planning",
            type: "info",
            time: "Hier",
            title: "Validation congés",
            preview: "Votre demande pour le 24/12 a été validée par le service RH.",
            unread: false,
        },
        {
            id: 3,
            sender: "Atelier",
            type: "info",
            time: "Hier",
            title: "Bus 402 Disponible",
            preview: "Le remplacement du rétroviseur est terminé. Véhicule dispo.",
            unread: false,
        }
    ];

    return (
        <div className="flex flex-col min-h-screen pb-24">

            {/* HEADER */}
            <div className="sticky top-0 z-10 px-4 pt-4 pb-2 backdrop-blur-md bg-[var(--background)]/80">
                <div className="flex items-center justify-between mb-2">
                    <Link href="/" className="p-2 -ml-2 text-[var(--muted)]"><ChevronLeft size={28} /></Link>
                    <h1 className="text-lg font-bold text-[var(--foreground)]">Messagerie</h1>
                    <div className="w-8" />
                </div>
            </div>

            <div className="px-4 space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-4 rounded-2xl shadow-sm border transition-all active:scale-[0.98] ${msg.type === 'urgent'
                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                                : 'card-base'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                {msg.type === 'urgent' ? (
                                    <div className="bg-blue-600 text-white p-1.5 rounded-lg"><AlertOctagon size={16} /></div>
                                ) : (
                                    <div className="bg-[var(--background)] text-[var(--muted)] p-1.5 rounded-lg"><Info size={16} /></div>
                                )}
                                <span className={`font-bold text-sm ${msg.type === 'urgent' ? 'text-blue-700 dark:text-blue-300' : 'text-[var(--foreground)]'}`}>
                                    {msg.sender}
                                </span>
                                {msg.unread && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>}
                            </div>
                            <span className="text-xs text-[var(--muted)] font-medium">{msg.time}</span>
                        </div>

                        <h3 className="font-bold text-[var(--foreground)] mb-1">{msg.title}</h3>
                        <p className="text-sm text-[var(--muted)] leading-snug line-clamp-2">
                            {msg.preview}
                        </p>
                    </div>
                ))}

                <p className="text-center text-xs text-[var(--muted)] pt-4">Fin des messages</p>
            </div>
        </div>
    );
}