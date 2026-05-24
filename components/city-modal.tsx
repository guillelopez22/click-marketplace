"use client";

import { useSyncExternalStore } from "react";
import { MapPin } from "lucide-react";
import { useLocationStore, type City } from "@/stores/location";
import { es } from "@/lib/i18n/es";

export function CityModal() {
  // Server snapshot = true (modal hidden SSR to prevent flash)
  const hasSelected = useSyncExternalStore(
    useLocationStore.subscribe,
    () => useLocationStore.getState().hasSelected,
    () => true
  );

  if (hasSelected) return null;

  const options: { city: City; name: string; sub: string }[] = [
    { city: "TGU", name: "Tegucigalpa", sub: "Distrito Central" },
    { city: "SPS", name: "San Pedro Sula", sub: "Cortés" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "var(--cl-surface-overlay)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-[480px] rounded-t-3xl p-6 pb-10"
        style={{ background: "var(--cl-surface)" }}
      >
        <div className="mb-1 flex items-center gap-2">
          <MapPin size={18} style={{ color: "var(--cl-accent)" }} />
          <span className="text-base font-semibold" style={{ color: "var(--cl-text-primary)" }}>
            {es.city.prompt}
          </span>
        </div>
        <p className="mb-6 text-sm" style={{ color: "var(--cl-text-secondary)" }}>
          {es.city.promptSub}
        </p>

        <div className="flex flex-col gap-3">
          {options.map(({ city, name, sub }) => (
            <button
              key={city}
              onClick={() => useLocationStore.getState().setCity(city)}
              className="flex items-center gap-4 rounded-xl p-4 text-left transition-all active:scale-[0.97]"
              style={{
                background: "var(--cl-surface-raised)",
                border: "1px solid var(--cl-border)",
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
                style={{ background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" }}
              >
                {city}
              </div>
              <div>
                <p className="font-semibold" style={{ color: "var(--cl-text-primary)" }}>
                  {name}
                </p>
                <p className="text-xs" style={{ color: "var(--cl-text-secondary)" }}>
                  {sub}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
