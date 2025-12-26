// app/page.tsx
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Bus, Bell, CheckCircle2, AlertOctagon, MessageCircle, ChevronRight,
  Clock, X, Loader2, Wifi, Check, LogOut, MapPin
} from "lucide-react";
import { clsx } from "clsx";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isServiceStarted = searchParams.get('service_started') === 'true';

  // --- ÉTATS ---
  const [loadingStep, setLoadingStep] = useState<"idle" | "checking" | "success">("idle");
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Date du jour
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  // Horloge pour la synchro
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- LOGIQUE BOUTON DÉMARRER ---
  const handleStartService = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loadingStep !== "idle") return;
    setLoadingStep("checking");
    setTimeout(() => {
      setLoadingStep("success");
      setTimeout(() => {
        router.push("/service");
      }, 800);
    }, 1500);
  };

  // --- LOGIQUE FIN DE SERVICE ---
  const handleEndService = () => {
    router.push("/");
  };

  return (
    <div className="p-4 space-y-6 pb-24 min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">

      {/* MODALE INFO RÉSEAU (Style Dark Only) */}
      {showNetworkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1a1f2e] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-800 transform scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-400">
                <span className="text-2xl">📢</span>
              </div>
              <button onClick={() => setShowNetworkModal(false)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:bg-slate-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Info Réseau Prioritaire</h3>
            <div className="bg-[#131722] p-4 rounded-2xl border border-gray-800 mb-6">
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                🚧 <span className="font-bold text-white">Déviation ligne B</span> (Travaux centre-ville).<br /><br />
                La rue de la République est fermée jusqu'à 14h00. Merci d'emprunter la déviation par la <span className="underline decoration-blue-500 text-white">rue Pasteur</span>.
                Impact estimé : +5 min.
              </p>
            </div>
            <button
              onClick={() => setShowNetworkModal(false)}
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-blue-500"
            >
              <Check size={18} /> J'ai pris connaissance
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Bonjour, Sofiane</h1>
          <p className="text-sm font-medium text-slate-400 capitalize">{today}</p>
        </div>

        <Link href="/notifications" className="card-base p-3 rounded-full shadow-sm relative active:scale-95 transition-transform hover:bg-slate-800 border-gray-800">
          <Bell className="w-6 h-6 text-slate-400" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1e293b] animate-pulse"></span>
        </Link>
      </header>

      {/* INFO RÉSEAU ACTIONNABLE */}
      <section
        onClick={() => setShowNetworkModal(true)}
        className="card-base p-4 rounded-3xl shadow-sm flex gap-4 items-center cursor-pointer group hover:border-blue-700 transition-colors active:scale-[0.98] border-gray-800 bg-[#1e293b]"
      >
        <div className="bg-blue-900/30 p-2.5 rounded-2xl shrink-0 text-blue-300 group-hover:scale-110 transition-transform">
          <span className="text-xl">📢</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Info Réseau</h2>
            <span className="text-[10px] bg-blue-900/20 text-blue-300 px-1.5 py-0.5 rounded font-bold border border-blue-900/30">Voir</span>
          </div>
          <p className="text-sm leading-snug font-medium text-slate-300 truncate">
            Déviation ligne B (Travaux centre-ville)...
          </p>
        </div>
      </section>

      {/* CARTE PROCHAIN DÉPART */}
      <section className="relative">

        {/* PILULE GÉOLOCALISATION */}
        <div className="flex justify-center mb-3">
          <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in zoom-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Vous êtes bien au dépôt
          </div>
        </div>

        <div className="block group">
          <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-[2rem] p-1 text-white shadow-xl shadow-blue-900/20">
            <div className="bg-white/5 backdrop-blur-sm rounded-[1.8rem] p-6 border border-white/10 relative overflow-hidden">

              {/* STATUS INDICATOR */}
              <div className="absolute top-6 right-6">
                {!isServiceStarted ? (
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wide">Non démarré</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-orange-500/20 backdrop-blur-md border border-orange-500/30 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-orange-100 uppercase tracking-wide">En cours</span>
                  </div>
                )}
              </div>

              <div className="mb-6 mt-1">
                <div className="inline-flex items-center gap-1.5 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-400/30 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span className="text-[10px] font-bold text-blue-100 tracking-wide uppercase">Prochain Départ</span>
                </div>
                <h3 className="text-5xl font-black tracking-tight mb-1">04:44</h3>
                <div className="flex items-center gap-2 text-blue-100 text-sm font-medium opacity-90">
                  <span>Dépôt RDCREIL</span><ChevronRight size={14} /><span>Quai Hôpital</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-900/30 rounded-xl p-3 border border-blue-800/30">
                  <p className="text-blue-200 text-[10px] uppercase font-bold mb-1">Ligne & Arrivée</p>
                  <div className="flex items-center gap-1"><span className="font-bold text-lg">Ligne A</span></div>
                  <div className="flex items-center gap-1 text-xs text-blue-100 mt-1"><Clock size={12} /> 05:06</div>
                </div>
                <div className="bg-blue-900/30 rounded-xl p-3 border border-blue-800/30">
                  <p className="text-blue-200 text-[10px] uppercase font-bold mb-1">Véhicule</p>
                  <p className="font-bold text-lg leading-tight">Articulé 67</p>
                </div>
              </div>

              {/* BOUTON ACTION AVEC FEEDBACK */}
              {isServiceStarted ? (
                <div className="space-y-3 animate-in fade-in zoom-in duration-300">
                  {/* Bouton Validé (Statique) */}
                  <div className="bg-emerald-600/90 border border-emerald-500/50 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    PRISE DE SERVICE VALIDÉE
                  </div>

                  {/* BOUTON TERMINER */}
                  <button
                    onClick={handleEndService}
                    className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-colors active:scale-95"
                  >
                    <LogOut size={18} />
                    TERMINER LE SERVICE
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStartService}
                  disabled={loadingStep !== "idle"}
                  className={clsx(
                    "w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95",
                    loadingStep === "success"
                      ? "bg-green-500 text-white scale-100"
                      : "bg-white text-blue-900 hover:bg-blue-50"
                  )}
                >
                  {loadingStep === "idle" && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      COMMENCER LE SERVICE
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </>
                  )}
                  {loadingStep === "checking" && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Vérification GPS...
                    </>
                  )}
                  {loadingStep === "success" && (
                    <>
                      <Check className="w-5 h-5" />
                      Dépôt détecté !
                    </>
                  )}
                </button>
              )}

              {/* FOOTER SYNC */}
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-medium text-blue-200/80">
                <div className="flex items-center gap-1.5">
                  <Wifi size={12} />
                  <span>Connexion optimale</span>
                </div>
                <span>Sync : {currentTime}</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ACCÈS RAPIDE - VERSION DARK */}
      <section>
        <h3 className="font-bold text-lg mb-3 px-1 text-white">Accès rapide</h3>
        <div className="grid grid-cols-2 gap-3">

          {/* Signalement */}
          <Link href="/signalement" className="card-base p-3 rounded-2xl shadow-sm flex items-center gap-3 active:scale-95 transition-all group hover:border-red-900/50 bg-[#1e293b] border-gray-800">
            <div className="w-10 h-10 bg-red-900/20 rounded-full flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform shadow-inner border border-red-900/30">
              <AlertOctagon size={20} />
            </div>
            <span className="font-bold text-sm text-slate-200">Signalement</span>
          </Link>

          {/* Messagerie */}
          <Link href="/messages" className="card-base p-3 rounded-2xl shadow-sm flex items-center gap-3 active:scale-95 transition-all group hover:border-blue-900/50 bg-[#1e293b] border-gray-800">
            <div className="w-10 h-10 bg-blue-900/20 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-inner border border-blue-900/30">
              <MessageCircle size={20} />
            </div>
            <span className="font-bold text-sm text-slate-200">Messagerie</span>
          </Link>

        </div>
      </section>
    </div>
  );
}