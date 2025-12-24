// components/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, AlertTriangle, User } from "lucide-react";
import { clsx } from "clsx";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Accueil", href: "/", icon: Home },
        { name: "Messages", href: "/messages", icon: MessageSquare },
        { name: "Signaler", href: "/signalement", icon: AlertTriangle },
        { name: "Profil", href: "/profil", icon: User },
    ];

    return (
        // Style fixe en bas, utilise les variables CSS pour la couleur
        <div className="fixed bottom-0 left-0 w-full h-16 z-50 border-t transition-colors duration-300"
            style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}>

            <div className="max-w-md mx-auto grid h-full grid-cols-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="inline-flex flex-col items-center justify-center px-5 group active:scale-95 transition-transform"
                        >
                            <Icon
                                size={24}
                                className={clsx(
                                    "mb-1 transition-colors",
                                    isActive ? "text-[var(--primary)]" : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                                )}
                            />
                            <span
                                className={clsx(
                                    "text-[10px] font-bold transition-colors",
                                    isActive ? "text-[var(--primary)]" : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                                )}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}