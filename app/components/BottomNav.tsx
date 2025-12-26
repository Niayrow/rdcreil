// components/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, AlertTriangle, User } from "lucide-react";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

export default function BottomNav() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // 1. D'ABORD : On déclare tous les Hooks (toujours !)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // On cache si on descend, on montre si on monte
            if (currentScrollY > lastScrollY && currentScrollY > 10) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // 2. ENSUITE : On peut faire les conditions de sortie
    // Si on est sur la page service, on ne rend rien (mais les hooks ont bien été lus)
    if (pathname === "/service") return null;

    const navItems = [
        { name: "Accueil", href: "/", icon: Home },
        { name: "Messages", href: "/messages", icon: MessageSquare },
        { name: "Signaler", href: "/signalement", icon: AlertTriangle },
        { name: "Profil", href: "/profil", icon: User },
    ];

    // 3. ENFIN : Le rendu normal
    return (
        <div
            className={clsx(
                "fixed bottom-0 left-0 w-full z-50 border-t transition-transform duration-300 ease-in-out",
                isVisible ? "translate-y-0" : "translate-y-full"
            )}
            style={{
                backgroundColor: 'var(--nav-bg)',
                borderColor: 'var(--nav-border)',
            }}
        >
            <div className="absolute inset-0 -z-10 backdrop-blur-md" />

            <div className="max-w-md mx-auto grid h-16 grid-cols-4 pb-[env(safe-area-inset-bottom)]">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative inline-flex flex-col items-center justify-center px-5 group active:scale-95 transition-transform"
                        >
                            {isActive && (
                                <span className="absolute top-0 w-8 h-0.5 bg-[var(--primary)] rounded-b-full shadow-[0_0_10px_var(--primary)]" />
                            )}

                            <Icon
                                size={24}
                                className={clsx(
                                    "mb-1 transition-all duration-300",
                                    isActive
                                        ? "text-[var(--primary)] -translate-y-0.5"
                                        : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                                )}
                            />
                            <span
                                className={clsx(
                                    "text-[10px] font-bold transition-colors",
                                    isActive
                                        ? "text-[var(--primary)]"
                                        : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
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