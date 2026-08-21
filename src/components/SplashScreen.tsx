import { useEffect, useState } from "react";

import splashAsset from "@/assets/splash-building.webp.asset.json";
import splash360 from "@/assets/splash-building-360.webp.asset.json";
import splash480 from "@/assets/splash-building-480.webp.asset.json";

const splashSrcSet = [
  `${splash360.url} 360w`,
  `${splash480.url} 480w`,
  `${splashAsset.url} 595w`,
].join(", ");

const STORAGE_KEY = "lavin-splash-shown";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return;
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(true);
    const fade = window.setTimeout(() => setLeaving(true), 2200);
    const hide = window.setTimeout(() => setVisible(false), 2900);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Memuat aplikasi inventaris Lavin Kost Purwokerto"
      onClick={() => setLeaving(true)}
      className={`fixed inset-0 z-[100] flex flex-col bg-background transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex-1 overflow-hidden">
        <img
          src={splashAsset.url}
          srcSet={splashSrcSet}
          sizes="(min-width: 1024px) 60vw, 100vw"
          width={595}
          height={630}
          fetchPriority="high"
          decoding="async"
          alt="Bangunan Lavin Kost Purwokerto"
          className="h-full w-full object-cover object-center sm:object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
      </div>

      <div className="relative -mt-20 px-6 pb-10 text-center sm:-mt-24 sm:px-8 sm:pb-14 lg:-mt-32 lg:pb-20">
        <img
          src="/app-icon-192.png"
          alt=""
          width={56}
          height={56}
          className="mx-auto h-14 w-14 rounded-md border border-gold-line bg-card shadow-sm"
        />
        <p className="mt-5 text-[11px] tracking-[0.34em] text-muted-foreground uppercase">
          Sistem Inventaris
        </p>
        <h1 className="mt-2 font-display text-2xl leading-snug font-semibold tracking-tight text-foreground">
          Lavin Kost Purwokerto
        </h1>
        <div className="mx-auto mt-4 h-px w-16 bg-primary" />
        <p className="mt-4 text-xs text-muted-foreground">
          Pencatatan fasilitas kamar &amp; fasilitas utama
        </p>
        <div className="mx-auto mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-accent">
          <div className="h-full w-1/3 animate-[splash-bar_1.6s_ease-in-out_infinite] bg-primary" />
        </div>
      </div>
    </div>
  );
}
