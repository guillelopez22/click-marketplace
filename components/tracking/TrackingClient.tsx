"use client";

import { useEffect, useRef, useState } from "react";
import { RiderMap } from "./RiderMap";
import { StatusTimeline } from "./StatusTimeline";
import { getStatusLabel } from "@/lib/order-status";
import type { OrderStatus } from "@prisma/client";
import { es } from "@/lib/i18n/es";

interface StatusEvent {
  status: string;
  message: string | null;
  at: string;
}

interface TrackingClientProps {
  orderId: string;
  isLocalOrder: boolean;
  initialLat: number | null;
  initialLng: number | null;
  cityLat: number;
  cityLng: number;
  initialEvents: StatusEvent[];
  initialStatus: string;
}

export function TrackingClient({
  orderId,
  isLocalOrder,
  initialLat,
  initialLng,
  cityLat,
  cityLng,
  initialEvents,
  initialStatus,
}: TrackingClientProps) {
  const [targetLat, setTargetLat] = useState(initialLat);
  const [targetLng, setTargetLng] = useState(initialLng);
  const [events, setEvents] = useState<StatusEvent[]>(initialEvents);
  const [status, setStatus] = useState(initialStatus);
  const esRef = useRef<EventSource | null>(null);

  const isDelivered = status === "DELIVERED";

  useEffect(() => {
    if (isDelivered) return;

    const es = new EventSource(`/api/tracking/${orderId}/stream`);
    esRef.current = es;

    es.addEventListener("update", (e: MessageEvent) => {
      const data = JSON.parse(e.data) as {
        lat: number | null;
        lng: number | null;
        heading: number;
        status: string;
        events: StatusEvent[];
      };

      if (data.lat !== null && data.lng !== null) {
        setTargetLat(data.lat);
        setTargetLng(data.lng);
      }
      setStatus(data.status);
      setEvents(data.events);

      if (data.status === "DELIVERED") es.close();
    });

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [orderId, isDelivered]);

  const currentStatus = status as OrderStatus;

  return (
    <div className="flex flex-col gap-5 pt-4 pb-8">
      {/* Status header */}
      <div className="flex flex-col gap-1">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--cl-text-muted)" }}
        >
          {es.tracking.title}
        </p>
        <div className="flex items-center gap-2">
          <h1
            className="text-xl font-bold"
            style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.025em" }}
          >
            {getStatusLabel(currentStatus)}
          </h1>
          {!isDelivered && (
            <span
              className="pulse-dot h-2 w-2 rounded-full"
              style={{ background: "var(--cl-accent)" }}
            />
          )}
        </div>
        {isLocalOrder && !isDelivered && (
          <p className="text-sm" style={{ color: "var(--cl-text-secondary)" }}>
            {es.tracking.riderHeading}
          </p>
        )}
        {isDelivered && (
          <p className="text-sm font-medium" style={{ color: "var(--cl-success)" }}>
            {es.tracking.delivered}
          </p>
        )}
      </div>

      {/* Map (local orders only) */}
      {isLocalOrder && (
        <RiderMap
          targetLat={targetLat}
          targetLng={targetLng}
          cityLat={cityLat}
          cityLng={cityLng}
          isDelivered={isDelivered}
        />
      )}

      {/* Status timeline */}
      <div
        className="rounded-2xl p-4"
        style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
      >
        <h2
          className="mb-4 text-sm font-semibold"
          style={{ color: "var(--cl-text-primary)" }}
        >
          Historial del pedido
        </h2>
        <StatusTimeline events={events} />
      </div>
    </div>
  );
}
