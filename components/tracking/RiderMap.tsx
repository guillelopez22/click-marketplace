"use client";

import { useEffect, useRef } from "react";
import { MapPin, CheckCircle2 } from "lucide-react";

interface RiderMapProps {
  targetLat: number | null;
  targetLng: number | null;
  cityLat: number;
  cityLng: number;
  isDelivered: boolean;
}

export function RiderMap({ targetLat, targetLng, cityLat, cityLng, isDelivered }: RiderMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);
  const currentRef = useRef({ lat: targetLat ?? cityLat, lng: targetLng ?? cityLng });
  const targetRef = useRef({ lat: targetLat ?? cityLat, lng: targetLng ?? cityLng });
  const rafRef = useRef(0);

  // Sync target when props change
  useEffect(() => {
    if (targetLat !== null && targetLng !== null) {
      targetRef.current = { lat: targetLat, lng: targetLng };
    }
  }, [targetLat, targetLng]);

  // rAF lerp loop — smooth marker interpolation
  useEffect(() => {
    function tick() {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const dLat = tgt.lat - cur.lat;
      const dLng = tgt.lng - cur.lng;

      if (Math.abs(dLat) > 0.000001 || Math.abs(dLng) > 0.000001) {
        const newLat = cur.lat + dLat * 0.08;
        const newLng = cur.lng + dLng * 0.08;
        currentRef.current = { lat: newLat, lng: newLng };
        markerRef.current?.setLngLat([newLng, newLat]);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Init Mapbox map once on mount
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || !containerRef.current || mapRef.current) return;

    // Dynamic import avoids SSR issues with mapbox-gl
    import("mapbox-gl").then(({ default: mapboxgl }) => {
      import("mapbox-gl/dist/mapbox-gl.css" as string);
      if (!containerRef.current || mapRef.current) return;

      mapboxgl.accessToken = token;

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [cityLng, cityLat],
        zoom: 13,
        attributionControl: false,
      });

      // Rider marker DOM element
      const el = document.createElement("div");
      el.style.cssText =
        "position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;";

      const pulse = document.createElement("div");
      pulse.className = "rider-pulse";
      pulse.style.cssText =
        "position:absolute;inset:0;border-radius:50%;background:rgba(29,111,242,0.28);";

      const dot = document.createElement("div");
      dot.style.cssText =
        "position:relative;z-index:1;width:24px;height:24px;border-radius:50%;background:#1D6FF2;" +
        "display:flex;align-items:center;justify-content:center;" +
        "box-shadow:0 0 0 3px rgba(29,111,242,0.20),0 2px 8px rgba(0,0,0,0.5);";
      // SVG arrow-up icon (direction indicator)
      dot.innerHTML =
        '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M6 2L10 9H2L6 2Z" fill="white"/>' +
        '</svg>';

      el.appendChild(pulse);
      el.appendChild(dot);

      const marker = new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat([currentRef.current.lng, currentRef.current.lat])
        .addTo(map);

      mapRef.current = map;
      markerRef.current = marker;
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasToken = !!process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!hasToken) {
    return (
      <div
        className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl"
        style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--cl-surface-raised)" }}>
          <MapPin size={20} style={{ color: "var(--cl-text-muted)" }} />
        </div>
        <p className="text-sm" style={{ color: "var(--cl-text-muted)" }}>
          Mapa no disponible
        </p>
        <p className="text-[11px]" style={{ color: "var(--cl-text-muted)" }}>
          Configura NEXT_PUBLIC_MAPBOX_TOKEN
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ height: "288px" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {isDelivered && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(9,9,11,0.65)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="flex flex-col items-center gap-3 rounded-2xl px-6 py-5 text-center"
            style={{
              background: "var(--cl-success-subtle)",
              border: "1px solid rgba(22,163,74,0.30)",
            }}
          >
            <CheckCircle2 size={32} style={{ color: "var(--cl-success)" }} />
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--cl-success)" }}
            >
              ¡Pedido entregado!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
