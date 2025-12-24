// app/page.tsx
import Link from "next/link";
import { Bus, Bell, CheckCircle2, AlertOctagon, MessageCircle, ChevronRight, Clock, RotateCcw } from "lucide-react";

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const isServiceStarted = params.service_started === 'true';
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="p-4 space-y-6">

      {/* DEV RESET */}
      <Link href="/" replace className="fixed top-20 right-4 z-40 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full opacity-30 hover:opacity-100">DEV: RESET</Link>

      {/* HEADER */}
      <header className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">Bonjour, Sofiane</h1>
          <p className="text-sm font-medium text-[var(--muted)] capitalize">{today}</p>
        </div>

        {/* ICI : Ajout du lien vers la page notifications */}
        <Link href="/notifications" className="card-base p-3 rounded-full shadow-sm relative active:scale-95 transition-transform hover:bg-gray-50 dark:hover:bg-gray-800">
          <Bell className="w-6 h-6 text-[var(--muted)]" />
          {/* Point rouge de notification */}
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--card)] animate-pulse"></span>
        </Link>
      </header>

      {/* INFO RÉSEAU (Utilisation de card-base) */}
      <section className="card-base p-5 rounded-3xl shadow-sm flex gap-4 items-start">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-2xl shrink-0 text-blue-700 dark:text-blue-300">
          <span className="text-xl">📢</span>
        </div>
        <div>
          <h2 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">Info Réseau</h2>
          <p className="text-sm leading-snug font-medium text-[var(--foreground)]">
            Déviation ligne B (Travaux centre-ville) jusqu'à 14h00. Passer par rue Pasteur.
          </p>
        </div>
      </section>

      {/* CARTE PROCHAIN DÉPART */}
      <section className="relative">
        <div className="flex justify-center mb-3">
          <div className="bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in zoom-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Vous êtes bien au dépôt
          </div>
        </div>

        <div className="block group">
          {/* Le bleu reste bleu (Identité marque) */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-1 text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/20">
            <div className="bg-white/10 backdrop-blur-sm rounded-[1.8rem] p-6 border border-white/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-400/30 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    <span className="text-[10px] font-bold text-blue-100 tracking-wide uppercase">Prochain Départ</span>
                  </div>
                  <h3 className="text-5xl font-black tracking-tight mb-1">04:44</h3>
                  <div className="flex items-center gap-2 text-blue-100 text-sm font-medium opacity-90">
                    <span>Dépôt RDCREIL</span><ChevronRight size={14} /><span>Quai Hôpital</span>
                  </div>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl shadow-inner text-white"><Bus className="w-8 h-8" /></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-900/20 rounded-xl p-3">
                  <p className="text-blue-200 text-[10px] uppercase font-bold mb-1">Ligne & Arrivée</p>
                  <div className="flex items-center gap-1"><span className="font-bold text-lg">Ligne A</span></div>
                  <div className="flex items-center gap-1 text-xs text-blue-100 mt-1"><Clock size={12} /> 05:06</div>
                </div>
                <div className="bg-blue-900/20 rounded-xl p-3">
                  <p className="text-blue-200 text-[10px] uppercase font-bold mb-1">Véhicule</p>
                  <p className="font-bold text-lg leading-tight">Articulé 67</p>
                </div>
              </div>

              {isServiceStarted ? (
                <div className="bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5" />PRISE DE SERVICE VALIDÉE</div>
              ) : (
                <Link href="/service" className="bg-white text-blue-700 font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"><CheckCircle2 className="w-5 h-5" />COMMENCER LE SERVICE<ChevronRight className="w-4 h-4 opacity-50" /></Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ACCÈS RAPIDE */}
      <section>
        <h3 className="font-bold text-lg mb-3 px-1 text-[var(--foreground)]">Accès rapide</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/signalement" className="card-base p-4 rounded-3xl shadow-sm flex flex-col items-center justify-center gap-2 active:bg-slate-50 dark:active:bg-slate-800 h-32">
            <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 dark:text-red-400 mb-1"><AlertOctagon className="w-7 h-7" /></div>
            <span className="font-bold text-sm text-[var(--foreground)]">Signalement</span>
          </Link>
          <Link href="/messages" className="card-base p-4 rounded-3xl shadow-sm flex flex-col items-center justify-center gap-2 active:bg-slate-50 dark:active:bg-slate-800 h-32">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1"><MessageCircle className="w-7 h-7" /></div>
            <span className="font-bold text-sm text-[var(--foreground)]">Messagerie</span>
          </Link>
        </div>
      </section>
    </div>
  );
}