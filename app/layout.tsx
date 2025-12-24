// app/layout.tsx
import "./globals.css";
import BottomNav from "./components/BottomNav";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      {/* pb-20 assure que le dernier élément de la page n'est jamais caché par la navbar */}
      <body className="antialiased min-h-screen pb-20">
        <Providers>
          <main className="max-w-md mx-auto relative">
            {children}
          </main>

          {/* Navbar intégrée normalement */}
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}