// app/providers.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        // On force le thème à 'dark' et on désactive le changement
        <NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            {children}
        </NextThemesProvider>
    );
}